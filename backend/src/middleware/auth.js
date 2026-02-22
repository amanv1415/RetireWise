import { verifyToken } from '../utils/auth.js';
import { AuthError } from '../utils/errors.js';
import User from '../models/User.js';

/**
 * Authentication middleware - verify JWT token
 */
export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AuthError('No token provided');
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);

    const user = await User.findById(decoded.userId);
    if (!user) {
      throw new AuthError('User not found');
    }

    req.userId = decoded.userId;
    req.user = user;
    next();
  } catch (error) {
    res.status(error.statusCode || 401).json({
      success: false,
      message: error.message || 'Authentication failed',
    });
  }
};

/**
 * Error handling middleware
 */
export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

/**
 * Validate request body
 */
export const validateRequest = (schema) => {
  return (req, res, next) => {
    try {
      const { error, value } = schema.validate(req.body, { abortEarly: false });
      if (error) {
        const messages = error.details.map((d) => d.message).join('; ');
        return res.status(400).json({ success: false, message: messages });
      }
      req.validatedData = value;
      next();
    } catch (error) {
      res.status(400).json({ success: false, message: 'Validation failed' });
    }
  };
};

export default {
  authenticate,
  errorHandler,
  validateRequest,
};
