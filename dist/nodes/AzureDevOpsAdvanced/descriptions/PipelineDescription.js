"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pipelineFields = exports.pipelineOperations = void 0;
exports.pipelineOperations = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['pipeline'],
            },
        },
        options: [
            { name: 'List Pipelines', value: 'list', action: 'List all pipelines' },
            { name: 'Run Pipeline', value: 'run', action: 'Run a pipeline (Build)' },
            { name: 'Get Build Logs', value: 'getLogs', action: 'Get logs of a specific run' },
            { name: 'Cancel Build Run', value: 'cancelRun', action: 'Cancel an active pipeline run' },
        ],
        default: 'list',
    },
];
exports.pipelineFields = [
    {
        displayName: 'Project',
        name: 'project',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['pipeline'],
            },
        },
        default: '',
        required: true,
    },
    {
        displayName: 'Pipeline ID',
        name: 'pipelineId',
        type: 'number',
        displayOptions: {
            show: {
                resource: ['pipeline'],
                operation: ['run', 'getLogs'],
            },
        },
        default: 0,
        required: true,
    },
    {
        displayName: 'Run ID',
        name: 'runId',
        type: 'number',
        default: 0,
        required: true,
        displayOptions: {
            show: {
                resource: ['pipeline'],
                operation: ['getLogs', 'cancelRun'],
            },
        },
        description: 'ID of the specific pipeline run/build',
    },
];
