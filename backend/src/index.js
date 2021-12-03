import cors from "cors";
import express from "express";
import morgan from "morgan";
import AppControllers from "./controllers/index.js";
import AppConstants from "./shared/AppConstants.js";

class AppServer {
    constructor() {
        this.app = express();
        this.port = AppConstants.PORT || 5000;
    }

    initializeGlobalMiddlewares() {
        this.app.use(express.json()); // parsing application/json
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(
            morgan(
                "[:date[web]] :remote-addr :method :url :status :res[content-length] - :response-time ms"
            )
        );
        this.app.use(
            cors({
                origin: AppConstants.AUTH_CLIENT_URL,
                credentials: true,
                methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
                allowedHeaders: [
                    "Origin",
                    "X-Requested-With",
                    "Content-Type",
                    "Accept",
                    "Authorization",
                ],
            })
        );
    }

    initializeControllers() {
        AppControllers.forEach((controller) => {
            this.app.use("/", controller._router);
        });
    }

    start() {
        this.initializeGlobalMiddlewares();
        this.initializeControllers();
        this.app.listen(this.port, () => {
            console.log(`Server is listening on http://localhost:${this.port}`);
        });
    }
}

const appServer = new AppServer();
appServer.start();
