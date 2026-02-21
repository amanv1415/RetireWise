/**
 * Financial calculation utilities for NPS retirement planning
 */

/**
 * Calculate future value using compound interest formula
 * FV = P * [(1 + r/100)^n]
 * Where:
 * - P = monthly contribution
 * - r = annual return rate
 * - n = number of months
 * @param {number} monthlyContribution - Monthly contribution amount
 * @param {number} annualReturnRate - Annual return rate (percentage)
 * @param {number} years - Number of years
 * @returns {number} Future value (retirement corpus)
 */
export const calculateFutureValue = (monthlyContribution, annualReturnRate, years) => {
  const monthlyRate = annualReturnRate / 100 / 12;
  const numberOfPayments = years * 12;

  if (monthlyRate === 0) {
    return monthlyContribution * numberOfPayments;
  }

  // Future value of annuity formula
  const futureValue =
    monthlyContribution *
    (((1 + monthlyRate) ** numberOfPayments - 1) / monthlyRate);

  return Math.round(futureValue * 100) / 100;
};

/**
 * Calculate lump sum amount (60% of corpus)
 * @param {number} totalCorpus - Total retirement corpus
 * @returns {number} Lump sum amount
 */
export const calculateLumpSum = (totalCorpus) => {
  return Math.round(totalCorpus * 0.6 * 100) / 100;
};

/**
 * Calculate annual pension amount
 * From remaining 40% corpus at annuity rate
 * @param {number} totalCorpus - Total retirement corpus
 * @param {number} annuityRate - Annuity rate (percentage)
 * @returns {number} Annual pension amount
 */
export const calculatePension = (totalCorpus, annuityRate) => {
  const remainingCorpus = totalCorpus * 0.4;
  const annualPension = (remainingCorpus * annuityRate) / 100;
  return Math.round(annualPension * 100) / 100;
};

/**
 * Calculate monthly pension amount
 * @param {number} annualPension - Annual pension amount
 * @returns {number} Monthly pension amount
 */
export const calculateMonthlyPension = (annualPension) => {
  return Math.round((annualPension / 12) * 100) / 100;
};

/**
 * Complete retirement calculation
 * @param {object} data - Input data
 * @param {number} data.currentAge - Current age
 * @param {number} data.retirementAge - Retirement age
 * @param {number} data.monthlyContribution - Monthly contribution
 * @param {number} data.expectedReturn - Expected annual return
 * @param {number} data.annuityReturn - Annuity return rate
 * @returns {object} Calculation results
 */
export const calculateRetirement = ({
  currentAge,
  retirementAge,
  monthlyContribution,
  expectedReturn,
  annuityReturn,
}) => {
  const yearsToRetirement = retirementAge - currentAge;

  if (yearsToRetirement <= 0) {
    throw new Error('Retirement age must be greater than current age');
  }

  const totalRetirementCorpus = calculateFutureValue(
    monthlyContribution,
    expectedReturn,
    yearsToRetirement
  );

  const lumpSum = calculateLumpSum(totalRetirementCorpus);
  const annualPension = calculatePension(totalRetirementCorpus, annuityReturn);
  const monthlyPension = calculateMonthlyPension(annualPension);

  return {
    totalRetirementCorpus,
    lumpSum,
    annualPension,
    monthlyPension,
    yearsToRetirement,
    totalContribution: monthlyContribution * yearsToRetirement * 12,
  };
};

/**
 * Calculate scenarios for comparison (Conservative, Moderate, Aggressive)
 * @param {object} data - Input data
 * @returns {object} Scenario results
 */
export const calculateScenarios = ({
  currentAge,
  retirementAge,
  monthlyContribution,
  annuityReturn,
}) => {
  const conservative = calculateRetirement({
    currentAge,
    retirementAge,
    monthlyContribution,
    expectedReturn: 8,
    annuityReturn,
  });

  const moderate = calculateRetirement({
    currentAge,
    retirementAge,
    monthlyContribution,
    expectedReturn: 10,
    annuityReturn,
  });

  const aggressive = calculateRetirement({
    currentAge,
    retirementAge,
    monthlyContribution,
    expectedReturn: 12,
    annuityReturn,
  });

  return { conservative, moderate, aggressive };
};

/**
 * Calculate required monthly contribution for desired pension
 * @param {number} desiredMonthlyPension - Desired monthly pension amount
 * @param {number} currentAge - Current age
 * @param {number} retirementAge - Retirement age
 * @param {number} expectedReturn - Expected annual return
 * @param {number} annuityReturn - Annuity return rate
 * @returns {number} Required monthly contribution
 */
export const calculateRequiredContribution = (
  desiredMonthlyPension,
  currentAge,
  retirementAge,
  expectedReturn,
  annuityReturn
) => {
  const desiredAnnualPension = desiredMonthlyPension * 12;
  // From pension = (corpus * 0.4 * annuityReturn) / 100
  // corpus = (annualPension * 100) / (0.4 * annuityRate)
  const requiredCorpus = (desiredAnnualPension * 100) / (0.4 * annuityReturn);

  const yearsToRetirement = retirementAge - currentAge;
  const monthlyRate = expectedReturn / 100 / 12;
  const numberOfPayments = yearsToRetirement * 12;

  if (monthlyRate === 0) {
    return Math.round((requiredCorpus / numberOfPayments) * 100) / 100;
  }

  // Reverse of FV annuity formula
  const monthlyContribution = requiredCorpus /
    (((1 + monthlyRate) ** numberOfPayments - 1) / monthlyRate);

  return Math.round(monthlyContribution * 100) / 100;
};

/**
 * Calculate inflation-adjusted value
 * @param {number} currentValue - Current value
 * @param {number} inflationRate - Annual inflation rate (percentage)
 * @param {number} years - Number of years
 * @returns {number} Inflation-adjusted value
 */
export const calculateInflationAdjusted = (currentValue, inflationRate, years) => {
  const inflationMultiplier = (1 + inflationRate / 100) ** years;
  return Math.round(currentValue * inflationMultiplier * 100) / 100;
};

export default {
  calculateFutureValue,
  calculateLumpSum,
  calculatePension,
  calculateMonthlyPension,
  calculateRetirement,
  calculateScenarios,
  calculateRequiredContribution,
  calculateInflationAdjusted,
};
