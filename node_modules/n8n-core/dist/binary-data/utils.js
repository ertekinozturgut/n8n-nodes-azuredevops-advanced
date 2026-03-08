"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileLocation = void 0;
exports.isStoredMode = isStoredMode;
exports.assertDir = assertDir;
exports.doesNotExist = doesNotExist;
exports.streamToBuffer = streamToBuffer;
exports.binaryToBuffer = binaryToBuffer;
const n8n_workflow_1 = require("n8n-workflow");
const promises_1 = __importDefault(require("node:fs/promises"));
const STORED_MODES = ['filesystem', 'filesystem-v2', 's3', 'database'];
function isStoredMode(mode) {
    return STORED_MODES.includes(mode);
}
async function assertDir(dir) {
    try {
        await promises_1.default.access(dir);
    }
    catch {
        await promises_1.default.mkdir(dir, { recursive: true });
    }
}
async function doesNotExist(dir) {
    try {
        await promises_1.default.access(dir);
        return false;
    }
    catch {
        return true;
    }
}
async function streamToBuffer(stream) {
    return await new Promise((resolve, reject) => {
        const chunks = [];
        stream.on('data', (chunk) => chunks.push(chunk));
        stream.on('end', () => resolve(Buffer.concat(chunks)));
        stream.once('error', (cause) => {
            if ('code' in cause && cause.code === 'Z_DATA_ERROR')
                reject(new n8n_workflow_1.UnexpectedError('Failed to decompress response', { cause }));
            else
                reject(cause);
        });
    });
}
async function binaryToBuffer(body) {
    if (Buffer.isBuffer(body))
        return body;
    return await streamToBuffer(body);
}
exports.FileLocation = {
    ofExecution: (workflowId, executionId) => ({
        type: 'execution',
        workflowId,
        executionId,
    }),
    ofCustom: ({ pathSegments, sourceType, sourceId, }) => ({
        type: 'custom',
        pathSegments,
        sourceType,
        sourceId,
    }),
};
//# sourceMappingURL=utils.js.map