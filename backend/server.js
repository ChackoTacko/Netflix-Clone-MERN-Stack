import express from 'express';

import apiRoutes from './apiRoutes.js';
import { connectDB } from './config/db.js';
import { ENV_VARS } from './config/envVars.js';

const app = express();
const PORT = ENV_VARS.PORT

app.use(express.json());

app.use("/api/v1", apiRoutes);

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
    connectDB();
})

