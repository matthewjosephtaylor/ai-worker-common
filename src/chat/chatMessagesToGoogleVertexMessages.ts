import { isDefined, isEmpty } from "@mjtdev/engine";
import type { Content } from "../3rd/gcp/GcpTypes";
import type { AppCharacter } from "../type/app-character/AppCharacter";
import type { ChatMessage } from "../type/chat-message/ChatMessage";
import { chatMessageToText } from "./chatMessageToText";
import { messagesToStrictUserModelGoogleVertexOrdering } from "./messagesToStrictUserModelGoogleVertexOrdering";
/**
 * The arbitrary rules of Gemini
 * - no empty messages
 * - user MUST be first message
 * - user then model order strict, (no user,user, model, etc....)
 * - system message outside of messages (system messages preserved here, dealt with elsewhere)
 */
export const chatMessagesToGoogleVertexMessages = ({
  messages,
  characters,
}: {
  characters: Record<string, AppCharacter | undefined>;
  messages: ChatMessage[];
}): Content[] => {
  const result = messages
    .map((message, i) => {
      const characterName =
        characters[message.characterId ?? ""]?.card.data.name;
      const author = characterName ?? message.role;
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
  // return result;
  return messagesToStrictUserModelGoogleVertexOrdering(result);
};