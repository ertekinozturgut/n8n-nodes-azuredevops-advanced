import { FileSystemError } from './abstract/filesystem.error';
export declare class FileNotFoundError extends FileSystemError {
    constructor(filePath: string);
}
