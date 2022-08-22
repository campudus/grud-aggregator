export type ById<T> = Record<number, T>;

export type ByName<T> = Record<string, T>;

export type ByLangTag<T> = Record<string, T>;

export type Attachment = {
  title: string;
  description: string;
  externalName: string;
  internalName: string;
  mimeType: string;
  url: string;
};

export type Column = {
  id: number;
  name: string;
  kind: string;
  identifier?: boolean;
  displayName: string;
  description: string;
  languageType?: string;
  toTable?: number;
};

export type Row = {
  final: boolean;
  values: (Attachment[] | ByLangTag<string> | number[] | string)[];
};

export type Table = {
  id: number;
  name: string;
  displayName: string;
  description: string;
  columns: Column[];
  rows: ById<Row>;
};
