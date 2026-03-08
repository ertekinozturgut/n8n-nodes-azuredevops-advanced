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
exports.handleCycles = handleCycles;
const a = __importStar(require("node:assert/strict"));
function handleCycles(graph, startNodes, trigger) {
    const cycles = graph.getStronglyConnectedComponents().filter((cycle) => cycle.size >= 1);
    const newStartNodes = new Set(startNodes);
    if (cycles.length === 0) {
        return newStartNodes;
    }
    for (const startNode of startNodes) {
        for (const cycle of cycles) {
            const isPartOfCycle = cycle.has(startNode);
            if (isPartOfCycle) {
                const firstNode = graph.depthFirstSearch({
                    from: trigger,
                    fn: (node) => cycle.has(node),
                });
                a.ok(firstNode, "the trigger must be connected to the cycle, otherwise the cycle wouldn't be part of the subgraph");
                newStartNodes.delete(startNode);
                newStartNodes.add(firstNode);
            }
        }
    }
    return newStartNodes;
}
//# sourceMappingURL=handle-cycles.js.map