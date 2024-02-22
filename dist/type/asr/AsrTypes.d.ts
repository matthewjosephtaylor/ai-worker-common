export type AsrFastWhisperSegment = [
    id: number,
    seek: number,
    start: number,
    end: number,
    text: string,
    tokens: number[],
    temperature: number,
    avg_logprob: number,
    compression_ratio: number,
    no_speech_prob: number
];
export type AsrWhisperSegment = {
    id: number;
    seek: number;
    start: number;
    end: number;
    text: string;
    tokens: Array<number>;
    temperature: number;
    avg_logprob: number;
    compression_ratio: number;
    no_speech_prob: number;
};
export type AsrSegment = AsrFastWhisperSegment | AsrWhisperSegment;
export type AsrResult<T extends AsrSegment> = {
    text: string;
    segments: T[];
    language: string;
};
//# sourceMappingURL=AsrTypes.d.ts.map