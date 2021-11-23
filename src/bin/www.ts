import cluster from 'cluster';
import { Application } from 'express';
import fs from 'fs';
import http, { Server } from 'http';
import https from 'https';
import os from 'os';
import path from 'path';

import { App } from '../app';

class ServerBin {
    private serverApp: Application;
    private port: string;
    private portTls: string;
    private server: Server;
    private serverSsl: Server;

    constructor() {
        this.cluster();
        this.serverApp = new App().getApp();
        this.port = process.env.PORT || '8080';
        this.portTls = process.env.PORT_TLS || '465';
        this.createServer(this.serverApp);
        this.createServerTls(this.serverApp);
    }

    private createServer(app) {
        this.server = http.createServer(app);
    }

    private createServerTls(app) {
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

            console.log(`\nMaster ${process.pid} is running\n`);
            console.log(`\nForking Server for ${number_of_cpus} CPUs\n`);

            for (let index = 0; index < number_of_cpus; index++) {
                cluster.fork();
            }

            cluster.on('exit', (worker, code) => {
                if (code !== 0 && !worker.exitedAfterDisconnect) {
                    console.log(`\nWorker ${worker.process.pid} died\n`);
                    cluster.fork();
                }
            });
        } else {
            console.log(`\nProcess id: ${process.pid}\n`);

            setTimeout(() => {
                this.server.listen(this.port, () =>
                    process.stdout.write(`\n SERVER HTTP RUNNING IN PORT: ${this.port}\nhttp://localhost:${this.port} \n\n`)
                );
                this.serverSsl.listen(this.portTls, () =>
                    process.stdout.write(
                        `\n SERVER HTTPS RUNNING IN PORT: ${this.portTls}\nhttps://localhost:${this.portTls}\n\n`
                    )
                );
            }, 1000);
        }
    }
}

new ServerBin();
