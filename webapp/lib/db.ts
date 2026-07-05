import mongoose from 'mongoose';

// Import all models to ensure they are registered with Mongoose
import Student from '@/lib/models/Student';
import Batch from '@/lib/models/Batch';
import Fee from '@/lib/models/Fee';
import Test from '@/lib/models/Test';
import Institute from '@/lib/models/Institute';
import Staff from '@/lib/models/Staff';
import TestResult from '@/lib/models/TestResult';

const MONGODB_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ezzycoach';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGO_URI environment variable inside .env.local');
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('MongoDB connected');
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
