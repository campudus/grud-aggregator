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

export type Structure = {
  id: number;
  name: string;
  langtags: string[];
  columns: ColumnInfo[];
}[];

// dynamic
export type Tables<
  S extends Structure //
> = S[number];

export type TableName<
  S extends Structure //
> = Tables<S>["name"];

export type Table<
  S extends Structure, //
  T extends TableName<S> | (string & {})
> = Extract<Tables<S>, { name: T }>;

export type Columns<
  S extends Structure, //
  T extends TableName<S> | (string & {})
> = Table<S, T>["columns"][number];

export type ColumnName<
  S extends Structure, //
  T extends TableName<S> | (string & {})
> = NonNullable<Columns<S, T>["name"]>;

export type Column<
  S extends Structure,
  T extends TableName<S> | (string & {}),
  C extends ColumnName<S, T> | (string & {})
> = Extract<Columns<S, T>, { name: C }>;

export type TableFilterName<
  S extends Structure, //
  T extends TableName<S> | (string & {})
> = {
  [TName in T]: `${TName}.${ColumnName<S, TName>}`;
}[T];

export type Langtag<
  S extends Structure //
> = Tables<S>["langtags"][number];

export type CountryCode<
  S extends Structure //
> = Extract<Columns<S, TableName<S>>, { countryCodes: string[] }>["countryCodes"][number];

export type LanguageTypeKey<
  S extends Structure, //
  LType extends LanguageType
> = {
  language: Langtag<S>;
  country: CountryCode<S>;
}[LType];

export type MultilangValue<
  S extends Structure,
  Value,
  Key extends Langtag<S> | CountryCode<S>,
  IsMultilang extends boolean = true
> = IsMultilang extends true ? Prettify<Partial<Record<Key, Value>>> : Value;

export type Attachment<
  S extends Structure, //
  IsMultiLang extends boolean = true
> = {
  ordering: number;
  url: MultilangValue<S, string, Langtag<S>, IsMultiLang>;
  uuid: string;
  folder: number | null;
  folders: number[];
  title: MultilangValue<S, string, Langtag<S>, IsMultiLang>;
  description: MultilangValue<S, string, Langtag<S>, IsMultiLang>;
  internalName: MultilangValue<S, string, Langtag<S>, IsMultiLang>;
  externalName: MultilangValue<S, string, Langtag<S>, IsMultiLang>;
  mimeType: MultilangValue<S, string, Langtag<S>, IsMultiLang>;
  createdAt: string; // ISO
  updatedAt: string; // ISO
};

type RowValueTuple<
  S extends Structure, //
  Cols extends readonly ColumnInfo[]
> = {
  [K in keyof Cols]: Cols[K] extends ColumnInfo ? RowValue<S, Cols[K]> : never;
};

export type RowValue<
  S extends Structure,
  Col extends ColumnInfo,
  Kind extends ColumnKind = Col["kind"],
  IsMultiLang extends boolean = Col["multilanguage"],
  LinkTableId extends number | undefined = Col["toTable"],
  LinkTableName extends string | undefined = Kind extends "link"
    ? Extract<Tables<S>, { id: LinkTableId }>["name"]
    : undefined,
  LinkColumnName extends string | undefined = Kind extends "link"
    ? NonNullable<Col["toColumn"]>["name"]
    : undefined,
  LinkColumn extends ColumnInfo | undefined = LinkTableName extends string
    ? LinkColumnName extends string
      ? Column<S, LinkTableName, LinkColumnName>
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
  boolean: MultilangValue<S, boolean | null, Langtag<S>, IsMultiLang>;
  shorttext: MultilangValue<S, string | null, Langtag<S>, IsMultiLang>;
  text: MultilangValue<S, string | null, Langtag<S>, IsMultiLang>;
  richtext: MultilangValue<S, string | null, Langtag<S>, IsMultiLang>;
  numeric: MultilangValue<S, number | null, Langtag<S>, IsMultiLang>;
  currency: MultilangValue<S, number | null, CountryCode<S>, IsMultiLang>;
  date: string | null;
  datetime: string | null;
  status: boolean[];
  attachment: Attachment<S>[];
  group: RowValueTuple<S, GroupColumns>;
  concat: RowValueTuple<S, ConcatColumns>;
  link: LinkColumn extends ColumnInfo
    ? [ConstraintFrom, ConstraintTo] extends [0, 1]
      ? [{ id: number; value: RowValue<S, LinkColumn> } | undefined]
      : { id: number; value: RowValue<S, LinkColumn> }[]
    : undefined;
}[Kind];

export type Row<
  S extends Structure,
  TName extends TableName<S> = TableName<S>,
  CName extends ColumnName<S, TName> = ColumnName<S, TName>
> = {
  id: number;
  values: ColumnName<S, TName> extends CName
    ? RowValueTuple<S, Table<S, TName>["columns"]>
    : [RowValue<S, Column<S, TName, CName>>];
};

export type LinkedTableName<
  S extends Structure,
  TName extends TableName<S>,
  Inc extends TableFilterName<S, TableName<S>> | undefined = undefined,
  Exc extends TableName<S> | TableFilterName<S, TableName<S>> | undefined = undefined,
  Visited extends TableName<S> = never
> =
  TableName<S> extends TName
    ? never
    : TName extends Visited
      ? never
      : TableFilterName<S, TName> extends infer TFName
        ? Exclude<Extract<TFName, Inc extends TFName ? Inc : TFName>, Exc> extends infer ITF
          ? ITF extends `${string}.${infer CName}`
            ? Extract<Column<S, TName, CName>, { kind: "link" }> extends infer Cols
              ? PropValue<Cols, "toTable"> extends infer LinkId
                ? Extract<Tables<S>, { id: LinkId }>["name"] extends infer LinkName
                  ? LinkName extends TableName<S>
                    ? LinkName extends Exc | Visited
                      ? never
                      : LinkName | LinkedTableName<S, LinkName, Inc, Exc, TName | Visited>
                    : never
                  : never
                : never
              : never
            : never
          : never
        : never;

export type Localize<
  S extends Structure, //
  Value
> =
  Value extends Attachment<S>
    ? Attachment<S, false>
    : Value extends unknown[]
      ? { [key in keyof Value]: Localize<S, Value[key]> }
      : Value extends Record<string | number | symbol, infer ObjectValue>
        ? keyof Value extends Langtag<S>
          ? ObjectValue
          : { [key in keyof Value]: Localize<S, Value[key]> }
        : Value;
