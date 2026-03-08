import type { IDataObject, IRun, IRunExecutionData, ITaskData, ITaskStartedData, IWorkflowBase, Workflow } from 'n8n-workflow';
import type { Class } from '../types';
export type LifecycleHandlerClass = Class<Record<string, (ctx: LifecycleContext) => Promise<void> | void>>;
export type NodeExecuteBeforeContext = {
    type: 'nodeExecuteBefore';
    workflow: IWorkflowBase;
    nodeName: string;
    taskData: ITaskStartedData;
};
export type NodeExecuteAfterContext = {
    type: 'nodeExecuteAfter';
    workflow: IWorkflowBase;
    nodeName: string;
    taskData: ITaskData;
    executionData: IRunExecutionData;
};
export type WorkflowExecuteBeforeContext = {
    type: 'workflowExecuteBefore';
    workflow: IWorkflowBase;
    workflowInstance: Workflow;
    executionData?: IRunExecutionData;
};
export type WorkflowExecuteAfterContext = {
    type: 'workflowExecuteAfter';
    workflow: IWorkflowBase;
    runData: IRun;
    newStaticData: IDataObject;
};
export type LifecycleContext = NodeExecuteBeforeContext | NodeExecuteAfterContext | WorkflowExecuteBeforeContext | WorkflowExecuteAfterContext;
type LifecycleHandler = {
    handlerClass: LifecycleHandlerClass;
    methodName: string;
    eventName: LifecycleEvent;
};
export type LifecycleEvent = LifecycleContext['type'];
export declare class LifecycleMetadata {
    private readonly handlers;
    register(handler: LifecycleHandler): void;
    getHandlers(): LifecycleHandler[];
}
export {};
