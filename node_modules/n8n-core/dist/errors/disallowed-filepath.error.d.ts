import { FileSystemError } from './abstract/filesystem.error';
export declare class DisallowedFilepathError extends FileSystemError {
    constructor(filePath: string);
}
