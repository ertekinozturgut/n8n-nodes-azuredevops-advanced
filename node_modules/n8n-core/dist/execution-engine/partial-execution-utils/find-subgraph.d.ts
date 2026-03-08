import { type INode } from 'n8n-workflow';
import { DirectedGraph } from './directed-graph';
export declare function findSubgraph(options: {
    graph: DirectedGraph;
    destination: INode;
    trigger: INode;
}): DirectedGraph;
