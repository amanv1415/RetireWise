import {
  calculateRetirement,
  calculateScenarios,
  calculateRequiredContribution,
} from '../utils/financialCalculations.js';
import { validateCalculationInput } from '../utils/errors.js';
import { ForecastService } from '../services/index.js';
import {
  generateAIPrediction,
  generateAIEstimationInsights,
  generateAIScenarioInsights,
} from '../services/aiPredictionService.js';

/**
 * Calculator Controller - Handle calculation endpoints
 */

/**
 * Calculate retirement corpus and pension
 */
export const calculateRetirementForecast = async (req, res) => {
  try {
    const {
      currentAge,
      retirementAge,
      monthlyContribution,
      expectedReturn,
      annuityReturn,
    } = req.body;

    // Validate input
    const validatedInput = validateCalculationInput({
      currentAge,
      retirementAge,
      monthlyContribution,
      expectedReturn,
      annuityReturn,
    });

    // Perform calculations
    const results = calculateRetirement({
      ...validatedInput,
    });

    const aiPrediction = generateAIPrediction({
      input: validatedInput,
      calculation: results,
    });

    res.status(200).json({
      success: true,
      message: 'Calculation completed successfully',
      data: {
        ...results,
        aiPrediction,
      },
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Calculation failed',
    });
  }
};

/**
 * Calculate required monthly contribution for desired pension
 */
export const estimateContribution = async (req, res) => {
  try {
    const {
      desiredMonthlyPension,
      currentAge,
      retirementAge,
      expectedReturn,
      annuityReturn,
    } = req.body;

    if (!desiredMonthlyPension || desiredMonthlyPension <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Valid desired monthly pension is required',
      });
    }

    const validatedInput = validateCalculationInput({
      currentAge,
      retirementAge,
      monthlyContribution: 1, // Dummy value for validation
      expectedReturn,
      annuityReturn,
    });

    const requiredContribution = calculateRequiredContribution(
      desiredMonthlyPension,
      validatedInput.currentAge,
      validatedInput.retirementAge,
      validatedInput.expectedReturn,
      validatedInput.annuityReturn
    );

    const aiContributionInsights = generateAIEstimationInsights({
      input: {
        desiredMonthlyPension,
        ...validatedInput,
      },
      requiredMonthlyContribution: requiredContribution,
    });

    res.status(200).json({
      success: true,
      message: 'Contribution estimation completed',
      data: {
        desiredMonthlyPension,
        requiredMonthlyContribution: requiredContribution,
        aiContributionInsights,
      },
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Estimation failed',
    });
  }
};

/**
 * Get scenario comparison (Conservative, Moderate, Aggressive)
 */
export const getScenarioComparison = async (req, res) => {
  try {
    const {
      currentAge,
      retirementAge,
      monthlyContribution,
      annuityReturn,
    } = req.body;

    const validatedInput = validateCalculationInput({
      currentAge,
      retirementAge,
      monthlyContribution,
      expectedReturn: 10, // Dummy for validation
      annuityReturn,
    });

    const scenarios = calculateScenarios({
      currentAge: validatedInput.currentAge,
      retirementAge: validatedInput.retirementAge,
      monthlyContribution: validatedInput.monthlyContribution,
      annuityReturn: validatedInput.annuityReturn,
    });

    const aiScenarioInsights = generateAIScenarioInsights({ scenarios });

    res.status(200).json({
      success: true,
      message: 'Scenario comparison completed',
      data: {
        ...scenarios,
        aiScenarioInsights,
      },
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Scenario comparison failed',
    });
  }
};

/**
 * Save a forecast
 */
export const saveForecast = async (req, res) => {
  try {
    const userId = req.userId;
    const {
      forecastName,
      currentAge,
      retirementAge,
      monthlyContribution,
      expectedReturn,
      annuityReturn,
    } = req.body;

    if (!forecastName || typeof forecastName !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Forecast name is required',
      });
    }

    const validatedInput = validateCalculationInput({
      currentAge,
      retirementAge,
      monthlyContribution,
      expectedReturn,
      annuityReturn,
    });

    const calculationResults = calculateRetirement(validatedInput);

    const forecast = await ForecastService.createForecast(
      userId,
      {
        forecastName,
        ...validatedInput,
      },
      calculationResults
    );

    res.status(201).json({
      success: true,
      message: 'Forecast saved successfully',
      data: forecast,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Failed to save forecast',
    });
  }
};

/**
 * Get all user forecasts
 */
export const getUserForecasts = async (req, res) => {
  try {
    const userId = req.userId;

    const forecasts = await ForecastService.getUserForecasts(userId);

    res.status(200).json({
      success: true,
      data: forecasts,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Failed to fetch forecasts',
    });
  }
};

/**
 * Get a specific forecast
 */
export const getForecast = async (req, res) => {
  try {
    const userId = req.userId;
    const { forecastId } = req.params;

    const forecast = await ForecastService.getForecast(forecastId, userId);

    res.status(200).json({
      success: true,
      data: forecast,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Failed to fetch forecast',
    });
  }
};

/**
 * Delete a forecast
 */
export const deleteForecast = async (req, res) => {
  try {
    const userId = req.userId;
    const { forecastId } = req.params;

    await ForecastService.deleteForecast(forecastId, userId);

    res.status(200).json({
      success: true,
      message: 'Forecast deleted successfully',
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Failed to delete forecast',
    });
  }
};

export default {
  calculateRetirementForecast,
  estimateContribution,
  getScenarioComparison,
  saveForecast,
  getUserForecasts,
  getForecast,
  deleteForecast,
};
