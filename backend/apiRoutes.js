import express from 'express';
import authRoutes from './apiRoutes/auth.route.js';
import movieRoutes from './apiRoutes/movie.route.js';
import tvRoutes from './apiRoutes/tv.route.js';
import searchRoutes from './apiRoutes/search.route.js';
import { protectedRoute } from './middleware/protectedRoute.middleware.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/movies', protectedRoute, movieRoutes);
router.use('/tv', protectedRoute, tvRoutes);
router.use('/search', protectedRoute, searchRoutes);

export default router;