export declare namespace n8n {
    interface PackageJson {
        name: string;
        version: string;
        n8n?: {
            credentials?: string[];
            nodes?: string[];
        };
        author?: {
            name?: string;
            email?: string;
        };
    }
}
