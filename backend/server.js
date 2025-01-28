import express from 'express';

// Routes
import apiRoutes from './apiRoutes.js';

const app = express();

app.use("/api/v1", apiRoutes);

app.listen(5000, () => console.log('Server started at http://localhost:3000'))