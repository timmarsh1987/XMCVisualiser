'use client';

import React from 'react';
import { Select, VStack } from '@chakra-ui/react';
import { BlokText, BlokLayout } from './blok';
import { useTenantContext } from '../providers/TenantContext';
import { Tenant } from '../providers/TenantContext';

interface TenantSelectorProps {
  resourceAccess?: Array<{
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

export function TenantSelector({ resourceAccess }: TenantSelectorProps) {
  const { selectedTenant, setSelectedTenant } = useTenantContext();

  const handleTenantChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const tenantId = event.target.value;
    if (tenantId && resourceAccess) {
      const tenant = resourceAccess.find((t: any) => t.tenantId === tenantId);
      setSelectedTenant(tenant || null);
    } else {
      setSelectedTenant(null);
    }
  };

  return (
    <BlokLayout.Container>
      <VStack spacing={3} align="stretch">
        <BlokText.Strong>Select Tenant</BlokText.Strong>
        <Select
          value={selectedTenant?.tenantId || ''}
          onChange={handleTenantChange}
          placeholder="Please select a tenant to view its information"
          size="md"
          variant="outline"
          borderColor="gray.300"
          _hover={{ borderColor: 'brand.400' }}
          _focus={{ borderColor: 'brand.500', boxShadow: 'outline' }}
        >
          {resourceAccess?.map((tenant: any) => (
            <option key={tenant.tenantId} value={tenant.tenantId}>
              {tenant.tenantDisplayName}
            </option>
          ))}
        </Select>
      </VStack>
    </BlokLayout.Container>
  );
}
