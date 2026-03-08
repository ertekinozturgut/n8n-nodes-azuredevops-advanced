import { ContextEstablishmentHookClass } from './context-establishment-hook';
type ContextEstablishmentHookEntry = {
    class: ContextEstablishmentHookClass;
};
export declare class ContextEstablishmentHookMetadata {
    private readonly contextEstablishmentHooks;
    register(hookEntry: ContextEstablishmentHookEntry): void;
    getEntries(): [ContextEstablishmentHookEntry, ContextEstablishmentHookEntry][];
    getClasses(): ContextEstablishmentHookClass[];
}
export declare const ContextEstablishmentHook: <T extends ContextEstablishmentHookClass>() => (target: T) => any;
export {};
