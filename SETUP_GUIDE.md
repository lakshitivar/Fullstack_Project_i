# Complete Setup Guide

## Quick Start (5 minutes)

### Step 1: Clone Repository

\`\`\`bash
# Clone the repository
git clone <your-repo-url>
cd task-management
\`\`\`

### Step 2: MongoDB Atlas Setup

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up or login
3. Create a new project
4. Create a cluster (free tier available)
5. Create a database user:
   - Click "Database Access"
   - Add new user
   - Remember username and password
6. Get connection string:
   - Click "Clusters" → "Connect"
   - Choose "Connect your application"
   - Copy connection string
   - Replace \`<username>\` and \`<password>\`

### Step 3: Backend Setup

\`\`\`bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your MongoDB URI and JWT secret
# MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/task-management

# Seed demo data (optional)
npm run seed

# Start development server
npm run dev
\`\`\`

Server will start on http://localhost:5000

### Step 4: Frontend Setup

\`\`\`bash
cd frontend

# Install dependencies
npm install

# Create .env.local file
cp .env.local.example .env.local

# Start development server
npm run dev
\`\`\`

Frontend will start on http://localhost:3000

### Step 5: Test Application

1. Open http://localhost:3000 in your browser
2. Click "Sign Up"
3. Create an account
4. Explore the dashboard
5. Create, edit, and delete tasks

## Test Credentials (if you ran seed)

- Email: demo@example.com
- Password: password123

## Detailed Setup Steps

### Backend Configuration

\`\`\`.env
# MongoDB Connection String
# Get this from MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster0.abc123.mongodb.net/task-management

# JWT Secret (use a strong random string)
# Generate one: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
JWT_SECRET=your_super_secret_key_here_min_32_chars

# Server Port
PORT=5000

# Frontend URL for CORS
FRONTEND_URL=http://localhost:3000
\`\`\`

### Frontend Configuration

\`\`\`.env.local
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:5000/api
\`\`\`

## Common Issues & Solutions

### Issue: MongoDB Connection Fails

**Solution:**
- Verify username and password don't have special characters (if they do, URL encode them)
- Check IP whitelist in MongoDB Atlas (should be 0.0.0.0/0 for development)
- Ensure cluster is running (may take a few minutes to start)

### Issue: Frontend Can't Connect to Backend

**Solution:**
- Verify backend is running on port 5000
- Check NEXT_PUBLIC_API_URL in frontend/.env.local
- Clear browser cache and try again
- Check browser console for CORS errors

### Issue: Login Shows "Invalid Email or Password"

**Solution:**
- Double-check credentials (case-sensitive)
- Try with demo credentials if you ran seed
- Check MongoDB connection is working
- Verify user was created in database

### Issue: Tasks Not Loading

**Solution:**
- Check browser console for errors
- Verify token is being sent in requests
- Check backend is running
- Verify API endpoints are accessible

## Deployment Guide

### Deploy Backend to Railway

1. Push code to GitHub
2. Go to https://railway.app
3. Create new project from GitHub repo
4. Add MongoDB plugin
5. Set environment variables
6. Deploy

### Deploy Frontend to Vercel

1. Push code to GitHub
2. Go to https://vercel.com
3. Import project from GitHub
4. Add environment variables
5. Deploy

### Environment Variables for Production

**Backend:**
- MONGODB_URI: Production MongoDB connection string
- JWT_SECRET: Strong random secret
- PORT: 3000 or specified port
- FRONTEND_URL: Your production frontend URL

**Frontend:**
- NEXT_PUBLIC_API_URL: Your production backend URL

## Next Steps

After setup is complete:

1. Create some tasks
2. Test all CRUD operations
3. Try filtering by status and priority
4. Test login/logout
5. Read code to understand architecture
6. Plan custom features for your needs
