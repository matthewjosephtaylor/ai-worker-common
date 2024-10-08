import type { AiplState } from "aipl/AiplState";
import type { AiplAstSpec, AiplNode } from "../AiplAstSpec";
export type AiplDecoratedValue<T> = {
    value: T;
    node?: AiplNode;
    contextName?: string;
};
export type TransfromArgument = string | AiplAstSpec["program"];
export type TransformFunction = (props: {
    name?: string;
    value: string;
    argument?: TransfromArgument;
    context?: AiplContext;
    identifier?: AiplAstSpec["identifier"];
}) => string;
export type AiplFunction<T = unknown> = (props: {
    name: string;
    param?: string;
    context: AiplContext;
    environment: T;
}) => void;
export type AiplUpdateEntry = {
    namespace?: string;
    key: string;
    value: AiplDecoratedValue<string>;
    type: string;
};
export type AiplStateUpdater = () => Promise<AiplUpdateEntry | undefined> | AiplUpdateEntry | void | undefined;
export type AiplStateUpdaters = AiplStateUpdater[];
export type AiplContext = {
    name?: string;
    state: AiplState;
    texts: string[];
    addStateUpdater: (updater: AiplStateUpdater) => void;
    getAvailableTransforms: () => readonly string[];
    getAvailableFunctions: () => readonly string[];
    transform: TransformFunction;
    apply: AiplFunction;
    applyParamToIdentifier: (props: {
        param: string;
        identifier: AiplAstSpec["identifier"];
        context: AiplContext;
    }) => void;
    assignValueStringToIdentifier: (props: {
        value: string;
        identifier: AiplAstSpec["identifier"];
        transformName?: string;
        transformArgument?: TransfromArgument;
        context: AiplContext;
    }) => void;
    assignQuestionStringToIdentifier: (props: {
        question: string;
        identifier: AiplAstSpec["identifier"];
        transformName?: string;
        transformArgument?: TransfromArgument;
        context: AiplContext;
    }) => void;
    assignUrlFunctionToIdentifier: (props: {
        url: string;
        urlFunction: AiplAstSpec["urlFunction"];
        identifier: AiplAstSpec["identifier"];
        data?: Record<string, string>;
        headers?: Record<string, string>;
        specials?: Record<string, string>;
        transformName?: string;
        transformArgument?: TransfromArgument;
        context: AiplContext;
    }) => void;
    softFunctionToBoolean: (value: string, node: AiplNode) => boolean;
    softFunctionToNumber: (value: string, node: AiplNode) => number;
    softFunctionBinaryToNumber: (props: {
        node: AiplAstSpec["binaryExpr"];
        left: string;
        right: string;
    }) => number;
    stringToBoolean: (value: string, node: AiplNode) => boolean;
    stringToNumber: (value: string, node: AiplNode) => number;
    logger: (message: string, ...extra: unknown[]) => void;
    error: (error: unknown) => void;
};
//# sourceMappingURL=AiplContext.d.ts.map