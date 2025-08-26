# 🚀 Vercel Deployment Guide for XMC Visualiser

## Overview
This guide explains how to deploy your XMC Visualiser to Vercel and what to expect.

## ⚠️ Important Notes

### What Works on Vercel:
- ✅ Static React app hosting
- ✅ UI components and styling
- ✅ Tenant management interface
- ✅ Development mode with mock data

### What Doesn't Work on Vercel (Standalone):
- ❌ Sitecore Marketplace SDK connection
- ❌ Live tenant data from XM Cloud
- ❌ Production mode with real data

### What Works on Vercel (When Loaded by XM Cloud):
- ✅ Full Sitecore Marketplace SDK access
- ✅ Live tenant data from XM Cloud
- ✅ Production mode with real data
- ✅ Complete XM Cloud integration

## 🚀 Deployment Steps

### 1. Install Vercel CLI
```bash
npm i -g vercel
```

### 2. Build Your App
```bash
npm run build
```

### 3. Deploy to Vercel
```bash
vercel
```

### 4. Follow the Prompts:
- Set up and deploy? → `Y`
- Which scope? → Select your account
- Link to existing project? → `N`
- Project name? → `xmc-visualiser` (or your preferred name)
- In which directory is your code located? → `./` (current directory)
- Want to override the settings? → `N`

## 🔧 Environment Configuration

### Development vs Production
The app automatically detects the environment:
- **Localhost/Development**: Uses mock data
- **Vercel (Standalone)**: Uses mock data (no XM Cloud access)
- **Vercel (Loaded by XM Cloud)**: Full production mode with live data

### Custom Domain (Optional)
After deployment, you can add a custom domain in the Vercel dashboard.

## 📱 What Users Will See

### On Vercel:
1. **Development Mode Banner** - "Running with mock data for local development"
2. **Mock Tenants** - "Development Tenant" and "Test Tenant"
3. **Functional UI** - All components work as expected
4. **No Live Data** - Cannot connect to Sitecore XM Cloud

## 🔄 Updating Your App

### Automatic Deployments:
- Push to your main branch → Automatic deployment
- Vercel will rebuild and deploy automatically

### Manual Deployments:
```bash
vercel --prod
```

## 🌐 Production Considerations

### For Real XM Cloud Usage:
- Deploy within Sitecore XM Cloud environment, OR
- Deploy to Vercel and have XM Cloud load your app
- Use the Sitecore Marketplace SDK
- Access real tenant data

### For Demo/Presentation:
- Vercel is perfect for showcasing the UI
- Users can interact with mock data
- Demonstrates the full user experience
- Can be loaded by XM Cloud for full functionality

## 📊 Monitoring

### Vercel Analytics:
- Page views and performance
- User interactions
- Error tracking

### Custom Analytics:
- Add your own tracking
- Monitor user behavior
- Track feature usage

## 🆘 Troubleshooting

### Build Failures:
```bash
# Clear cache and rebuild
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Deployment Issues:
- Check Vercel logs in dashboard
- Verify build output in `dist/` folder
- Ensure all dependencies are in `package.json`

## 🎯 Next Steps

1. **Deploy to Vercel** for demo purposes
2. **Test the mock data functionality**
3. **Showcase the UI to stakeholders**
4. **Plan XM Cloud deployment** for production use

---

**Note**: This app is designed to run within Sitecore XM Cloud. Vercel hosting provides a great way to demo the interface, but for production use with real data, deploy within the XM Cloud environment.
