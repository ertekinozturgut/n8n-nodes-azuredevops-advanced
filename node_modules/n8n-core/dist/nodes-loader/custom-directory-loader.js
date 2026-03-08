"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomDirectoryLoader = void 0;
const fast_glob_1 = __importDefault(require("fast-glob"));
const directory_loader_1 = require("./directory-loader");
class CustomDirectoryLoader extends directory_loader_1.DirectoryLoader {
    constructor(directory, excludeNodes = [], includeNodes = []) {
        super(directory, excludeNodes, includeNodes);
        this.packageName = 'CUSTOM';
        this.excludeNodes = this.extractNodeTypes(excludeNodes, this.packageName);
        this.includeNodes = this.extractNodeTypes(includeNodes, this.packageName);
    }
    async loadAll() {
        const nodes = await (0, fast_glob_1.default)('**/*.node.js', {
            cwd: this.directory,
            absolute: true,
        });
        for (const nodePath of nodes) {
            this.loadNodeFromFile(nodePath);
        }
        const credentials = await (0, fast_glob_1.default)('**/*.credentials.js', {
            cwd: this.directory,
            absolute: true,
        });
        for (const credentialPath of credentials) {
            this.loadCredentialFromFile(credentialPath);
        }
    }
}
exports.CustomDirectoryLoader = CustomDirectoryLoader;
//# sourceMappingURL=custom-directory-loader.js.map