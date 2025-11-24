import type {
  Structure,
  Prettify,
  Table,
  TableName,
  Row,
  Tables,
  LinkedTableName,
  Flat,
  TableFilterName,
  ColumnName,
  TableColumns,
  UnionToIntersection,
  RowValueMap,
  Column
} from "./common.d.ts";

export type TableEntity<
  S extends Structure, //
  T extends Tables<S>,
  Inc extends TableFilterName<S, TableName<S>> | undefined = undefined,
  Exc extends TableName<S> | TableFilterName<S, TableName<S>> | undefined = undefined
> = Prettify<
  {
    [TName in T["name"]]: TableFilterName<S, TName> extends infer TFName
      ? Exclude<
          Extract<TFName, Inc> extends never ? TFName : Extract<TFName, Inc>,
          Exc
        > extends infer ITF
        ? (ITF extends `${string}.${infer C}` ? C : ColumnName<S, TName>) extends infer CName
          ? Omit<Table<S, TName>, "columns"> & {
              columns: TableColumns<
                S,
                TName,
                CName extends ColumnName<S, TName> ? CName : ColumnName<S, TName> //  TODO: improve
              >;
              rows: {
                [rowId: number]: Row<
                  S,
                  TName,
                  CName extends ColumnName<S, TName> ? CName : ColumnName<S, TName>
                >;
              };
            }
          : never
        : never
      : never;
  }[T["name"]]
>;

export type TableEntities<
  S extends Structure, //
  T extends Tables<S>,
  Inc extends TableFilterName<S, TableName<S>> | undefined = undefined,
  Exc extends TableName<S> | TableFilterName<S, TableName<S>> | undefined = undefined
> = Prettify<{
  [TId in T["id"]]: TableEntity<S, Extract<T, { id: TId }>, Inc, Exc>;
}>;

export type RefEntity<
  S extends Structure, //
  T extends Tables<S>,
  Inc extends TableFilterName<S, TableName<S>> | undefined = undefined,
  Exc extends TableName<S> | TableFilterName<S, TableName<S>> | undefined = undefined,
  VisitedIds extends number = never,
  Map extends RowValueMap<S> = RowValueMap<S>
> = Prettify<
  UnionToIntersection<
    { id: number } & {
      [TName in T["name"]]: Extract<keyof Map, `${TName}.${string}`> extends infer TFName
        ? Exclude<
            Extract<TFName, Inc> extends never ? TFName : Extract<TFName, Inc>,
            Exc
          > extends infer ITF
          ? ITF extends `${TName}.${infer CName}`
            ? {
                [C in CName]: `${TName}.${C}` extends infer CFName
                  ? CFName extends keyof Map
                    ? Map[CFName] extends never[] // link
                      ? Column<S, TName, C>["toTable"] extends infer LinkId
                        ? LinkId extends number
                          ? LinkId extends VisitedIds
                            ? never
                            : RefEntity<
                                S,
                                Extract<Tables<S>, { id: LinkId }>,
                                Inc,
                                Exc,
                                VisitedIds | LinkId
                              >[]
                          : never
                        : never
                      : Map[CFName]
                    : never
                  : never;
              }
            : never
          : never
        : never;
    }[T["name"]]
  >
>;

export type RefEntities<
  S extends Structure, //
  T extends Tables<S>,
  Inc extends TableFilterName<S, TableName<S>> | undefined = undefined,
  Exc extends TableName<S> | TableFilterName<S, TableName<S>> | undefined = undefined
> = Prettify<{
  [TName in T["name"]]: {
    [rowId: number]: Extract<Tables<S>, { name: TName }> extends infer RefTable
      ? RefTable extends Tables<S>
        ? RefEntity<S, RefTable, Inc, Exc, RefTable["id"]>
        : never
      : never;
  };
}>;

export function getEntitiesOfTable<
  S extends Structure,
  TNameOrNames extends TableName<S> | TableName<S>[],
  Inc extends TableFilterName<S, TableName<S>>[] | undefined = undefined,
  Exc extends (TableName<S> | TableFilterName<S, TableName<S>>)[] | undefined = undefined,
  Ref extends boolean = false,
  LTName extends TableName<S> = LinkedTableName<
    S, //
    Flat<TNameOrNames>,
    Flat<Inc>,
    Flat<Exc>
  >
>(
  tableNameOrNames: TNameOrNames,
  options?: {
    structure?: S;
    pimUrl?: string;
    maxEntriesPerRequest?: number;
    archived?: boolean;
    headers?: Record<string, string>;
    timeout?: number;
    include?: Inc;
    exclude?: Exc;
    referenced?: Ref;
  }
): Promise<
  Ref extends true
    ? RefEntities<S, Table<S, Flat<TNameOrNames> | LTName>, Flat<Inc>, Flat<Exc>>
    : TableEntities<S, Table<S, Flat<TNameOrNames> | LTName>, Flat<Inc>, Flat<Exc>>
>;
