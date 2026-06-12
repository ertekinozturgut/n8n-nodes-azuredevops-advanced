"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AzureDevOpsAdvancedApi = void 0;
class AzureDevOpsAdvancedApi {
    constructor() {
        this.name = 'azureDevOpsAdvancedApi';
        this.displayName = 'Azure DevOps Advanced API';
        // Documentation link explaining how to obtain a Personal Access Token
        this.documentationUrl = 'https://n8n.io/integrations/azure-devops';
        this.properties = [
            {
                displayName: 'Organization',
                name: 'organization',
                type: 'string',
                default: '',
                required: true,
                description: 'The Azure DevOps organization name (e.g. dev.azure.com/{organization})',
            },
            {
                displayName: 'Personal Access Token (PAT)',
                name: 'pat',
                type: 'string',
                typeOptions: { password: true },
                default: '',
                required: true,
                description: 'Your Azure DevOps Personal Access Token with Read/Write access to all required resources',
            },
        ];
    }
}
exports.AzureDevOpsAdvancedApi = AzureDevOpsAdvancedApi;
