import { z } from 'zod';
declare const releaseChannelSchema: z.ZodEnum<["stable", "beta", "nightly", "dev", "rc"]>;
type ReleaseChannel = z.infer<typeof releaseChannelSchema>;
export declare class GenericConfig {
    timezone: string;
    releaseChannel: ReleaseChannel;
    gracefulShutdownTimeout: number;
}
export {};
