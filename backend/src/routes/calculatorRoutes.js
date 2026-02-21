import express from 'express';
import {
  calculateRetirementForecast,
  estimateContribution,
  getScenarioComparison,
  saveForecast,
  getUserForecasts,
  getForecast,
  deleteForecast,
} from '../controllers/calculatorController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

/**
 * Public routes - anyone can calculate without logging in
 */
router.post('/calculate', calculateRetirementForecast);
router.post('/estimate', estimateContribution);
router.post('/scenario', getScenarioComparison);

/**
 * Protected routes - require authentication
 */
router.post('/save-forecast', authenticate, saveForecast);
router.get('/forecasts', authenticate, getUserForecasts);
router.get('/forecasts/:forecastId', authenticate, getForecast);
router.delete('/forecasts/:forecastId', authenticate, deleteForecast);

export default router;
