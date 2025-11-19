import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Task from '../models/Task.js';

dotenv.config();

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Task.deleteMany({});

    // Create sample user
    const user = new User({
      name: 'Demo User',
      email: 'demo@example.com',
      password: 'password123'
    });
    await user.save();
    console.log('User created:', user.email);

    // Create sample tasks
    const tasks = [
      {
        title: 'Complete project setup',
        description: 'Set up Node.js and MongoDB connection',
        status: 'completed',
        priority: 'high',
        userId: user._id
      },
      {
        title: 'Build authentication system',
        description: 'Implement JWT-based authentication',
        status: 'in-progress',
        priority: 'high',
        userId: user._id
      },
      {
        title: 'Create task management API',
        description: 'Build CRUD endpoints for tasks',
        status: 'in-progress',
        priority: 'medium',
        userId: user._id
      },
      {
        title: 'Build frontend dashboard',
        description: 'Create React/Next.js dashboard UI',
        status: 'pending',
        priority: 'medium',
        userId: user._id
      },
      {
        title: 'Deploy to production',
        description: 'Deploy both frontend and backend',
        status: 'pending',
        priority: 'low',
        userId: user._id
      }
    ];

    await Task.insertMany(tasks);
    console.log('Tasks created:', tasks.length);

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

seedDatabase();
