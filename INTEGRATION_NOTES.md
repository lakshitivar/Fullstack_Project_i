# Frontend-Backend Integration Notes

## Architecture Overview

This is a **separated frontend-backend architecture** where:
- Backend (Express) and Frontend (Next.js) run on different ports
- Communication happens via REST API with JSON payloads
- Authentication uses JWT tokens in Authorization headers

## How Integration Works

### 1. API Client Setup

**File: frontend/lib/api.ts**

\`\`\`typescript
- Creates axios instance with baseURL pointing to backend
- Automatically adds JWT token to all requests
- Handles request/response interceptors
\`\`\`

### 2. Authentication Flow

\`\`\`
User Signup/Login → Backend validates → Returns JWT token
                     → Frontend stores token in cookies
                     → Token sent with every API request
\`\`\`

### 3. Protected Routes

Frontend checks authentication status:
- If not authenticated → redirects to login page
- If authenticated → allows access to dashboard

Backend validates JWT on protected endpoints:
- If token invalid → returns 401 Unauthorized
- If token valid → processes request

### 4. Data Flow Example: Create Task

\`\`\`
1. User fills task form in frontend
2. Frontend validates input
3. Frontend sends POST /api/tasks with task data
4. Backend receives request
5. Backend validates JWT token
6. Backend validates task data
7. Backend saves to MongoDB
8. Backend returns created task
9. Frontend updates task list on screen
\`\`\`

## API Request Headers

All API requests from frontend include:

\`\`\`
Authorization: Bearer <jwt_token>
Content-Type: application/json
\`\`\`

## Error Handling

### Frontend Error Handling

\`\`\`typescript
try {
  const response = await apiClient.post('/auth/login', data);
} catch (error) {
  if (error.response?.status === 401) {
    // Invalid credentials
  } else if (error.response?.status === 500) {
    // Server error
  }
}
\`\`\`

### Backend Error Handling

\`\`\`javascript
try {
  // Do something
} catch (error) {
  res.status(500).json({ error: error.message });
}
\`\`\`

## Scaling Considerations

### Current Implementation (Development)

- Synchronous API calls
- All data fetched on demand
- No caching strategy
- Simple error handling

### Production Improvements

1. **Caching Layer**
   - Implement Redis cache on backend
   - Use SWR or React Query on frontend
   - Cache frequently accessed data

2. **Pagination**
   - Limit tasks per request
   - Implement cursor-based pagination
   - Show loading indicators

3. **Real-time Updates**
   - Integrate WebSockets
   - Use libraries like Socket.io or SockJS
   - Real-time task synchronization

4. **Offline Support**
   - Implement service workers
   - Use IndexedDB for offline data
   - Sync when connection returns

5. **Performance**
   - Compress API responses
   - Implement request debouncing
   - Use lazy loading for components
   - Optimize database queries with indexes

### Database Optimization

\`\`\`javascript
// Add indexes for frequently queried fields
db.tasks.createIndex({ userId: 1 });
db.tasks.createIndex({ status: 1 });
db.tasks.createIndex({ priority: 1 });
db.tasks.createIndex({ createdAt: -1 });
\`\`\`

### API Rate Limiting

Add rate limiting middleware to backend:

\`\`\`javascript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
\`\`\`

## Environment Configuration

### Production

\`\`\`
Backend: 
Frontend: 
Database: MongoDB Atlas (production cluster)
\`\`\`

## Security Best Practices

1. **HTTPS in Production**
   - Use SSL/TLS certificates
   - Redirect HTTP to HTTPS

2. **JWT Security**
   - Use strong JWT_SECRET
   - Set reasonable expiration times
   - Implement refresh tokens for longer sessions

3. **CORS Configuration**
   - Restrict to specific domains in production
   - Current development setting allows all origins

4. **Input Validation**
   - Validate on both frontend and backend
   - Never trust client-side validation alone

5. **Password Security**
   - Use bcrypt for hashing
   - Minimum password length enforcement
   - Consider adding password strength requirements

## Testing Integration

### Backend Testing

\`\`\`bash
# Use Postman to test API endpoints
# Test all CRUD operations
# Test authentication flows
# Test error scenarios
\`\`\`

### Frontend Testing

\`\`\`bash
# Test login/signup flows
# Test task creation/updates/deletion
# Test filter functionality
# Test logout functionality
\`\`\`

### End-to-End Testing

1. Start both servers
2. Open frontend in browser
3. Test complete user journey
4. Check browser DevTools for errors
5. Check backend console for logs

## Monitoring & Debugging

### Frontend Debugging

- Browser DevTools → Network tab
- Check API requests/responses
- Check Authorization header is included
- Look for CORS errors

### Backend Debugging

- Check console logs
- Use Postman to test endpoints directly
- Check MongoDB for data
- Verify environment variables

