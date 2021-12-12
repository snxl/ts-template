import { createClient } from 'redis';

import { logger } from '@src/shared/helpers/pinoLogger';

import config from '../../../shared/config/keys';

(async () => {
    const client = createClient({
        url: config.redis_url,
    });

    setTimeout(async () => {
        client.on('error', (err) => logger.info(`Redis Client Error: ${err}\n`));
        client.on('connect', () => logger.info(`Redis connect in: ${config.pid}\n`));

        await client.connect();
    }, 500);
})();
