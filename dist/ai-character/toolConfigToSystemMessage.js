import { isDefined, TypeBoxes } from "@mjtdev/engine";
import { toolConfigCurrentToSystemMessage } from "./toolConfigCurrentToSystemMessage";
export const toolConfigToSystemMessage = (toolConfig) => {
    const { typeDeclaration } = TypeBoxes.schemaToTypeInfo(toolConfig.schema);
    const typeName = toolConfig.schema.$id;
    const currentObject = toolConfig.current ?? {};
    return [
        `JSON ${typeName} object TypeScript description`,
        "",
        typeDeclaration,
        "",
        `Example Error object:`,
        ` {error: "No such key in object: '${typeName}'"}`,
        "",
        Object.keys(currentObject).length > 0
            ? toolConfigCurrentToSystemMessage({
                typeName,
                currentObject: toolConfig.current,
            })
            : undefined,
    ]
        .filter(isDefined)
        .join("\n");
};
//# sourceMappingURL=toolConfigToSystemMessage.js.map