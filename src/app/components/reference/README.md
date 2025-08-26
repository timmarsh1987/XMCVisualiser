# Reference Components

This folder contains reference implementations and examples that are not part of the main XMC Visualiser application.

## Components

- **ItemDiffTool.tsx** - Example layout comparison tool (not used in main app)
- **DiffViewer.tsx** - CodeMirror-based diff viewer component
- **ErrorDisplay.tsx** - Error display component
- **LoadingSpinner.tsx** - Loading spinner component

## Services

- **LayoutComparisonService.ts** - Service for comparing preview vs published layouts
- **PreviewService.ts** - Service for fetching preview data
- **ExperienceEdgeService.ts** - Service for fetching live/published data
- **types.ts** - TypeScript interfaces for API responses

## Hooks

- **usePageContext.ts** - Hook for getting page context from Sitecore

## Purpose

These components serve as:
- **Reference implementations** for similar functionality
- **Examples** of how to integrate with Sitecore APIs
- **Templates** for future development
- **Documentation** of API patterns

## Note

These are **NOT** imported or used in the main XMC Visualiser application. They are kept for reference only.
