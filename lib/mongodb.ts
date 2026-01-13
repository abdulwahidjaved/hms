import mongoose from 'mongoose';

// Read environment variable at runtime. Don't throw during module import so the server
// can stay up and return helpful errors when the DB is not configured.
const MONGODB_URI = process.env.MONGODB_URI || '';

/**
 * Global is used here to maintain a cached connection across hot reloads in development.
 */
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (!MONGODB_URI) {
    throw new Error(
      'MONGODB_URI is not set. Create a .env.local in the project root with: MONGODB_URI="mongodb+srv://<user>:<pass>@<cluster>.mongodb.net/<db>?retryWrites=true&w=majority"'
    );
  }

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI)
      .then((mongooseInstance) => {
        console.log('MongoDB connected');
        return mongooseInstance;
      })
      .catch((err) => {
        console.error('MongoDB connection failed:', err && (err.message || err));
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDatabase;