'use client';

import { ChakraProvider } from '@chakra-ui/react';
import blokTheme, { toastOptions } from './theme/blokTheme';
import { MarketplaceClientProvider } from './providers/MarketplaceClientProvider';
import { TenantProvider } from './providers/TenantContext';
import { useMarketplaceClientContext } from './providers/MarketplaceClientProvider';

// Simple wrapper - TenantProvider will be used at component level like in the working example
function TenantProviderWrapper({ children }: { children: React.ReactNode }) {
  console.log('🚀 TenantProviderWrapper - TenantProvider will be used at component level');
  return <>{children}</>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={blokTheme} toastOptions={toastOptions}>
      <MarketplaceClientProvider>
        <TenantProviderWrapper>
          {children}
        </TenantProviderWrapper>
      </MarketplaceClientProvider>
    </ChakraProvider>
  );
}