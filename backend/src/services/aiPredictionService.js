const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

const toNumber = (value, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const getRiskLevel = (expectedReturn, yearsToRetirement) => {
  if (expectedReturn >= 12 || yearsToRetirement < 12) {
    return 'High';
  }

  if (expectedReturn >= 9) {
    return 'Moderate';
  }

  return 'Low';
};

const getActionPlan = ({
  yearsToRetirement,
  expectedReturn,
  monthlyContribution,
  totalContribution,
  totalRetirementCorpus,
}) => {
  const actions = [];

  const contributionRatio = totalContribution > 0
    ? (totalRetirementCorpus - totalContribution) / totalContribution
    : 0;

  if (yearsToRetirement > 20) {
    actions.push('Review and rebalance your portfolio once every year to stay aligned with long-term goals.');
  } else {
    actions.push('Shift a part of your portfolio toward lower-volatility assets as retirement approaches.');
  }

  if (expectedReturn >= 12) {
    actions.push('Current return expectation is optimistic; keep a backup plan with lower return assumptions.');
  } else if (expectedReturn <= 8) {
    actions.push('Consider increasing equity exposure gradually if your risk profile allows better long-term growth.');
  }

  if (monthlyContribution < 15000) {
    actions.push('Increasing monthly contributions by 5-10% can materially improve retirement outcomes.');
  }

  if (contributionRatio < 1) {
    actions.push('Projected growth is modest; prioritize contribution consistency and step-up investments annually.');
  }

  return actions.slice(0, 3);
};

export const generateAIPrediction = ({ input, calculation }) => {
  const currentAge = toNumber(input.currentAge);
  const retirementAge = toNumber(input.retirementAge);
  const expectedReturn = toNumber(input.expectedReturn);
  const monthlyContribution = toNumber(input.monthlyContribution);

  const yearsToRetirement = toNumber(calculation.yearsToRetirement, retirementAge - currentAge);
  const totalContribution = toNumber(calculation.totalContribution);
  const totalRetirementCorpus = toNumber(calculation.totalRetirementCorpus);
  const monthlyPension = toNumber(calculation.monthlyPension);

  const riskLevel = getRiskLevel(expectedReturn, yearsToRetirement);

  const confidenceRaw =
    90 -
    Math.abs(expectedReturn - 10) * 3 -
    (riskLevel === 'High' ? 10 : riskLevel === 'Moderate' ? 5 : 0) +
    Math.min(yearsToRetirement, 25) * 0.4;
  const confidenceScore = Math.round(clamp(confidenceRaw, 58, 94));

  const cautiousCorpus = Math.round(totalRetirementCorpus * 0.84);
  const realisticCorpus = Math.round(totalRetirementCorpus * 1.02);
  const optimisticCorpus = Math.round(totalRetirementCorpus * 1.16);

  const cautiousPension = Math.round(monthlyPension * 0.86);
  const realisticPension = Math.round(monthlyPension * 1.01);
  const optimisticPension = Math.round(monthlyPension * 1.14);

  return {
    model: 'RetireWise AI Predictor v1',
    confidenceScore,
    riskLevel,
    projectionBand: {
      cautious: {
        corpus: cautiousCorpus,
        monthlyPension: cautiousPension,
      },
      realistic: {
        corpus: realisticCorpus,
        monthlyPension: realisticPension,
      },
      optimistic: {
        corpus: optimisticCorpus,
        monthlyPension: optimisticPension,
      },
    },
    summary:
      riskLevel === 'High'
        ? 'AI indicates strong upside potential with higher variability; periodic rebalancing is recommended.'
        : riskLevel === 'Moderate'
          ? 'AI indicates balanced growth potential with manageable risk for long-term planning.'
          : 'AI indicates stable long-term growth assumptions with relatively lower volatility.',
    recommendedActions: getActionPlan({
      yearsToRetirement,
      expectedReturn,
      monthlyContribution,
      totalContribution,
      totalRetirementCorpus,
    }),
  };
};

export const generateAIEstimationInsights = ({ input, requiredMonthlyContribution }) => {
  const desiredMonthlyPension = toNumber(input.desiredMonthlyPension);
  const currentAge = toNumber(input.currentAge);
  const retirementAge = toNumber(input.retirementAge);
  const yearsToRetirement = retirementAge - currentAge;

  const confidenceScore = Math.round(clamp(88 - Math.abs(toNumber(input.expectedReturn) - 10) * 2, 60, 93));

  const recommendedRange = {
    lower: Math.round(requiredMonthlyContribution * 0.92),
    target: Math.round(requiredMonthlyContribution),
    upper: Math.round(requiredMonthlyContribution * 1.12),
  };

  const strategicNote =
    yearsToRetirement >= 20
      ? 'A yearly step-up contribution strategy can significantly reduce late-stage funding pressure.'
      : 'With shorter accumulation time, prioritize disciplined monthly contributions and conservative return assumptions.';

  return {
    model: 'RetireWise AI Predictor v1',
    confidenceScore,
    recommendedContributionRange: recommendedRange,
    summary: `AI suggests targeting around ₹${recommendedRange.target.toLocaleString('en-IN')} per month for a pension goal of ₹${desiredMonthlyPension.toLocaleString('en-IN')}.`,
    strategicNote,
  };
};

export const generateAIScenarioInsights = ({ scenarios }) => {
  const conservativeCorpus = toNumber(scenarios?.conservative?.totalRetirementCorpus);
  const moderateCorpus = toNumber(scenarios?.moderate?.totalRetirementCorpus);
  const aggressiveCorpus = toNumber(scenarios?.aggressive?.totalRetirementCorpus);

  const spread = conservativeCorpus > 0
    ? ((aggressiveCorpus - conservativeCorpus) / conservativeCorpus) * 100
    : 0;

  const bestScenario = aggressiveCorpus >= moderateCorpus && aggressiveCorpus >= conservativeCorpus
    ? 'Aggressive'
    : moderateCorpus >= conservativeCorpus
      ? 'Moderate'
      : 'Conservative';

  const balanceScenario = moderateCorpus > 0 && aggressiveCorpus > 0
    ? ((aggressiveCorpus - moderateCorpus) / moderateCorpus) * 100
    : 0;

  return {
    model: 'RetireWise AI Predictor v1',
    confidenceScore: Math.round(clamp(86 - Math.abs(spread - 45) * 0.2, 61, 92)),
    summary: `AI comparison indicates ${bestScenario} strategy yields the highest projected corpus with a ${spread.toFixed(1)}% spread between conservative and aggressive outcomes.`,
    insights: [
      `Scenario spread is ${spread.toFixed(1)}%, indicating ${spread > 40 ? 'high sensitivity' : 'moderate sensitivity'} to return assumptions.`,
      `Moderate plan stays within ${Math.abs(balanceScenario).toFixed(1)}% of aggressive corpus, making it a balanced choice for many investors.`,
      'Revisit your risk mix annually and align allocation with changing goals and retirement horizon.',
    ],
  };
};

export default {
  generateAIPrediction,
  generateAIEstimationInsights,
  generateAIScenarioInsights,
};