import { INodeProperties } from 'n8n-workflow';

export const pipelineOperations: INodeProperties[] = [
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

export const pipelineFields: INodeProperties[] = [
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
                operation: ['run', 'getLogs', 'cancelRun'],
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
