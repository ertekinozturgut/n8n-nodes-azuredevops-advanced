import { INodeProperties } from 'n8n-workflow';

export const boardOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['boards'],
            },
        },
        options: [
            { name: 'List Boards', value: 'listBoards', action: 'List agile boards for a project' },
            { name: 'List Iterations (Sprints)', value: 'listIterations', action: 'List iteration paths (Sprints) for a team' },
            { name: 'List Board Columns', value: 'listColumns', action: 'List columns of a specific board' },
        ],
        default: 'listBoards',
    },
];

export const boardFields: INodeProperties[] = [
    {
        displayName: 'Project',
        name: 'project',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                resource: ['boards'],
            },
        },
    },
    {
        displayName: 'Team URL Name / ID',
        name: 'team',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                resource: ['boards'],
                operation: ['listBoards', 'listIterations', 'listColumns'],
            },
        },
        description: 'The team context name (usually matches project name + " Team")',
    },
    {
        displayName: 'Board ID (or Name)',
        name: 'boardId',
        type: 'string',
        default: 'Stories',
        required: true,
        displayOptions: {
            show: {
                resource: ['boards'],
                operation: ['listColumns'],
            },
        },
        description: 'Name of the board (e.g. Epics, Features, Stories)',
    },
];
