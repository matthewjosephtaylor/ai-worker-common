export type DataSearchRequest = {
  ids: string[];
};

export type DataMultipleResponse = {
  idToEtag: Record<string, string>;
};
