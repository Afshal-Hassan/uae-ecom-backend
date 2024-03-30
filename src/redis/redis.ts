import { RedisClientType, createClient } from "redis";
import redisConfig from "../config/redis.config";

export const redisClient: RedisClientType = createClient({
    socket: {
        host: redisConfig.host,
        port: redisConfig.port
    }
});

(async () => {
    await redisClient.connect();
})();

redisClient.on('connect', () => {
    console.log('Redis client connected');
});

redisClient.on('error', (error) => {
    console.error('Redis error: ', error);
});