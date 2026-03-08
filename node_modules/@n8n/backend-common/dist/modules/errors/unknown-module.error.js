"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnknownModuleError = void 0;
const n8n_workflow_1 = require("n8n-workflow");
class UnknownModuleError extends n8n_workflow_1.UnexpectedError {
    constructor(moduleName) {
        super(`Unknown module "${moduleName}"`, { level: 'fatal' });
    }
}
exports.UnknownModuleError = UnknownModuleError;
//# sourceMappingURL=unknown-module.error.js.map