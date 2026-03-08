"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.boardFields = exports.boardOperations = void 0;
exports.boardOperations = [
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
exports.boardFields = [
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
