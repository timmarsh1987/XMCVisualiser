'use client';

import React from 'react';
import { VStack, Text, Collapse, useDisclosure } from "@chakra-ui/react";
import { BlokAlert, BlokButton, BlokLayout } from "../blok";

interface ErrorDisplayProps {
  title: string;
  message: string;
  details?: string;
  showRetry?: boolean;
}

export function ErrorDisplay({
  title,
  message,
  details,
  showRetry = true,
}: ErrorDisplayProps) {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <BlokLayout.Container textAlign="center" py={8}>
      <VStack spacing={4}>
        <BlokAlert.Error
          title={title}
          description={message}
        />
        
        {details && (
          <VStack spacing={2}>
            <BlokButton.Ghost size="sm" onClick={onToggle}>
              {isOpen ? "Hide Details" : "Show Details"}
            </BlokButton.Ghost>
            
            <Collapse in={isOpen}>
              <Text
                p={3}
                bg="gray.50"
                borderRadius="md"
                fontSize="sm"
                fontFamily="mono"
                textAlign="left"
                maxW="600px"
                overflow="auto"
              >
                {details}
              </Text>
            </Collapse>
          </VStack>
        )}
      </VStack>
    </BlokLayout.Container>
  );
}