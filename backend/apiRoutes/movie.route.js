import express from 'express';
import { 
    getMovieDetails,
    getMovieTrailers,
    getMoviesByCategory,
    getSimilarMovies,
    getTrendingMovie,
} from '../controllers/movie.controller.js';

const router = express.Router();

router.get('/trending', getTrendingMovie);
router.get('/:id/details', getMovieDetails);
router.get('/:id/similar', getSimilarMovies);
router.get('/:id/trailers', getMovieTrailers);
router.get('/:category', getMoviesByCategory);

export default router;