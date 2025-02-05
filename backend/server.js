import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import apiRoutes from './apiRoutes.js';
import { connectDB } from './config/db.js';
import { ENV_VARS } from './config/envVars.js';

const app = express();
const PORT = ENV_VARS.PORT

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", apiRoutes);

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
    connectDB();
})

