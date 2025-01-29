import express from 'express';
import authRoutes from './apiRoutes/auth.route.js';
import movieRoutes from './apiRoutes/movie.route.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/movies', movieRoutes);

export default router;