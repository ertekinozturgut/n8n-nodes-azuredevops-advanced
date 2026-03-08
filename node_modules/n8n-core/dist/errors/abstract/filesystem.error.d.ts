import { ApplicationError } from '@n8n/errors';
export declare abstract class FileSystemError extends ApplicationError {
    constructor(message: string, filePath: string);
}
