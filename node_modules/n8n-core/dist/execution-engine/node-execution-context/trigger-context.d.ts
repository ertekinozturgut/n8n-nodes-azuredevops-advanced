import type { ICredentialDataDecryptedObject, INode, ITriggerFunctions, IWorkflowExecuteAdditionalData, Workflow, WorkflowActivateMode, WorkflowExecuteMode } from 'n8n-workflow';
import { NodeExecutionContext } from './node-execution-context';
export declare class TriggerContext extends NodeExecutionContext implements ITriggerFunctions {
    private readonly activation;
    readonly emit: ITriggerFunctions['emit'];
    readonly emitError: ITriggerFunctions['emitError'];
    readonly helpers: ITriggerFunctions['helpers'];
    constructor(workflow: Workflow, node: INode, additionalData: IWorkflowExecuteAdditionalData, mode: WorkflowExecuteMode, activation: WorkflowActivateMode, emit?: ITriggerFunctions['emit'], emitError?: ITriggerFunctions['emitError']);
    getActivationMode(): WorkflowActivateMode;
    getCredentials<T extends object = ICredentialDataDecryptedObject>(type: string): Promise<T>;
}
