"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getN8nFolder = getN8nFolder;
const node_path_1 = __importDefault(require("node:path"));
function getN8nFolder() {
    const homeVarName = process.platform === 'win32' ? 'USERPROFILE' : 'HOME';
    const userHome = process.env.N8N_USER_FOLDER ?? process.env[homeVarName] ?? process.cwd();
    return node_path_1.default.join(userHome, '.n8n');
}
//# sourceMappingURL=utils.js.map