import mongoose from 'mongoose';

const forecastSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    forecastName: {
      type: String,
      required: true,
      trim: true,
    },
    currentAge: {
      type: Number,
      required: true,
    },
    retirementAge: {
      type: Number,
      required: true,
    },
    monthlyContribution: {
      type: Number,
      required: true,
    },
    expectedReturn: {
      type: Number,
      required: true,
    },
    annuityReturn: {
      type: Number,
      required: true,
    },
    totalRetirementCorpus: {
      type: Number,
      required: true,
    },
    lumpSum: {
      type: Number,
      required: true,
    },
    pensionAmount: {
      type: Number,
      required: true,
    },
    yearlyPension: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Forecast = mongoose.models.Forecast || mongoose.model('Forecast', forecastSchema);

export default Forecast;
