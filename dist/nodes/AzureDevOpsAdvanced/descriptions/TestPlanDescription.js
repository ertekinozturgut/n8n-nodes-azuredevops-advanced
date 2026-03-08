"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testPlanFields = exports.testPlanOperations = void 0;
exports.testPlanOperations = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['testPlan'],
            },
        },
        options: [
            { name: 'List Test Plans', value: 'listPlans', action: 'List test plans for a project' },
            { name: 'List Test Suites', value: 'listSuites', action: 'List test suites for a plan' },
            { name: 'List Test Cases', value: 'listCases', action: 'List test cases for a suite' },
            { name: 'List Test Runs', value: 'listRuns', action: 'List automated/manual test runs' },
        ],
        default: 'listPlans',
    },
];
exports.testPlanFields = [
    {
        displayName: 'Project',
        name: 'project',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                resource: ['testPlan'],
            },
        },
        description: 'The name or ID of the Azure DevOps project',
    },
    {
        displayName: 'Plan ID',
        name: 'planId',
        type: 'number',
        default: 0,
        required: true,
        displayOptions: {
            show: {
                resource: ['testPlan'],
                operation: ['listSuites', 'listCases'],
            },
        },
        description: 'ID of the Test Plan',
    },
    {
        displayName: 'Suite ID',
        name: 'suiteId',
        type: 'number',
        default: 0,
        required: true,
        displayOptions: {
            show: {
                resource: ['testPlan'],
                operation: ['listCases'],
            },
        },
        description: 'ID of the Test Suite mapped to the plan',
    },
];
