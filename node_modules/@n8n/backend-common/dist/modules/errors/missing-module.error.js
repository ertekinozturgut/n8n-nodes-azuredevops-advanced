"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissingModuleError = void 0;
const n8n_workflow_1 = require("n8n-workflow");
class MissingModuleError extends n8n_workflow_1.UserError {
    constructor(moduleName, errorMsg) {
        super(`Failed to load module "${moduleName}": ${errorMsg}. Please review the module's entrypoint file name and the module's directory name.`);
    }
}
exports.MissingModuleError = MissingModuleError;
//# sourceMappingURL=missing-module.error.js.map