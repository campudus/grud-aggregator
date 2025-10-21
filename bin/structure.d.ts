declare module "grud-aggregator" {
  /* eslint-disable no-undef */
  export const TABLES = tables;

  // Utilities
  type Values<T> = T[keyof T];
  type Prettify<T> = T extends object ? { [K in keyof T]: Prettify<T[K]> } : T;

  type BuildArray<Length extends number, Acc extends unknown[] = []> = Acc["length"] extends Length
    ? Acc
    : BuildArray<Length, [...Acc, unknown]>;

  type Increment<N extends number> = [...BuildArray<N>, unknown]["length"];

  type Tuple<Obj, Index = 0, T = []> = Index extends keyof Obj
    ? Tuple<Omit<Obj, Index>, Increment<Index>, [...T, Obj[Index]]>
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

  export type Attachment<IsMultiLang = true> = Prettify<{
    ordering: number;
    url: IsMultiLang extends true ? MultilangValue<Langtag, string> : string;
    uuid: string;
    folder: number | null;
    folders: number[];
    title: IsMultiLang extends true ? MultilangValue<Langtag, string> : string;
    description: IsMultiLang extends true ? MultilangValue<Langtag, string> : string;
    internalName: IsMultiLang extends true ? MultilangValue<Langtag, string> : string;
    externalName: IsMultiLang extends true ? MultilangValue<Langtag, string> : string;
    mimeType: IsMultiLang extends true ? MultilangValue<Langtag, string> : string;
    createdAt: string; // ISO
    updatedAt: string; // ISO
  }>;

  type RowValueTuple<
    TName extends TableName = TableName,
    Col extends Column<TName> = Column<TName>
  > = Tuple<{
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
    ConcatCols = Col["concats"][number],
    ConstraintFrom = Col["constraint"]["cardinality"]["from"],
    ConstraintTo = Col["constraint"]["cardinality"]["to"]
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
    link: [ConstraintFrom, ConstraintTo] extends [0, 1]
      ? [{ id: number; value: RowValue<TNameLink, CNameLink> }]
      : { id: number; value: RowValue<TNameLink, CNameLink> }[];
    group: unknown[];
  }[Kind];

  export type Row<
    TName extends TableName = TableName,
    CName extends ColumnName<TName> = ColumnName<TName>,
    Col = Column<TName, CName>
  > = {
    id: number;
    values: ColumnName<TName> extends CName ? RowValueTuple<TName, Col> : [RowValue<TName, CName>];
  };

  type LinkedTableId<
    TId = Table["id"],
    TLinks = never,
    TCols = Values<Extract<Table, { id: TId }>["columns"]>,
    TLinkIds = Extract<TCols, { kind: "link" }>["toTable"]
  > = Prettify<
    {
      [Id in TLinkIds]: Id extends TLinks ? never : Id | LinkedTableId<Id, TLinks | Id>;
    }[TLinkIds]
  >;

  export type TableEntities<
    TName extends TableName = TableName,
    TId = Table<TName>["id"],
    LIds = LinkedTableId<TId>
  > = Prettify<{
    [Id in TId | LIds]: Omit<Extract<Table, { id: Id }>, "columns"> & {
      columns: Tuple<{
        [Index in Values<Extract<Table, { id: Id }>["columns"]>["index"]]: Extract<
          Values<Extract<Table, { id: Id }>["columns"]>,
          { index: Index }
        >;
      }>;
      rows: {
        [rowId: number]: Row<Extract<Table, { id: Id }>["name"]>;
      };
    };
  }>;

  type ReferencedRow<
    TName extends TableName = TableName,
    CName extends ColumnName<TName> = ColumnName<TName>,
    UseMultiLang extends boolean = true,
    Col = Column<TName, CName>
  > = Prettify<
    {
      linkRowId: number;
      id: string;
    } & {
      [C in CName]: ReferencedRowValue<TName, C, UseMultiLang>;
    }
  >;

  type ReferencedRowValue<
    TName extends TableName = TableName,
    CName extends ColumnName<TName> = ColumnName<TName>,
    UseMultiLang extends boolean = true,
    Col = Column<TName, CName>,
    Kind = Col["kind"],
    IsMultiLang = Col["multilanguage"],
    TNameLink = Extract<Table, { id: Col["toTable"] }>["name"],
    ConcatCols = Col["concats"][number],
    ConstraintFrom = Col["constraint"]["cardinality"]["from"],
    ConstraintTo = Col["constraint"]["cardinality"]["to"]
  > = {
    boolean: IsMultiLang | UseMultiLang extends true
      ? MultilangValue<Langtag, boolean>
      : boolean | null;
    shorttext: IsMultiLang | UseMultiLang extends true
      ? MultilangValue<Langtag, string>
      : string | null;
    text: IsMultiLang | UseMultiLang extends true ? MultilangValue<Langtag, string> : string | null;
    richText: IsMultiLang | UseMultiLang extends true
      ? MultilangValue<Langtag, string>
      : string | null;
    numeric: IsMultiLang | UseMultiLang extends true
      ? MultilangValue<Langtag, number>
      : number | null;
    currency: IsMultiLang | UseMultiLang extends true
      ? MultilangValue<CountryCode, number>
      : number | null;
    date: string;
    datetime: string;
    attachment: Attachment<UseMultiLang>[];
    concat: RowValueTuple<TName, ConcatCols>;
    link: [ConstraintFrom, ConstraintTo] extends [0, 1]
      ? [ReferencedRow<TNameLink, ColumnName<TNameLink, UseMultiLang>>]
      : ReferencedRow<TNameLink, ColumnName<TNameLink>, UseMultiLang>[];
    group: unknown[];
  }[Kind];

  type TableEntitiesReferenced<
    TName extends TableName = TableName,
    WithLanguages extends boolean = false,
    CName = ColumnName<TName>,
    Tab = Table<TName>,
    Col = Column<TName, CName>,
    LinkCol = Extract<Col, { kind: "link" }>,
    LinkTab = Extract<Table, { id: LinkCol["toTable"] }>
  > = WithLanguages extends false
    ? Prettify<{
        [T in Tab["name"] | LinkTab["name"]]: {
          [rowId: number]: Omit<ReferencedRow<T>, "ID">;
        };
      }>
    : Prettify<{
        [Lang in Langtag]: {
          [T in Tab["name"] | LinkTab["name"]]: {
            [rowId: number]: Omit<ReferencedRow<T, ColumnName<T>, false>, "ID">;
          };
        };
      }>;

  export function getEntitiesOfTable<TName extends TableName>(
    table: TName,
    options: {
      disableFollow?: string[][];
      includeColumns?: ColumnName<TName>[];
      pimUrl: string;
      maxEntriesPerRequest?: number;
      archived?: boolean;
      headers?: Record<string, string>;
      timeout?: number;
    }
  ): Promise<TableEntities<TName>>;
}
