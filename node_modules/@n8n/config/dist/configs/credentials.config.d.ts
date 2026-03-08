declare class CredentialsOverwrite {
    data: string;
    endpoint: string;
    endpointAuthToken: string;
    persistence: boolean;
}
export declare class CredentialsConfig {
    defaultName: string;
    overwrite: CredentialsOverwrite;
}
export {};
