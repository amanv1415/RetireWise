import User from '../models/User.js';
import Forecast from '../models/Forecast.js';
import {
  hashPassword,
  comparePassword,
  generateToken,
} from '../utils/auth.js';
import { ValidationError, AuthError } from '../utils/errors.js';

/**
 * User Service - Business logic for user operations
 */
export class UserService {
  /**
   * Register a new user
   */
  static async register(email, name, gender, phone, profileDetails, password) {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ValidationError('Email already registered');
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      name,
      email,
      gender,
      phone,
      dateOfBirth: profileDetails?.dateOfBirth ? new Date(profileDetails.dateOfBirth) : null,
      city: profileDetails?.city || null,
      occupation: profileDetails?.occupation || null,
      password: hashedPassword,
    });

    let token;
    try {
      token = generateToken(user._id.toString());
    } catch (tokenError) {
      await User.deleteOne({ _id: user._id });
      throw tokenError;
    }

    return {
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        gender: user.gender,
        phone: user.phone,
        dateOfBirth: user.dateOfBirth,
        city: user.city,
        occupation: user.occupation,
      },
      token,
    };
  }

  /**
   * Login user
   */
  static async login(email, password) {
    const user = await User.findOne({ email });

    if (!user) {
      throw new AuthError('Invalid email or password');
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      throw new AuthError('Invalid email or password');
    }

    const token = generateToken(user._id.toString());

    return {
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        gender: user.gender,
        phone: user.phone,
        dateOfBirth: user.dateOfBirth,
        city: user.city,
        occupation: user.occupation,
      },
      token,
    };
  }

  /**
   * Get user profile
   */
  static async getUserProfile(userId) {
    const user = await User.findById(userId);

    if (!user) {
      throw new ValidationError('User not found');
    }

    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      gender: user.gender,
      phone: user.phone,
      dateOfBirth: user.dateOfBirth,
      city: user.city,
      occupation: user.occupation,
      createdAt: user.createdAt,
    };
  }
}

/**
 * Forecast Service - Business logic for forecast operations
 */
export class ForecastService {
  /**
   * Create and save a new forecast
   */
  static async createForecast(userId, forecastData, calculationResults) {
    const forecast = await Forecast.create({
      userId,
      ...forecastData,
      totalRetirementCorpus: calculationResults.totalRetirementCorpus,
      lumpSum: calculationResults.lumpSum,
      pensionAmount: calculationResults.monthlyPension,
      yearlyPension: calculationResults.annualPension,
    });

    return forecast;
  }

  /**
   * Get all forecasts for a user
   */
  static async getUserForecasts(userId) {
    const forecasts = await Forecast.find({ userId }).sort({ createdAt: -1 });
    return forecasts;
  }

  /**
   * Get a specific forecast
   */
  static async getForecast(forecastId, userId) {
    const forecast = await Forecast.findById(forecastId);

    if (!forecast) {
      throw new ValidationError('Forecast not found');
    }

    if (String(forecast.userId) !== String(userId)) {
      throw new AuthError('Unauthorized to access this forecast');
    }

    return forecast;
  }

  /**
   * Update a forecast
   */
  static async updateForecast(forecastId, userId, updateData) {
    const forecast = await Forecast.findById(forecastId);

    if (!forecast) {
      throw new ValidationError('Forecast not found');
    }

    if (String(forecast.userId) !== String(userId)) {
      throw new AuthError('Unauthorized to update this forecast');
    }

    Object.assign(forecast, updateData);
    await forecast.save();
    return forecast;
  }

  /**
   * Delete a forecast
   */
  static async deleteForecast(forecastId, userId) {
    const forecast = await Forecast.findById(forecastId);

    if (!forecast) {
      throw new ValidationError('Forecast not found');
    }

    if (String(forecast.userId) !== String(userId)) {
      throw new AuthError('Unauthorized to delete this forecast');
    }

    await Forecast.deleteOne({ _id: forecastId });
    return { success: true };
  }
}

export default {
  UserService,
  ForecastService,
};
