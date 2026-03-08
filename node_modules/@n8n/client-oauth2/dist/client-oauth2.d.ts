import * as qs from 'querystring';
import type { ClientOAuth2TokenData } from './client-oauth2-token';
import { ClientOAuth2Token } from './client-oauth2-token';
import { CodeFlow } from './code-flow';
import { CredentialsFlow } from './credentials-flow';
import type { Headers } from './types';
export interface ClientOAuth2RequestObject {
    url: string;
    method: 'DELETE' | 'GET' | 'HEAD' | 'PATCH' | 'POST' | 'PUT';
    body?: Record<string, any>;
    query?: qs.ParsedUrlQuery;
    headers?: Headers;
    ignoreSSLIssues?: boolean;
}
export interface ClientOAuth2Options {
    clientId: string;
    clientSecret?: string;
    accessTokenUri: string;
    authentication?: 'header' | 'body';
    authorizationUri?: string;
    redirectUri?: string;
    scopes?: string[];
    scopesSeparator?: ',' | ' ';
    authorizationGrants?: string[];
    state?: string;
    additionalBodyProperties?: Record<string, any>;
    body?: Record<string, any>;
    query?: qs.ParsedUrlQuery;
    ignoreSSLIssues?: boolean;
}
export declare class ResponseError extends Error {
    readonly status: number;
    readonly body: unknown;
    readonly code: string;
    readonly message: string;
    constructor(status: number, body: unknown, code?: string, message?: string);
}
export declare class ClientOAuth2 {
    readonly options: ClientOAuth2Options;
    code: CodeFlow;
    credentials: CredentialsFlow;
    constructor(options: ClientOAuth2Options);
    createToken(data: ClientOAuth2TokenData, type?: string): ClientOAuth2Token;
    accessTokenRequest(options: ClientOAuth2RequestObject): Promise<ClientOAuth2TokenData>;
    private parseResponseBody;
}
