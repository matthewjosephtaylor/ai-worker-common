import { evaluateNodeToNumber } from "./evaluateNodeToNumber";
import { evaluateNodeToString } from "./evaluateNodeToString";
export const evaluateNodeToBoolean = (context) => (node) => {
    const trace = (message, extra) => {
        context.logger(`evaluateNodeToBoolean ${node.loc.start.offset} ${node.type} ${message}`, extra);
    };
    trace("start");
    switch (node.type) {
        case "stringLiteral": {
            const value = context.softFunctionToBoolean(evaluateNodeToString(context)(node.value), node);
            return value;
        }
        case "expr": {
            return evaluateNodeToBoolean(context)(node.value);
        }
        case "binaryExpr": {
            const { left, op, right } = node;
            trace(`switching compoundExpr with op value: '${op.value}'`);
            switch (op.value) {
                // logical and
                case "&&":
                case "&": {
                    trace("&&");
                    const leftValue = evaluateNodeToBoolean(context)(left);
                    return leftValue && evaluateNodeToBoolean(context)(right);
                }
                // logical or
                case "||":
                case "|": {
                    trace("||");
                    const leftValue = evaluateNodeToBoolean(context)(left);
                    return leftValue || evaluateNodeToBoolean(context)(right);
                }
                // comparision operators
                case "!==":
                case "!=": {
                    trace("!=");
                    const leftValue = evaluateNodeToNumber(context)(left);
                    return leftValue !== evaluateNodeToNumber(context)(right);
                }
                case "==":
                case "=": {
                    trace("==");
                    const leftValue = evaluateNodeToNumber(context)(left);
                    return leftValue === evaluateNodeToNumber(context)(right);
                }
                case "<": {
                    trace("<");
                    const leftValue = evaluateNodeToNumber(context)(left);
                    return leftValue < evaluateNodeToNumber(context)(right);
                }
                case ">": {
                    trace(">");
                    const leftValue = evaluateNodeToNumber(context)(left);
                    const rightValue = evaluateNodeToNumber(context)(right);
                    const result = leftValue > rightValue;
                    trace("evaluateNodeToBoolean >", {
                        leftValue,
                        rightValue,
                        result,
                    });
                    return result;
                }
            }
            trace(`finished switching compoundExpr with op value: '${op.value}'`);
            throw {
                message: `Unexpected compoundExpr operation: '${op.value}'`,
                context,
                loc: node.loc,
                node,
            };
        }
        case "unaryExpr": {
            trace(`unaryExpr: ${node.type}`);
            switch (node.op) {
                case "!": {
                    trace("!");
                    return !evaluateNodeToBoolean(context)(node.operand);
                }
            }
        }
        case "number": {
            trace("number");
            return node.value !== 0;
        }
        case "identifier": {
            trace("identifier");
            const stateValue = context.state[node.value];
            if (!stateValue) {
                return false;
            }
            return context.stringToBoolean(stateValue, node);
        }
        // case "function": {
        //   trace("function");
        //   return context.softFunctionToBoolean(node);
        // }
    }
    trace("UNEXPECTED, No pattern matched");
};
//# sourceMappingURL=evaluateNodeToBoolean.js.map