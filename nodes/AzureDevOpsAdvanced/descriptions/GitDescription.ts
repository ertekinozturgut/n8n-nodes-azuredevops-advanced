import { INodeProperties } from 'n8n-workflow';

export const gitOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['git'],
            },
        },
        options: [
            { name: 'List Repositories', value: 'listRepos', action: 'List all repositories' },
            { name: 'Get File Content', value: 'getFile', action: 'Get a file from repository' },
            { name: 'Create Branch', value: 'createBranch', action: 'Create a new branch' },
            { name: 'Push Commit', value: 'pushCommit', action: 'Push a commit to a branch' },
        ],
        default: 'listRepos',
    },
];

export const gitFields: INodeProperties[] = [
    {
        displayName: 'Project',
        name: 'project',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['git'],
                operation: ['listRepos', 'getFile', 'createBranch', 'pushCommit'],
            },
        },
        default: '',
        required: true,
        description: 'The project name or ID. Ex: MyProject',
    },
    {
        displayName: 'Repository ID',
        name: 'repositoryId',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['git'],
                operation: ['getFile', 'createBranch', 'pushCommit'],
            },
        },
        default: '',
        required: true,
        description: 'The ID or name of the repository',
    },
    {
        displayName: 'File Path',
        name: 'filePath',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['git'],
                operation: ['getFile'],
            },
        },
        default: '/',
        required: true,
        description: 'The path of the file to retrieve',
    },
    {
        displayName: 'Branch Name',
        name: 'branchName',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                resource: ['git'],
                operation: ['createBranch', 'pushCommit'],
            },
        },
        description: 'Name of the branch (e.g. refs/heads/feature-1)',
    },

    {
        displayName: 'Commit Message',
        name: 'commitMessage',
        type: 'string',
        default: 'Update from n8n',
        displayOptions: {
            show: {
                resource: ['git'],
                operation: ['pushCommit'],
            },
        },
    },
    {
        displayName: 'File Path',
        name: 'pushFilePath',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                resource: ['git'],
                operation: ['pushCommit'],
            },
        },
        description: 'Path of the file to create or update (e.g. /src/app.ts)',
    },
    {
        displayName: 'Change Type',
        name: 'changeType',
        type: 'options',
        options: [
            { name: 'Edit (update existing file)', value: 'edit' },
            { name: 'Add (create new file)', value: 'add' },
        ],
        default: 'edit',
        displayOptions: {
            show: {
                resource: ['git'],
                operation: ['pushCommit'],
            },
        },
    },
    {
        displayName: 'File Content',
        name: 'fileContent',
        type: 'string',
        typeOptions: { alwaysOpenEditWindow: true },
        default: '',
        displayOptions: {
            show: {
                resource: ['git'],
                operation: ['pushCommit'],
            },
        },
        description: 'New content to write/push to the file',
    },
];
