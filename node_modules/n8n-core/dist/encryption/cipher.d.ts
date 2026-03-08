import { InstanceSettings } from '../instance-settings';
export declare class Cipher {
    private readonly instanceSettings;
    constructor(instanceSettings: InstanceSettings);
    encrypt(data: string | object, customEncryptionKey?: string): string;
    decrypt(data: string, customEncryptionKey?: string): string;
    private getKeyAndIv;
}
