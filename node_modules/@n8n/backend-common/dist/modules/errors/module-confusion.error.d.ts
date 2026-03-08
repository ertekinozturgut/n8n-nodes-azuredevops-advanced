import { UserError } from 'n8n-workflow';
export declare class ModuleConfusionError extends UserError {
    constructor(moduleNames: string[]);
}
