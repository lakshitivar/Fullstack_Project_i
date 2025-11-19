# Vercel Deployment Guide

## 🚀 Deploying Your Full-Stack Application to Vercel

### Prerequisites
- GitHub account with your repository
- Vercel account (sign up at https://vercel.com)
- MongoDB Atlas database (already configured)

---

## Option 1: Deploy via Vercel Dashboard (Recommended)

### Step 1: Deploy Frontend

1. **Go to Vercel Dashboard**
   - Visit https://vercel.com/dashboard
   - Click "Add New Project"

2. **Import Repository**
   - Select "Import Git Repository"
   - Choose your GitHub repository: `lakshitivar/Fullstack_Project_i`
   - Click "Import"

3. **Configure Frontend Build**
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
   - **Build Command**: `pnpm run build` (or leave default)
   - **Output Directory**: `.next` (default)
   - **Install Command**: `pnpm install`

4. **Add Environment Variables**
   Click "Environment Variables" and add:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.vercel.app
   ```
   (You'll update this after deploying the backend)

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Note your frontend URL (e.g., `https://your-app.vercel.app`)

---

### Step 2: Deploy Backend

1. **Add New Project Again**
   - Go back to Vercel Dashboard
   - Click "Add New Project"
   - Import the same repository

2. **Configure Backend Build**
   - **Framework Preset**: Other
   - **Root Directory**: `backend`
   - **Build Command**: Leave empty or `echo "No build needed"`
   - **Output Directory**: Leave empty
   - **Install Command**: `pnpm install`

3. **Add Environment Variables**
   Click "Environment Variables" and add:
   ```
   MONGODB_URI=mongodb+srv://lakshitkumar:jWZMR04u3zECkS70@cluster0.o3h7l.mongodb.net/user
   JWT_SECRET=jk;sdfbcoiuewrfbicvldsavcboeuyiralbf
   PORT=5000
   FRONTEND_URL=https://your-frontend-url.vercel.app
   ```
   (Use your actual MongoDB credentials and frontend URL)

4. **Deploy**
   - Click "Deploy"
   - Note your backend URL (e.g., `https://your-backend.vercel.app`)

---

### Step 3: Update Frontend Environment Variable

1. Go to your **Frontend** project on Vercel
2. Navigate to "Settings" → "Environment Variables"
3. Edit `NEXT_PUBLIC_API_URL` to your backend URL:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend.vercel.app
   ```
4. Click "Save"
5. Go to "Deployments" tab
6. Click "Redeploy" on the latest deployment

---

### Step 4: Update CORS in Backend

The backend needs to allow requests from your Vercel frontend domain:
- This is already configured via the `FRONTEND_URL` environment variable
- Make sure it matches your frontend Vercel URL

---

## Option 2: Deploy via Vercel CLI

### Install Vercel CLI
```bash
npm i -g vercel
```

### Deploy Backend
```bash
cd backend
vercel --prod
```
Follow prompts and add environment variables when asked.

### Deploy Frontend
```bash
cd frontend
vercel --prod
```
Follow prompts and add environment variables when asked.

---

## 📝 Important Notes

### MongoDB Atlas Configuration
1. **Whitelist Vercel IPs**
   - Go to MongoDB Atlas → Network Access
   - Click "Add IP Address"
   - Select "Allow Access from Anywhere" (0.0.0.0/0)
   - Or add specific Vercel IP ranges

2. **Database User Permissions**
   - Ensure your database user has read/write permissions
   - Current user: `lakshitkumar`
   - Database: `user`

### Environment Variables Needed

**Frontend (.env.local):**
```env
NEXT_PUBLIC_API_URL=https://your-backend-url.vercel.app
```

**Backend (.env):**
```env
MONGODB_URI=mongodb+srv://lakshitkumar:jWZMR04u3zECkS70@cluster0.o3h7l.mongodb.net/user
JWT_SECRET=jk;sdfbcoiuewrfbicvldsavcboeuyiralbf
PORT=5000
FRONTEND_URL=https://your-frontend-url.vercel.app
```

---

## 🔍 Troubleshooting

### Backend API Not Responding
- Check backend deployment logs in Vercel
- Verify MongoDB connection string
- Ensure MongoDB Atlas allows connections from anywhere

### CORS Errors
- Verify `FRONTEND_URL` environment variable in backend
- Check browser console for exact error
- Ensure backend CORS is configured correctly

### Database Connection Failed
- Check MongoDB Atlas Network Access settings
- Verify credentials in `MONGODB_URI`
- Test connection using the test script: `node test-connection.js`

### Frontend Can't Connect to Backend
- Verify `NEXT_PUBLIC_API_URL` is set correctly
- Check if backend is deployed and running
- Open backend URL in browser to verify it's accessible

---

## 🎯 Testing Your Deployment

1. **Test Backend**
   - Visit: `https://your-backend.vercel.app`
   - Should see a response or 404 (backend is running)

2. **Test Frontend**
   - Visit: `https://your-frontend.vercel.app`
   - Try signing up for a new account
   - Try logging in with demo credentials
   - Create and manage tasks

---

## 🔐 Security Best Practices

1. **Use Environment Variables**
   - Never commit `.env` files
   - Always use Vercel's environment variable settings

2. **Secure MongoDB**
   - Use strong passwords
   - Limit IP access when possible
   - Regular backup your data

3. **JWT Secret**
   - Use a strong, random JWT secret
   - Generate with: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [MongoDB Atlas Setup](https://www.mongodb.com/docs/atlas/getting-started/)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

---

## ✅ Deployment Checklist

- [ ] MongoDB Atlas database is configured
- [ ] Network access allows connections from anywhere
- [ ] Backend deployed on Vercel
- [ ] Backend environment variables set
- [ ] Frontend deployed on Vercel
- [ ] Frontend environment variable points to backend
- [ ] CORS configured in backend
- [ ] Test signup and login functionality
- [ ] Test task creation and management

---

**Need Help?** Check Vercel deployment logs for detailed error messages.
