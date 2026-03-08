import { ApplicationError } from '@n8n/errors';
export declare class InvalidExecutionMetadataError extends ApplicationError {
    type: 'key' | 'value';
    constructor(type: 'key' | 'value', key: unknown, message?: string, options?: ErrorOptions);
}
