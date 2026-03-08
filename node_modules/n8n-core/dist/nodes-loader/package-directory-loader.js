"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageDirectoryLoader = void 0;
const n8n_workflow_1 = require("n8n-workflow");
const node_fs_1 = require("node:fs");
const promises_1 = require("node:fs/promises");
const directory_loader_1 = require("./directory-loader");
class PackageDirectoryLoader extends directory_loader_1.DirectoryLoader {
    constructor(directory, excludeNodes = [], includeNodes = []) {
        super(directory, excludeNodes, includeNodes);
        this.packageJson = this.readJSONSync('package.json');
        this.packageName = this.packageJson.name;
        this.excludeNodes = this.extractNodeTypes(excludeNodes, this.packageName);
        this.includeNodes = this.extractNodeTypes(includeNodes, this.packageName);
    }
    async loadAll() {
        const { n8n, version, name } = this.packageJson;
        if (!n8n)
            return;
        const { nodes, credentials } = n8n;
        const packageVersion = !['n8n-nodes-base', '@n8n/n8n-nodes-langchain'].includes(name)
            ? version
            : undefined;
        if (Array.isArray(nodes)) {
            for (const nodePath of nodes) {
                this.loadNodeFromFile(nodePath, packageVersion);
            }
        }
        if (Array.isArray(credentials)) {
            for (const credentialPath of credentials) {
                this.loadCredentialFromFile(credentialPath);
            }
        }
        this.inferSupportedNodes();
        this.logger.debug(`Loaded all credentials and nodes from ${this.packageName}`, {
            credentials: credentials?.length ?? 0,
            nodes: nodes?.length ?? 0,
        });
    }
    inferSupportedNodes() {
        const knownCredentials = this.known.credentials;
        for (const { type: credentialType } of Object.values(this.credentialTypes)) {
            const supportedNodes = knownCredentials[credentialType.name].supportedNodes ?? [];
            if (supportedNodes.length > 0 && credentialType.httpRequestNode) {
                credentialType.httpRequestNode.hidden = true;
            }
            credentialType.supportedNodes = supportedNodes;
            if (!credentialType.iconUrl && !credentialType.icon) {
                for (const supportedNode of supportedNodes) {
                    const nodeDescription = this.nodeTypes[supportedNode]?.type.description;
                    if (!nodeDescription)
                        continue;
                    if (nodeDescription.icon) {
                        credentialType.icon = nodeDescription.icon;
                        credentialType.iconColor = nodeDescription.iconColor;
                        break;
                    }
                    if (nodeDescription.iconUrl) {
                        credentialType.iconUrl = nodeDescription.iconUrl;
                        break;
                    }
                }
            }
        }
    }
    parseJSON(fileString, filePath) {
        try {
            return (0, n8n_workflow_1.jsonParse)(fileString);
        }
        catch (error) {
            throw new n8n_workflow_1.ApplicationError('Failed to parse JSON', { extra: { filePath } });
        }
    }
    readJSONSync(file) {
        const filePath = this.resolvePath(file);
        const fileString = (0, node_fs_1.readFileSync)(filePath, 'utf8');
        return this.parseJSON(fileString, filePath);
    }
    async readJSON(file) {
        const filePath = this.resolvePath(file);
        const fileString = await (0, promises_1.readFile)(filePath, 'utf8');
        return this.parseJSON(fileString, filePath);
    }
}
exports.PackageDirectoryLoader = PackageDirectoryLoader;
//# sourceMappingURL=package-directory-loader.js.map