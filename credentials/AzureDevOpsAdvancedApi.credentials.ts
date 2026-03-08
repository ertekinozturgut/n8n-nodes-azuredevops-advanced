import { ICredentialType, INodeProperties } from 'n8n-workflow';

export class AzureDevOpsAdvancedApi implements ICredentialType {
    name = 'azureDevOpsAdvancedApi';
    displayName = 'Azure DevOps Advanced API';
    // Belgelendirme linkine doğrudan PAT nasıl alınır yönlendirilebilir
    documentationUrl = 'https://n8n.io/integrations/azure-devops';
    properties: INodeProperties[] = [
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
            description: 'Tüm repolara Read/Write yetkilendirmesi olan Azure DevOps PAT anahtarınız',
        },
    ];
}
