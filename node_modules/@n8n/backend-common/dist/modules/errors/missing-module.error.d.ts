import { UserError } from 'n8n-workflow';
export declare class MissingModuleError extends UserError {
    constructor(moduleName: string, errorMsg: string);
}
