import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';
const localDatabaseUrl = `${process.env.DB_DIALECT}://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;
const databaseUrl = isProduction ? process.env.DATABASE_URL : localDatabaseUrl;
const isSSL = isProduction;

const sequelize = new Sequelize(databaseUrl, {
  ...(isProduction && { dialect: 'postgres' }),
  dialectOptions: isSSL
    ? {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    }
    : {},
  logging: false,
});

async function initializeDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully.");
  } catch (error) {
    console.error(" Unable to connect to the database:", error);
  }
}

initializeDatabase();

export default sequelize;
