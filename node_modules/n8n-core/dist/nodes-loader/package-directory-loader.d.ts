import { DirectoryLoader } from './directory-loader';
import type { n8n } from './types';
export declare class PackageDirectoryLoader extends DirectoryLoader {
    packageJson: n8n.PackageJson;
    packageName: string;
    constructor(directory: string, excludeNodes?: string[], includeNodes?: string[]);
    loadAll(): Promise<void>;
    private inferSupportedNodes;
    private parseJSON;
    protected readJSONSync<T>(file: string): T;
    protected readJSON<T>(file: string): Promise<T>;
}
