"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectStoreService = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const backend_common_1 = require("@n8n/backend-common");
const di_1 = require("@n8n/di");
const n8n_workflow_1 = require("n8n-workflow");
const node_crypto_1 = require("node:crypto");
const node_stream_1 = require("node:stream");
const object_store_config_1 = require("./object-store.config");
const utils_1 = require("../utils");
let ObjectStoreService = class ObjectStoreService {
    constructor(logger, s3Config) {
        this.logger = logger;
        this.s3Config = s3Config;
        this.isReady = false;
        const { bucket } = s3Config;
        if (bucket.name === '') {
            throw new n8n_workflow_1.UnexpectedError('External storage bucket name not configured. Please set `N8N_EXTERNAL_STORAGE_S3_BUCKET_NAME`.');
        }
        this.bucket = bucket.name;
        this.s3Client = new client_s3_1.S3Client(this.getClientConfig());
    }
    getClientConfig() {
        const { host, bucket, protocol, credentials } = this.s3Config;
        const clientConfig = {};
        const endpoint = host ? `${protocol}://${host}` : undefined;
        if (endpoint) {
            clientConfig.endpoint = endpoint;
            clientConfig.forcePathStyle = true;
        }
        if (bucket.region.length) {
            clientConfig.region = bucket.region;
        }
        if (!credentials.authAutoDetect) {
            clientConfig.credentials = {
                accessKeyId: credentials.accessKey,
                secretAccessKey: credentials.accessSecret,
            };
        }
        return clientConfig;
    }
    async init() {
        await this.checkConnection();
        this.setReady(true);
    }
    setReady(newState) {
        this.isReady = newState;
    }
    async checkConnection() {
        if (this.isReady)
            return;
        try {
            this.logger.debug('Checking connection to S3 bucket', { bucket: this.bucket });
            const command = new client_s3_1.HeadBucketCommand({ Bucket: this.bucket });
            await this.s3Client.send(command);
        }
        catch (e) {
            throw new n8n_workflow_1.UnexpectedError('Request to S3 failed', { cause: e });
        }
    }
    async put(filename, buffer, metadata = {}) {
        try {
            const params = {
                Bucket: this.bucket,
                Key: filename,
                Body: buffer,
                ContentLength: buffer.length,
                ContentMD5: (0, node_crypto_1.createHash)('md5').update(buffer).digest('base64'),
            };
            if (metadata.fileName) {
                params.Metadata = { filename: encodeURIComponent(metadata.fileName) };
            }
            if (metadata.mimeType) {
                params.ContentType = metadata.mimeType;
            }
            this.logger.debug('Sending PUT request to S3', { params });
            const command = new client_s3_1.PutObjectCommand(params);
            return await this.s3Client.send(command);
        }
        catch (e) {
            throw new n8n_workflow_1.UnexpectedError('Request to S3 failed', { cause: e });
        }
    }
    async get(fileId, { mode }) {
        this.logger.debug('Sending GET request to S3', { bucket: this.bucket, key: fileId });
        const command = new client_s3_1.GetObjectCommand({
            Bucket: this.bucket,
            Key: fileId,
        });
        try {
            const { Body: body } = await this.s3Client.send(command);
            if (!body)
                throw new n8n_workflow_1.UnexpectedError('Received empty response body');
            if (mode === 'stream') {
                if (body instanceof node_stream_1.Readable)
                    return body;
                throw new n8n_workflow_1.UnexpectedError(`Expected stream but received ${typeof body}.`);
            }
            return await (0, utils_1.streamToBuffer)(body);
        }
        catch (e) {
            throw new n8n_workflow_1.UnexpectedError('Request to S3 failed', { cause: e });
        }
    }
    async getMetadata(fileId) {
        try {
            const command = new client_s3_1.HeadObjectCommand({
                Bucket: this.bucket,
                Key: fileId,
            });
            this.logger.debug('Sending HEAD request to S3', { bucket: this.bucket, key: fileId });
            const response = await this.s3Client.send(command);
            const headers = {};
            if (response.ContentType)
                headers['content-type'] = response.ContentType;
            if (response.ContentLength)
                headers['content-length'] = String(response.ContentLength);
            if (response.ETag)
                headers.etag = response.ETag;
            if (response.LastModified)
                headers['last-modified'] = response.LastModified.toUTCString();
            if (response.Metadata) {
                Object.entries(response.Metadata).forEach(([key, value]) => {
                    headers[`x-amz-meta-${key.toLowerCase()}`] =
                        key === 'filename' ? decodeURIComponent(value) : value;
                });
            }
            return headers;
        }
        catch (e) {
            throw new n8n_workflow_1.UnexpectedError('Request to S3 failed', { cause: e });
        }
    }
    async deleteOne(fileId) {
        try {
            const command = new client_s3_1.DeleteObjectCommand({
                Bucket: this.bucket,
                Key: fileId,
            });
            this.logger.debug('Sending DELETE request to S3', { bucket: this.bucket, key: fileId });
            return await this.s3Client.send(command);
        }
        catch (e) {
            throw new n8n_workflow_1.UnexpectedError('Request to S3 failed', { cause: e });
        }
    }
    async deleteMany(prefix) {
        try {
            const objects = await this.list(prefix);
            if (objects.length === 0)
                return;
            const params = {
                Bucket: this.bucket,
                Delete: {
                    Objects: objects.map(({ key }) => ({ Key: key })),
                },
            };
            this.logger.debug('Sending DELETE MANY request to S3', {
                bucket: this.bucket,
                objectCount: objects.length,
            });
            const command = new client_s3_1.DeleteObjectsCommand(params);
            return await this.s3Client.send(command);
        }
        catch (e) {
            throw new n8n_workflow_1.UnexpectedError('Request to S3 failed', { cause: e });
        }
    }
    async list(prefix) {
        const items = [];
        let isTruncated = true;
        let continuationToken;
        try {
            while (isTruncated) {
                const listPage = await this.getListPage(prefix, continuationToken);
                if (listPage.contents?.length > 0) {
                    items.push(...listPage.contents);
                }
                isTruncated = listPage.isTruncated;
                continuationToken = listPage.nextContinuationToken;
            }
            return items;
        }
        catch (e) {
            throw new n8n_workflow_1.UnexpectedError('Request to S3 failed', { cause: e });
        }
    }
    async getListPage(prefix, continuationToken) {
        try {
            const params = {
                Bucket: this.bucket,
                Prefix: prefix,
            };
            if (continuationToken) {
                params.ContinuationToken = continuationToken;
            }
            this.logger.debug('Sending list request to S3', { bucket: this.bucket, prefix });
            const command = new client_s3_1.ListObjectsV2Command(params);
            const response = await this.s3Client.send(command);
            const contents = response.Contents?.map((item) => ({
                key: item.Key ?? '',
                lastModified: item.LastModified?.toISOString() ?? '',
                eTag: item.ETag ?? '',
                size: item.Size ?? 0,
                storageClass: item.StorageClass ?? '',
            })) ?? [];
            return {
                contents,
                isTruncated: response.IsTruncated ?? false,
                nextContinuationToken: response.NextContinuationToken,
            };
        }
        catch (e) {
            throw new n8n_workflow_1.UnexpectedError('Request to S3 failed', { cause: e });
        }
    }
};
exports.ObjectStoreService = ObjectStoreService;
exports.ObjectStoreService = ObjectStoreService = __decorate([
    (0, di_1.Service)(),
    __metadata("design:paramtypes", [backend_common_1.Logger,
        object_store_config_1.ObjectStoreConfig])
], ObjectStoreService);
//# sourceMappingURL=object-store.service.ee.js.map