import dotenv from "dotenv";

dotenv.config();

class AppConstants {
    static get PORT() {
        return Number.parseInt(process.env.PORT);
    }

    static get AUTH_CLIENT_URL() {
        return process.env.AUTH_CLIENT_URL;
    }

    static get SECRET_KEY() {
        return process.env.JWT_SECRET_KEY;
    }

    static get SECRET_REFRESH_KEY() {
        return process.env.JWT_SECRET_REFRESH_KEY;
    }

    static get DB_CONFIG() {
        return {
            HOST: process.env.DB_HOST,
            NAME: process.env.DB_NAME,
            PORT: Number.parseInt(process.env.DB_PORT),
            USERNAME: process.env.DB_USERNAME,
            PASSWORD: process.env.DB_PASSWORD,
        };
    }
}

export default AppConstants;
