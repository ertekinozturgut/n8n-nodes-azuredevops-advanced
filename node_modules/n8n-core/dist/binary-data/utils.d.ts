import type { Readable } from 'node:stream';
import type { BinaryData } from './types';
export declare function isStoredMode(mode: string): mode is BinaryData.StoredMode;
export declare function assertDir(dir: string): Promise<void>;
export declare function doesNotExist(dir: string): Promise<boolean>;
export declare function streamToBuffer(stream: Readable): Promise<Buffer<ArrayBufferLike>>;
export declare function binaryToBuffer(body: Buffer | Readable): Promise<Buffer<ArrayBufferLike>>;
export declare const FileLocation: {
    ofExecution: (workflowId: string, executionId: string) => BinaryData.FileLocation;
    ofCustom: ({ pathSegments, sourceType, sourceId, }: {
        pathSegments: string[];
        sourceType?: string;
        sourceId?: string;
    }) => BinaryData.FileLocation;
};
