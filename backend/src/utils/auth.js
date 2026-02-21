import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';

/**
 * Hash password
 */
export const hashPassword = async (password) => {
  const salt = await bcryptjs.genSalt(10);
  return bcryptjs.hash(password, salt);
};

/**
 * Compare password
 */
export const comparePassword = async (password, hashedPassword) => {
  return bcryptjs.compare(password, hashedPassword);
};

/**
 * Generate JWT token
 */
export const generateToken = (userId, expiresIn = '7d') => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: expiresIn || process.env.JWT_EXPIRE,
  });
};

/**
 * Verify JWT token
 */
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

export default {
  hashPassword,
  comparePassword,
  generateToken,
  verifyToken,
};
