import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './src/config/database.js';
import routes from './src/routes/index.js';
import { errorHandler } from './src/middleware/auth.js';

dotenv.config();

const app = express();

// Connect to MySQL Database
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
  })
);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// Routes
app.use('/api', routes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Error handling middleware
app.use(errorHandler);

const DEFAULT_PORT = Number(process.env.PORT || 5000);
const MAX_PORT_RETRIES = 10;

const startServer = (port, retryCount = 0) => {
  const server = app
    .listen(port, () => {
      console.log(`Server running on port ${port}`);
      console.log(`Environment: ${process.env.NODE_ENV}`);
    })
    .on('error', (error) => {
      if (error.code === 'EADDRINUSE' && retryCount < MAX_PORT_RETRIES) {
        const nextPort = port + 1;
        console.warn(
          `Port ${port} is already in use. Retrying on port ${nextPort}...`
        );
        startServer(nextPort, retryCount + 1);
        return;
      }

      console.error(`Failed to start server: ${error.message}`);
      process.exit(1);
    });

  return server;
};

startServer(DEFAULT_PORT);

export default app;
