import type { ICredentialDataDecryptedObject, INode, IPollFunctions, IWorkflowExecuteAdditionalData, Workflow, WorkflowActivateMode, WorkflowExecuteMode } from 'n8n-workflow';
import { NodeExecutionContext } from './node-execution-context';
export declare class PollContext extends NodeExecutionContext implements IPollFunctions {
    private readonly activation;
    readonly __emit: IPollFunctions['__emit'];
    readonly __emitError: IPollFunctions['__emitError'];
    readonly helpers: IPollFunctions['helpers'];
    constructor(workflow: Workflow, node: INode, additionalData: IWorkflowExecuteAdditionalData, mode: WorkflowExecuteMode, activation: WorkflowActivateMode, __emit?: IPollFunctions['__emit'], __emitError?: IPollFunctions['__emitError']);
    getActivationMode(): WorkflowActivateMode;
    getCredentials<T extends object = ICredentialDataDecryptedObject>(type: string): Promise<T>;
}
