'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { ClientSDK } from '@sitecore-marketplace-sdk/client';
import { BlokAlert } from '../components/blok';

// Application Context interface based on your data
export interface ApplicationContext {
  id: string;
  url: string;
  name: string;
  type: string;
  iconUrl: string;
  state: string;
  installationId: string;
  resources: Array<{
    resourceId: string;
    tenantId: string;
    tenantName: string | null;
    tenantDisplayName: string;
    context: {
      preview: string;
      live: string;
    };
  }>;
  touchpoints: Array<{
    touchpointId: string;
    route: string;
    meta: any[];
  }>;
  extensionPoints: Array<{
    route: string;
    meta: any[];
    extensionPointId: string;
  }>;
  resourceAccess: Array<{
    resourceId: string;
    tenantId: string;
    tenantName: string | null;
    tenantDisplayName: string;
    context: {
      preview: string;
      live: string;
    };
  }>;
}

interface MarketplaceClientContextType {
  client: ClientSDK | null;
  appContext: ApplicationContext | null;
  appContextLoading: boolean;
  appContextError: string | null;
  isInitialized: boolean;
}

const MarketplaceClientContext = createContext<MarketplaceClientContextType>({
  client: null,
  appContext: null,
  appContextLoading: true,
  appContextError: null,
  isInitialized: false,
});

export const useMarketplaceClientContext = () => useContext(MarketplaceClientContext);

interface MarketplaceClientProviderProps {
  children: ReactNode;
}

export function MarketplaceClientProvider({ children }: MarketplaceClientProviderProps) {
  const [client, setClient] = useState<ClientSDK | null>(null);
  const [appContext, setAppContext] = useState<ApplicationContext | null>(null);
  const [appContextLoading, setAppContextLoading] = useState(true);
  const [appContextError, setAppContextError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
    async function initializeMarketplace() {
      try {
        console.log('🚀 Initializing Sitecore Marketplace client...');
        console.log('📍 Current origin:', window.location.origin);
        
        // Check if we're running in a Sitecore environment
        // Note: Vercel apps can be loaded by XM Cloud, so we need to check for SDK availability
        const isLocalDevelopment = window.location.hostname === 'localhost' || 
                                 window.location.hostname === '127.0.0.1';
        
        // Check if Sitecore Marketplace SDK is available (injected by XM Cloud)
        const hasSitecoreSDK = typeof window !== 'undefined' && 
                              (window as any).SitecoreMarketplaceSDK !== undefined;
        
        const isSitecoreEnvironment = !isLocalDevelopment && hasSitecoreSDK;
        
        if (!isSitecoreEnvironment) {
          console.log('🖥️ Development mode detected - using mock data');
          
          // Create mock application context for development
          const mockAppContext: ApplicationContext = {
            id: 'dev-app-001',
            url: window.location.origin,
            name: 'XMC Visualiser (Development)',
            type: 'development',
            iconUrl: '',
            state: 'active',
            installationId: 'dev-install-001',
            resources: [],
            touchpoints: [],
            extensionPoints: [],
            resourceAccess: [
              {
                resourceId: 'dev-resource-001',
                tenantId: 'dev-tenant-001',
                tenantName: 'development-tenant',
                tenantDisplayName: 'Development Tenant',
                context: {
                  preview: 'dev-preview-context',
                  live: 'dev-live-context'
                }
              },
              {
                resourceId: 'dev-resource-002',
                tenantId: 'dev-tenant-002',
                tenantName: 'test-tenant',
                tenantDisplayName: 'Test Tenant',
                context: {
                  preview: 'test-preview-context',
                  live: 'test-live-context'
                }
              }
            ]
          };
          
          console.log('✅ Mock application context created for development');
          setAppContext(mockAppContext);
          setIsInitialized(true);
          setAppContextLoading(false);
          return;
        }
        
                // Initialize the marketplace client for production using the working pattern
        console.log('🚀 Production mode - initializing Sitecore Marketplace SDK');
        
        let marketplaceClient: ClientSDK;
        
        try {
          const config = {
            target: window.parent,
            modules: [], // We don't have XMC module, but this pattern works
          };
          
          marketplaceClient = await ClientSDK.init(config);
          console.log('✅ Marketplace client initialized using init() method');
        } catch (initError) {
          console.log('⚠️ ClientSDK.init() failed, falling back to constructor method');
          marketplaceClient = new ClientSDK({ 
            selfOrigin: window.location.origin 
          });
          console.log('✅ Marketplace client initialized using constructor method');
        }
        
        setClient(marketplaceClient);
        
        // Fetch application context from XM Cloud instance
        console.log('🔍 Querying application.context...');
        const result = await marketplaceClient.query('application.context');
        
        console.log('📊 Query response:', result);
        
        if (result.error) {
          console.error('❌ GraphQL error:', result.error);
          throw new Error(`GraphQL error: ${result.error.message || 'Unknown error'}`);
        }
        
        if (result.data) {
          console.log('✅ Application context data received:', result.data);
          console.log('🔍 Resource access:', (result.data as any)?.resourceAccess);
          console.log('🔍 Resource access length:', (result.data as any)?.resourceAccess?.length);
          setAppContext(result.data as ApplicationContext);
          setIsInitialized(true);
        } else {
          console.error('❌ No data returned from marketplace query');
          throw new Error('No application context data returned');
        }

      } catch (error) {
        console.error('❌ Failed to initialize marketplace client:', error);
        setAppContextError(error instanceof Error ? error.message : 'Unknown error occurred');
      } finally {
        setAppContextLoading(false);
      }
    }

    initializeMarketplace();
  }, []);

  const value: MarketplaceClientContextType = {
    client,
    appContext,
    appContextLoading,
    appContextError,
    isInitialized,
  };

  return (
    <MarketplaceClientContext.Provider value={value}>
      {children}
    </MarketplaceClientContext.Provider>
  );
}
