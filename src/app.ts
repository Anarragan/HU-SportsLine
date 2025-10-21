import express from 'express';
import cors from 'cors';
import router from './routes/index.js';

export const createApp = () => {
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use("/", router);
    return app;
};