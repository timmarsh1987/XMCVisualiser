'use client';

import React from 'react';
import { VStack, HStack, Box } from '@chakra-ui/react';
import { BlokText, BlokLayout, BlokCard, BlokAlert } from './blok';
import { TenantSelector } from './TenantSelector';
import { TenantInfo } from './TenantInfo';
import { useMarketplaceClientContext } from '../providers/MarketplaceClientProvider';
import { TenantProvider } from '../providers/TenantContext';

export function TenantManagement() {
  const { appContext, appContextLoading, appContextError } = useMarketplaceClientContext();

  if (appContextLoading) {
    return (
      <BlokLayout.Container textAlign="center">
        <BlokText.Subtle>Loading tenant information...</BlokText.Subtle>
      </BlokLayout.Container>
    );
  }

  if (appContextError) {
    return (
      <BlokLayout.Container textAlign="center">
        <BlokText.Subtle>Error loading tenant information: {appContextError}</BlokText.Subtle>
      </BlokLayout.Container>
    );
  }

  if (!appContext) {
    return (
      <BlokLayout.Container textAlign="center">
        <BlokText.Subtle>No application context available.</BlokText.Subtle>
      </BlokLayout.Container>
    );
  }

  return (
    <BlokLayout.Container>
      <VStack spacing={8} align="stretch">
        {/* Tenant System Status */}
        {(!appContext?.resourceAccess || appContext.resourceAccess.length === 0) && (
          <BlokAlert.Info
            title="Tenant System Status"
            description="The tenant management system is initializing. Once the Sitecore Marketplace client connects, you'll be able to select from available tenants."
          />
        )}
        
        {/* Application Overview */}
        <BlokCard.Default>
          <BlokCard.Header>
            <VStack spacing={4} align="stretch">
              <BlokText.Large>Application Overview</BlokText.Large>
              <HStack spacing={4} align="start">
                <Box>
                  <BlokText.Strong>Name:</BlokText.Strong>
                  <BlokText.Default>{appContext.name}</BlokText.Default>
                </Box>
                <Box>
                  <BlokText.Strong>Type:</BlokText.Strong>
                  <BlokText.Default>{appContext.type}</BlokText.Default>
                </Box>
                <Box>
                  <BlokText.Strong>State:</BlokText.Strong>
                  <BlokText.Default>{appContext.state}</BlokText.Default>
                </Box>
              </HStack>
            </VStack>
          </BlokCard.Header>
        </BlokCard.Default>

        {/* Tenant Selection */}
        <TenantProvider>
          <BlokCard.Default>
            <BlokCard.Header>
              <BlokText.Large>Tenant Management</BlokText.Large>
            </BlokCard.Header>
            <BlokCard.Body>
              <VStack spacing={4}>
                <TenantSelector resourceAccess={appContext?.resourceAccess} />
                <TenantInfo />
              </VStack>
            </BlokCard.Body>
          </BlokCard.Default>
        </TenantProvider>

        {/* Current Tenant Status */}
        <BlokCard.Default>
          <BlokCard.Header>
            <BlokText.Large>Current Tenant Status</BlokText.Large>
          </BlokCard.Header>
          <BlokCard.Body>
            {appContext?.resourceAccess && appContext.resourceAccess.length > 0 ? (
              <VStack align="start" spacing={2}>
                <HStack spacing={2}>
                  <BlokText.Strong>Available Tenants:</BlokText.Strong>
                  <BlokText.Default>{appContext.resourceAccess.length}</BlokText.Default>
                </HStack>
                <BlokText.Subtle>
                  Use the tenant selector below to choose a tenant and view its details.
                </BlokText.Subtle>
              </VStack>
            ) : (
              <BlokAlert.Warning
                title="No Tenants Available"
                description="No tenants are currently available in your application context. This may indicate a configuration issue or that the marketplace client hasn't fully initialized."
              />
            )}
          </BlokCard.Body>
        </BlokCard.Default>



        {/* Available Tenants Summary */}
        <BlokCard.Default>
          <BlokCard.Header>
            <BlokText.Large>Available Tenants ({appContext.resourceAccess.length})</BlokText.Large>
          </BlokCard.Header>
          <BlokCard.Body>
            <VStack spacing={3} align="stretch">
              {appContext.resourceAccess.map((tenant, index) => (
                <Box
                  key={tenant.tenantId}
                  p={3}
                  border="1px solid"
                  borderColor="gray.200"
                  borderRadius="md"
                  bg="gray.50"
                >
                  <HStack justify="space-between" align="start">
                    <VStack align="start" spacing={1}>
                      <BlokText.Strong>{tenant.tenantDisplayName}</BlokText.Strong>
                      <BlokText.Small>ID: {tenant.tenantId}</BlokText.Small>
                      <BlokText.Small>Resource: {tenant.resourceId}</BlokText.Small>
                    </VStack>
                    <VStack align="end" spacing={1}>
                      <BlokText.Small>Preview: {tenant.context.preview.substring(0, 8)}...</BlokText.Small>
                      <BlokText.Small>Live: {tenant.context.live.substring(0, 8)}...</BlokText.Small>
                    </VStack>
                  </HStack>
                </Box>
              ))}
            </VStack>
          </BlokCard.Body>
        </BlokCard.Default>
      </VStack>
    </BlokLayout.Container>
  );
}
