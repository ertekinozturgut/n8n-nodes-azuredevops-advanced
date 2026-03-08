"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.artifactsFields = exports.artifactsOperations = void 0;
exports.artifactsOperations = [
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
exports.artifactsFields = [
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
