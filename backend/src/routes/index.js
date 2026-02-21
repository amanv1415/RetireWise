import express from 'express';
import userRoutes from './userRoutes.js';
import calculatorRoutes from './calculatorRoutes.js';

const router = express.Router();

router.use('/auth', userRoutes);
router.use('/calculator', calculatorRoutes);

export default router;
