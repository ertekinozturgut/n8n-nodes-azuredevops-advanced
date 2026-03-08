import { UnexpectedError } from 'n8n-workflow';
export declare class RedactableError extends UnexpectedError {
    constructor(fieldName: string, args: string);
}
type FieldName = 'user' | 'inviter' | 'invitee';
export declare const Redactable: (fieldName?: FieldName) => MethodDecorator;
export {};
