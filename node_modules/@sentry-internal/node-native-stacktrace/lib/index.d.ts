type Thread<S = unknown> = {
    frames: StackFrame[];
    state?: S;
};
type StackFrame = {
    function: string;
    filename: string;
    lineno: number;
    colno: number;
};
/**
 * Registers the current thread with the native module.
 *
 * @param threadName The name of the thread to register. Defaults to the current thread ID.
 */
export declare function registerThread(threadName?: string): void;
/**
 * Tells the native module that the thread is still running and updates the state.
 *
 * @param state Optional state to pass to the native module.
 * @param disableLastSeen If true, disables the last seen tracking for this thread.
 */
export declare function threadPoll(state?: object, disableLastSeen?: boolean): void;
/**
 * Captures stack traces for all registered threads.
 */
export declare function captureStackTrace<S = unknown>(): Record<string, Thread<S>>;
/**
 * Returns the number of milliseconds since the last time each thread was seen.
 *
 * This is useful for determining if a threads event loop has been blocked for a long time.
 */
export declare function getThreadsLastSeen(): Record<string, number>;
export {};
//# sourceMappingURL=index.d.ts.map