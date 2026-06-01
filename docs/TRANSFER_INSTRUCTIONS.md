# 📦 File Transfer Instructions

## How to Transfer This Project from Organisation Laptop to Personal Laptop

### Method 1: USB Drive (Recommended - Simplest)

1. **Copy the entire folder** `AI-Ecommerce-Platform` to a USB drive
2. Plug the USB into your personal laptop
3. Copy it to your desired location (e.g., `C:\Projects\` or `~/Projects/`)

### Method 2: ZIP and Email/Cloud

1. **Right-click** the `AI-Ecommerce-Platform` folder
2. Select **Send to → Compressed (zipped) folder**
3. Upload the ZIP to:
   - Google Drive (15GB free)
   - OneDrive
   - Dropbox
   - Or email it to yourself (if < 25MB, which it should be since no node_modules)
4. Download on personal laptop and extract

### Method 3: GitHub (Best for Version Control)

If you have GitHub access on your org laptop:

```bash
cd AI-Ecommerce-Platform
git init
git add .
git commit -m "Initial commit: AI-Integrated E-Commerce Platform"
git remote add origin https://github.com/YOUR_USERNAME/ai-ecommerce-platform.git
git push -u origin main
```

Then on personal laptop:
```bash
git clone https://github.com/YOUR_USERNAME/ai-ecommerce-platform.git
```

---

## ⚠️ Important Notes

- The `node_modules` folder is NOT included (it will be ~500MB). You'll install dependencies on your personal laptop.
- The `.env` file with secrets should NOT be committed to git. Create it fresh on your personal laptop using `.env.example` as a template.
- Total folder size without node_modules: ~200KB (very portable!)

---

## ✅ After Transfer Checklist

Once files are on your personal laptop:
1. ✅ Open the folder in VS Code
2. ✅ Follow the Setup Guide (`docs/SETUP_GUIDE.md`)
3. ✅ All credentials are created fresh on personal laptop (free services)
4. ✅ Deploy to Vercel for live URL
