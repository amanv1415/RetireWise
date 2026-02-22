import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoUri =
  process.env.MONGODB_URL ||
  process.env.MONGODB_URI ||
  'mongodb://127.0.0.1:27017/retirewise';
const dbStatus = {
  connected: false,
  host: null,
  database: null,
  lastCheckedAt: null,
  error: null,
};

const connectDB = async () => {
  try {
    await mongoose.connect(mongoUri);

    const { host, name } = mongoose.connection;

    dbStatus.connected = true;
    dbStatus.host = host;
    dbStatus.database = name;
    dbStatus.lastCheckedAt = new Date().toISOString();
    dbStatus.error = null;

    console.log(`MongoDB Connected: ${host}/${name}`);
    return mongoose.connection;
  } catch (error) {
    dbStatus.connected = false;
    dbStatus.lastCheckedAt = new Date().toISOString();
    dbStatus.error = error.message;
    console.error(`Error: ${error.message}`);
    throw error;
  }
};

const getDatabaseStatus = () => ({ ...dbStatus });

export default connectDB;
export { getDatabaseStatus };
