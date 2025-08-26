// Common types for API responses and data structures

export interface GraphQLResponse<T = any> {
  data?: T;
  errors?: Array<{
    message: string;
    locations?: Array<{ line: number; column: number }>;
    path?: string[];
  }>;
}

export interface LayoutResponse {
  layout?: {
    item?: {
      rendered?: string;
      name?: string;
      displayName?: string;
      path?: string;
      url?: {
        path?: string;
      };
    };
  };
}

export interface ItemResponse {
  item?: {
    id?: string;
    name?: string;
    path?: string;
    displayName?: string;
    url?: {
      path?: string;
    };
  };
}

export interface SchemaResponse {
  __schema?: {
    queryType?: {
      name?: string;
    };
  };
}

export interface ApplicationContext {
  id: string;
  name: string;
  resourceAccess: Array<{
    resourceId: string;
    tenantId: string;
    tenantName: string;
    context: {
      live: string;
      preview: string;
    };
  }>;
}

export interface LayoutData {
  rendered?: string;
  error?: string;
}

export interface ComparisonResult {
  preview: LayoutData;
  published: LayoutData;
  itemInfo?: {
    name: string;
    displayName?: string;
    path: string;
  };
}
