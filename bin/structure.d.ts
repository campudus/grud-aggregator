declare module "grud-aggregator" {
  /* eslint-disable no-undef */
  export const TABLES = tables;

  // Utilities
  type Prettify<T> = T extends object ? { [K in keyof T]: Prettify<T[K]> } : T;

  type BuildArray<Length extends number, Acc extends unknown[] = []> = Acc["length"] extends Length
    ? Acc
    : BuildArray<Length, [...Acc, unknown]>;

  type Increment<N extends number> = [...BuildArray<N>, unknown]["length"];

  type Tuple<Obj, Index = 0, T = []> = Index extends keyof Obj
    ? Tuple<Exclude<Obj, Index>, Increment<Index>, [...T, Obj[Index]]>
    : T;

  // Definitions
  export type TableMap = typeof TABLES;
  export type TableName = keyof TableMap;
  export type Table<TName extends TableName = TableName> = TableMap[TName];
  export type ColumnName<TName extends TableName> = keyof Table<TName>["columns"];

  type AllColumns = {
    [TName in TableName]: {
      [CName in ColumnName<TName>]: Table<TName>["columns"][CName];
    }[ColumnName<TName>];
  }[TableName];

  export type Column<
    TName extends TableName = TableName,
    CName extends ColumnName<TName> = ColumnName<TName>
  > = TableName extends TName
    ? AllColumns
    : {
        [T in TName]: {
          [C in CName]: Table<T>["columns"][C];
        }[CName];
      }[TName];

  type ColumnKind = Column["kind"];
  type LanguageType = Extract<Column, { languageType: string }>["languageType"];
  type LanguageTypeKey<LType extends LanguageType> = {
    language: Langtag;
    country: CountryCode;
  }[LType];
  type CountryCode = Extract<Column, { kind: "currency" }>["countryCodes"][number];
  type Langtag = Table["langtags"][number];
  type MultilangValue<Key extends Langtag | CountryCode, Value> = Prettify<
    Partial<Record<Key, Value>>
  >;

  export type Attachment = Prettify<{
    ordering: number;
    url: MultilangValue<Langtag, string>;
    uuid: string;
    folder: number | null;
    folders: number[];
    title: MultilangValue<Langtag, string>;
    description: MultilangValue<Langtag, string>;
    internalName: MultilangValue<Langtag, string>;
    externalName: MultilangValue<Langtag, string>;
    mimeType: MultilangValue<Langtag, string>;
    createdAt: string; // ISO
    updatedAt: string; // ISO
  }>;

  type RowValueTuple<TName extends TableName = TableName, Col = Column<TName>> = Tuple<{
    [Index in Col["index"]]: RowValue<TName, Extract<Col, { index: Index }>["name"]>;
  }>;

  type RowValue<
    TName extends TableName = TableName,
    CName extends ColumnName<TName> = ColumnName<TName>,
    Col = Column<TName, CName>,
    Kind = Col["kind"],
    IsMultiLang = Col["multilanguage"],
    TNameLink = Extract<Table, { id: Col["toTable"] }>["name"],
    CNameLink = Col["toColumn"]["name"],
    ConcatCols = Col["concats"][number]
  > = {
    boolean: IsMultiLang extends true ? MultilangValue<Langtag, boolean> : boolean | null;
    shorttext: IsMultiLang extends true ? MultilangValue<Langtag, string> : string | null;
    text: IsMultiLang extends true ? MultilangValue<Langtag, string> : string | null;
    richText: IsMultiLang extends true ? MultilangValue<Langtag, string> : string | null;
    numeric: IsMultiLang extends true ? MultilangValue<Langtag, number> : number | null;
    currency: IsMultiLang extends true ? MultilangValue<CountryCode, number> : number | null;
    date: string;
    datetime: string;
    attachment: Attachment[];
    concat: RowValueTuple<TName, ConcatCols>;
    link: { id: number; value: RowValue<TNameLink, CNameLink> }[];
    group: unknown[];
  }[Kind];

  export type Row<
    TName extends TableName = TableName,
    CName extends ColumnName<TName> = ColumnName<TName>,
    Col = Column<TName, CName>
  > =
    ColumnName<TName> extends CName
      ? {
          id: number;
          values: RowValueTuple<TName, Col>;
        }
      : {
          id: number;
          values: [RowValue<TName, CName>];
        };
}
