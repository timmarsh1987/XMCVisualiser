"use client";

import { useEffect, useState, useCallback } from "react";
import { ClientSDK } from "@sitecore-marketplace-sdk/client";
import {
  Box,
  VStack,
  HStack,
  Flex,
  useToast,
  Skeleton,
  Icon,
} from "@chakra-ui/react";
import { BlokText, BlokButton, BlokCard, BlokBadge, BlokLayout, BlokAlert } from "../blok";
// ItemDiffTool - main component for comparing authoring vs published layouts
import { usePageContext } from "../../utils/hooks/reference/usePageContext";
import { LayoutComparisonService } from "../../services/reference/LayoutComparisonService";
import { ComparisonResult } from "../../services/reference/types";
import { DiffViewer } from "./DiffViewer";
import { LoadingSpinner } from "./LoadingSpinner";
import { ErrorDisplay } from "./ErrorDisplay";
import { useTenantContext } from "../../providers/TenantContext";
import { mdiMagnify } from "@mdi/js";
import { mdiRefresh } from "@mdi/js";

interface ItemDiffToolProps {
  client: ClientSDK;
}

export function ItemDiffTool({ client }: ItemDiffToolProps) {
  const {
    pageContext,
    isLoading: isPageLoading,
    error: pageError,
  } = usePageContext(client);
  const { selectedTenant } = useTenantContext();
  const [comparisonService, setComparisonService] =
    useState<LayoutComparisonService | null>(null);
  const [comparisonResult, setComparisonResult] =
    useState<ComparisonResult | null>(null);
  const [isComparing, setIsComparing] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const toast = useToast();

  // Initialize the comparison service
  useEffect(() => {
    const initializeService = async () => {
      try {
        setIsInitializing(true);
        const service = new LayoutComparisonService(client);
        
        // Set tenant context IDs if available
        if (selectedTenant) {
          service.setTenantContextIds({
            preview: selectedTenant.context.preview,
            live: selectedTenant.context.live,
          });
        }
        
        await service.initialize();
        setComparisonService(service);
      } catch (error) {
        toast({
          title: "Initialization Failed",
          description:
            error instanceof Error
              ? error.message
              : "Failed to initialize services",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setIsInitializing(false);
      }
    };

    initializeService();
  }, [client, selectedTenant, toast]);

  // Reinitialize service when tenant changes
  useEffect(() => {
    if (comparisonService && selectedTenant) {
      comparisonService.setTenantContextIds({
        preview: selectedTenant.context.preview,
        live: selectedTenant.context.live,
      });
      
      // Reinitialize to use new context IDs
      comparisonService.initialize().catch(console.error);
    }
  }, [selectedTenant, comparisonService]);

  // Perform comparison when page context changes
  const performComparison = useCallback(async () => {
    if (!comparisonService || !pageContext?.itemId) {
      return;
    }

    // Check if tenant is selected
    if (!selectedTenant) {
      toast({
        title: "No Tenant Selected",
        description: "Please select a tenant before comparing layouts",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsComparing(true);
    setComparisonResult(null);

    try {
      const result = await comparisonService.compareLayouts(
        pageContext.siteName || "website",
        pageContext.routePath || "/",
        pageContext.language || "en"
      );

      setComparisonResult(result);

      // Show status toast
      const hasPreviewData = !result.preview.error;
      const hasPublishedData = !result.published.error;

      if (hasPreviewData && hasPublishedData) {
        toast({
          title: "Comparison Complete",
          description: `Successfully compared layouts for tenant: ${selectedTenant.tenantDisplayName}`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else if (hasPreviewData || hasPublishedData) {
        toast({
          title: "Partial Data Retrieved",
          description: "Only one version could be fetched",
          status: "warning",
          duration: 3000,
        });
      } else {
        toast({
          title: "No Data Retrieved",
          description: "Could not fetch either version",
          status: "error",
          duration: 4000,
        });
      }
    } catch (error) {
      toast({
        title: "Comparison Failed",
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
        status: "error",
        duration: 5000,
      });
    } finally {
      setIsComparing(false);
    }
  }, [comparisonService, pageContext, selectedTenant, toast]);

  // Auto-compare when page context changes (with safety checks)
  useEffect(() => {
    if (
      pageContext?.itemId &&
      comparisonService &&
      !isComparing &&
      !isInitializing
    ) {
      performComparison();
    }
  }, [pageContext?.itemId, !!comparisonService, isInitializing]);

  // Show loading state during initialization
  if (isInitializing) {
    return <LoadingSpinner message="Initializing Sitecore Item Diff Tool..." />;
  }

  // Show page context loading
  if (isPageLoading) {
    return <LoadingSpinner message="Loading page context..." />;
  }

  // Show page context error
  if (pageError) {
    return (
      <ErrorDisplay
        title="Page Context Error"
        message={pageError.message}
        details="Failed to load page context. Ensure you're in the Sitecore page builder."
      />
    );
  }

  // Show no tenant selected state
  if (!selectedTenant) {
    return (
      <BlokLayout.Container textAlign="center">
        <VStack spacing={4}>
          <BlokText.Large>No Tenant Selected</BlokText.Large>
          <BlokText.Subtle>
            Please select a tenant from the Tenant Management section above to compare layouts.
          </BlokText.Subtle>
        </VStack>
      </BlokLayout.Container>
    );
  }

  // Show no item selected state
  if (!pageContext?.itemId) {
    return (
      <BlokLayout.Container textAlign="center">
        <VStack spacing={4}>
          <BlokText.Large>No Item Selected</BlokText.Large>
          <BlokText.Subtle>
            Select an item in the page builder to compare its preview and
            published versions.
          </BlokText.Subtle>
        </VStack>
      </BlokLayout.Container>
    );
  }

  return (
    <BlokLayout.Container
      maxW="100%"
      h="100vh"
      overflow="auto"
      bg="gray.50"
      fontFamily="system-ui, -apple-system, sans-serif"
    >
      <VStack spacing={6} align="stretch" h="100%">
        {/* Header */}
        <BlokCard.Default>
          <BlokCard.Header pb={3}>
            <VStack spacing={4} align="stretch">
              <Flex justify="space-between" align="center">
                <VStack align="start" spacing={1}>
                  <BlokText.Subtle>
                    Compare layout differences between preview and published
                    versions
                  </BlokText.Subtle>
                  <HStack spacing={2} mt={1}>
                    <BlokText.Small>Tenant:</BlokText.Small>
                    <BlokBadge.Info>{selectedTenant.tenantDisplayName}</BlokBadge.Info>
                    <BlokText.Small>•</BlokText.Small>
                    <BlokText.Small>Resource: {selectedTenant.resourceId}</BlokText.Small>
                  </HStack>
                </VStack>

                <BlokButton.Primary
                  isLoading={isComparing}
                  loadingText="Comparing..."
                  onClick={performComparison}
                  leftIcon={
                    <Icon>
                      <path d={mdiRefresh} />
                    </Icon>
                  }
                >
                  Refresh
                </BlokButton.Primary>
              </Flex>

              {/* Item Info & Comparison Status */}
              {comparisonResult?.itemInfo && (
                <Box
                  p={4}
                  bg="gray.50"
                  borderRadius="md"
                  border="1px solid"
                  borderColor="gray.200"
                >
                  <VStack align="start" spacing={4}>
                    {/* Item Details */}
                    <HStack spacing={3}>
                      <BlokText.Strong>
                        {comparisonResult.itemInfo.displayName ||
                          comparisonResult.itemInfo.name}
                      </BlokText.Strong>
                      <BlokBadge.Info>
                        {pageContext.language?.toUpperCase() || "EN"}
                      </BlokBadge.Info>
                    </HStack>
                    <BlokText.Mono>
                      <strong>Path:</strong> {comparisonResult.itemInfo.path}
                    </BlokText.Mono>

                    {/* Comparison Status */}
                    <Box pt={2}>
                      <BlokText.Strong mb={3}>
                        Comparison Status
                      </BlokText.Strong>
                      <HStack spacing={6}>
                        <HStack spacing={3}>
                          <VStack align="start" spacing={0}>
                            <BlokText.Default>Preview Version</BlokText.Default>
                            <BlokBadge.Status
                              status={
                                comparisonResult.preview.error ? "error" : "success"
                              }
                            >
                              {comparisonResult.preview.error
                                ? "Failed"
                                : "Loaded"}
                            </BlokBadge.Status>
                          </VStack>
                        </HStack>
                        <HStack spacing={3}>
                          <VStack align="start" spacing={0}>
                            <BlokText.Default>Published Version</BlokText.Default>
                            <BlokBadge.Status
                              status={
                                comparisonResult.published.error
                                  ? "error"
                                  : "success"
                              }
                            >
                              {comparisonResult.published.error
                                ? "Failed"
                                : "Loaded"}
                            </BlokBadge.Status>
                          </VStack>
                        </HStack>
                      </HStack>
                    </Box>
                  </VStack>
                </Box>
              )}
            </VStack>
          </BlokCard.Header>
        </BlokCard.Default>

        {/* Loading State */}
        {isComparing && (
          <BlokCard.Default flex="1">
            <BlokCard.Body>
              <VStack spacing={4}>
                <Skeleton height="20px" />
                <Skeleton height="16px" />
                <Skeleton height="16px" />
                <Skeleton height="16px" />
                <Skeleton height="16px" />
                <Skeleton height="16px" />
                <Skeleton height="16px" />
                <Skeleton height="16px" />
                <Skeleton height="16px" />
              </VStack>
            </BlokCard.Body>
          </BlokCard.Default>
        )}

        {/* Diff Viewer */}
        {!isComparing && comparisonResult && (
          <BlokCard.Elevated h="auto">
            <BlokCard.Header
              pb={3}
              bg="gray.50"
              borderBottomWidth="1px"
              borderColor="gray.200"
            >
              <VStack spacing={3} align="stretch">
                <HStack spacing={4} justify="space-between">
                  <VStack align="start" spacing={0}>
                    <BlokText.Strong>
                      <Icon>
                        <path d={mdiMagnify} />
                      </Icon>
                      Layout Differences
                    </BlokText.Strong>
                    <BlokText.Small>Side-by-side comparison view</BlokText.Small>
                  </VStack>
                </HStack>
              </VStack>
            </BlokCard.Header>
            <BlokCard.Body pt={0} pb={4}>
              {comparisonResult.preview.rendered &&
              comparisonResult.published.rendered ? (
                <DiffViewer
                  previewJson={comparisonResult.preview.rendered}
                  publishedJson={comparisonResult.published.rendered}
                  height="auto"
                />
              ) : (
                <VStack spacing={4} py={8}>
                  {comparisonResult.preview.error && (
                    <ErrorDisplay
                      title="Preview Error"
                      message={comparisonResult.preview.error}
                      showRetry={false}
                    />
                  )}
                  {comparisonResult.published.error && (
                    <ErrorDisplay
                      title="Published Error"
                      message={comparisonResult.published.error}
                      showRetry={false}
                    />
                  )}
                </VStack>
              )}
            </BlokCard.Body>
          </BlokCard.Elevated>
        )}
      </VStack>
    </BlokLayout.Container>
  );
}
