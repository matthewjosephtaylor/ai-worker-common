import type { AiplAstSpec, AiplNode } from "../AiplAstSpec";
import type { AiplState } from "aipl/AiplState";

export type AiplDecoratedValue<T> = {
  value: T;
  node?: AiplNode;
  contextName?: string;
};

export type AiplContext = {
  name?: string;
  state: AiplState;
  texts: string[];
  assignValueStringToIdentifier: ({
    value,
    identifier,
  }: {
    value: string;
    identifier: AiplAstSpec["identifier"];
  }) => void;
  assignQuestionStringToIdentifier: ({
    question,
    identifier,
  }: {
    question: string;
    identifier: AiplAstSpec["identifier"];
  }) => void;
  assignUrlFunctionToIdentifier: ({
    urlFunction,
    identifier,
    data,
    headers,
    specials,
  }: {
    urlFunction: AiplAstSpec["urlFunction"];
    identifier: AiplAstSpec["identifier"];
    data?: Record<string, string>;
    headers?: Record<string, string>;
    specials?: Record<string, string>;
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
