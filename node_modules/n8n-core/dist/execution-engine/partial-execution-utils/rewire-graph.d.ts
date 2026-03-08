import { type AiAgentRequest, type INode } from 'n8n-workflow';
import { type DirectedGraph } from './directed-graph';
export declare function rewireGraph(tool: INode, graph: DirectedGraph, agentRequest?: AiAgentRequest): DirectedGraph;
