import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const isPlaceholderSecret = (value) => {
  if (!value || !value.trim()) {
    return true;
  }

  const normalized = value.trim().toLowerCase();
  return (
    normalized === 'your_jwt_secret_key_here_change_in_production' ||
    normalized === 'replace_with_long_random_secret' ||
    normalized === 'replace_with_a_long_random_secret'
  );
};

const getJwtSecret = () => {
  const secret =
    process.env.JWT_SECRET ||
    process.env.SECRET_KEY ||
    process.env.JWT_PRIVATE_KEY;

  if (secret && secret.trim()) {
    return secret;
  }

  if (process.env.NODE_ENV !== 'production') {
    return 'dev_only_jwt_secret_change_me';
  }

  throw new Error(
    'JWT secret is not configured. Set JWT_SECRET (or SECRET_KEY/JWT_PRIVATE_KEY) in environment variables.'
  );
};

export const assertJwtConfig = () => {
  const secret = getJwtSecret();

  if (process.env.NODE_ENV === 'production' && isPlaceholderSecret(secret)) {
    console.warn(
      'Warning: Placeholder JWT secret is being used in production. Set a strong JWT_SECRET.'
    );
  }

  return true;
};

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
  return jwt.sign({ userId }, getJwtSecret(), {
    expiresIn: expiresIn || process.env.JWT_EXPIRE,
  });
};

/**
 * Verify JWT token
 */
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, getJwtSecret());
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

export default {
  hashPassword,
  comparePassword,
  generateToken,
  verifyToken,
  assertJwtConfig,
};
