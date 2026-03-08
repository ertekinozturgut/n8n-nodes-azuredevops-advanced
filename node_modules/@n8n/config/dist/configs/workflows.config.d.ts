import { z } from 'zod';
declare const callerPolicySchema: z.ZodEnum<["any", "none", "workflowsFromAList", "workflowsFromSameOwner"]>;
type CallerPolicy = z.infer<typeof callerPolicySchema>;
export declare class WorkflowsConfig {
    defaultName: string;
    callerPolicyDefaultOption: CallerPolicy;
    activationBatchSize: number;
    indexingEnabled: boolean;
    draftPublishEnabled: boolean;
}
export {};
