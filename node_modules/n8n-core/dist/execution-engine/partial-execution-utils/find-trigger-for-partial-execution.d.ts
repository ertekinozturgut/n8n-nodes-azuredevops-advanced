import type { INode, IRunData, Workflow } from 'n8n-workflow';
import type { DirectedGraph } from './directed-graph';
export declare function anyReachableRootHasRunData(workflow: DirectedGraph, destinationNodeName: string, runData: IRunData): boolean;
export declare function findTriggerForPartialExecution(workflow: Workflow, destinationNodeName: string, runData: IRunData): INode | undefined;
