import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

interface ENV {
    NODE_ENV: string | undefined;
    PORT: number | undefined;
    MONGO_URI: string | undefined;
    DATABASE: string | undefined;
    JWT_SECRET: string | undefined;
    GOOGLE_CLIENT_ID: string | undefined;
    GOOGLE_SECRET: string | undefined;
    GOOGLE_REDIRECT_URL: string | undefined;
    EXPRESS_SESSION_SECRET: string | undefined;
}

interface Config {
    NODE_ENV: string;
    PORT: number;
    MONGO_URI: string;
    DATABASE: string;
    JWT_SECRET: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_SECRET: string;
    GOOGLE_REDIRECT_URL: string;
    EXPRESS_SESSION_SECRET: string;
}

const getConfig = (): ENV => {
    return {
        NODE_ENV: process.env.NODE_ENV,
        PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
        MONGO_URI: process.env.MONGO_URI,
        DATABASE: process.env.DATABASE,
        JWT_SECRET: process.env.JWT_SECRET,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        GOOGLE_SECRET: process.env.GOOGLE_SECRET,
        GOOGLE_REDIRECT_URL: process.env.GOOGLE_REDIRECT_URL,
        EXPRESS_SESSION_SECRET: process.env.EXPRESS_SESSION_SECRET
    };
};

const getSanitizedConfig = (config: ENV): Config => {
    for (const [key, value] of Object.entries(config)) {
        if (value === undefined) {
            throw new Error(`Missing key ${key} in config.env`);
        }
    }
    return config as Config;
};

const config = getConfig();

const sanitizedConfig = getSanitizedConfig(config);

export default sanitizedConfig;
