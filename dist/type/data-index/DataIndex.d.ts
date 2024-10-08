import type { DataObject } from "../data/DataObject";
export type DataIndex<T extends DataObject = DataObject> = DataObject & {
    records: Record<string, T>;
};
export declare const isDataIndex: (maybe: unknown) => maybe is DataIndex;
//# sourceMappingURL=DataIndex.d.ts.map