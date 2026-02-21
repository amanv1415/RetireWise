import express from 'express';
import {
  register,
  login,
  getProfile,
} from '../controllers/userController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

/**
 * Public routes
 */
router.post('/register', register);
router.post('/login', login);

/**
 * Protected routes
 */
router.get('/profile', authenticate, getProfile);

export default router;
