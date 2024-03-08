import { isDefined } from "@mjtdev/engine";
import { Prompts } from "../ai/prompt/Prompts";
import { Aipls } from "../aipl/Aipls";
import { AiplContext } from "../aipl/runtime/AiplContext";
import { AppCharacter } from "../type/app-character/AppCharacter";
import { ChatMessage } from "../type/chat-message/ChatMessage";
import { ChatMessageTemplate } from "./ChatMessageTemplate";
import { DEFAULT_CHAT_MESSAGE_TEMPLATE } from "./DEFAULT_CHAT_MESSAGE_TEMPLATE";
import { PromptText } from "./PromptText";
import { chatMessageToText } from "./chatMessageToText";

export const renderAiplProgramText = (
  programText: string,
  context: AiplContext
) => {
  try {
    const program = Aipls.tryParseAipl(programText);
    // if (!program.status) {
    //   context.logger("Error parsing AIPL text", { program, context });
    //   return Prompts.renderTemplateText(programText, context.state);
    // }
    const updatedContext = Aipls.evaluateAiplProgram(context)(program);
    return updatedContext.texts.join("");
  } catch (error) {
    context.error(error);
    // context.logger("Error evaluating AIPL program", { program, context });
    return Prompts.renderTemplateText(programText, context.state);
  }
};

export const chatMessagesToPromptTextsChatML = ({
  messages,
  characters,
  // facts = {},
  aiplContext,
  messageTemplate = DEFAULT_CHAT_MESSAGE_TEMPLATE,
}: {
  characters: Record<string, AppCharacter | undefined>;
  messages: ChatMessage[];
  // facts?: Record<string, string | undefined>;
  messageTemplate?: ChatMessageTemplate;
  aiplContext: AiplContext;
}): PromptText[] => {
  const { messageStart, afterCharPostfix, messageEnd } = messageTemplate;
  // const aiplState = {
  //   assistant: aiCharacter?.card.data.name,
  //   user: userCharacter?.card.data.name,
  //   char: character.card.data.name,
  //   ...facts,
  // };
  return messages
    .map((message, i) => {
      const characterName =
        characters[message.characterId ?? ""]?.card.data.name;
      const author = characterName ?? message.role;
      const rawText = chatMessageToText(message);
      const updatedState = { ...aiplContext.state, char: characterName };
      const renderedText =
        message.role === "system"
          ? // ? Prompts.renderTemplateText(rawText, facts)
            renderAiplProgramText(rawText, {
              ...aiplContext,
              state: updatedState,
            })
          : rawText;

      if (i === messages.length - 1) {
        return {
          role: message.role,
          text: `${messageStart}${author}${afterCharPostfix}${renderedText}`,
        };
      }
      return {
        role: message.role,
        text: `${messageStart}${author}${afterCharPostfix}${renderedText}${messageEnd}`,
      };
    })
    .filter(isDefined);
};
