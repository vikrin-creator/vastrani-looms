# Deployment Guide - Hostinger with GitHub Actions

## Overview
This setup enables automatic deployment to Hostinger whenever you push changes to your GitHub repository's main branch.

## Prerequisites
1. **Hostinger Account**: Active hosting account with FTP access
2. **GitHub Repository**: Your code repository on GitHub
3. **Domain**: Pointing to your Hostinger hosting

## Setup Instructions

### Step 1: Prepare Hostinger
1. Log in to your Hostinger control panel
2. Go to **File Manager** and ensure your domain points to `/public_html/`
3. Note down your FTP credentials:
   - FTP Server (usually your domain or IP)
   - FTP Username 
   - FTP Password

### Step 2: Configure GitHub Secrets
1. Go to your GitHub repository
2. Click **Settings** > **Secrets and variables** > **Actions**
3. Add these repository secrets:
   ```
   HOSTINGER_FTP_SERVER = your-domain.com (or FTP server address)
   HOSTINGER_FTP_USERNAME = your-ftp-username
   HOSTINGER_FTP_PASSWORD = your-ftp-password
   ```

### Step 3: Update Build Configuration (if needed)
If your domain is not the root domain, update the `homepage` field in `frontend/package.json`:

```json
{
  "homepage": "https://your-domain.com",
  ...
}
```

For subdirectory deployment:
```json
{
  "homepage": "https://your-domain.com/subfolder",
  ...
}
```

### Step 4: Deploy
1. Push your code to the `main` branch:
   ```bash
   git add .
   git commit -m "Initial deployment setup"
   git push origin main
   ```

2. GitHub Actions will automatically:
   - Install dependencies
   - Build the React app
   - Deploy to Hostinger via FTP

### Step 5: Configure Hostinger for SPA (Single Page Application)
Create a `.htaccess` file in your public_html directory:

```apache
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QSA,L]
```

## Workflow Process
1. **Developer pushes code** → GitHub repository
2. **GitHub Actions triggers** → Builds React app
3. **Automatic deployment** → Uploads to Hostinger
4. **Live website updated** → Changes are live

## Monitoring
- Check **Actions** tab in GitHub to monitor deployments
- View deployment logs for troubleshooting
- Typical deployment time: 2-5 minutes

## Troubleshooting
- **Build fails**: Check Node.js/npm versions in logs
- **FTP upload fails**: Verify FTP credentials in secrets
- **404 errors**: Ensure `.htaccess` is properly configured
- **Assets not loading**: Check `homepage` URL in package.json

## Security Notes
- Never commit FTP credentials to code
- Use GitHub Secrets for all sensitive information
- Regularly update dependencies for security patches