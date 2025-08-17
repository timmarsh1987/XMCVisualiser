import { ClientSDK } from "@sitecore-marketplace-sdk/client";
import { XMC } from "@sitecore-marketplace-sdk/xmc";
import { useEffect, useState, useCallback, useMemo, useRef } from "react";

export interface MarketplaceClientState {
  client: ClientSDK | any | null;
  error: Error | null;
  isLoading: boolean;
  isInitialized: boolean;
}

export interface UseMarketplaceClientOptions {
  /**
   * Number of retry attempts when initialization fails
   * @default 3
   */
  retryAttempts?: number;

  /**
   * Delay between retry attempts in milliseconds
   * @default 1000
   */
  retryDelay?: number;

  /**
   * Whether to automatically initialize the client
   * @default true
   */
  autoInit?: boolean;
}

const DEFAULT_OPTIONS: Required<UseMarketplaceClientOptions> = {
  retryAttempts: 3,
  retryDelay: 1000,
  autoInit: true,
};

let client: ClientSDK | undefined = undefined;

async function getMarketplaceClient() {
  if (client) {
    return client;
  }

  // Production mode - use real Marketplace SDK
  try {
      const config = {
    target: window.parent,
    modules: [XMC], // Add the XMC module for XM Cloud API access
  };

    client = await ClientSDK.init(config);
    return client;
  } catch (error) {
    console.error('Failed to initialize Marketplace SDK:', error);
    throw error;
  }
}

export function useMarketplaceClient(options: UseMarketplaceClientOptions = {}) {
  // Helper function to extract tenant name from URL
  const extractTenantName = (): string | null => {
    try {
      console.log('Current URL:', window.location.href);
      console.log('Search params:', window.location.search);
      console.log('URL pathname:', window.location.pathname);
      
      // First check query parameters
      const urlParams = new URLSearchParams(window.location.search);
      const tenantName = urlParams.get('tenantName');
      console.log('Tenant name from query params:', tenantName);
      
      if (tenantName) {
        console.log('Extracted tenant name from query params:', tenantName);
        return tenantName;
      }
      
      // Also check for organization ID as fallback in query params
      const orgId = urlParams.get('organization');
      console.log('Organization ID from query params:', orgId);
      
      if (orgId) {
        console.log('Using organization ID as fallback:', orgId);
        return orgId;
      }
      
      // Check URL path for tenant name patterns
      const pathname = window.location.pathname;
      console.log('Checking pathname for tenant patterns:', pathname);
      
      // Look for patterns like /XMC-Visualiser or /tenant-name
      const pathSegments = pathname.split('/').filter(segment => segment.length > 0);
      console.log('Path segments:', pathSegments);
      
             // Check if any path segment looks like a tenant name (more specific pattern)
       for (const segment of pathSegments) {
         // Look for patterns like: epam1-accelerator557f-contentmigrad22
         // Should contain multiple hyphens, alphanumeric, and be longer than 20 chars
         if (segment.includes('-') && segment.length > 20 && 
             segment.split('-').length >= 3 && 
             /^[a-zA-Z0-9-]+$/.test(segment)) {
           console.log('Found potential tenant name in path:', segment);
           return segment;
         }
       }
      
      // For development/testing, you can set a default tenant name here
      // Remove this in production or make it configurable
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        const defaultTenant = 'epam1-accelerator557f-contentmigrad22';
        console.log('Using default tenant name for development:', defaultTenant);
        return defaultTenant;
      }
      
      // In production, if no tenant name is found, this might indicate a configuration issue
      console.warn('No tenant name found in URL parameters or path. This app requires a tenant name to function properly.');
      
      console.log('No tenant name or organization ID found in URL or path');
      return null;
    } catch (error) {
      console.warn('Could not parse URL parameters:', error);
      return null;
    }
  };

  // Production mode - use real Marketplace SDK
  const opts = useMemo(() => ({ ...DEFAULT_OPTIONS, ...options }), [
    options,
  ]);

  const [state, setState] = useState<MarketplaceClientState>({
    client: null,
    error: null,
    isLoading: false,
    isInitialized: false,
  });

  // Use ref to track if we're currently initializing to prevent race conditions
  const isInitializingRef = useRef(false);

  const initializeClient = useCallback(async (attempt = 1): Promise<void> => {
    // Use functional state update to check current state without dependencies
    let shouldProceed = false;
    setState(prev => {
      if (prev.isLoading || prev.isInitialized || isInitializingRef.current) {
        return prev;
      }
      shouldProceed = true;
      isInitializingRef.current = true;
      return { ...prev, isLoading: true, error: null };
    });

    if (!shouldProceed) return;

    try {
      const client = await getMarketplaceClient();
      setState({
        client,
        error: null,
        isLoading: false,
        isInitialized: true,
      });
    } catch (error) {
      if (attempt < opts.retryAttempts) {
        await new Promise(resolve => setTimeout(resolve, opts.retryDelay));
        return initializeClient(attempt + 1);
      }

      setState({
        client: null,
        error: error instanceof Error ? error : new Error('Failed to initialize MarketplaceClient'),
        isLoading: false,
        isInitialized: false,
      });
    } finally {
      isInitializingRef.current = false;
    }
  }, [opts.retryAttempts, opts.retryDelay]);

  useEffect(() => {
    if (opts.autoInit) {
      initializeClient();
    }

    return () => {
      isInitializingRef.current = false;
      setState({
        client: null,
        error: null,
        isLoading: false,
        isInitialized: false,
      });
    };
  }, [opts.autoInit, initializeClient]);

  // Memoize the return value to prevent object recreation on every render
  return useMemo(() => ({
    ...state,
    initialize: initializeClient,
  }), [state, initializeClient]);
} 