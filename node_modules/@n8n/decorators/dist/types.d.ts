export type Class<T = object, A extends unknown[] = unknown[]> = new (...args: A) => T;
type EventHandlerFn = () => Promise<void> | void;
export type EventHandlerClass = Class<Record<string, EventHandlerFn>>;
export type EventHandler<T extends string> = {
    eventHandlerClass: EventHandlerClass;
    methodName: string;
    eventName: T;
};
export {};
