import { createClient } from 'redis';

(async () => {
    console.log(process.env.REDIS_URL);

    const client = createClient({
        url: process.env.REDIS_URL,
    });

    client.on('error', (err) => console.log('Redis Client Error', err));
    client.on('connect', () => console.log('Redis connect'));

    await client.connect();
})();
