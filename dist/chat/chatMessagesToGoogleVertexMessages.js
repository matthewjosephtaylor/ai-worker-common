import { Objects, isDefined, isEmpty } from "@mjtdev/engine";
import { chatMessageToText } from "./chatMessageToText";
import { messagesToStrictUserModelGoogleVertexOrdering } from "./messagesToStrictUserModelGoogleVertexOrdering";
/**
 * The arbitrary rules of Gemini
 * - no empty messages
 * - user MUST be first message
 * - user then model order strict, (no user,user, model, etc....)
 * - system message outside of messages (system messages preserved here, dealt with elsewhere)
 */
export const chatMessagesToGoogleVertexMessages = ({ messages, characters = {}, }) => {
    const roleToName = {};
    const result = messages
        .map((message, i) => {
        const characterName = characters[message.characterId ?? ""]?.card.data.name;
        const author = characterName ?? message.role;
        if (author.trim().toLocaleLowerCase() !== "user") {
            roleToName[message.role] = author;
        }
        const rawText = chatMessageToText(message);
        const renderedText = rawText;
        const gcpRole = message.role === "assistant" ? "model" : message.role;
        if (isEmpty(renderedText)) {
            return undefined;
        }
        if (i === messages.length - 1) {
            if (isEmpty(renderedText)) {
                return undefined;
            }
            return {
                role: gcpRole,
                parts: [{ text: renderedText }],
            };
        }
        return {
            role: gcpRole,
            parts: [{ text: renderedText }],
        };
    })
        .filter(isDefined);
    if (result[0].role !== "user") {
        result.unshift({
            role: "user",
            parts: [{ text: " " }],
        });
    }
    const characterNamesSystemMessage = Objects.entries(roleToName)
        .map((entry) => {
        const [role, name] = entry;
        return `the ${role}'s name is ${name}`;
    })
        .join("\n");
    result.unshift({
        role: "system",
        parts: [{ text: characterNamesSystemMessage }],
    });
    return messagesToStrictUserModelGoogleVertexOrdering(result);
};
//# sourceMappingURL=chatMessagesToGoogleVertexMessages.js.map