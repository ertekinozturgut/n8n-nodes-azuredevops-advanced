import { type INode, type INodeType, type NodeParameterValueType } from 'n8n-workflow';
export declare function extractValue(value: NodeParameterValueType | object, parameterName: string, node: INode, nodeType: INodeType, itemIndex?: number): NodeParameterValueType | object;
