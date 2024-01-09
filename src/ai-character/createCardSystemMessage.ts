import { AppObjects } from "../app-object/AppObjects";
import { renderCardText } from "./renderCardText";

export const createCardSystemMessage = ({
  systemName: systemName,
  title,
  text = "",
  facts,
}: {
  systemName: string;
  title: string;
  text?: string;
  facts: Record<string, string | undefined>;
}) => {
  if (text.trim().length === 0) {
    return undefined;
  }
  const renderedTitle = renderCardText(title, facts);
  const ms = AppObjects.create("chat-message", {
    role: "system",
    name: systemName,
    content: {
      type: "text",
      parts: [`# ${renderedTitle}:\n`, renderCardText(text, facts)],
    },
  });
  return ms;
};