import { Logger } from '@n8n/backend-common';
import { IExecuteData, IExecutionContext, INodeExecutionData, PlaintextExecutionContext, Workflow } from 'n8n-workflow';
import { Cipher } from '../encryption';
import { ExecutionContextHookRegistry } from './execution-context-hook-registry.service';
export declare class ExecutionContextService {
    private readonly logger;
    private readonly executionContextHookRegistry;
    private readonly cipher;
    constructor(logger: Logger, executionContextHookRegistry: ExecutionContextHookRegistry, cipher: Cipher);
    decryptExecutionContext(context: IExecutionContext): PlaintextExecutionContext;
    encryptExecutionContext(context: PlaintextExecutionContext): IExecutionContext;
    mergeExecutionContexts(baseContext: PlaintextExecutionContext, contextToMerge: Partial<PlaintextExecutionContext>): PlaintextExecutionContext;
    augmentExecutionContextWithHooks(workflow: Workflow, startItem: IExecuteData, contextToAugment: IExecutionContext): Promise<{
        context: IExecutionContext;
        triggerItems: INodeExecutionData[] | null;
    }>;
}
