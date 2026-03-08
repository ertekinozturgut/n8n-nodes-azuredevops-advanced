import { z } from 'zod';
declare const runnerModeSchema: z.ZodEnum<["internal", "external"]>;
export type TaskRunnerMode = z.infer<typeof runnerModeSchema>;
export declare class TaskRunnersConfig {
    enabled: boolean;
    mode: TaskRunnerMode;
    path: string;
    authToken: string;
    port: number;
    listenAddress: string;
    maxPayload: number;
    maxOldSpaceSize: string;
    maxConcurrency: number;
    taskTimeout: number;
    taskRequestTimeout: number;
    heartbeatInterval: number;
    insecureMode: boolean;
    isNativePythonRunnerEnabled: boolean;
}
export {};
