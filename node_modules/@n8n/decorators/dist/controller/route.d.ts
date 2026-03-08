import type { RequestHandler } from 'express';
import type { RateLimit } from './types';
interface RouteOptions {
    middlewares?: RequestHandler[];
    usesTemplates?: boolean;
    skipAuth?: boolean;
    allowSkipPreviewAuth?: boolean;
    allowSkipMFA?: boolean;
    rateLimit?: boolean | RateLimit;
    apiKeyAuth?: boolean;
}
export declare const Get: (path: `/${string}`, options?: RouteOptions) => MethodDecorator;
export declare const Post: (path: `/${string}`, options?: RouteOptions) => MethodDecorator;
export declare const Put: (path: `/${string}`, options?: RouteOptions) => MethodDecorator;
export declare const Patch: (path: `/${string}`, options?: RouteOptions) => MethodDecorator;
export declare const Delete: (path: `/${string}`, options?: RouteOptions) => MethodDecorator;
export declare const Head: (path: `/${string}`, options?: RouteOptions) => MethodDecorator;
export declare const Options: (path: `/${string}`, options?: RouteOptions) => MethodDecorator;
export {};
