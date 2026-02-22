import { UserService } from '../services/index.js';

/**
 * User Controller
 */

/**
 * Register a new user
 */
export const register = async (req, res) => {
  try {
    const {
      email,
      name,
      gender,
      phone,
      dateOfBirth,
      city,
      occupation,
      password,
      confirmPassword,
    } = req.body;

    if (!email || !name || !gender || !phone || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    if (!dateOfBirth || !city || !occupation) {
      return res.status(400).json({
        success: false,
        message: 'Please fill all profile fields',
      });
    }

    const allowedGenders = ['male', 'female', 'other', 'prefer-not-to-say'];
    if (!allowedGenders.includes(String(gender).toLowerCase())) {
      return res.status(400).json({
        success: false,
        message: 'Please select a valid gender option',
      });
    }

    const normalizedPhone = String(phone).replace(/\D/g, '');
    if (normalizedPhone.length < 10 || normalizedPhone.length > 15) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid phone number',
      });
    }

    const parsedDob = new Date(dateOfBirth);
    const today = new Date();
    if (Number.isNaN(parsedDob.getTime()) || parsedDob > today) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid date of birth',
      });
    }

    if (String(city).trim().length > 100) {
      return res.status(400).json({
        success: false,
        message: 'City name is too long',
      });
    }

    if (String(occupation).trim().length > 120) {
      return res.status(400).json({
        success: false,
        message: 'Occupation is too long',
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Passwords do not match',
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters long',
      });
    }

    const result = await UserService.register(
      email,
      name,
      String(gender).toLowerCase(),
      normalizedPhone,
      {
        dateOfBirth: dateOfBirth || null,
        city: city?.trim() || null,
        occupation: occupation?.trim() || null,
      },
      password
    );

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: result,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Registration failed',
    });
  }
};

/**
 * Login user
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
    }

    const result = await UserService.login(email, password);

    res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      data: result,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Login failed',
    });
  }
};

/**
 * Get current user profile
 */
export const getProfile = async (req, res) => {
  try {
    const user = await UserService.getUserProfile(req.userId);

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Failed to fetch profile',
    });
  }
};

export default {
  register,
  login,
  getProfile,
};
