"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pullRequestFields = exports.pullRequestOperations = void 0;
exports.pullRequestOperations = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['pullRequest'],
            },
        },
        options: [
            { name: 'Create', value: 'create', action: 'Create a pull request' },
            { name: 'Get', value: 'get', action: 'Get a pull request' },
            { name: 'Get Comments / Threads', value: 'getComments', action: 'Get thread/comments of a PR' },
            { name: 'List', value: 'list', action: 'List pull requests' },
            { name: 'Update', value: 'update', action: 'Update a pull request' },
        ],
        default: 'list',
    },
];
exports.pullRequestFields = [
    {
        displayName: 'Project',
        name: 'project',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['pullRequest'],
            },
        },
        default: '',
        required: true,
    },
    {
        displayName: 'Repository ID or Name',
        name: 'repositoryId',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['pullRequest'],
                operation: ['create', 'get', 'getComments', 'list', 'update'],
            },
        },
        default: '',
        required: true,
    },
    {
        displayName: 'Pull Request ID',
        name: 'pullRequestId',
        type: 'number',
        displayOptions: {
            show: {
                resource: ['pullRequest'],
                operation: ['get', 'getComments', 'update'],
            },
        },
        default: 0,
        required: true,
    },
    // ---- CREATE FIELDS ----
    {
        displayName: 'Source Ref Name',
        name: 'sourceRefName',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['pullRequest'],
                operation: ['create'],
            },
        },
        placeholder: 'refs/heads/my-feature',
        description: 'The name of the source branch of the pull request.',
        default: '',
        required: true,
    },
    {
        displayName: 'Target Ref Name',
        name: 'targetRefName',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['pullRequest'],
                operation: ['create'],
            },
        },
        placeholder: 'refs/heads/main',
        description: 'The name of the target branch of the pull request.',
        default: '',
        required: true,
    },
    {
        displayName: 'Title',
        name: 'title',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['pullRequest'],
                operation: ['create'],
            },
        },
        default: '',
        required: true,
    },
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        displayOptions: {
            show: {
                resource: ['pullRequest'],
                operation: ['create'],
            },
        },
        default: {},
        options: [
            {
                displayName: 'Description',
                name: 'description',
                type: 'string',
                typeOptions: {
                    alwaysOpenEditWindow: true,
                },
                default: '',
                description: 'Description of the pull request',
            },
            {
                displayName: 'Is Draft',
                name: 'isDraft',
                type: 'boolean',
                default: false,
                description: 'Whether the pull request is a draft',
            },
            {
                displayName: 'Reviewers (Comma Separated IDs)',
                name: 'reviewers',
                type: 'string',
                default: '',
                description: 'Comma separated IDs of reviewers',
            },
            {
                displayName: 'Work Item IDs (Comma Separated)',
                name: 'workItemIds',
                type: 'string',
                default: '',
                description: 'Comma separated work item IDs or URLs to link to the pull request',
            },
        ],
    },
    // ---- UPDATE FIELDS ----
    {
        displayName: 'Update Fields',
        name: 'updateFields',
        type: 'collection',
        placeholder: 'Add Field',
        displayOptions: {
            show: {
                resource: ['pullRequest'],
                operation: ['update'],
            },
        },
        default: {},
        options: [
            {
                displayName: 'Title',
                name: 'title',
                type: 'string',
                default: '',
            },
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
                displayName: 'Status',
                name: 'status',
                type: 'options',
                options: [
                    { name: 'Active', value: 'active' },
                    { name: 'Abandoned', value: 'abandoned' },
                    { name: 'Completed', value: 'completed' },
                ],
                default: 'active',
                description: 'The status of the pull request',
            },
            {
                displayName: 'Merge Strategy (Completion Options)',
                name: 'mergeStrategy',
                type: 'options',
                options: [
                    { name: 'No Fast Forward', value: 'noFastForward' },
                    { name: 'Rebase', value: 'rebase' },
                    { name: 'Rebase Merge', value: 'rebaseMerge' },
                    { name: 'Squash', value: 'squash' },
                ],
                default: 'squash',
            },
            {
                displayName: 'Delete Source Branch (Completion Options)',
                name: 'deleteSourceBranch',
                type: 'boolean',
                default: false,
            },
            {
                displayName: 'Transition Work Items (Completion Options)',
                name: 'transitionWorkItems',
                type: 'boolean',
                default: false,
            },
            {
                displayName: 'Bypass Policy (Completion Options)',
                name: 'bypassPolicy',
                type: 'boolean',
                default: false,
            },
            {
                displayName: 'Bypass Reason (Completion Options)',
                name: 'bypassReason',
                type: 'string',
                default: '',
            },
            {
                displayName: 'Merge Commit Message (Completion Options)',
                name: 'mergeCommitMessage',
                type: 'string',
                default: '',
            },
        ],
    },
    // ---- LIST FIELDS ----
    {
        displayName: 'List Options',
        name: 'listOptions',
        type: 'collection',
        placeholder: 'Add Option',
        displayOptions: {
            show: {
                resource: ['pullRequest'],
                operation: ['list'],
            },
        },
        default: {},
        options: [
            {
                displayName: 'Status',
                name: 'status',
                type: 'options',
                options: [
                    { name: 'Active', value: 'active' },
                    { name: 'Abandoned', value: 'abandoned' },
                    { name: 'All', value: 'all' },
                    { name: 'Completed', value: 'completed' },
                    { name: 'Not Set', value: 'notSet' },
                ],
                default: 'active',
            },
            {
                displayName: 'Creator ID',
                name: 'creatorId',
                type: 'string',
                default: '',
            },
            {
                displayName: 'Reviewer ID',
                name: 'reviewerId',
                type: 'string',
                default: '',
            },
            {
                displayName: 'Source Ref Name',
                name: 'sourceRefName',
                type: 'string',
                default: '',
            },
            {
                displayName: 'Target Ref Name',
                name: 'targetRefName',
                type: 'string',
                default: '',
            },
            {
                displayName: 'Top (Limit)',
                name: 'top',
                type: 'number',
                default: 100,
            },
        ]
    }
];
