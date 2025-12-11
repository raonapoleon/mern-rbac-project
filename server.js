import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import postRoutes from './routes/post.routes.js';
import userRoutes from './routes/user.routes.js';

dotenv.config();
connectDB();

const app = express();

// --- CRITICAL DEPLOYMENT SETTING ---
// This tells Express to trust the secure connection (HTTPS) provided by Render.
// Without this, the 'secure: true' cookie will be blocked.
app.set('trust proxy', 1);

// Configure CORS
app.use(cors({
  // Use the environment variable for production, or localhost for dev
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true // Allow cookies to be sent
}));

app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));