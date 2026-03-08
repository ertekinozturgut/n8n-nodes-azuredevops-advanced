import { z } from 'zod';
declare const cacheBackendSchema: z.ZodEnum<["memory", "redis", "auto"]>;
type CacheBackend = z.infer<typeof cacheBackendSchema>;
declare class MemoryConfig {
    maxSize: number;
    ttl: number;
}
declare class RedisConfig {
    prefix: string;
    ttl: number;
}
export declare class CacheConfig {
    backend: CacheBackend;
    memory: MemoryConfig;
    redis: RedisConfig;
}
export {};
