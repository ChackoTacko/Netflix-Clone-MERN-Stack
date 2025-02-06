import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';

import apiRoutes from './apiRoutes.js';
import { connectDB } from './config/db.js';
import { ENV_VARS } from './config/envVars.js';

const app = express();

const PORT = ENV_VARS.PORT
const __dirname = path.resolve();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", apiRoutes);

if (ENV_VARS.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'frontend/dist')));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
    connectDB();
})

