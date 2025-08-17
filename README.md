# XM Cloud Visualizer

A React-based visualization tool for Sitecore XM Cloud that helps you explore and understand your site structure, pages, and component usage.

## Features

- **Site Management**: View and select different XM Cloud sites
- **Page Visualization**: Browse pages with their layout structures
- **Component Analysis**: See how components are used across pages
- **Search & Filtering**: Find specific pages or components
- **Real-time Data**: Connect to live XM Cloud APIs
- **Responsive Design**: Works on different screen sizes

## Prerequisites

- Node.js 16+ and npm
- Access to a Sitecore XM Cloud instance
- XM Cloud app credentials (Client ID and Client Secret)

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd XMCVisualiser
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## XM Cloud Configuration

### 1. App Setup in XM Cloud Portal

1. Go to the [XM Cloud Portal](https://portal.sitecorecloud.io/)
2. Navigate to **Developer Studio** → **Apps**
3. Create a new custom app or use your existing app
4. Configure the following:

   **App Details:**
   - Name: `TM-XMCVisualiser` (or your preferred name)
   - Description: `XM Cloud site structure and component visualizer`

   **Deployment Configuration:**
   - Deployment URL: `https://your-deployment-domain.com`
   - App Logo URL: `https://your-deployment-domain.com/logo.svg` (optional)

   **Organization Access:**
   - Organizations: `org_gMVeHVmWxDrxHj3z`

   **API Access:**
   - Enable the necessary API permissions for reading site data
   - Ensure GraphQL access is enabled

### 2. Marketplace SDK Integration

This app now uses the official **Sitecore Marketplace SDK** (`@sitecore-marketplace-sdk/client`) for authentication and data access. The SDK automatically handles:

- OAuth 2.0 authentication with XM Cloud
- Secure token management
- API endpoint configuration
- CORS handling

**No environment variables or manual credential configuration is required!**

### 3. Runtime Configuration

The only configuration needed at runtime is:

1. Open the app in your browser
2. Click the configuration button (⚙️) in the top-right corner
3. Enter your **Site Name**: The name of your site in XM Cloud
4. The Marketplace SDK handles all authentication automatically

## Usage

1. **Configure Site Name**: Enter your XM Cloud site name in the configuration panel
2. **Wait for SDK**: The Marketplace SDK automatically initializes and authenticates
3. **Load Data**: Click "Load Data" to fetch live data from your XM Cloud instance
4. **Explore Sites**: Select different sites from the dropdown
5. **View Pages**: Browse pages and see their layout structures
6. **Analyze Components**: Switch to the Components view to see usage statistics
7. **Search**: Use the search bar to find specific pages or components

## Development

**Important Note:** This app is designed to work only in production with the Sitecore XM Cloud Portal. It will not function properly in development mode as it requires the Marketplace SDK context and real XM Cloud data.

### Available Scripts

- `npm run dev` - Start development server (for testing UI only)
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run watch` - Build in watch mode

### Project Structure

```
src/
├── components/
│   └── CHVisualiser/
│       ├── XMCViewer.tsx      # Main component
│       ├── index.tsx          # Entry point
│       └── index.css          # Styles
├── main.tsx                   # App entry point
└── ...
```

### Key Components

- **XMCloudService**: Handles API communication with XM Cloud
- **XMCViewer**: Main visualization component
- **PageCard**: Displays individual page information
- **ComponentCard**: Shows component usage statistics

## Deployment

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Deploy to Your Hosting Provider

1. Build the app: `npm run build`
2. Upload the contents of `dist/` to your web server
3. Update the **Deployment URL** in your XM Cloud app configuration
4. Ensure your domain is accessible from XM Cloud

## Troubleshooting

### Common Issues

1. **Marketplace SDK Not Initializing**
   - Ensure your app is properly configured in XM Cloud Portal
   - Check that the deployment URL is correct
   - Verify your app has the necessary API permissions

2. **No Data Loading**
   - Verify your site name is correct
   - Check that the Marketplace SDK has initialized successfully
   - Ensure your XM Cloud instance is accessible

3. **Authentication Issues**
   - The Marketplace SDK handles authentication automatically
   - Check that your app is properly configured in XM Cloud Portal
   - Verify the organization ID is correct: `org_gMVeHVmWxDrxHj3z`

### Debug Mode

Enable debug logging by opening the browser console. The app logs detailed information about API calls, authentication, and Marketplace SDK initialization.

## API Reference

The app uses the **Sitecore Marketplace SDK** which provides access to:

- **OAuth 2.0**: Automatic authentication handled by the SDK
- **GraphQL**: For fetching site data and component usage
- **Sites API**: For site information
- **Layout Service**: For page layout details
- **Application Context**: For app metadata and configuration

The SDK automatically handles all authentication, token management, and API endpoint configuration.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

[Your License Here]

## Support

For issues related to:
- **App Configuration**: Check XM Cloud Portal documentation
- **API Access**: Contact your XM Cloud administrator
- **App Functionality**: Open an issue in this repository 