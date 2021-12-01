import config from './src/shared/config/keys';

export default (() => {
    return {
        type: 'postgres',
        url: config.postgres_url,
        ssl: false,
        entities: ['./src/infra/database/postgres/entities/*.ts'],
        migrations: ['./src/infra/database/postgres/migrations/*.ts'],
        cli: {
            entitiesDir: './src/infra/database/postgres/entities',
            migrationsDir: './src/infra/database/postgres/migrations',
        },
    };
})();
