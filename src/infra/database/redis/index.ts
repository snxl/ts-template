import { createClient } from 'redis';

(async () => {
    console.log(process.env.REDIS_URL);

    const client = createClient({
        url: process.env.REDIS_URL,
    });

    client.on('error', (err) => process.stdout.write(`Redis Client Error: ${err}`));
    client.on('connect', () => process.stdout.write(`Redis connect`));

    await client.connect();
})();
