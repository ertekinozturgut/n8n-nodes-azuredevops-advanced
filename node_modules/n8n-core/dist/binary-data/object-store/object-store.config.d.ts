import { z } from 'zod';
declare const protocolSchema: z.ZodEnum<["http", "https"]>;
export type Protocol = z.infer<typeof protocolSchema>;
declare class ObjectStoreBucketConfig {
    name: string;
    region: string;
}
declare class ObjectStoreCredentialsConfig {
    accessKey: string;
    accessSecret: string;
    authAutoDetect: boolean;
}
export declare class ObjectStoreConfig {
    host: string;
    protocol: Protocol;
    bucket: ObjectStoreBucketConfig;
    credentials: ObjectStoreCredentialsConfig;
}
export {};
