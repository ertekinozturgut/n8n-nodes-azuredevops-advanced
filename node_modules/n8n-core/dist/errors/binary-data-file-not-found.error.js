"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BinaryDataFileNotFoundError = void 0;
const n8n_workflow_1 = require("n8n-workflow");
class BinaryDataFileNotFoundError extends n8n_workflow_1.UnexpectedError {
    constructor(fileId) {
        super('Binary data file not found', { extra: { fileId } });
    }
}
exports.BinaryDataFileNotFoundError = BinaryDataFileNotFoundError;
//# sourceMappingURL=binary-data-file-not-found.error.js.map