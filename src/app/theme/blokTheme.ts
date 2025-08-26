import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

// Blok-inspired color palette
const colors = {
  brand: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
  },
  gray: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },
};

// Blok typography scale
const typography = {
  fonts: {
    heading: 'Inter, system-ui, -apple-system, sans-serif',
    body: 'Inter, system-ui, -apple-system, sans-serif',
    mono: 'JetBrains Mono, Consolas, monospace',
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
  },
  fontWeights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeights: {
    normal: 'normal',
    none: 1,
    shorter: 1.25,
    short: 1.375,
    base: 1.5,
    tall: 1.625,
    taller: '2',
  },
};

// Blok component styles
const components = {
  Button: {
    baseStyle: {
      fontWeight: 'medium',
      borderRadius: 'md',
      _focus: {
        boxShadow: 'outline',
      },
    },
    variants: {
      solid: {
        bg: 'brand.500',
        color: 'white',
        _hover: {
          bg: 'brand.600',
        },
        _active: {
          bg: 'brand.700',
        },
      },
      outline: {
        border: '1px solid',
        borderColor: 'brand.500',
        color: 'brand.500',
        _hover: {
          bg: 'brand.50',
        },
      },
      ghost: {
        color: 'gray.600',
        _hover: {
          bg: 'gray.100',
        },
      },
    },
    sizes: {
      sm: {
        fontSize: 'sm',
        px: 3,
        py: 2,
      },
      md: {
        fontSize: 'md',
        px: 4,
        py: 2,
      },
      lg: {
        fontSize: 'lg',
        px: 6,
        py: 3,
      },
    },
  },
  Card: {
    baseStyle: {
      container: {
        bg: 'white',
        borderRadius: 'lg',
        boxShadow: 'sm',
        border: '1px solid',
        borderColor: 'gray.200',
      },
      header: {
        py: 4,
        px: 6,
        borderBottom: '1px solid',
        borderColor: 'gray.200',
      },
      body: {
        py: 4,
        px: 6,
      },
    },
  },
  Badge: {
    baseStyle: {
      fontWeight: 'medium',
      borderRadius: 'full',
      textTransform: 'none',
    },
    variants: {
      subtle: {
        bg: 'gray.100',
        color: 'gray.700',
      },
    },
  },
  Alert: {
    baseStyle: {
      container: {
        borderRadius: 'md',
        border: '1px solid',
      },
    },
    variants: {
      'left-accent': {
        container: {
          borderLeft: '4px solid',
          borderLeftColor: 'current',
        },
      },
    },
  },
  Progress: {
    baseStyle: {
      track: {
        borderRadius: 'full',
      },
      filledTrack: {
        borderRadius: 'full',
      },
    },
  },
  Spinner: {
    baseStyle: {
      borderWidth: '2px',
    },
  },
};

// Blok spacing and sizing
const spacing = {
  space: {
    px: '1px',
    0.5: '0.125rem',
    1: '0.25rem',
    1.5: '0.375rem',
    2: '0.5rem',
    2.5: '0.625rem',
    3: '0.75rem',
    3.5: '0.875rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    7: '1.75rem',
    8: '2rem',
    9: '2.25rem',
    10: '2.5rem',
    12: '3rem',
    14: '3.5rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    28: '7rem',
    32: '8rem',
    36: '9rem',
    40: '10rem',
    44: '11rem',
    48: '12rem',
    52: '13rem',
    56: '14rem',
    60: '15rem',
    64: '16rem',
    72: '18rem',
    80: '20rem',
    96: '24rem',
  },
};

// Blok shadows
const shadows = {
  shadows: {
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    outline: '0 0 0 3px rgba(66, 153, 225, 0.6)',
  },
};

// Blok breakpoints
const breakpoints = {
  breakpoints: {
    sm: '30em',
    md: '48em',
    lg: '62em',
    xl: '80em',
    '2xl': '96em',
  },
};

// Blok toast options
export const toastOptions = {
  defaultOptions: {
    position: 'top-right' as const,
    duration: 5000,
    isClosable: true,
    variant: 'solid' as const,
  },
};

const theme = extendTheme({
  config,
  colors,
  ...typography,
  components,
  ...spacing,
  ...shadows,
  ...breakpoints,
});

export default theme;
