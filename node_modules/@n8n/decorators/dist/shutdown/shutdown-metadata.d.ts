import type { ShutdownHandler } from './types';
export declare class ShutdownMetadata {
    private handlersByPriority;
    register(priority: number, handler: ShutdownHandler): void;
    getHandlersByPriority(): ShutdownHandler[][];
    clear(): void;
}
