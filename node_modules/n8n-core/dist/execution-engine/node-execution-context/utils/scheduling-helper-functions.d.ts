import type { SchedulingFunctions, Workflow } from 'n8n-workflow';
export declare const getSchedulingFunctions: (workflowId: Workflow["id"], timezone: Workflow["timezone"], nodeId: string) => SchedulingFunctions;
