import axios from 'axios'
import { useEffect, useState } from "react";
import { useMediaStore } from "../store/media";

const useGetTrendingMedia = () => {
    const [trendingMedia, setTrendingMedia] = useState();
    const { mediaType } = useMediaStore();

    useEffect(() => {
        const fetchTrending = async () => {
            const response = await axios.get(`/api/v1/${mediaType}/trending`);
            setTrendingMedia(response.data.content);
        }

        fetchTrending();
    }, [mediaType]);

    return { trendingMedia };
}

export default useGetTrendingMedia