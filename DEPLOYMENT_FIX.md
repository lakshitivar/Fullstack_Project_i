# 🚨 DEPLOYMENT FIX GUIDE

## Why You Got the 404 Error

The 404 error occurs because you're trying to deploy a monorepo structure (frontend + backend together) as a single project. Vercel can't handle this structure without proper configuration.

## ✅ SOLUTION: Deploy as Two Separate Projects

You need to deploy the frontend and backend as **two separate Vercel projects**.

---

## 🔧 Fix Steps

### Step 1: Delete the Current Deployment (if any)

1. Go to https://vercel.com/dashboard
2. Find your project
3. Go to Settings → Delete Project (if it exists)

---

### Step 2: Deploy Backend FIRST

1. **Go to Vercel Dashboard**
   - Visit https://vercel.com/new
   - Click "Import Git Repository"
   - Select `lakshitivar/Fullstack_Project_i`

2. **Configure Backend Project**
   - **Project Name**: `task-management-backend`
   - **Framework Preset**: Other
   - **Root Directory**: Click "Edit" and type: `backend`
   - **Build Command**: Leave empty
   - **Install Command**: `pnpm install`

3. **Add Environment Variables**
   ```
   MONGODB_URI=mongodb+srv://lakshitkumar:jWZMR04u3zECkS70@cluster0.o3h7l.mongodb.net/user
   JWT_SECRET=jk;sdfbcoiuewrfbicvldsavcboeuyiralbf
   PORT=5000
   NODE_ENV=production
   FRONTEND_URL=https://your-frontend-url.vercel.app
   ```
   (You'll update FRONTEND_URL after deploying frontend)

4. **Deploy Backend**
   - Click "Deploy"
   - Wait for completion
   - **Copy the backend URL** (e.g., `https://task-management-backend.vercel.app`)

---

### Step 3: Deploy Frontend SECOND

1. **Go to Vercel Dashboard Again**
   - Visit https://vercel.com/new
   - Import the **SAME** repository again: `lakshitivar/Fullstack_Project_i`

2. **Configure Frontend Project**
   - **Project Name**: `task-management-frontend`
   - **Framework Preset**: Next.js
   - **Root Directory**: Click "Edit" and type: `frontend`
   - **Build Command**: `pnpm run build` (default is fine)
   - **Install Command**: `pnpm install`

3. **Add Environment Variables**
   ```
   NEXT_PUBLIC_API_URL=https://task-management-backend.vercel.app
   ```
   (Use your ACTUAL backend URL from Step 2)

4. **Deploy Frontend**
   - Click "Deploy"
   - Wait for completion
   - **Copy the frontend URL** (e.g., `https://task-management-frontend.vercel.app`)

---

### Step 4: Update Backend CORS

1. **Go Back to Backend Project**
   - Open your backend project in Vercel dashboard
   - Go to Settings → Environment Variables

2. **Update FRONTEND_URL**
   - Edit the `FRONTEND_URL` variable
   - Set it to your actual frontend URL: `https://task-management-frontend.vercel.app`
   - Save

3. **Redeploy Backend**
   - Go to Deployments tab
   - Click the three dots (•••) on the latest deployment
   - Click "Redeploy"
   - Wait for completion

---

### Step 5: Configure MongoDB Atlas Network Access

1. **Go to MongoDB Atlas Dashboard**
   - Visit https://cloud.mongodb.com
   - Select your cluster

2. **Add Vercel IP Access**
   - Click "Network Access" in left sidebar
   - Click "Add IP Address"
   - Select "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

   ⚠️ **Security Note**: For production, you should whitelist specific Vercel IPs instead.

---

## 🎯 Testing Your Deployment

1. **Visit your frontend URL**: `https://task-management-frontend.vercel.app`
2. **Test the following**:
   - Sign up for a new account
   - Log in with your credentials
   - Create a new task
   - Update a task
   - Delete a task

3. **Check for errors**:
   - Open browser DevTools (F12)
   - Check Console tab for errors
   - Check Network tab for failed API requests

---

## 🐛 Troubleshooting

### If you still see build script warnings:

The `.npmrc` files have been created to fix this. Make sure to commit and push them:
```bash
git add .npmrc frontend/.npmrc
git commit -m "fix: Add .npmrc to allow pnpm build scripts"
git push origin main
```

Then redeploy both projects in Vercel.

### If API requests fail (CORS errors):

1. Check that `FRONTEND_URL` in backend matches your actual frontend URL
2. Check that `NEXT_PUBLIC_API_URL` in frontend matches your actual backend URL
3. Redeploy both projects after fixing

### If MongoDB connection fails:

1. Verify MongoDB Atlas Network Access allows 0.0.0.0/0
2. Check that `MONGODB_URI` is correct in backend environment variables
3. Test connection: Backend logs should show "MongoDB connected successfully"

---

## 📁 Files Created to Fix Issues

- ✅ `.npmrc` (root) - Allows pnpm build scripts
- ✅ `frontend/.npmrc` - Allows pnpm build scripts for frontend
- ✅ This guide - Step-by-step deployment fix

---

## 🎉 Summary

- ❌ **DON'T**: Deploy as single project with monorepo structure
- ✅ **DO**: Deploy backend and frontend as separate Vercel projects
- ✅ **DO**: Set root directory to `backend` or `frontend` respectively
- ✅ **DO**: Update CORS and API URLs after both deployments
- ✅ **DO**: Configure MongoDB Atlas network access

---

## 📞 Need Help?

If you encounter any issues:
1. Check Vercel deployment logs (click on deployment → View Function Logs)
2. Check browser console for frontend errors
3. Verify all environment variables are set correctly
4. Make sure MongoDB Atlas allows Vercel connections
