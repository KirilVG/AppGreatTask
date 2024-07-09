import dotenv from "dotenv";
import type { IConfig, IEnvironmentConfig } from "../types.js";

dotenv.config();

const development: IEnvironmentConfig = {
    port: Number(process.env.PORT) || 8080,
    saltRounds: 10,
    connectionString: process.env.MONGODB_URI || "mongodb://localhost:27017/mydatabase"
};

const production: IEnvironmentConfig = {
    port: 80,
    saltRounds: 10,
    connectionString: process.env.MONGODB_URI || "mongodb://localhost:27017/mydatabase"
};

const config: IConfig = { development, production };

export default config;