export const CHAT_ML_TEMPLATE = {
    messageStart: "<|im_start|>",
    messageEnd: "<|im_end|>",
    afterCharPostfix: "\n",
};
export const OPENCHAT_TEMPLATE = {
    messageStart: "GPT4 Correct ",
    afterCharPostfix: ": ",
    messageEnd: "<|end_of_turn|>",
};
// export const OPENCHAT_TEMPLATE: ChatMessageTemplate = {
//   messageStart: "<|im_start|>",
//   afterCharPostfix: "\n",
//   messageEnd: "<|end_of_turn|>",
// };
export const PLAY_TEMPLATE = {
    // messageStart: "<|im_start|>",
    // messageStart: "[INST]",
    messageStart: "📩",
    // messageStart: "",
    // messageStart: "🟢",
    // messageStart: "💬",
    // messageStart: "✉️",
    afterCharPostfix: "\n",
    // afterCharPostfix: ": ",
    // messageEnd: "<|end_of_turn|>",
    // messageEnd: "<|/s|>",
    // messageEnd: "<|end_of_turn|>",
    // messageEnd: "</s>",
    // messageEnd: "[/INST]",
    // messageEnd: "<|end_of_turn|>",
    messageEnd: "🛑",
};
const CHAT_GLM3_TEMPlATE = {
    messageStart: "<|",
    afterCharPostfix: "|>",
    messageEnd: "",
};
const CHAT_GLM3_MOD_TEMPlATE = {
    ...CHAT_GLM3_TEMPlATE,
    messageEnd: "<|end_of_turn|>",
};
export const DEFAULT_CHAT_MESSAGE_TEMPLATE = CHAT_ML_TEMPLATE;
//# sourceMappingURL=DEFAULT_CHAT_MESSAGE_TEMPLATE.js.map