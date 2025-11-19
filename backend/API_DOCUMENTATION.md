# Task Management API Documentation

## Base URL
\`\`\`
http://localhost:5000/api
\`\`\`

## Authentication
All protected endpoints require a Bearer token in the Authorization header:
\`\`\`
Authorization: Bearer <token>
\`\`\`

## Endpoints

### Authentication

#### Register
- **POST** `/auth/register`
- **Body:**
\`\`\`json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
\`\`\`
- **Response:** `{ token, user }`

#### Login
- **POST** `/auth/login`
- **Body:**
\`\`\`json
{
  "email": "john@example.com",
  "password": "password123"
}
\`\`\`
- **Response:** `{ token, user }`

#### Get Profile
- **GET** `/auth/profile` (Protected)
- **Response:** User object

#### Update Profile
- **PUT** `/auth/profile` (Protected)
- **Body:** `{ name, email }`

### Tasks

#### Get All Tasks
- **GET** `/tasks` (Protected)
- **Query Params:** `?status=pending&priority=high`
- **Response:** Array of tasks

#### Get Single Task
- **GET** `/tasks/:id` (Protected)
- **Response:** Task object

#### Create Task
- **POST** `/tasks` (Protected)
- **Body:**
\`\`\`json
{
  "title": "Task title",
  "description": "Task description",
  "priority": "high"
}
\`\`\`

#### Update Task
- **PUT** `/tasks/:id` (Protected)
- **Body:** `{ title, description, status, priority }`

#### Delete Task
- **DELETE** `/tasks/:id` (Protected)

## Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Server Error

 