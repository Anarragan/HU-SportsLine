import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './routes/index.js';

export const createApp = () => {
    const app = express();
    app.use(cors());
    app.use(cookieParser());
    app.use(express.json());
    app.use("/", router);
    return app;
};