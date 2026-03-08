import type { IncomingMessage } from 'http';
interface IContentType {
    type: string;
    parameters: {
        charset: string;
        [key: string]: string;
    };
}
export declare const parseContentType: (contentType?: string) => IContentType | null;
interface IContentDisposition {
    type: string;
    filename?: string;
}
export declare const parseContentDisposition: (contentDisposition?: string) => IContentDisposition | null;
export declare function parseIncomingMessage(message: IncomingMessage): void;
export {};
