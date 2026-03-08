import type { PubSubEventName, PubSubEventFilter } from './pubsub-metadata';
export declare const OnPubSubEvent: (eventName: PubSubEventName, filter?: PubSubEventFilter) => MethodDecorator;
