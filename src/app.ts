import cors from 'cors';
import dotenv from 'dotenv';
import express, { Application } from 'express';
import httpContext from 'express-http-context';
import logger from 'morgan';
import path from 'path';

import 'express-async-errors';

import './database/postgres';

import Route from './routes/index.routes';

dotenv.config();

export class App {
    constructor(private app: Application) {
        this.app = express();
        this.middlewares();
        this.routes();
    }

    private middlewares() {
        this.app.use(
            cors({
                origin: '*',
            })
        );
        this.app.use(logger('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.static(path.join(__dirname, 'src/public')));
        this.app.use(httpContext.middleware);
    }

    private routes() {
        this.app.use(Route.router);
    }

    public getApp() {
        return this.app;
    }
}
