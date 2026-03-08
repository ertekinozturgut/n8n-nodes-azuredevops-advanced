import type { CommandEntry } from './types';
export declare class CommandMetadata {
    private readonly commands;
    register(name: string, entry: CommandEntry): void;
    get(name: string): CommandEntry | undefined;
    getEntries(): [string, CommandEntry][];
}
