export default interface IEnvs {
    NODE_ENV: string;
    redis_url: string;
    postgres_url: string;
    pid: number;
    port: string;
    port_tls: string;
    SECRET_TOKEN: string;
    LOG_LEVEL: string;
}
