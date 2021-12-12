export default {
    NODE_ENV: process.env.NODE_ENV,
    redis_url: process.env.REDIS_URL,
    postgres_url: process.env.DB_URL,
    pid: process.pid,
    port: process.env.PORT,
    port_tls: process.env.PORT_TLS,
    SECRET_TOKEN: process.env.KEY_TOKEN,
    LOG_LEVEL: process.env.LOG_LEVEL,
};
