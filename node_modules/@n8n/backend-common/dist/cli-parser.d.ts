import type { z } from 'zod';
import { Logger } from './logging';
type CliInput<Flags extends z.ZodRawShape> = {
    argv: string[];
    flagsSchema?: z.ZodObject<Flags>;
    description?: string;
    examples?: string[];
};
type ParsedArgs<Flags = Record<string, unknown>> = {
    flags: Flags;
    args: string[];
};
export declare class CliParser {
    private readonly logger;
    constructor(logger: Logger);
    parse<Flags extends z.ZodRawShape>(input: CliInput<Flags>): ParsedArgs<z.infer<z.ZodObject<Flags>>>;
}
export {};
