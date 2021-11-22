import cluster from 'cluster';
import fs from 'fs';
import http from 'http';
import https from 'https';
import os from 'os';
import path from 'path';

import { App } from '../app';

const serverApp = new App().getApp();

const port = process.env.PORT || '8080';
const portTls = process.env.PORT_TLS || '465';

const server = http.createServer(serverApp);
const serverSsl = https.createServer(
    {
        key: fs.readFileSync(path.join(__dirname, '../certificate/selfsigned.key'), 'utf-8'),
        cert: fs.readFileSync(path.join(__dirname, '../certificate/selfsigned.crt'), 'utf-8'),
    },
    serverApp
);

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
        server.listen(port, () =>
            process.stdout.write(`\n SERVER HTTP RUNNING IN PORT: ${port}\nhttp://localhost:${port} \n\n`)
        );
        serverSsl.listen(portTls, () =>
            process.stdout.write(`\n SERVER HTTPS RUNNING IN PORT: ${portTls}\nhttps://localhost:${portTls}\n\n`)
        );
    }, 1000);
}
