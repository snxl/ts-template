import { createClient } from 'redis';

import config from '../../../shared/config/keys';

(async () => {
    const client = createClient({
        url: config.redis_url,
    });

    setTimeout(async () => {
        client.on('error', (err) => process.stdout.write(`Redis Client Error: ${err}\n`));
        client.on('connect', () => process.stdout.write(`Redis connect in: ${config.pid}\n`));

        await client.connect();
    }, 500);
})();
