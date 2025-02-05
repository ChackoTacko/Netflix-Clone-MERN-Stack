import express from 'express';
import { 
    getMovieDetails,
    getMovieTrailers,
    getMoviesByCategory,
    getSimilarMovies,
    getTrendingMovie,
    getTrendingMovies
} from '../controllers/movie.controller.js';
import { protectedRoute } from '../middleware/protectedRoute.middleware.js';

const router = express.Router();

router.get('/trending', protectedRoute, getTrendingMovie);
router.get('/trendingMovies', getTrendingMovies);
router.get('/:id/details', protectedRoute, getMovieDetails);
router.get('/:id/similar', protectedRoute, getSimilarMovies);
router.get('/:id/trailers', protectedRoute, getMovieTrailers);
router.get('/:category', protectedRoute, getMoviesByCategory);

export default router;