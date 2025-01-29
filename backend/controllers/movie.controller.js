import { fetchFromTMBD } from "../services/tmdb.service.js";
import { StatusCodes } from "http-status-codes";

export async function getTrendingMovie(req, res) {
    try {
        const data = await fetchFromTMBD('https://api.themoviedb.org/3/trending/movie/day?language=en-US');
        const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)]
        res.status(StatusCodes.OK).json({ success: true, content: randomMovie});
    } catch (error) {
        console.log('Error in getTrendingMovie controller:', error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Internal Server Error' });
    }
}

export async function getMovieTrailers(req, res) {
    const { id } = req.params;
    try {
        const data = await fetchFromTMBD(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`);
        res.status(StatusCodes.OK).json({ success: true, content: data.results});
    } catch (error) {
        console.log('Error in getMovieTrailers controller:', error.message);
        if (error.response && error.response.status === 404) {
            res.status(StatusCodes.NOT_FOUND).json({ success: false, message: 'Movie not found' });
        } else {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Internal Server Error' });
        }
    }
}

export async function getMovieDetails(req, res) {
    const { id } = req.params;
    try {
        const data = await fetchFromTMBD(`https://api.themoviedb.org/3/movie/${id}?language=en-US`);
        res.status(StatusCodes.OK).json({ success: true, content: data});
    } catch (error) {
        console.log('Error in getMovieDetails controller:', error.message);
        if (error.response && error.response.status === 404) {
            res.status(StatusCodes.NOT_FOUND).json({ success: false, message: 'Movie not found' });
        } else {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Internal Server Error' });
        }
    }
}

export async function getSimilarMovies(req, res) {
    const { id } = req.params;
    try {
        const data = await fetchFromTMBD(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`);
        res.status(StatusCodes.OK).json({ success: true, similar: data.results});
    } catch (error) {
        console.log('Error in getSimilarMovies controller:', error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Internal Server Error' });
    }
}

export async function getMoviesByCategory(req, res) {
    const { category } = req.params;
    try {
        const data = await fetchFromTMBD(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`);
        res.status(StatusCodes.OK).json({ success: true, content: data.results});
    } catch (error) {
        console.log('Error in getMoviesByCategory controller:', error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Internal Server Error' });
    }
}