import type { Readable } from 'stream';
import type { ErrorReporter } from '../errors';
import type { BinaryData } from './types';
export declare class FileSystemManager implements BinaryData.Manager {
    private storagePath;
    private readonly errorReporter;
    constructor(storagePath: string, errorReporter: ErrorReporter);
    init(): Promise<void>;
    store(location: BinaryData.FileLocation, bufferOrStream: Buffer | Readable, { mimeType, fileName }: BinaryData.PreWriteMetadata): Promise<{
        fileId: string;
        fileSize: number;
    }>;
    getPath(fileId: string): string;
    getAsStream(fileId: string, chunkSize?: number): Promise<import("fs").ReadStream>;
    getAsBuffer(fileId: string): Promise<Buffer<ArrayBufferLike>>;
    getMetadata(fileId: string): Promise<BinaryData.Metadata>;
    deleteMany(locations: BinaryData.FileLocation[]): Promise<void>;
    copyByFilePath(targetLocation: BinaryData.FileLocation, sourcePath: string, { mimeType, fileName }: BinaryData.PreWriteMetadata): Promise<{
        fileId: string;
        fileSize: number;
    }>;
    copyByFileId(targetLocation: BinaryData.FileLocation, sourceFileId: string): Promise<string>;
    rename(oldFileId: string, newFileId: string): Promise<void>;
    deleteManyByFileId(ids: string[]): Promise<void>;
    private toFileId;
    private toRelativePath;
    private parseFileId;
    private resolvePath;
    private storeMetadata;
    private getSize;
}
