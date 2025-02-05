import { User } from "../models/user.model.js";
import { fetchFromTMBD } from "../services/tmdb.service.js";
import { StatusCodes } from "http-status-codes";

export async function searchPerson(req, res) {
    const { query } = req.params;
    try {
        const data = await fetchFromTMBD(`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`);
        
        if (data.results.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ success: false, message: 'No results found' });
        }

        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: data.results[0].id,
                    image: data.results[0].profile_path,
                    title: data.results[0].name,
                    searchType: 'person',
                    createdAt: new Date()
                }
            }
        });

        res.status(StatusCodes.OK).json({ success: true, content: data.results});
    } catch (error) {
        console.log('Error in searchPerson controller:', error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Internal Server Error' });
    }
}

export async function searchMovie(req, res) {
    const { query } = req.params;
    try {
        const data = await fetchFromTMBD(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`);

        if (data.results.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ success: false, message: 'No results found' });
        }

        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: data.results[0].id,
                    image: data.results[0].poster_path,
                    title: data.results[0].title,
                    searchType: 'movie',
                    createdAt: new Date()
                }
            }
        });

        res.status(StatusCodes.OK).json({ success: true, content: data.results});
    } catch (error) {
        console.log('Error in searchMovie controller:', error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Internal Server Error' });
    }
}

export async function searchTv(req, res) {
    const { query } = req.params;
    try {
        const data = await fetchFromTMBD(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`);
       
        if (data.results.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ success: false, message: 'No results found' });
        }

        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: data.results[0].id,
                    image: data.results[0].poster_path,
                    title: data.results[0].name,
                    searchType: 'tv',
                    createdAt: new Date()
                }
            }
        });
        res.status(StatusCodes.OK).json({ success: true, content: data.results});
    } catch (error) {
        console.log('Error in searchTv controller:', error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Internal Server Error' });
    }
}

export async function getSearchHistory(req, res) {
    try {
        res.status(StatusCodes.OK).json({ success: true, content: req.user.searchHistory});
    } catch (error) {
        console.log('Error in getSearchHistory controller:', error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Internal Server Error' });
    }
}

export async function removeItemFromSearchHistory(req, res) {
    const { id } = req.params;

    try {
        await User.findByIdAndUpdate(req.user._id, {
            $pull: {
                searchHistory: {
                    id: parseInt(id)
                }
            }
        });

        res.status(StatusCodes.OK).json({ success: true, message: 'Item removed from search history' });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Internal Server Error' });
    }
}