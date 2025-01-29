import { fetchFromTMBD } from "../services/tmdb.service.js";
import { StatusCodes } from "http-status-codes";

export async function searchPerson(req, res) {
    const { query } = req.params;
    try {
        const data = await fetchFromTMBD(`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`);
        if (data.results.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ success: false, message: 'No results found' });
        }
        res.status(StatusCodes.OK).json({ success: true, content: data.results});
    } catch (error) {
        console.log('Error in searchPerson controller:', error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Internal Server Error' });
    }
}

export async function searchMovie(req, res) {
    const { query } = req.params;
    console.log(query);
    try {
        const data = await fetchFromTMBD(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`);
        console.log(data);
        if (data.results.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ success: false, message: 'No results found' });
        }
        res.status(StatusCodes.OK).json({ success: true, content: data.results});
    } catch (error) {
        console.log('Error in searchMovie controller:', error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Internal Server Error' });
    }
}


export async function searchTv(req, res) {
    console.log('searchTv controller called');
    const { query } = req.params;
    try {
        const data = await fetchFromTMBD(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`);
        // if (data.results.length === 0) {
        //     return res.status(StatusCodes.NOT_FOUND).json({ success: false, message: 'No results found' });
        // }
        res.status(StatusCodes.OK).json({ success: true, content: data.results});
    } catch (error) {
        console.log('Error in searchTv controller:', error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Internal Server Error' });
    }
}

