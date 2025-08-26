'use client';

import { Box } from "@chakra-ui/react";
import { useMarketplaceClientContext } from "../providers/MarketplaceClientProvider";
import { LoadingSpinner } from "./LoadingSpinner";
import { ErrorDisplay } from "./ErrorDisplay";
import { TenantManagement } from "./TenantManagement";
import { BlokLayout, BlokText, BlokCard, BlokAlert } from "./blok";

export function MarketplaceApp() {
  return <MarketplaceAppContent />;
}

function MarketplaceAppContent() {
  const { client, appContextError, isInitialized, appContextLoading } = useMarketplaceClientContext();

  if (appContextLoading) {
    return <LoadingSpinner message="Initializing Sitecore Marketplace client..." />;
  }

  if (appContextError) {
    return (
      <ErrorDisplay
        title="Marketplace Connection Error"
        message={appContextError}
        details="Failed to initialize the Sitecore Marketplace SDK. Please ensure you're running within the Sitecore environment."
      />
    );
  }

  if (!isInitialized || !client) {
    return <LoadingSpinner message="Connecting to Sitecore..." />;
  }

  return (
    <BlokLayout.Container bg="gray.50" minH="100vh">
      <BlokCard.Default mb={6}>
        <BlokCard.Header>
          <BlokText.Large>Sitecore XMC Visualiser</BlokText.Large>
          <BlokText.Subtle>Visualize and analyze Sitecore XM Cloud content and layouts</BlokText.Subtle>
          {window.location.hostname === 'localhost' && (
            <BlokAlert.Info
              title="Development Mode"
              description="Running with mock data for local development. Deploy to XM Cloud or Vercel for live tenant data."
            />
          )}
        </BlokCard.Header>
      </BlokCard.Default>

      <TenantManagement />
      
      <BlokCard.Default mt={6}>
        <BlokCard.Header>
          <BlokText.Large>XMC Visualiser</BlokText.Large>
          <BlokText.Subtle>
            Select a tenant from the Tenant Management section above to enable visualization
          </BlokText.Subtle>
        </BlokCard.Header>
        <BlokCard.Body>
          <BlokLayout.Container textAlign="center" py={8}>
            <BlokText.Large>🎨 XMC Visualiser Coming Soon</BlokText.Large>
            <BlokText.Subtle mt={4}>
              The XMC Visualiser will provide powerful visualization tools for Sitecore XM Cloud content.
            </BlokText.Subtle>
            <BlokText.Small mt={2} color="gray.500">
              Use the tenant selector above to choose which tenant to visualize
            </BlokText.Small>
          </BlokLayout.Container>
        </BlokCard.Body>
      </BlokCard.Default>
    </BlokLayout.Container>
  );
}