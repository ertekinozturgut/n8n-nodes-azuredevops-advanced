export interface IExternalSecretsManager {
    updateSecrets(): Promise<void>;
    hasSecret(provider: string, name: string): boolean;
    getSecret(provider: string, name: string): unknown;
    getSecretNames(provider: string): string[];
    hasProvider(provider: string): boolean;
    getProviderNames(): string[];
}
export declare class ExternalSecretsProxy {
    private manager?;
    setManager(manager: IExternalSecretsManager): void;
    update(): Promise<void>;
    getSecret(provider: string, name: string): unknown;
    hasSecret(provider: string, name: string): boolean;
    hasProvider(provider: string): boolean;
    listProviders(): string[];
    listSecrets(provider: string): string[];
}
