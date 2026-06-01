# 🛠️ Complete Setup Guide - Step by Step

## Prerequisites

Before starting, ensure your personal laptop has:
- **Node.js 18+** → Download from [nodejs.org](https://nodejs.org)
- **Git** → Download from [git-scm.com](https://git-scm.com)
- **VS Code** → Download from [code.visualstudio.com](https://code.visualstudio.com)
- **A web browser** (Chrome/Firefox/Edge)

---

## Step 1: Open Project in VS Code

```bash
# Navigate to where you copied the project
cd AI-Ecommerce-Platform

# Open in VS Code
code .
```

---

## Step 2: Install Dependencies

Open VS Code terminal (Ctrl + `) and run:

```bash
npm install
```

This will install all ~50 packages defined in package.json. Wait for it to complete (~2-5 minutes).

---

## Step 3: Create Free Accounts (All Free)

### 3.1 Supabase (Database - Free)
1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project" → Sign up with GitHub
3. Create a new project (free tier)
4. Name: `nexusai-shop`, password: create a strong one, region: closest to you
5. Wait for project to spin up (~2 min)
6. Go to **Settings → Database** → Copy the connection string (URI)
   - It looks like: `postgresql://postgres:YOUR_PASSWORD@db.xxxxx.supabase.co:5432/postgres`

### 3.2 Hugging Face (AI Models - Free)
1. Go to [huggingface.co](https://huggingface.co)
2. Sign up for free
3. Go to **Settings → Access Tokens**
4. Create new token → Name: `nexusai` → Role: `read`
5. Copy the token (starts with `hf_`)

### 3.3 NextAuth Secret (Generate Locally)
Run this in your terminal:
```bash
openssl rand -base64 32
```
Or use any random string generator. This is just a secret key for session encryption.

---

## Step 4: Set Up Environment Variables

1. Copy the example file:
```bash
cp .env.example .env
```

2. Edit `.env` with your values:
```env
# Paste your Supabase connection string
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.YOUR_REF.supabase.co:5432/postgres"

# Your local URL
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="paste-your-generated-secret-here"

# Your Hugging Face token
HUGGINGFACE_API_KEY="hf_your_token_here"

# App config
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_NAME="NexusAI Shop"
```

> **Note:** Google OAuth and Stripe are optional. The app works without them.

---

## Step 5: Set Up Database

```bash
# Generate Prisma client
npx prisma generate

# Push schema to Supabase database
npx prisma db push

# Seed with sample data (products, categories, admin user)
npm run seed
```

You should see:
```
🌱 Starting seed...
✅ Categories seeded
✅ Products seeded
✅ Admin user seeded
🎉 Seed completed successfully!
```

---

## Step 6: Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. 🎉

You should see the beautiful AI-powered homepage with:
- Hero section with animated background
- AI feature cards
- Tech stack showcase

---

## Step 7: Deploy to Vercel (Get Live URL)

### 7.1 Push to GitHub First

```bash
git init
git add .
git commit -m "feat: AI-Integrated E-Commerce Platform"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ai-ecommerce-platform.git
git push -u origin main
```

### 7.2 Deploy on Vercel (Free)

1. Go to [vercel.com](https://vercel.com) → Sign up with GitHub
2. Click **"New Project"**
3. Import your `ai-ecommerce-platform` repository
4. In **Environment Variables** section, add ALL variables from your `.env`:
   - `DATABASE_URL` → your Supabase URL
   - `NEXTAUTH_URL` → leave blank (Vercel auto-detects)
   - `NEXTAUTH_SECRET` → your secret
   - `HUGGINGFACE_API_KEY` → your HF token
   - `NEXT_PUBLIC_APP_URL` → leave blank
   - `NEXT_PUBLIC_APP_NAME` → `NexusAI Shop`
5. Click **Deploy**
6. Wait 1-2 minutes...

✅ **Done!** You'll get a URL like: `https://ai-ecommerce-platform.vercel.app`

This is the URL you put on your resume!

---

## Step 8: Custom Domain (Optional, Free)

If you want a professional URL like `nexusai-shop.vercel.app`:
1. In Vercel dashboard → your project → Settings → Domains
2. Add a custom subdomain (free with .vercel.app)

---

## 🔍 Verify Everything Works

| Feature | How to Test |
|---------|-------------|
| Homepage | Visit `/` - should show hero + features |
| Products | Visit `/products` - should show product grid |
| AI Search | Visit `/search` - type a query, see results |
| Visual Search | Visit `/search` → Visual tab → upload any image |
| AI Chat | Click chat bubble (bottom-right) → ask questions |
| Cart | Add products → visit `/cart` |
| Checkout | Go through cart → checkout flow |
| Dashboard | Visit `/dashboard` - see AI metrics |

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| `prisma: command not found` | Run `npm install` again |
| Database connection error | Check DATABASE_URL in .env, ensure Supabase project is active |
| AI features return empty | Check HUGGINGFACE_API_KEY, ensure it's valid |
| Build errors | Run `npx prisma generate` then `npm run build` |
| Port 3000 in use | Use `npm run dev -- -p 3001` |

---

## 📞 Quick Reference

| Service | Dashboard URL |
|---------|--------------|
| Vercel | [vercel.com/dashboard](https://vercel.com/dashboard) |
| Supabase | [app.supabase.com](https://app.supabase.com) |
| Hugging Face | [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens) |
| GitHub | [github.com](https://github.com) |
