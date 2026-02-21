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
  static async register(email, name, password) {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new ValidationError('Email already registered');
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = generateToken(user.id);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    };
  }

  /**
   * Login user
   */
  static async login(email, password) {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new AuthError('Invalid email or password');
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      throw new AuthError('Invalid email or password');
    }

    const token = generateToken(user.id);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    };
  }

  /**
   * Get user profile
   */
  static async getUserProfile(userId) {
    const user = await User.findByPk(userId);

    if (!user) {
      throw new ValidationError('User not found');
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
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
    const forecasts = await Forecast.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
    });
    return forecasts;
  }

  /**
   * Get a specific forecast
   */
  static async getForecast(forecastId, userId) {
    const forecast = await Forecast.findByPk(forecastId);

    if (!forecast) {
      throw new ValidationError('Forecast not found');
    }

    if (forecast.userId !== userId) {
      throw new AuthError('Unauthorized to access this forecast');
    }

    return forecast;
  }

  /**
   * Update a forecast
   */
  static async updateForecast(forecastId, userId, updateData) {
    const forecast = await Forecast.findByPk(forecastId);

    if (!forecast) {
      throw new ValidationError('Forecast not found');
    }

    if (forecast.userId !== userId) {
      throw new AuthError('Unauthorized to update this forecast');
    }

    await forecast.update(updateData);
    return forecast;
  }

  /**
   * Delete a forecast
   */
  static async deleteForecast(forecastId, userId) {
    const forecast = await Forecast.findByPk(forecastId);

    if (!forecast) {
      throw new ValidationError('Forecast not found');
    }

    if (forecast.userId !== userId) {
      throw new AuthError('Unauthorized to delete this forecast');
    }

    await Forecast.destroy({ where: { id: forecastId } });
    return { success: true };
  }
}

export default {
  UserService,
  ForecastService,
};
