import { type INode, type IRunData } from 'n8n-workflow';
import type { DirectedGraph } from './directed-graph';
export declare function cleanRunData(runData: IRunData, graph: DirectedGraph, nodesToClean: Set<INode>): IRunData;
