import type { DataTableProxyFunctions, INode, Workflow, IWorkflowExecuteAdditionalData } from 'n8n-workflow';
export declare function getDataTableHelperFunctions(additionalData: IWorkflowExecuteAdditionalData, workflow: Workflow, node: INode): Partial<DataTableProxyFunctions>;
