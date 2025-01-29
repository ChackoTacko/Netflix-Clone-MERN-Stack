import express from 'express';
import { 
    getTrendingTvShows,
    getTvShowDetails,
    getSimilarTvShows,
    getTvShowTrailers,
    getTvShowsByCategory
} from '../controllers/tv.controller.js';

const router = express.Router();

router.get('/trending', getTrendingTvShows);
router.get('/:id/details', getTvShowDetails);
router.get('/:id/similar', getSimilarTvShows);
router.get('/:id/trailers', getTvShowTrailers);
router.get('/:category', getTvShowsByCategory);

export default router;