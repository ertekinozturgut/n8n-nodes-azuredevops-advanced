import type { IDataObject, IExecuteResponsePromiseData, INode, IRun, IRunExecutionData, ITaskData, ITaskStartedData, IWorkflowBase, StructuredChunk, Workflow, WorkflowExecuteMode } from 'n8n-workflow';
export type ExecutionLifecycleHookHandlers = {
    nodeExecuteBefore: Array<(this: ExecutionLifecycleHooks, nodeName: string, data: ITaskStartedData) => Promise<void> | void>;
    nodeExecuteAfter: Array<(this: ExecutionLifecycleHooks, nodeName: string, data: ITaskData, executionData: IRunExecutionData) => Promise<void> | void>;
    workflowExecuteBefore: Array<(this: ExecutionLifecycleHooks, workflow: Workflow, data?: IRunExecutionData) => Promise<void> | void>;
    workflowExecuteAfter: Array<(this: ExecutionLifecycleHooks, data: IRun, newStaticData: IDataObject) => Promise<void> | void>;
    sendResponse: Array<(this: ExecutionLifecycleHooks, response: IExecuteResponsePromiseData) => Promise<void> | void>;
    sendChunk: Array<(this: ExecutionLifecycleHooks, chunk: StructuredChunk) => Promise<void> | void>;
    nodeFetchedData: Array<(this: ExecutionLifecycleHooks, workflowId: string, node: INode) => Promise<void> | void>;
};
export type ExecutionLifecycleHookName = keyof ExecutionLifecycleHookHandlers;
export declare class ExecutionLifecycleHooks {
    readonly mode: WorkflowExecuteMode;
    readonly executionId: string;
    readonly workflowData: IWorkflowBase;
    readonly handlers: ExecutionLifecycleHookHandlers;
    constructor(mode: WorkflowExecuteMode, executionId: string, workflowData: IWorkflowBase);
    addHandler<Hook extends keyof ExecutionLifecycleHookHandlers>(hookName: Hook, ...handlers: Array<ExecutionLifecycleHookHandlers[Hook][number]>): void;
    runHook<Hook extends keyof ExecutionLifecycleHookHandlers, Params extends unknown[] = Parameters<Exclude<ExecutionLifecycleHookHandlers[Hook], undefined>[number]>>(hookName: Hook, parameters: Params): Promise<void>;
}
