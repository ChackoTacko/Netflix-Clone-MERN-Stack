import axios from "axios";
import { useEffect, useState } from "react";

const useGetAuthMedia = () => {
    const [authMedia, setAuthMedia] = useState([]);

    useEffect(() => {
        const fetchAuthMedia = async () => {
            try {
                const response = await axios.get('/api/v1/movies/trendingMovies');
                setAuthMedia(response.data.content);
            } catch (error) {
                setAuthMedia([]);
                console.log('Error fetching trending movies:', error);
            }
        }

        fetchAuthMedia();
    }, []);
    return { authMedia };
};

export default useGetAuthMedia;