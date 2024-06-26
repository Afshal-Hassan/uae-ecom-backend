interface RedisConfig {
    host: string,
    port: number
}

export default {
    host: process.env.REDIS_HOST || "localhost",
    port: parseInt(process.env.REDIS_PORT) || 6379
} satisfies RedisConfig