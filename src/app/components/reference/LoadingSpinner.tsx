'use client';

import React from 'react';
import { Box, VStack } from "@chakra-ui/react";
import { BlokLoading, BlokText } from "../blok";

interface LoadingSpinnerProps {
  message?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  showProgress?: boolean;
  progressValue?: number;
}

export function LoadingSpinner({ 
  message = "Loading...", 
  size = "lg",
  showProgress = false,
  progressValue
}: LoadingSpinnerProps) {
  if (showProgress && progressValue !== undefined) {
    return (
      <BlokLoading.Progress 
        value={progressValue} 
        message={`${Math.round(progressValue)}%`}
      />
    );
  }

  return (
    <BlokLoading.Spinner 
      message={message} 
      size={size}
    />
  );
}