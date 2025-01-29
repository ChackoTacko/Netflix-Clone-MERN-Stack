import { fetchFromTMBD } from "../services/tmdb.service.js";
import { StatusCodes } from "http-status-codes";

export async function getTrendingTvShows(req, res) {
    try {
        const data = await fetchFromTMBD('https://api.themoviedb.org/3/trending/tv/day?language=en-US');
        const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)]
        res.status(StatusCodes.OK).json({ success: true, content: randomMovie});
    } catch (error) {
        console.log('Error in getTrendingTvShows controller:', error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Internal Server Error' });
    }
}

export async function getTvShowTrailers(req, res) {
    const { id } = req.params;
    try {
        const data = await fetchFromTMBD(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`);
        res.status(StatusCodes.OK).json({ success: true, content: data.results});
    } catch (error) {
        console.log('Error in getTvShowTrailers controller:', error.message);
        if (error.response && error.response.status === 404) {
            res.status(StatusCodes.NOT_FOUND).json({ success: false, message: 'TV Show not found' });
        } else {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Internal Server Error' });
        }
    }
}

export async function getTvShowDetails(req, res) {
    const { id } = req.params;
    try {
        const data = await fetchFromTMBD(`https://api.themoviedb.org/3/tv/${id}?language=en-US`);
        res.status(StatusCodes.OK).json({ success: true, content: data});
    } catch (error) {
        console.log('Error in getTvShowDetails controller:', error.message);
        if (error.response && error.response.status === 404) {
            res.status(StatusCodes.NOT_FOUND).json({ success: false, message: 'TV Show not found' });
        } else {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Internal Server Error' });
        }
    }
}

export async function getSimilarTvShows(req, res) {
    const { id } = req.params;
    try {
        const data = await fetchFromTMBD(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`);
        res.status(StatusCodes.OK).json({ success: true, similar: data.results});
    } catch (error) {
        console.log('Error in getSimilarTvShows controller:', error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Internal Server Error' });
    }
}

export async function getTvShowsByCategory(req, res) {
    const { category } = req.params;
    try {
        const data = await fetchFromTMBD(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`);
        res.status(StatusCodes.OK).json({ success: true, content: data.results});
    } catch (error) {
        console.log('Error in getTvShowsByCategory controller:', error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Internal Server Error' });
    }
}