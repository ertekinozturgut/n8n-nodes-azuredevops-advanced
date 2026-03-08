import { UserError } from 'n8n-workflow';
export declare class FileTooLargeError extends UserError {
    constructor({ fileSizeMb, maxFileSizeMb, fileId, fileName, }: {
        fileSizeMb: number;
        maxFileSizeMb: number;
        fileId: string;
        fileName?: string;
    });
}
