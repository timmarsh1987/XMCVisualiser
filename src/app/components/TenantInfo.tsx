'use client';

import React from 'react';
import { VStack, HStack, Badge, Box } from '@chakra-ui/react';
import { BlokText, BlokCard, BlokBadge, BlokLayout } from './blok';
import { useTenantContext } from '../providers/TenantContext';

export function TenantInfo() {
  const { selectedTenant } = useTenantContext();

  if (!selectedTenant) {
    return (
      <BlokLayout.Container textAlign="center">
        <BlokText.Subtle>Please select a tenant to view its information.</BlokText.Subtle>
      </BlokLayout.Container>
    );
  }

  return (
    <BlokLayout.Container>
      <BlokCard.Default>
        <BlokCard.Header>
          <VStack spacing={4} align="stretch">
            <BlokText.Large>{selectedTenant.tenantDisplayName}</BlokText.Large>
            <HStack spacing={3}>
              <BlokBadge.Info>{selectedTenant.resourceId}</BlokBadge.Info>
              <BlokBadge.Status status="success">Active</BlokBadge.Status>
            </HStack>
          </VStack>
        </BlokCard.Header>
        <BlokCard.Body>
          <VStack spacing={4} align="stretch">
            <Box>
              <BlokText.Strong>Tenant ID:</BlokText.Strong>
              <BlokText.Mono>{selectedTenant.tenantId}</BlokText.Mono>
            </Box>
            
            <Box>
              <BlokText.Strong>Resource ID:</BlokText.Strong>
              <BlokText.Default>{selectedTenant.resourceId}</BlokText.Default>
            </Box>

            <Box>
              <BlokText.Strong>Context IDs:</BlokText.Strong>
              <VStack spacing={2} mt={2} align="start">
                <HStack spacing={3}>
                  <BlokText.Small>Preview:</BlokText.Small>
                  <BlokText.Mono>{selectedTenant.context.preview}</BlokText.Mono>
                </HStack>
                <HStack spacing={3}>
                  <BlokText.Small>Live:</BlokText.Small>
                  <BlokText.Mono>{selectedTenant.context.live}</BlokText.Mono>
                </HStack>
              </VStack>
            </Box>

            {selectedTenant.tenantName && (
              <Box>
                <BlokText.Strong>Tenant Name:</BlokText.Strong>
                <BlokText.Default>{selectedTenant.tenantName}</BlokText.Default>
              </Box>
            )}
          </VStack>
        </BlokCard.Body>
      </BlokCard.Default>
    </BlokLayout.Container>
  );
}
