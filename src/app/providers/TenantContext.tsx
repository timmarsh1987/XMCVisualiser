'use client';

import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';

// Tenant interface based on your application context structure
export interface Tenant {
  resourceId: string;
  tenantId: string;
  tenantName: string | null;
  tenantDisplayName: string;
  context: {
    preview: string;
    live: string;
  };
}

interface TenantContextValue {
  selectedTenant: Tenant | null;
  setSelectedTenant: (tenant: Tenant | null) => void;
  availableTenants: Tenant[];
  hasTenants: boolean;
}

const TenantContext = createContext<TenantContextValue | undefined>(undefined);

interface TenantProviderProps {
  children: ReactNode;
}

export function TenantProvider({ children }: TenantProviderProps) {
  console.log('🏢 TenantProvider initialized without tenants prop');
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);

  const contextValue = useMemo(() => ({
    selectedTenant,
    setSelectedTenant,
    availableTenants: [],
    hasTenants: false,
  }), [selectedTenant]);

  return (
    <TenantContext.Provider value={contextValue}>
      {children}
    </TenantContext.Provider>
  );
}

export function useTenantContext() {
  const context = useContext(TenantContext);
  if (context === undefined) {
    console.error('❌ useTenantContext called outside of TenantProvider');
    throw new Error('useTenantContext must be used within a TenantProvider');
  }
  console.log('🔍 useTenantContext called, hasTenants:', context.hasTenants, 'selectedTenant:', context.selectedTenant?.tenantDisplayName || 'None');
  return context;
}
