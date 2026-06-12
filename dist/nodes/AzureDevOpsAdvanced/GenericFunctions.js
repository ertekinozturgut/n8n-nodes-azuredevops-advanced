"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.azureApiRequest = azureApiRequest;
async function azureApiRequest(method, endpoint, body = {}, query = {}) {
    const credentials = await this.getCredentials('azureDevOpsAdvancedApi');
    if (!credentials) {
        throw new Error('No credentials provided!');
    }
    const token = Buffer.from(`:${credentials.pat}`).toString('base64');
    const baseUrl = `https://dev.azure.com/${credentials.organization}`;
    const options = {
        method,
        body,
        qs: query,
        uri: `${baseUrl}/${endpoint}`,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${token}`,
        },
        json: true,
    };
    if (!Array.isArray(body) && Object.keys(body).length === 0) {
        delete options.body;
    }
    return this.helpers.request(options);
}
