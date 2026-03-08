"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidSourceTypeError = void 0;
const n8n_workflow_1 = require("n8n-workflow");
class InvalidSourceTypeError extends n8n_workflow_1.UnexpectedError {
    constructor(sourceType) {
        super(`Custom file location with invalid source type: ${sourceType}`);
    }
}
exports.InvalidSourceTypeError = InvalidSourceTypeError;
//# sourceMappingURL=invalid-source-type.error.js.map