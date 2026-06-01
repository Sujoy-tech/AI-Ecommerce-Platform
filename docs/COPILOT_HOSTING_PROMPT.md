# 🚀 GitHub Copilot Prompt for Hosting Setup

## Copy and paste this ENTIRE prompt into VS Code GitHub Copilot Chat on your personal laptop:

---

```
I have an AI-Integrated E-Commerce Platform project in my current workspace folder. I need you to help me:

1. Verify the project structure is correct and all files are present
2. Help me install dependencies (npm install)
3. Set up environment variables - I need to create a .env file from .env.example
4. Help me configure:
   - Supabase (free PostgreSQL database) - guide me through getting the DATABASE_URL
   - Hugging Face API key (free) - guide me through getting the token
   - NextAuth secret generation
5. Run Prisma commands to set up the database schema
6. Seed the database with sample products
7. Test the development server locally
8. Initialize git repository
9. Help me deploy to Vercel (free hosting) to get a live URL
10. Verify the live deployment works

Please guide me through each step sequentially, waiting for my confirmation before moving to the next step. Start by checking if all required files exist in the project.
```

---

## Alternative Quick-Start Prompt (if you just want to run it):

```
Help me run this Next.js AI E-Commerce project. Steps needed:
1. Run `npm install`
2. I need to create .env from .env.example - what values do I need?
3. Run `npx prisma generate && npx prisma db push && npm run seed`
4. Run `npm run dev`
Tell me what to do first.
```

---

## Deployment-Only Prompt (if already running locally):

```
Help me deploy my Next.js project to Vercel for free. I want a live URL I can share.
Steps:
1. Initialize git repo and push to GitHub
2. Connect to Vercel
3. Add environment variables
4. Deploy and get the URL
Guide me step by step.
```
