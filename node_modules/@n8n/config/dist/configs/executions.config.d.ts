import z from 'zod';
declare class PruningIntervalsConfig {
    hardDelete: number;
    softDelete: number;
}
declare class ConcurrencyConfig {
    productionLimit: number;
    evaluationLimit: number;
}
declare class QueueRecoveryConfig {
    interval: number;
    batchSize: number;
}
declare class RecoveryConfig {
    maxLastExecutions: number;
    workflowDeactivationEnabled: boolean;
}
declare const executionModeSchema: z.ZodEnum<["regular", "queue"]>;
export type ExecutionMode = z.infer<typeof executionModeSchema>;
export declare class ExecutionsConfig {
    mode: ExecutionMode;
    timeout: number;
    maxTimeout: number;
    pruneData: boolean;
    pruneDataMaxAge: number;
    pruneDataMaxCount: number;
    pruneDataHardDeleteBuffer: number;
    pruneDataIntervals: PruningIntervalsConfig;
    concurrency: ConcurrencyConfig;
    queueRecovery: QueueRecoveryConfig;
    recovery: RecoveryConfig;
    saveDataOnError: 'all' | 'none';
    saveDataOnSuccess: 'all' | 'none';
    saveExecutionProgress: boolean;
    saveDataManualExecutions: boolean;
}
export {};
