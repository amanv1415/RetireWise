import { Sequelize } from 'sequelize';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = Number(process.env.DB_PORT || 3306);
const dbName = process.env.DB_NAME || 'nps_retirement';
const dbUser = process.env.DB_USER || 'root';
const dbPassword = process.env.DB_PASSWORD || '';

const sequelize = new Sequelize(
  dbName,
  dbUser,
  dbPassword,
  {
    host: dbHost,
    port: dbPort,
    dialect: 'mysql',
    logging: false,
  }
);

const ensureDatabaseExists = async () => {
  const connection = await mysql.createConnection({
    host: dbHost,
    port: dbPort,
    user: dbUser,
    password: dbPassword,
  });

  await connection.query(
    `CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`
  );
  await connection.end();
};

const connectDB = async () => {
  try {
    await ensureDatabaseExists();
    await sequelize.authenticate();

    const shouldAlterSchema = process.env.DB_SYNC_ALTER === 'true';

    if (shouldAlterSchema) {
      try {
        await sequelize.sync({ alter: true });
      } catch (syncError) {
        console.warn(
          `Schema alter failed (${syncError.message}). Falling back to safe sync.`
        );
        await sequelize.sync();
      }
    } else {
      await sequelize.sync();
    }

    console.log(`MySQL Connected: ${dbHost}/${dbName}`);
    return sequelize;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
export { sequelize };
