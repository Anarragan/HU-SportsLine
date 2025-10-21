import { createClient } from '@supabase/supabase-js';
import { Sequelize } from 'sequelize';
import { initModels } from '../models/index.js';
import * as dotenv from 'dotenv';

dotenv.config();

export const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
);

// create a Sequelize instance (replace DATABASE_URL or env parts as needed)
export const sequelize = new Sequelize(
    process.env.DB_NAME!,
    process.env.DB_USER!,
    process.env.DB_PASSWORD!,
    {
        host: process.env.DB_HOST!,
        port: Number(process.env.DB_PORT!),
        dialect: 'postgres',
        logging: false,
    }
);

export async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log('Connection to the database has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

export const db = initModels(sequelize);