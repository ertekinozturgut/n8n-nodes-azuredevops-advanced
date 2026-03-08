import type { IConnections, INode, WorkflowParameters, NodeConnectionType } from 'n8n-workflow';
import { Workflow } from 'n8n-workflow';
export type GraphConnection = {
    from: INode;
    to: INode;
    type: NodeConnectionType;
    outputIndex: number;
    inputIndex: number;
};
type RemoveNodeBaseOptions = {
    reconnectConnections: boolean;
    skipConnectionFn?: (connection: GraphConnection) => boolean;
};
export declare class DirectedGraph {
    private nodes;
    private connections;
    hasNode(nodeName: string): boolean;
    getNodes(): Map<string, INode>;
    getNodesByNames(names: string[]): Set<INode>;
    getConnections(filter?: {
        to?: INode;
    }): GraphConnection[];
    addNode(node: INode): this;
    addNodes(...nodes: INode[]): this;
    removeNode(node: INode, options?: {
        reconnectConnections: true;
    } & RemoveNodeBaseOptions): GraphConnection[];
    removeNode(node: INode, options?: {
        reconnectConnections: false;
    } & RemoveNodeBaseOptions): undefined;
    addConnection(connectionInput: {
        from: INode;
        to: INode;
        type?: NodeConnectionType;
        outputIndex?: number;
        inputIndex?: number;
    }): this;
    addConnections(...connectionInputs: Array<{
        from: INode;
        to: INode;
        type?: NodeConnectionType;
        outputIndex?: number;
        inputIndex?: number;
    }>): this;
    getDirectChildConnections(node: INode): GraphConnection[];
    private getChildrenRecursive;
    getChildren(node: INode): Set<INode>;
    getDirectParentConnections(node: INode): GraphConnection[];
    private getParentConnectionsRecursive;
    getParentConnections(node: INode): Set<GraphConnection>;
    getConnection(from: INode, outputIndex: number, type: NodeConnectionType, inputIndex: number, to: INode): GraphConnection | undefined;
    getStronglyConnectedComponents(): Array<Set<INode>>;
    private depthFirstSearchRecursive;
    depthFirstSearch({ from, fn }: {
        from: INode;
        fn: (node: INode) => boolean;
    }): INode | undefined;
    toWorkflow(parameters: Omit<WorkflowParameters, 'nodes' | 'connections'>): Workflow;
    static fromWorkflow(workflow: Workflow): DirectedGraph;
    static fromNodesAndConnections(nodes: INode[], connections: IConnections): DirectedGraph;
    clone(): DirectedGraph;
    private toIConnections;
    private makeKey;
}
export {};
