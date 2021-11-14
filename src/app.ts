import cors from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";
import logger from "morgan";
import path from "path";

import Route from "./routes/index.routes";

dotenv.config();

export class App {
    public app: Express;

    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(logger("dev"));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(express.static(path.join(__dirname, "src/public")));
    }

    routes() {
        this.app.use(Route.router);
    }
}
