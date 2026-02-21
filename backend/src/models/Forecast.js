import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import User from './User.js';

const Forecast = sequelize.define('Forecast', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  forecastName: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true,
  },
  currentAge: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  retirementAge: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  monthlyContribution: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false,
  },
  expectedReturn: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false,
  },
  annuityReturn: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false,
  },
  totalRetirementCorpus: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false,
  },
  lumpSum: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false,
  },
  pensionAmount: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false,
  },
  yearlyPension: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

Forecast.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Forecast, { foreignKey: 'userId' });

export default Forecast;
