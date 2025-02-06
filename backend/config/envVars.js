import dotenv from 'dotenv';

dotenv.config();

export const ENV_VARS = {
    MONGO_URI: process.env.MONGO_URI,
    PORT: process.env.PORT || 5000,
    JWT_SECRET: process.env.JWT_SECRET,
    NODE_ENV: process.env.NODE_ENV,
    TMDB_API_KEY: process.env.TMDB_API_KEY,
    TMDB_AUTH_TOKEN: process.env.TMDB_AUTH_TOKEN,
    SITE_URL: process.env.SITE_URL,
    FORCE_HTTPS: process.env.FORCE_HTTPS,
}