import type { Structure } from "grud-aggregator/structure";

export type { Structure };

// utils
export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };

export type PropValue<T, K extends PropertyKey> = Extract<T, Record<K, unknown>>[K];

export type Prettify<T> = T extends object ? { [K in keyof T]: Prettify<T[K]> } : T;

export type Values<T> = T[keyof T];

export type UnionToIntersection<Union> = (
  Union extends unknown ? (x: Union) => void : never
) extends (x: infer Intersection) => void
  ? Intersection
  : never;

// helper to split array type into union type
export type Flat<T> = T extends unknown[] ? T[number] : T;

// fixed
export type ColumnKind =
  | "boolean"
  | "shorttext"
  | "text"
  | "richtext"
  | "numeric"
  | "currency"
  | "date"
  | "datetime"
  | "status"
  | "attachment"
  | "group"
  | "concat"
  | "link";
export type LanguageType = "language" | "country";

export type ColumnInfo = {
  index?: number;
  id?: number;
  name?: string;
  kind: ColumnKind;
  multilanguage: boolean;
  languageType?: LanguageType;
  toTable?: number;
  toColumn?: WithRequired<Partial<ColumnInfo>, "id" | "name">;
  groups?: ColumnInfo[];
  concats?: ColumnInfo[];
  constraint?: {
    cardinality?: {
      from: number;
      to: number;
    };
  };
};

// dynamic
export type Tables = Structure[number];
export type TableName = Tables["name"];
export type Table<T extends TableName | (string & {})> = Extract<Tables, { name: T }>;
export type Columns<T extends TableName | (string & {})> = Table<T>["columns"][number];
export type ColumnName<T extends TableName | (string & {})> = Columns<T>["name"];
export type Column<
  T extends TableName | (string & {}),
  C extends ColumnName<T> | (string & {})
> = Extract<Columns<T>, { name: C }>;
export type Langtag = Tables["langtags"][number];
export type CountryCode = PropValue<Columns<TableName>, "countryCodes">[number];
export type LanguageTypeKey<LType extends LanguageType> = {
  language: Langtag;
  country: CountryCode;
}[LType];

export type MultilangValue<
  Value,
  Key extends Langtag | CountryCode,
  IsMultilang extends boolean = true
> = IsMultilang extends true ? Prettify<Partial<Record<Key, Value>>> : Value;

export type Attachment<IsMultiLang extends boolean = true> = {
  ordering: number;
  url: MultilangValue<string, Langtag, IsMultiLang>;
  uuid: string;
  folder: number | null;
  folders: number[];
  title: MultilangValue<string, Langtag, IsMultiLang>;
  description: MultilangValue<string, Langtag, IsMultiLang>;
  internalName: MultilangValue<string, Langtag, IsMultiLang>;
  externalName: MultilangValue<string, Langtag, IsMultiLang>;
  mimeType: MultilangValue<string, Langtag, IsMultiLang>;
  createdAt: string; // ISO
  updatedAt: string; // ISO
};

type RowValueTuple<Cols extends readonly ColumnInfo[]> = {
  [K in keyof Cols]: Cols[K] extends ColumnInfo ? RowValue<Cols[K]> : never;
};

export type RowValue<
  Col extends ColumnInfo,
  Kind extends ColumnKind = Col["kind"],
  IsMultiLang extends boolean = Col["multilanguage"],
  LinkTableId extends number | undefined = Col["toTable"],
  LinkTableName extends string | undefined = Kind extends "link"
    ? Extract<Tables, { id: LinkTableId }>["name"]
    : undefined,
  LinkColumnName extends string | undefined = Kind extends "link"
    ? NonNullable<Col["toColumn"]>["name"]
    : undefined,
  LinkColumn extends ColumnInfo | undefined = LinkTableName extends string
    ? LinkColumnName extends string
      ? Column<LinkTableName, LinkColumnName>
      : undefined
    : undefined,
  GroupColumns extends ColumnInfo[] = NonNullable<Col["groups"]>,
  ConcatColumns extends ColumnInfo[] = NonNullable<Col["concats"]>,
  ConstraintFrom extends number | undefined = NonNullable<
    NonNullable<Col["constraint"]>["cardinality"]
  >["from"],
  ConstraintTo extends number | undefined = NonNullable<
    NonNullable<Col["constraint"]>["cardinality"]
  >["to"]
> = {
  boolean: MultilangValue<boolean | null, Langtag, IsMultiLang>;
  shorttext: MultilangValue<string | null, Langtag, IsMultiLang>;
  text: MultilangValue<string | null, Langtag, IsMultiLang>;
  richtext: MultilangValue<string | null, Langtag, IsMultiLang>;
  numeric: MultilangValue<number | null, Langtag, IsMultiLang>;
  currency: MultilangValue<number | null, CountryCode, IsMultiLang>;
  date: string | null;
  datetime: string | null;
  status: boolean[];
  attachment: Attachment[];
  group: RowValueTuple<GroupColumns>;
  concat: RowValueTuple<ConcatColumns>;
  link: LinkColumn extends ColumnInfo
    ? [ConstraintFrom, ConstraintTo] extends [0, 1]
      ? [{ id: number; value: RowValue<LinkColumn> } | undefined]
      : { id: number; value: RowValue<LinkColumn> }[]
    : undefined;
}[Kind];

export type Row<
  TName extends TableName = TableName,
  CName extends ColumnName<TName> = ColumnName<TName>
> = {
  id: number;
  values: ColumnName<TName> extends CName
    ? RowValueTuple<Table<TName>["columns"]>
    : [RowValue<Column<TName, CName>>];
};

export type LinkedTableName<
  TName extends TableName,
  IncludeColumns extends ColumnName<TName> | undefined = undefined,
  IncludeTables extends LinkedTableName<TName> | undefined = undefined,
  ExcludeTables extends LinkedTableName<TName> | undefined = undefined,
  Visited extends TableName = never
> = TableName extends TName
  ? never
  : TName extends Visited
    ? never
    : Extract<Table<TName>["columns"][number], { kind: "link" }> extends infer Cols
      ? (IncludeColumns extends string ? IncludeColumns : string) extends infer ColName
        ? Extract<Cols, { name: ColName }> extends infer Col
          ? PropValue<Col, "toTable"> extends infer LinkId
            ? Extract<Tables, { id: LinkId }>["name"] extends infer LinkName
              ? LinkName extends TableName
                ? LinkName extends ExcludeTables | Visited
                  ? never
                  : LinkName extends (IncludeTables extends string ? IncludeTables : string)
                    ?
                        | LinkName
                        | LinkedTableName<
                            LinkName,
                            undefined,
                            IncludeTables,
                            ExcludeTables,
                            TName | Visited
                          >
                    : never
                : never
              : never
            : never
          : never
        : never
      : never;

export type Localize<Value> = Value extends Attachment
  ? Attachment<false>
  : Value extends unknown[]
    ? { [key in keyof Value]: Localize<Value[key]> }
    : Value extends Record<string | number | symbol, infer ObjectValue>
      ? keyof Value extends Langtag
        ? ObjectValue
        : { [key in keyof Value]: Localize<Value[key]> }
      : Value;
