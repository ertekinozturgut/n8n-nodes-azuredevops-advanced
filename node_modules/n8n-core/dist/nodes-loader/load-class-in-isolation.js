"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadClassInIsolation = void 0;
const backend_common_1 = require("@n8n/backend-common");
const vm_1 = require("vm");
const context = (0, vm_1.createContext)({ require });
const loadClassInIsolation = (filePath, className) => {
    if (process.platform === 'win32') {
        filePath = filePath.replace(/\\/g, '/');
    }
    if (backend_common_1.inTest) {
        return new (require(filePath)[className])();
    }
    else {
        const script = new vm_1.Script(`new (require('${filePath}').${className})()`);
        return script.runInContext(context);
    }
};
exports.loadClassInIsolation = loadClassInIsolation;
//# sourceMappingURL=load-class-in-isolation.js.map