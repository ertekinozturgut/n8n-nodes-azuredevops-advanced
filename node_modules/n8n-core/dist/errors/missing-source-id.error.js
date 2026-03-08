"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissingSourceIdError = void 0;
const n8n_workflow_1 = require("n8n-workflow");
class MissingSourceIdError extends n8n_workflow_1.UnexpectedError {
    constructor(pathSegments) {
        super(`Custom file location missing sourceId: ${pathSegments.join('/')}`);
    }
}
exports.MissingSourceIdError = MissingSourceIdError;
//# sourceMappingURL=missing-source-id.error.js.map