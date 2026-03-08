"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KV_LIMIT = void 0;
exports.setWorkflowExecutionMetadata = setWorkflowExecutionMetadata;
exports.setAllWorkflowExecutionMetadata = setAllWorkflowExecutionMetadata;
exports.getAllWorkflowExecutionMetadata = getAllWorkflowExecutionMetadata;
exports.getWorkflowExecutionMetadata = getWorkflowExecutionMetadata;
const n8n_workflow_1 = require("n8n-workflow");
const invalid_execution_metadata_error_1 = require("../../../errors/invalid-execution-metadata.error");
exports.KV_LIMIT = 10;
function setWorkflowExecutionMetadata(executionData, key, value) {
    if (!executionData.resultData.metadata) {
        executionData.resultData.metadata = {};
    }
    if (!(key in executionData.resultData.metadata) &&
        Object.keys(executionData.resultData.metadata).length >= exports.KV_LIMIT) {
        return;
    }
    if (typeof key !== 'string') {
        throw new invalid_execution_metadata_error_1.InvalidExecutionMetadataError('key', key);
    }
    if (key.replace(/[A-Za-z0-9_]/g, '').length !== 0) {
        throw new invalid_execution_metadata_error_1.InvalidExecutionMetadataError('key', key, `Custom date key can only contain characters "A-Za-z0-9_" (key "${key}")`);
    }
    if (typeof value !== 'string' && typeof value !== 'number' && typeof value !== 'bigint') {
        throw new invalid_execution_metadata_error_1.InvalidExecutionMetadataError('value', key);
    }
    const val = String(value);
    if (key.length > 50) {
        n8n_workflow_1.LoggerProxy.error('Custom data key over 50 characters long. Truncating to 50 characters.');
    }
    if (val.length > 255) {
        n8n_workflow_1.LoggerProxy.error('Custom data value over 512 characters long. Truncating to 512 characters.');
    }
    executionData.resultData.metadata[key.slice(0, 50)] = val.slice(0, 512);
}
function setAllWorkflowExecutionMetadata(executionData, obj) {
    const errors = [];
    Object.entries(obj).forEach(([key, value]) => {
        try {
            setWorkflowExecutionMetadata(executionData, key, value);
        }
        catch (e) {
            errors.push(e);
        }
    });
    if (errors.length) {
        throw errors[0];
    }
}
function getAllWorkflowExecutionMetadata(executionData) {
    return executionData.resultData.metadata ? { ...executionData.resultData.metadata } : {};
}
function getWorkflowExecutionMetadata(executionData, key) {
    return getAllWorkflowExecutionMetadata(executionData)[String(key).slice(0, 50)];
}
//# sourceMappingURL=execution-metadata.js.map