import { UserError } from 'n8n-workflow';
export declare class UnrecognizedNodeTypeError extends UserError {
    constructor(packageName: string, nodeType: string);
}
