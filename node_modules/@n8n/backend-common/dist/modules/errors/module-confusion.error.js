"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleConfusionError = void 0;
const n8n_workflow_1 = require("n8n-workflow");
class ModuleConfusionError extends n8n_workflow_1.UserError {
    constructor(moduleNames) {
        const modules = moduleNames.length > 1 ? 'modules' : 'a module';
        super(`Found ${modules} listed in both \`N8N_ENABLED_MODULES\` and \`N8N_DISABLED_MODULES\`: ${moduleNames.join(', ')}. Please review your environment variables, as a module cannot be both enabled and disabled.`);
    }
}
exports.ModuleConfusionError = ModuleConfusionError;
//# sourceMappingURL=module-confusion.error.js.map