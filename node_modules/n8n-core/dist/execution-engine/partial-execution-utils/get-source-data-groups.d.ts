import { type INode, type IPinData, type IRunData } from 'n8n-workflow';
import type { GraphConnection, DirectedGraph } from './directed-graph';
type SourceConnectionGroup = {
    complete: boolean;
    connections: GraphConnection[];
};
export declare function getSourceDataGroups(graph: DirectedGraph, node: INode, runData: IRunData, pinnedData: IPinData): SourceConnectionGroup[];
export {};
