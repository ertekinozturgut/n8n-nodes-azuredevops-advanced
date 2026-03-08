import 'reflect-metadata';
export type Constructable<T = unknown> = new (...args: any[]) => T;
type AbstractConstructable<T = unknown> = abstract new (...args: unknown[]) => T;
type ServiceIdentifier<T = unknown> = Constructable<T> | AbstractConstructable<T>;
type Factory<T = unknown> = (...args: unknown[]) => T;
interface Options<T> {
    factory?: Factory<T>;
}
export declare function Service<T = unknown>(): Function;
export declare function Service<T = unknown>(options: Options<T>): Function;
declare class ContainerClass {
    private readonly resolutionStack;
    has<T>(type: ServiceIdentifier<T>): boolean;
    get<T>(type: ServiceIdentifier<T>): T;
    set<T>(type: ServiceIdentifier<T>, instance: T): void;
    reset(): void;
}
export declare const Container: ContainerClass;
export {};
