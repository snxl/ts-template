import '../../shared/config/moduleAlias';

import cluster from 'cluster';
import { Application } from 'express';
import fs from 'fs';
import http, { Server } from 'http';
import https from 'https';
import os from 'os';
import path from 'path';

import { App } from '@src/application/main/app';
import config from '@src/shared/config/keys';
import { logger } from '@src/shared/helpers/pinoLogger';
import shutdown from '@src/shared/helpers/shutdown';

class ServerBin {
    private serverApp: Application;
    private port: string;
    private portTls: string;
    private server: Server;
    private serverSsl: Server;

    constructor() {
        this.cluster();
        this.serverApp = new App().getApp();
        this.port = config.port || '8080';
        this.portTls = config.port_tls || '465';
        this.createServer(this.serverApp);
        this.createServerTls(this.serverApp);
        this.kill();
    }

    private createServer(app: Application) {
        this.server = http.createServer(app);
    }

    private createServerTls(app: Application) {
        this.serverSsl = https.createServer(
            {
                key: fs.readFileSync(path.join(__dirname, '../certificate/selfsigned.key'), 'utf-8'),
                cert: fs.readFileSync(path.join(__dirname, '../certificate/selfsigned.crt'), 'utf-8'),
            },
            app
        );
    }

    private cluster() {
        if (cluster.isPrimary) {
            const number_of_cpus = os.cpus().length;

            logger.info(`Master ${config.pid} is running\n`);
            logger.info(`Forking Server for ${number_of_cpus} CPUs\n`);

            for (let index = 0; index < number_of_cpus; index++) {
                cluster.fork();
            }

            cluster.on('exit', (worker, code) => {
                if (code !== 0 && !worker.exitedAfterDisconnect) {
                    logger.info(`Worker ${worker.process.pid} died\n`);
                    cluster.fork();
                }
            });
        } else {
            this.listner();
        }
    }

    private listner() {
        logger.info(`Process id: ${config.pid}\n`);

        setTimeout(() => {
            this.server.listen(this.port, () => {
                logger.info(`SERVER HTTP RUNNING IN PORT: ${this.port}`);
                logger.info(`http://localhost:${this.port}\n`);
            });
            this.serverSsl.listen(this.portTls, () => {
                logger.info(`SERVER HTTPS RUNNING IN PORT: ${this.portTls}`);
                logger.info(`https://localhost:${this.portTls}\n`);
            });
        }, 1000);
    }

    private kill() {
        process.on('SIGINT', (signal) => shutdown(signal)).on('SIGTERM', (signal) => shutdown(signal));
    }
}

new ServerBin();
