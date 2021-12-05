import { createConnection } from 'typeorm';

createConnection().then(() => {
    process.stdout.write(`\ndatabase connect\n`);
});
