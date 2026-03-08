import { INodeProperties } from 'n8n-workflow';

export const serviceHookOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['serviceHook'],
            },
        },
        options: [
            { name: 'List Subscriptions', value: 'list', action: 'List all service hook subscriptions in the organization/project' },
            { name: 'Create Subscription', value: 'create', action: 'Create a new webhook subscription' },
        ],
        default: 'list',
    },
];

export const serviceHookFields: INodeProperties[] = [
    {
        displayName: 'Project',
        name: 'project',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                resource: ['serviceHook'],
            },
        },
        description: 'The name or ID of the Azure DevOps project to bind the hook (or leave specific for org scope issues)',
    },
    {
        displayName: 'Event Type',
        name: 'eventType',
        type: 'options',
        options: [
            { name: 'Build Completed', value: 'build.complete' },
            { name: 'Code Pushed', value: 'git.push' },
            { name: 'Pull Request Created', value: 'git.pullrequest.created' },
            { name: 'Pull Request Merged', value: 'git.pullrequest.merged' },
            { name: 'Work Item Created', value: 'workitem.created' },
            { name: 'Work Item Updated', value: 'workitem.updated' },
            { name: 'Release Created', value: 'ms.vss-release.release-created-event' }
        ],
        default: 'build.complete',
        required: true,
        displayOptions: {
            show: {
                resource: ['serviceHook'],
                operation: ['create'],
            },
        },
        description: 'The publisher event type to listen to',
    },
    {
        displayName: 'Consumer Destination URL (Webhook)',
        name: 'consumerUrl',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                resource: ['serviceHook'],
                operation: ['create'],
            },
        },
        description: 'The external URL (e.g., n8n Webhook URL) where Azure DevOps will send the payload',
    },
];
