'use client';

import React from 'react';
import { Spinner, Text, VStack } from '@chakra-ui/react';
import { BlokLayout } from './blok';

interface LoadingSpinnerProps {
  message?: string;
}

export function LoadingSpinner({ message = "Loading..." }: LoadingSpinnerProps) {
  return (
    <BlokLayout.Container textAlign="center" py={8}>
      <VStack spacing={4}>
        <Spinner size="xl" color="brand.500" thickness="4px" />
        <Text color="gray.600">{message}</Text>
      </VStack>
    </BlokLayout.Container>
  );
}
