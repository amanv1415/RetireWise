/**
 * Error handling utilities
 */

export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Validation error for invalid inputs
 */
export class ValidationError extends AppError {
  constructor(message) {
    super(message, 400);
    this.name = 'ValidationError';
  }
}

/**
 * Resource not found error
 */
export class NotFoundError extends AppError {
  constructor(resource = 'Resource') {
    super(`${resource} not found`, 404);
    this.name = 'NotFoundError';
  }
}

/**
 * Authentication error
 */
export class AuthError extends AppError {
  constructor(message = 'Authentication failed') {
    super(message, 401);
    this.name = 'AuthError';
  }
}

/**
 * Authorization error
 */
export class AuthorizationError extends AppError {
  constructor(message = 'You do not have permission to perform this action') {
    super(message, 403);
    this.name = 'AuthorizationError';
  }
}

/**
 * Validate input data
 */
export const validateCalculationInput = (data) => {
  const {
    currentAge,
    retirementAge,
    monthlyContribution,
    expectedReturn,
    annuityReturn,
  } = data;

  const errors = [];

  if (!currentAge || currentAge < 18 || currentAge > 75) {
    errors.push('Current age must be between 18 and 75');
  }

  if (!retirementAge || retirementAge <= currentAge || retirementAge > 80) {
    errors.push('Retirement age must be greater than current age and not exceed 80');
  }

  if (monthlyContribution === undefined || monthlyContribution < 0) {
    errors.push('Monthly contribution must be a non-negative number');
  }

  if (!expectedReturn || expectedReturn < 0 || expectedReturn > 30) {
    errors.push('Expected return must be between 0 and 30 percent');
  }

  if (!annuityReturn || annuityReturn < 0 || annuityReturn > 30) {
    errors.push('Annuity return must be between 0 and 30 percent');
  }

  if (errors.length > 0) {
    throw new ValidationError(errors.join('; '));
  }

  return {
    currentAge: Math.floor(currentAge),
    retirementAge: Math.floor(retirementAge),
    monthlyContribution: Math.round(monthlyContribution * 100) / 100,
    expectedReturn: Math.round(expectedReturn * 100) / 100,
    annuityReturn: Math.round(annuityReturn * 100) / 100,
  };
};

export default {
  AppError,
  ValidationError,
  NotFoundError,
  AuthError,
  AuthorizationError,
  validateCalculationInput,
};
