import dotenv from 'dotenv';

dotenv.config();

export default (() => {
    return {
        type: 'postgres',
        url: process.env.DB_URL,
        ssl: false,
        entities: ['./src/database/postgres/entities/*.ts'],
        migrations: ['./src/database/postgres/migrations/*.ts'],
        cli: {
            entitiesDir: './src/entities',
            migrationsDir: './src/database/migrations',
        },
    };
})();
