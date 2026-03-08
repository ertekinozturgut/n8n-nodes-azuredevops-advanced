export type SerializedBuffer = {
    type: 'Buffer';
    data: number[];
};
export declare function toBuffer(serializedBuffer: SerializedBuffer): Buffer;
export declare function isSerializedBuffer(candidate: unknown): candidate is SerializedBuffer;
