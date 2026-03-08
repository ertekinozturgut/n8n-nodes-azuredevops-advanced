import { type INode, type IPinData, type IRunData } from 'n8n-workflow';
import type { DirectedGraph } from './directed-graph';
export declare function isDirty(node: INode, runData?: IRunData, pinData?: IPinData): boolean;
export declare function findStartNodes(options: {
    graph: DirectedGraph;
    trigger: INode;
    destination: INode;
    pinData: IPinData;
    runData: IRunData;
}): Set<INode>;
