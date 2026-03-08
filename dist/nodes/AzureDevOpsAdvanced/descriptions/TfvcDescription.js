"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tfvcFields = exports.tfvcOperations = void 0;
exports.tfvcOperations = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['tfvc'],
            },
        },
        options: [
            { name: 'List Branches/Folders', value: 'listRepos', action: 'List all TFVC branches' },
            { name: 'Get File Content', value: 'getFile', action: 'Get a file from TFVC repository' },
        ],
        default: 'listRepos',
    },
];
exports.tfvcFields = [
    {
        displayName: 'Project',
        name: 'project',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['tfvc'],
            },
        },
        default: '',
        required: true,
        description: 'The project name or ID. Ex: MyProject',
    },
    {
        displayName: 'File/Folder Path',
        name: 'filePath',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['tfvc'],
                operation: ['getFile'],
            },
        },
        default: '$/MyProject/path/to/file.cs',
        required: true,
        description: 'The TFS path of the file to retrieve (e.g. $/Project/File.cs)',
    },
];
