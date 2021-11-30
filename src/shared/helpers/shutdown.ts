import config from '../config/keys/index';

export default function shutdown(signal: any): void {
    if (config.NODE_ENV !== 'production') {
        process.stdout.write(`\nexiting\n`);
        process.exit(0);
    }

    const timeOut = 25 * 10000;

    process.stdout.write(`[shutdown] shutting down in ${timeOut}ms | signal: ${signal}`);

    setTimeout(() => {
        process.stdout.write(`waited ${timeOut}ms, exiting`);
        process.exit(0);
    }, timeOut);
}