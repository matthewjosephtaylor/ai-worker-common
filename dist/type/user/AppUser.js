export const SERVICE_PROVIDER_API_SHAPES = [
    "CustomWc",
    "OpenAi",
    "CustomProxy",
    "Cloudflare",
    "CustomOpenAi",
    "BrowserTts",
    "CustomTts",
    "CustomImagegen",
    "ElevenlabsTts",
    "CustomAsr",
];
export const SERVICE_PROVIDER_EXTRA_KEYS = {
    textgen: ["contextSize", "topP"],
    tts: [
        "stability",
        "similarityBoost",
        "useSpeakerBoost",
        "style",
        "chunkLengthSchedule",
    ],
};
const isServiceProvider = (maybe) => {
    const straw = maybe;
    return typeof straw === "object" && typeof straw.apiShape === "string";
};
export const isTextgenServiceProvider = (maybe) => {
    const straw = maybe;
    return (typeof straw === "object" &&
        isServiceProvider(straw) &&
        typeof straw.contextSize === "number");
};
//# sourceMappingURL=AppUser.js.map