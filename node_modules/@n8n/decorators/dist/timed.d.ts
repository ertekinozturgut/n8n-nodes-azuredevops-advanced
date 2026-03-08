export interface TimedOptions {
    threshold?: number;
    logArgs?: boolean;
}
interface Logger {
    warn(message: string, meta?: object): void;
}
export declare const Timed: (logger: Logger, msg?: string) => (options?: TimedOptions) => MethodDecorator;
export {};
