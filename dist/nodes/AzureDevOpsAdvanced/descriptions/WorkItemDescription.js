"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.workItemFields = exports.workItemOperations = void 0;
exports.workItemOperations = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['workItem'],
            },
        },
        options: [
            { name: 'Get Work Item', value: 'get', action: 'Get a work item' },
            { name: 'List All Work Items (WIQL)', value: 'listAll', action: 'List all work items in project' },
            { name: 'Create Work Item', value: 'create', action: 'Create a work item' },
            { name: 'Update Work Item', value: 'update', action: 'Update a work item' },
            { name: 'List Users', value: 'listUsers', action: 'List Azure DevOps users' },
            { name: 'List Tags', value: 'listTags', action: 'List work item tags' },
        ],
        default: 'get',
    },
];
exports.workItemFields = [
    {
        displayName: 'Project',
        name: 'project',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['workItem'],
            },
        },
        default: '',
        required: true,
    },
    {
        displayName: 'Work Item ID',
        name: 'workItemId',
        type: 'number',
        displayOptions: {
            show: {
                resource: ['workItem'],
                operation: ['get', 'update'],
            },
        },
        default: 0,
        required: true,
    },
    {
        displayName: 'Work Item Type',
        name: 'workItemType',
        type: 'options',
        options: [
            { name: 'Task', value: 'Task' },
            { name: 'Bug', value: 'Bug' },
            { name: 'Epic', value: 'Epic' },
            { name: 'Feature', value: 'Feature' },
            { name: 'User Story', value: 'User Story' },
            { name: 'Issue', value: 'Issue' },
            { name: 'Test Case', value: 'Test Case' }
        ],
        displayOptions: {
            show: {
                resource: ['workItem'],
                operation: ['create'],
            },
        },
        default: 'Task',
        required: true,
        description: 'The work item type (e.g. Bug, Task, Epic)',
    },
    {
        displayName: 'Title',
        name: 'title',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['workItem'],
                operation: ['create'],
            },
        },
        default: '',
        required: true,
        description: 'Title of the work item',
    },
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: ['workItem'],
                operation: ['create', 'update'],
            },
        },
        options: [
            {
                displayName: 'Description',
                name: 'description',
                type: 'string',
                typeOptions: {
                    alwaysOpenEditWindow: true,
                },
                default: '',
            },
            {
                displayName: 'Assigned To',
                name: 'assignedTo',
                type: 'string',
                default: '',
                description: 'Email address of the user to assign the work item to',
            },
            {
                displayName: 'State',
                name: 'state',
                type: 'options',
                options: [
                    { name: 'New (To Do)', value: 'New' },
                    { name: 'Active (Doing)', value: 'Active' },
                    { name: 'Resolved', value: 'Resolved' },
                    { name: 'Closed (Done)', value: 'Closed' },
                    { name: 'Removed', value: 'Removed' },
                    { name: 'To Do (Basic)', value: 'To Do' },
                    { name: 'Doing (Basic)', value: 'Doing' },
                    { name: 'Done (Basic)', value: 'Done' }
                ],
                default: 'New',
                description: 'The state of the work item based on your process template',
            },
            {
                displayName: 'Priority',
                name: 'priority',
                type: 'options',
                options: [
                    { name: '1 (Highest)', value: 1 },
                    { name: '2 (High)', value: 2 },
                    { name: '3 (Medium)', value: 3 },
                    { name: '4 (Low)', value: 4 },
                ],
                default: 2,
            },
            {
                displayName: 'Tags (Comma Separated)',
                name: 'tags',
                type: 'string',
                default: '',
                description: 'Comma separated list of tags (e.g. Frontend, Critical)',
            },
            {
                displayName: 'Custom Fields',
                name: 'customFieldsUi',
                placeholder: 'Add Custom Field',
                type: 'fixedCollection',
                typeOptions: {
                    multipleValues: true,
                },
                description: 'Add custom fields (e.g. Custom.MyField)',
                default: {},
                options: [
                    {
                        name: 'customFieldsValues',
                        displayName: 'Custom Field',
                        values: [
                            {
                                displayName: 'Field Name (Path)',
                                name: 'fieldId',
                                type: 'string',
                                default: '',
                                description: 'The system name of the field. Ex: Custom.Urgency or Microsoft.VSTS.Common.AcceptanceCriteria',
                            },
                            {
                                displayName: 'Value',
                                name: 'fieldValue',
                                type: 'string',
                                default: '',
                                description: 'The value to set on the custom field',
                            },
                        ],
                    },
                ],
            },
        ],
    },
];
