import {createClient, RedisClientType} from 'redis';

export class RedisClient {
    private static instance: RedisClient;
    private client: RedisClientType;

    private constructor() {
        this.client = createClient({
            url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
            password: process.env.REDIS_PASSWORD
        });

        this.client.on('error', (err) => console.log('Redis Client Error', err));
        this.client.connect().then(() => {console.log('Redis connected')});
    }

    public static getInstance(): RedisClient {
        if (!RedisClient.instance) {
            RedisClient.instance = new RedisClient();
        }
        return RedisClient.instance;
    }

    public async set(key: string, value: string, expireInSeconds?: number): Promise<void> {
        if (expireInSeconds) {
            await this.client.set(key, value, {
                EX: expireInSeconds,
                NX: true
            });
        } else {
            await this.client.set(key, value);
        }
    }

    public async get(key: string): Promise<string | null> {
        return await this.client.get(key);
    }

    public async del(key: string): Promise<void> {
        await this.client.del(key);
    }
}