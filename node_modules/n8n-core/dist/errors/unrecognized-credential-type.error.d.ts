import { UserError } from 'n8n-workflow';
export declare class UnrecognizedCredentialTypeError extends UserError {
    constructor(credentialType: string);
}
