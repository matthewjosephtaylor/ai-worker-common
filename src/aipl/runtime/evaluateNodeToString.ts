import { AiplNodePrimitiveEvaluator } from "./AiplNodeEvaluator";

export const evaluateNodeToString: AiplNodePrimitiveEvaluator<
  "template" | "templateVariable" | "stringLiteral",
  string
> = (context) => (node) => {
  // context.logger("evaluateNodeToString", { node });
  switch (node.type) {
    case "stringLiteral": {
      return evaluateNodeToString(context)(node.value);
    }
    case "template": {
      const { value } = node;
      const buffer: string[] = [];
      for (const child of value) {
        if (typeof child === "string") {
          buffer.push(child);
          continue;
        }
        const part = evaluateNodeToString(context)(child);
        buffer.push(part);
      }
      return buffer.join("");
    }
    case "templateVariable": {
      node.type;
      // context.logger("templateVariable", { node, state: context.state });
      return context.state[node.identifier.value] ?? node.defaultValue ?? "";
    }
  }
};
