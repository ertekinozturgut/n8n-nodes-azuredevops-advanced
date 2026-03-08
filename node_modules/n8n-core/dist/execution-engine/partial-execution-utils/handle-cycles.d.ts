import type { INode } from 'n8n-workflow';
import type { DirectedGraph } from './directed-graph';
export declare function handleCycles(graph: DirectedGraph, startNodes: Set<INode>, trigger: INode): Set<INode>;
