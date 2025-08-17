# XM Cloud Visualizer - Deployment Guide

## Quick Deployment Steps

### 1. Build the App

```bash
npm run build
```

This creates a `dist/` folder with your production-ready app.

### 2. Deploy to Your Hosting Provider

Choose one of these deployment options:

#### Option A: Netlify (Recommended for quick deployment)

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Connect your GitHub repository
5. Set build command: `npm run build`
6. Set publish directory: `dist`
7. Deploy!

#### Option B: Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Vercel will auto-detect it's a Vite app
5. Deploy!

#### Option C: GitHub Pages

1. Add this to your `package.json`:
```json
{
  "homepage": "https://yourusername.github.io/XMCVisualiser",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

2. Install gh-pages: `npm install --save-dev gh-pages`
3. Deploy: `npm run deploy`

### 3. Update XM Cloud App Configuration

Once deployed, update your XM Cloud app:

1. Go to [XM Cloud Portal](https://portal.sitecorecloud.io/)
2. Navigate to **Developer Studio** → **Apps**
3. Select your `TM-XMCVisualiser` app
4. Update **Deployment URL** to your deployed app URL
5. Save changes

## Environment Variables for Production

**No environment variables are required!** The app now uses the Sitecore Marketplace SDK which handles authentication automatically.

The only configuration needed is:
1. Properly configure your app in the XM Cloud Portal
2. Set the correct deployment URL
3. Ensure your organization ID is configured: `org_gMVeHVmWxDrxHj3z`

## Testing Your Deployment

1. Visit your deployed app URL
2. Wait for the Marketplace SDK to initialize (you'll see "Marketplace SDK Ready" status)
3. Click the configuration button (⚙️)
4. Enter your XM Cloud site name
5. Click "Load Data"
6. Verify data loads from your XM Cloud instance

## Troubleshooting Deployment

### Common Issues

1. **Marketplace SDK not initializing**
   - Check browser console for SDK errors
   - Verify your XM Cloud app configuration in the portal
   - Ensure deployment URL is correct and accessible

2. **App shows configuration panel but won't load data**
   - Wait for "Marketplace SDK Ready" status
   - Check that the SDK has initialized successfully
   - Verify your site name is correct

3. **No data appears**
   - Verify the Marketplace SDK is ready
   - Check that your app has proper permissions in XM Cloud
   - Ensure your XM Cloud instance is accessible

### Debug Steps

1. Open browser developer tools
2. Check Console tab for SDK initialization errors
3. Look for "Marketplace SDK Ready" status in the UI
4. Check Network tab for failed API calls
5. Verify your XM Cloud app status in the portal

## Security Considerations

- The Marketplace SDK handles all authentication securely
- No credentials are stored in the app or environment variables
- Ensure your hosting provider supports HTTPS
- The SDK automatically handles token refresh and security
- Consider implementing rate limiting for API calls

## Next Steps

After successful deployment:

1. **Test thoroughly** with your XM Cloud instance
2. **Share with your team** using the organization ID: `org_gMVeHVmWxDrxHj3z`
3. **Monitor usage** through XM Cloud Portal
4. **Gather feedback** from users
5. **Iterate and improve** based on usage patterns

## Support

If you encounter deployment issues:

1. Check the browser console for errors
2. Verify XM Cloud app configuration
3. Test API endpoints manually
4. Contact your XM Cloud administrator
5. Open an issue in this repository 