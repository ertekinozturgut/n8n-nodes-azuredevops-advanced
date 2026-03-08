"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirectedGraph = void 0;
const a = __importStar(require("assert"));
const n8n_workflow_1 = require("n8n-workflow");
class DirectedGraph {
    constructor() {
        this.nodes = new Map();
        this.connections = new Map();
    }
    hasNode(nodeName) {
        return this.nodes.has(nodeName);
    }
    getNodes() {
        return new Map(this.nodes.entries());
    }
    getNodesByNames(names) {
        const nodes = new Set();
        for (const name of names) {
            const node = this.nodes.get(name);
            if (node) {
                nodes.add(node);
            }
        }
        return nodes;
    }
    getConnections(filter = {}) {
        const filteredCopy = [];
        for (const connection of this.connections.values()) {
            const toMatches = filter.to ? connection.to === filter.to : true;
            if (toMatches) {
                filteredCopy.push(connection);
            }
        }
        return filteredCopy;
    }
    addNode(node) {
        this.nodes.set(node.name, node);
        return this;
    }
    addNodes(...nodes) {
        for (const node of nodes) {
            this.addNode(node);
        }
        return this;
    }
    removeNode(node, options = { reconnectConnections: false }) {
        if (options.reconnectConnections) {
            const incomingConnections = this.getDirectParentConnections(node);
            const outgoingConnections = this.getDirectChildConnections(node);
            const newConnections = [];
            for (const incomingConnection of incomingConnections) {
                if (options.skipConnectionFn?.(incomingConnection)) {
                    continue;
                }
                for (const outgoingConnection of outgoingConnections) {
                    if (options.skipConnectionFn?.(outgoingConnection)) {
                        continue;
                    }
                    const newConnection = {
                        ...incomingConnection,
                        to: outgoingConnection.to,
                        inputIndex: outgoingConnection.inputIndex,
                    };
                    newConnections.push(newConnection);
                }
            }
            for (const [key, connection] of this.connections.entries()) {
                if (connection.to === node || connection.from === node) {
                    this.connections.delete(key);
                }
            }
            for (const newConnection of newConnections) {
                this.connections.set(this.makeKey(newConnection), newConnection);
            }
            this.nodes.delete(node.name);
            return newConnections;
        }
        else {
            for (const [key, connection] of this.connections.entries()) {
                if (connection.to === node || connection.from === node) {
                    this.connections.delete(key);
                }
            }
            this.nodes.delete(node.name);
            return;
        }
    }
    addConnection(connectionInput) {
        const { from, to } = connectionInput;
        const fromExists = this.nodes.get(from.name) === from;
        const toExists = this.nodes.get(to.name) === to;
        a.ok(fromExists);
        a.ok(toExists);
        const connection = {
            ...connectionInput,
            type: connectionInput.type ?? n8n_workflow_1.NodeConnectionTypes.Main,
            outputIndex: connectionInput.outputIndex ?? 0,
            inputIndex: connectionInput.inputIndex ?? 0,
        };
        this.connections.set(this.makeKey(connection), connection);
        return this;
    }
    addConnections(...connectionInputs) {
        for (const connectionInput of connectionInputs) {
            this.addConnection(connectionInput);
        }
        return this;
    }
    getDirectChildConnections(node) {
        const nodeExists = this.nodes.get(node.name) === node;
        a.ok(nodeExists);
        const directChildren = [];
        for (const connection of this.connections.values()) {
            if (connection.from !== node) {
                continue;
            }
            directChildren.push(connection);
        }
        return directChildren;
    }
    getChildrenRecursive(node, children) {
        const directChildren = this.getDirectChildConnections(node);
        for (const directChild of directChildren) {
            if (children.has(directChild.to)) {
                continue;
            }
            children.add(directChild.to);
            this.getChildrenRecursive(directChild.to, children);
        }
        return children;
    }
    getChildren(node) {
        return this.getChildrenRecursive(node, new Set());
    }
    getDirectParentConnections(node) {
        const nodeExists = this.nodes.get(node.name) === node;
        a.ok(nodeExists);
        const directParents = [];
        for (const connection of this.connections.values()) {
            if (connection.to !== node) {
                continue;
            }
            directParents.push(connection);
        }
        return directParents;
    }
    getParentConnectionsRecursive(node, connections) {
        const parentConnections = this.getDirectParentConnections(node);
        for (const connection of parentConnections) {
            if (connections.has(connection)) {
                continue;
            }
            connections.add(connection);
            this.getParentConnectionsRecursive(connection.from, connections);
        }
        return connections;
    }
    getParentConnections(node) {
        return this.getParentConnectionsRecursive(node, new Set());
    }
    getConnection(from, outputIndex, type, inputIndex, to) {
        return this.connections.get(this.makeKey({
            from,
            outputIndex,
            type,
            inputIndex,
            to,
        }));
    }
    getStronglyConnectedComponents() {
        let id = 0;
        const visited = new Set();
        const ids = new Map();
        const lowLinkValues = new Map();
        const stack = [];
        const stronglyConnectedComponents = [];
        const followNode = (node) => {
            if (visited.has(node)) {
                return;
            }
            visited.add(node);
            lowLinkValues.set(node, id);
            ids.set(node, id);
            id++;
            stack.push(node);
            const directChildren = this.getDirectChildConnections(node).map((c) => c.to);
            for (const child of directChildren) {
                followNode(child);
                if (stack.includes(child)) {
                    const childLowLinkValue = lowLinkValues.get(child);
                    const ownLowLinkValue = lowLinkValues.get(node);
                    a.ok(childLowLinkValue !== undefined);
                    a.ok(ownLowLinkValue !== undefined);
                    const lowestLowLinkValue = Math.min(childLowLinkValue, ownLowLinkValue);
                    lowLinkValues.set(node, lowestLowLinkValue);
                }
            }
            const ownId = ids.get(node);
            const ownLowLinkValue = lowLinkValues.get(node);
            a.ok(ownId !== undefined);
            a.ok(ownLowLinkValue !== undefined);
            if (ownId === ownLowLinkValue) {
                const scc = new Set();
                let next = stack.at(-1);
                while (next && lowLinkValues.get(next) === ownId) {
                    stack.pop();
                    scc.add(next);
                    next = stack.at(-1);
                }
                if (scc.size > 0) {
                    stronglyConnectedComponents.push(scc);
                }
            }
        };
        for (const node of this.nodes.values()) {
            followNode(node);
        }
        return stronglyConnectedComponents;
    }
    depthFirstSearchRecursive(from, fn, seen) {
        if (seen.has(from)) {
            return undefined;
        }
        seen.add(from);
        if (fn(from)) {
            return from;
        }
        for (const childConnection of this.getDirectChildConnections(from)) {
            const found = this.depthFirstSearchRecursive(childConnection.to, fn, seen);
            if (found) {
                return found;
            }
        }
        return undefined;
    }
    depthFirstSearch({ from, fn }) {
        return this.depthFirstSearchRecursive(from, fn, new Set());
    }
    toWorkflow(parameters) {
        return new n8n_workflow_1.Workflow({
            ...parameters,
            nodes: [...this.nodes.values()],
            connections: this.toIConnections(),
        });
    }
    static fromWorkflow(workflow) {
        const graph = new DirectedGraph();
        graph.addNodes(...Object.values(workflow.nodes));
        for (const [fromNodeName, iConnection] of Object.entries(workflow.connectionsBySourceNode)) {
            const from = workflow.getNode(fromNodeName);
            a.ok(from);
            for (const [outputType, outputs] of Object.entries(iConnection)) {
                for (const [outputIndex, conns] of outputs.entries()) {
                    for (const conn of conns ?? []) {
                        const { node: toNodeName, type: _inputType, index: inputIndex } = conn;
                        const to = workflow.getNode(toNodeName);
                        a.ok(to);
                        graph.addConnection({
                            from,
                            to,
                            type: outputType,
                            outputIndex,
                            inputIndex,
                        });
                    }
                }
            }
        }
        return graph;
    }
    static fromNodesAndConnections(nodes, connections) {
        const graph = new DirectedGraph();
        graph.addNodes(...nodes);
        const nodeMap = new Map();
        for (const node of nodes) {
            nodeMap.set(node.name, node);
        }
        for (const [fromNodeName, iConnection] of Object.entries(connections)) {
            const from = nodeMap.get(fromNodeName);
            a.ok(from);
            for (const [outputType, outputs] of Object.entries(iConnection)) {
                for (const [outputIndex, conns] of outputs.entries()) {
                    for (const conn of conns ?? []) {
                        const { node: toNodeName, type: _inputType, index: inputIndex } = conn;
                        const to = nodeMap.get(toNodeName);
                        a.ok(to);
                        graph.addConnection({
                            from,
                            to,
                            type: outputType,
                            outputIndex,
                            inputIndex,
                        });
                    }
                }
            }
        }
        return graph;
    }
    clone() {
        return new DirectedGraph()
            .addNodes(...this.getNodes().values())
            .addConnections(...this.getConnections().values());
    }
    toIConnections() {
        const result = {};
        for (const connection of this.connections.values()) {
            const { from, to, type, outputIndex, inputIndex } = connection;
            result[from.name] = result[from.name] ?? {
                [type]: [],
            };
            const resultConnection = result[from.name];
            resultConnection[type][outputIndex] = resultConnection[type][outputIndex] ?? [];
            const group = resultConnection[type][outputIndex];
            group.push({
                node: to.name,
                type,
                index: inputIndex,
            });
        }
        return result;
    }
    makeKey(connection) {
        return `${connection.from.name}-${connection.type}-${connection.outputIndex}-${connection.inputIndex}-${connection.to.name}`;
    }
}
exports.DirectedGraph = DirectedGraph;
//# sourceMappingURL=directed-graph.js.map