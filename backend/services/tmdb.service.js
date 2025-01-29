import axios from 'axios'
import { ENV_VARS } from '../config/envVars.js';

export const fetchFromTMBD = async (url) => {
    const response = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${ENV_VARS.TMDB_API_KEY}`,
            accept: 'application/json',
        }
    })

    if (response.status !== 200) {
        throw new Error('Failed to fetch data from TMDB' + response.statusText);
    }

    return response.data;
}