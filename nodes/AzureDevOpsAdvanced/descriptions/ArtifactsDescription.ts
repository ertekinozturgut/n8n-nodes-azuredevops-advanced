import { INodeProperties } from 'n8n-workflow';

export const artifactsOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['artifacts'],
            },
        },
        options: [
            { name: 'List Feeds', value: 'listFeeds', action: 'List all universal or package feeds' },
            { name: 'List Packages', value: 'listPackages', action: 'List packages in a feed' },
        ],
        default: 'listFeeds',
    },
];

export const artifactsFields: INodeProperties[] = [
    {
        displayName: 'Project',
        name: 'project',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                resource: ['artifacts'],
            },
        },
    },
    {
        displayName: 'Feed ID (or Name)',
        name: 'feedId',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                resource: ['artifacts'],
                operation: ['listPackages'],
            },
        },
    },
];
