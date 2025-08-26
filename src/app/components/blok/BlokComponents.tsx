import React from 'react';
import {
  Box,
  Button,
  Card,
  CardHeader,
  CardBody,
  Text,
  Badge,
  VStack,
  HStack,
  Spinner,
  Progress,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  IconButton,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react';
import { Icon } from '@chakra-ui/react';

// Blok Text variants
export const BlokText = {
  Large: ({ children, ...props }: { children: React.ReactNode; [key: string]: any }) => (
    <Text fontSize="xl" fontWeight="semibold" color="gray.800" {...props}>
      {children}
    </Text>
  ),
  Strong: ({ children, ...props }: { children: React.ReactNode; [key: string]: any }) => (
    <Text fontSize="md" fontWeight="semibold" color="gray.800" {...props}>
      {children}
    </Text>
  ),
  Default: ({ children, ...props }: { children: React.ReactNode; [key: string]: any }) => (
    <Text fontSize="md" color="gray.700" {...props}>
      {children}
    </Text>
  ),
  Small: ({ children, ...props }: { children: React.ReactNode; [key: string]: any }) => (
    <Text fontSize="sm" color="gray.600" {...props}>
      {children}
    </Text>
  ),
  Subtle: ({ children, ...props }: { children: React.ReactNode; [key: string]: any }) => (
    <Text fontSize="sm" color="gray.500" {...props}>
      {children}
    </Text>
  ),
  Mono: ({ children, ...props }: { children: React.ReactNode; [key: string]: any }) => (
    <Text fontSize="sm" fontFamily="mono" color="gray.600" {...props}>
      {children}
    </Text>
  ),
};

// Blok Button variants
export const BlokButton = {
  Primary: ({ children, ...props }: { children: React.ReactNode; [key: string]: any }) => (
    <Button
      colorScheme="brand"
      size="md"
      fontWeight="medium"
      borderRadius="md"
      _hover={{ transform: 'translateY(-1px)', boxShadow: 'md' }}
      _active={{ transform: 'translateY(0)' }}
      transition="all 0.2s"
      {...props}
    >
      {children}
    </Button>
  ),
  Secondary: ({ children, ...props }: { children: React.ReactNode; [key: string]: any }) => (
    <Button
      variant="outline"
      colorScheme="brand"
      size="md"
      fontWeight="medium"
      borderRadius="md"
      _hover={{ bg: 'brand.50', transform: 'translateY(-1px)' }}
      _active={{ transform: 'translateY(0)' }}
      transition="all 0.2s"
      {...props}
    >
      {children}
    </Button>
  ),
  Ghost: ({ children, ...props }: { children: React.ReactNode; [key: string]: any }) => (
    <Button
      variant="ghost"
      size="md"
      fontWeight="medium"
      color="gray.600"
      _hover={{ bg: 'gray.100' }}
      {...props}
    >
      {children}
    </Button>
  ),
  Icon: ({ icon, label, ...props }: { icon: string; label: string; [key: string]: any }) => (
    <IconButton
      aria-label={label}
      icon={<Icon><path d={icon} /></Icon>}
      variant="ghost"
      size="md"
      color="gray.600"
      _hover={{ bg: 'gray.100' }}
      {...props}
    />
  ),
};

// Blok Card variants
export const BlokCard = {
  Default: ({ children, ...props }: { children: React.ReactNode; [key: string]: any }) => (
    <Card
      shadow="sm"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="lg"
      overflow="hidden"
      _hover={{ shadow: 'md' }}
      transition="all 0.2s"
      {...props}
    >
      {children}
    </Card>
  ),
  Elevated: ({ children, ...props }: { children: React.ReactNode; [key: string]: any }) => (
    <Card
      shadow="md"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="lg"
      overflow="hidden"
      _hover={{ shadow: 'lg' }}
      transition="all 0.2s"
      {...props}
    >
      {children}
    </Card>
  ),
  Header: ({ children, ...props }: { children: React.ReactNode; [key: string]: any }) => (
    <CardHeader
      py={4}
      px={6}
      bg="gray.50"
      borderBottom="1px solid"
      borderColor="gray.200"
      {...props}
    >
      {children}
    </CardHeader>
  ),
  Body: ({ children, ...props }: { children: React.ReactNode; [key: string]: any }) => (
    <CardBody py={4} px={6} {...props}>
      {children}
    </CardBody>
  ),
};

// Blok Badge variants
export const BlokBadge = {
  Status: ({ 
    status, 
    children, 
    ...props 
  }: { 
    status: 'success' | 'warning' | 'error' | 'info'; 
    children: React.ReactNode; 
    [key: string]: any 
  }) => {
    const colorScheme = {
      success: 'success',
      warning: 'warning',
      error: 'error',
      info: 'brand',
    }[status];

    return (
      <Badge
        colorScheme={colorScheme}
        variant="subtle"
        size="sm"
        fontWeight="medium"
        borderRadius="full"
        px={3}
        py={1}
        {...props}
      >
        {children}
      </Badge>
    );
  },
  Info: ({ children, ...props }: { children: React.ReactNode; [key: string]: any }) => (
    <Badge
      colorScheme="brand"
      variant="subtle"
      size="sm"
      fontWeight="medium"
      borderRadius="full"
      px={3}
      py={1}
      {...props}
    >
      {children}
    </Badge>
  ),
};

// Blok Loading components
export const BlokLoading = {
  Spinner: ({ 
    message = "Loading...", 
    size = "lg",
    ...props 
  }: { 
    message?: string; 
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    [key: string]: any 
  }) => (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="200px"
      p={6}
      {...props}
    >
      <VStack spacing={4} w="full" maxW="400px">
        <Spinner
          thickness="3px"
          speed="0.65s"
          emptyColor="gray.200"
          color="brand.500"
          size={size}
        />
        <BlokText.Small textAlign="center">
          {message}
        </BlokText.Small>
      </VStack>
    </Box>
  ),
  Progress: ({ 
    value, 
    message, 
    ...props 
  }: { 
    value: number; 
    message?: string;
    [key: string]: any 
  }) => (
    <Box p={6} {...props}>
      <VStack spacing={4} w="full" maxW="400px">
        <Progress 
          value={value} 
          size="md" 
          colorScheme="brand" 
          w="full"
          hasStripe
          isAnimated
          borderRadius="full"
        />
        {message && (
          <BlokText.Small color="brand.600">
            {message}
          </BlokText.Small>
        )}
      </VStack>
    </Box>
  ),
};

// Blok Alert variants
export const BlokAlert = {
  Success: ({ 
    title, 
    description, 
    ...props 
  }: { 
    title: string; 
    description: string; 
    [key: string]: any 
  }) => (
    <Alert
      status="success"
      variant="left-accent"
      borderRadius="md"
      border="1px solid"
      borderColor="success.200"
      bg="success.50"
      {...props}
    >
      <AlertIcon color="success.500" />
      <Box flex="1">
        <AlertTitle color="success.800">
          <BlokText.Strong>{title}</BlokText.Strong>
        </AlertTitle>
        <AlertDescription display="block" mt={2} color="success.700">
          <BlokText.Default>{description}</BlokText.Default>
        </AlertDescription>
      </Box>
    </Alert>
  ),
  Warning: ({ 
    title, 
    description, 
    ...props 
  }: { 
    title: string; 
    description: string; 
    [key: string]: any 
  }) => (
    <Alert
      status="warning"
      variant="left-accent"
      borderRadius="md"
      border="1px solid"
      borderColor="warning.200"
      bg="warning.50"
      {...props}
    >
      <AlertIcon color="warning.500" />
      <Box flex="1">
        <AlertTitle color="warning.800">
          <BlokText.Strong>{title}</BlokText.Strong>
        </AlertTitle>
        <AlertDescription display="block" mt={2} color="warning.700">
          <BlokText.Default>{description}</BlokText.Default>
        </AlertDescription>
      </Box>
    </Alert>
  ),
  Error: ({ 
    title, 
    description, 
    ...props 
  }: { 
    title: string; 
    description: string; 
    [key: string]: any 
  }) => (
    <Alert
      status="error"
      variant="left-accent"
      borderRadius="md"
      border="1px solid"
      borderColor="error.200"
      bg="error.50"
      {...props}
    >
      <AlertIcon color="error.500" />
      <Box flex="1">
        <AlertTitle color="error.800">
          <BlokText.Strong>{title}</BlokText.Strong>
        </AlertTitle>
        <AlertDescription display="block" mt={2} color="error.700">
          <BlokText.Default>{description}</BlokText.Default>
        </AlertDescription>
      </Box>
    </Alert>
  ),
  Info: ({ 
    title, 
    description, 
    ...props 
  }: { 
    title: string; 
    description: string; 
    [key: string]: any 
  }) => (
    <Alert
      status="info"
      variant="left-accent"
      borderRadius="md"
      border="1px solid"
      borderColor="brand.200"
      bg="brand.50"
      {...props}
    >
      <AlertIcon color="brand.500" />
      <Box flex="1">
        <AlertTitle color="brand.800">
          <BlokText.Strong>{title}</BlokText.Strong>
        </AlertTitle>
        <AlertDescription display="block" mt={2} color="brand.700">
          <BlokText.Default>{description}</BlokText.Default>
        </AlertDescription>
      </Box>
    </Alert>
  ),
};

// Blok Layout components
export const BlokLayout = {
  Container: ({ children, ...props }: { children: React.ReactNode; [key: string]: any }) => (
    <Box
      maxW="100%"
      mx="auto"
      px={6}
      py={6}
      {...props}
    >
      {children}
    </Box>
  ),
  Section: ({ children, ...props }: { children: React.ReactNode; [key: string]: any }) => (
    <Box
      mb={8}
      {...props}
    >
      {children}
    </Box>
  ),
  Grid: ({ 
    children, 
    columns = 1, 
    gap = 6, 
    ...props 
  }: { 
    children: React.ReactNode; 
    columns?: number;
    gap?: number;
    [key: string]: any 
  }) => (
    <Box
      display="grid"
      gridTemplateColumns={`repeat(${columns}, 1fr)`}
      gap={gap}
      {...props}
    >
      {children}
    </Box>
  ),
};
