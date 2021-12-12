import config from '../config/keys/index';
import { logger } from './pinoLogger';

export default function shutdown(signal: string): void {
    if (config.NODE_ENV !== 'production') {
        logger.info(`exiting\n`);
        process.exit(0);
    }

    const timeOut = 25 * 10000;

    logger.info(`[shutdown] shutting down in ${timeOut}ms | signal: ${signal}`);

    setTimeout(() => {
        logger.info(`waited ${timeOut}ms, exiting\n`);
        process.exit(0);
    }, timeOut);
}
