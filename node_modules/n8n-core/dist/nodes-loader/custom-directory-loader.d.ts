import { DirectoryLoader } from './directory-loader';
export declare class CustomDirectoryLoader extends DirectoryLoader {
    packageName: string;
    constructor(directory: string, excludeNodes?: string[], includeNodes?: string[]);
    loadAll(): Promise<void>;
}
