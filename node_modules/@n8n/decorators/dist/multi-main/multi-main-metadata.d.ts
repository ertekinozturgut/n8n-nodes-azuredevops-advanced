import type { EventHandler } from '../types';
export declare const LEADER_TAKEOVER_EVENT_NAME = "leader-takeover";
export declare const LEADER_STEPDOWN_EVENT_NAME = "leader-stepdown";
export type MultiMainEvent = typeof LEADER_TAKEOVER_EVENT_NAME | typeof LEADER_STEPDOWN_EVENT_NAME;
type MultiMainEventHandler = EventHandler<MultiMainEvent>;
export declare class MultiMainMetadata {
    private readonly handlers;
    register(handler: MultiMainEventHandler): void;
    getHandlers(): MultiMainEventHandler[];
}
export {};
