import { INodeProperties } from 'n8n-workflow';

export const wikiOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['wiki'],
            },
        },
        options: [
            { name: 'List Wikis', value: 'list', action: 'List wikis in a project' },
            { name: 'Get Page', value: 'getPage', action: 'Get the content of a wiki page' },
            { name: 'Create Page', value: 'createPage', action: 'Create a new wiki page' },
            { name: 'Update Page', value: 'updatePage', action: 'Update an existing wiki page' },
        ],
        default: 'list',
    },
];

export const wikiFields: INodeProperties[] = [
    {
        displayName: 'Project',
        name: 'project',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                resource: ['wiki'],
            },
        },
    },
    {
        displayName: 'Wiki Identifier',
        name: 'wikiIdentifier',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                resource: ['wiki'],
                operation: ['getPage', 'createPage', 'updatePage'],
            },
        },
        description: 'The ID or name of the Wiki (usually the repo name or default projectwiki)',
    },
    {
        displayName: 'Page Path',
        name: 'pagePath',
        type: 'string',
        default: '/NewPage',
        required: true,
        displayOptions: {
            show: {
                resource: ['wiki'],
                operation: ['getPage', 'createPage', 'updatePage'],
            },
        },
        description: 'The path of the page (e.g. /Documentation/Setup)',
    },
    {
        displayName: 'Content (Markdown)',
        name: 'content',
        type: 'string',
        typeOptions: {
            alwaysOpenEditWindow: true,
        },
        default: '',
        required: true,
        displayOptions: {
            show: {
                resource: ['wiki'],
                operation: ['createPage', 'updatePage'],
            },
        },
        description: 'The markdown content for the Wiki Page',
    },
];
