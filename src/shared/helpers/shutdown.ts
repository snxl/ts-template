export default function shutdown(signal: any): void {
    const timeOut = 25 * 10000;

    process.stdout.write(`[shutdown] shutting down in ${timeOut}ms | signal: ${signal}`);

    setTimeout(() => {
        process.stdout.write(`waited ${timeOut}ms, exiting`);
        process.exit(0);
    }, timeOut);
}
