'use client';

import React from 'react';
import { VStack, Text } from '@chakra-ui/react';
import { BlokLayout, BlokAlert } from './blok';

interface ErrorDisplayProps {
  title: string;
  message: string;
  details?: string;
  showRetry?: boolean;
}

export function ErrorDisplay({ title, message, details, showRetry = true }: ErrorDisplayProps) {
  return (
    <BlokLayout.Container textAlign="center" py={8}>
      <VStack spacing={4}>
        <BlokAlert.Error
          title={title}
          description={message}
        />
        {details && (
          <Text fontSize="sm" color="gray.500" maxW="600px">
            {details}
          </Text>
        )}
      </VStack>
    </BlokLayout.Container>
  );
}
