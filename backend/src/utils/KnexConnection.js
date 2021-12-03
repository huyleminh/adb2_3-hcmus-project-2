import knex from "knex";
import AppConstants from "../shared/AppConstants";

const KnexConnection = knex({
    client: "mssql",
    connection: {
        host: AppConstants.DB_CONFIG.HOST,
        database: AppConstants.DB_CONFIG.NAME,
        port: AppConstants.DB_CONFIG.PORT,
        user: AppConstants.DB_CONFIG.USERNAME,
        password: AppConstants.DB_CONFIG.PASSWORD,
    },
    pool: { min: 0, max: 10 },
});

export default KnexConnection;
