import 'reflect-metadata';
import { z } from 'zod';
type Class = Function;
type PropertyType = number | boolean | string | Class;
interface PropertyMetadata {
    type: PropertyType;
    envName?: string;
    schema?: z.ZodType<unknown>;
}
export declare const Config: ClassDecorator;
export declare const Nested: PropertyDecorator;
export declare const Env: (envName: string, schema?: PropertyMetadata["schema"]) => PropertyDecorator;
export {};
