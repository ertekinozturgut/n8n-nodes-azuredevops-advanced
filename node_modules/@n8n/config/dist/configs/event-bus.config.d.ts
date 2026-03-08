import { z } from 'zod';
declare class LogWriterConfig {
    keepLogCount: number;
    maxFileSizeInKB: number;
    logBaseName: string;
}
declare const recoveryModeSchema: z.ZodEnum<["simple", "extensive"]>;
type RecoveryMode = z.infer<typeof recoveryModeSchema>;
export declare class EventBusConfig {
    checkUnsentInterval: number;
    logWriter: LogWriterConfig;
    crashRecoveryMode: RecoveryMode;
}
export {};
