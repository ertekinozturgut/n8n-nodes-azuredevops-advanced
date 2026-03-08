import { Logger } from '@n8n/backend-common';
import type { ICredentialTestFunctions } from 'n8n-workflow';
export declare class CredentialTestContext implements ICredentialTestFunctions {
    readonly helpers: ICredentialTestFunctions['helpers'];
    constructor();
    get logger(): Logger;
}
