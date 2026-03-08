import type { S3ClientConfig } from '@aws-sdk/client-s3';
import { Logger } from '@n8n/backend-common';
import { Readable } from 'node:stream';
import { ObjectStoreConfig } from './object-store.config';
import type { MetadataResponseHeaders } from './types';
import type { BinaryData } from '../types';
export declare class ObjectStoreService {
    private readonly logger;
    private readonly s3Config;
    private s3Client;
    private isReady;
    private bucket;
    constructor(logger: Logger, s3Config: ObjectStoreConfig);
    getClientConfig(): S3ClientConfig;
    init(): Promise<void>;
    setReady(newState: boolean): void;
    checkConnection(): Promise<void>;
    put(filename: string, buffer: Buffer, metadata?: BinaryData.PreWriteMetadata): Promise<import("@aws-sdk/client-s3").PutObjectCommandOutput>;
    get(fileId: string, { mode }: {
        mode: 'buffer';
    }): Promise<Buffer>;
    get(fileId: string, { mode }: {
        mode: 'stream';
    }): Promise<Readable>;
    getMetadata(fileId: string): Promise<MetadataResponseHeaders>;
    deleteOne(fileId: string): Promise<import("@aws-sdk/client-s3").DeleteObjectCommandOutput>;
    deleteMany(prefix: string): Promise<import("@aws-sdk/client-s3").DeleteObjectsCommandOutput | undefined>;
    list(prefix: string): Promise<{
        key: string;
        lastModified: string;
        eTag: string;
        size: number;
        storageClass: string;
    }[]>;
    getListPage(prefix: string, continuationToken?: string): Promise<{
        contents: {
            key: string;
            lastModified: string;
            eTag: string;
            size: number;
            storageClass: string;
        }[];
        isTruncated: boolean;
        nextContinuationToken: string | undefined;
    }>;
}
