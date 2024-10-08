import type { AppObjectType } from "../type/app/AppObject";

export const uniqueId = (
  type: AppObjectType | "data" | "true-name",
  nonce: string = `${Date.now()}-${crypto.randomUUID()}`
) => {
  return `${type}-${nonce}`;
};
