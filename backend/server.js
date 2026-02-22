import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB, { getDatabaseStatus } from './src/config/database.js';
import routes from './src/routes/index.js';
import { errorHandler } from './src/middleware/auth.js';
import { assertJwtConfig } from './src/utils/auth.js';

dotenv.config();

const app = express();

const DEFAULT_PORT = Number(process.env.PORT || 5000);
const MAX_PORT_RETRIES = Number(process.env.MAX_PORT_RETRIES || 10);
const EFFECTIVE_MAX_PORT_RETRIES =
  process.env.NODE_ENV === 'production' ? 0 : MAX_PORT_RETRIES;
const JSON_LIMIT = process.env.JSON_LIMIT || '1mb';
const URL_ENCODED_LIMIT = process.env.URL_ENCODED_LIMIT || '1mb';

const parseCorsOrigins = () => {
  const rawOrigins = process.env.CORS_ORIGIN || 'http://localhost:3000';
  return rawOrigins
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
};

const allowedOrigins = parseCorsOrigins();

const isLocalDevOrigin = (origin) => {
  if (!origin) {
    return false;
  }

  return (
    /^http:\/\/localhost:\d+$/.test(origin) ||
    /^http:\/\/127\.0\.0\.1:\d+$/.test(origin)
  );
};

if (process.env.TRUST_PROXY === 'true') {
  app.set('trust proxy', 1);
}

const startedAt = Date.now();

// Middleware
app.use(express.json({ limit: JSON_LIMIT }));
app.use(express.urlencoded({ extended: true, limit: URL_ENCODED_LIMIT }));

// CORS
app.use(
  cors({
    origin: (origin, callback) => {
      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        (process.env.NODE_ENV !== 'production' && isLocalDevOrigin(origin))
      ) {
        callback(null, true);
        return;
      }

      callback(new Error('CORS origin not allowed'));
    },
    credentials: true,
  })
);

// Health check endpoint
app.get('/api/health', (req, res) => {
  const dbStatus = getDatabaseStatus();

  res.status(200).json({
    success: true,
    message: 'Server is running',
    uptimeSeconds: Math.floor((Date.now() - startedAt) / 1000),
    environment: process.env.NODE_ENV || 'development',
    database: dbStatus,
    timestamp: new Date().toISOString(),
  });
});

// Readiness endpoint for deployment platforms
app.get('/api/ready', (req, res) => {
  const dbStatus = getDatabaseStatus();
  const isReady = dbStatus.connected;

  res.status(isReady ? 200 : 503).json({
    success: isReady,
    message: isReady ? 'Service is ready' : 'Service is not ready',
    database: dbStatus,
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

const startServer = (port, retryCount = 0) => {
  const server = app
    .listen(port, () => {
      console.log(`Server running on port ${port}`);
      console.log(`Environment: ${process.env.NODE_ENV}`);
      console.log(`Allowed CORS origins: ${allowedOrigins.join(', ')}`);
    })
    .on('error', (error) => {
      if (error.code === 'EADDRINUSE' && retryCount < EFFECTIVE_MAX_PORT_RETRIES) {
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

let activeServer;

const shutdown = (signal) => {
  console.log(`${signal} received. Shutting down gracefully...`);

  if (activeServer) {
    activeServer.close(() => {
      console.log('HTTP server closed.');
      process.exit(0);
    });
    return;
  }

  process.exit(0);
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

const bootstrap = async () => {
  try {
    assertJwtConfig();
    await connectDB();
    activeServer = startServer(DEFAULT_PORT);
  } catch (error) {
    console.error(`Failed to bootstrap server: ${error.message}`);
    process.exit(1);
  }
};

bootstrap();

export default app;
