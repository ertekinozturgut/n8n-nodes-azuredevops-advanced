declare class HealthConfig {
    active: boolean;
    port: number;
    address: string;
}
declare class RedisConfig {
    db: number;
    host: string;
    password: string;
    port: number;
    timeoutThreshold: number;
    username: string;
    clusterNodes: string;
    tls: boolean;
    dualStack: boolean;
}
declare class SettingsConfig {
    lockDuration: number;
    lockRenewTime: number;
    stalledInterval: number;
    maxStalledCount: number;
}
declare class BullConfig {
    prefix: string;
    redis: RedisConfig;
    gracefulShutdownTimeout: number;
    settings: SettingsConfig;
}
export declare class ScalingModeConfig {
    health: HealthConfig;
    bull: BullConfig;
}
export {};
