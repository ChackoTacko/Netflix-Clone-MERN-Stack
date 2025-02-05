import axios from 'axios'
import { useEffect, useState } from "react";
import { useMediaStore } from "../store/media";

const useGetCategoryMedia = (category ) => {
    const [categoryMedia, setCategoryMedia] = useState();
    const { mediaType } = useMediaStore();

    useEffect(() => {
        const fetchCategory = async () => {
            const response = await axios.get(`/api/v1/${mediaType}/${category}`);
            setCategoryMedia(response.data.content);
        }

        fetchCategory();
    }, [mediaType]);

    return { categoryMedia };
}

export default useGetCategoryMedia