import type {
  Structure,
  Prettify,
  Table,
  TableName,
  Row,
  Tables,
  LinkedTableName,
  Flat,
  TableFilterName
} from "./common.d.ts";

export type TableEntity<
  S extends Structure, //
  T extends Tables<S>
> = Prettify<
  {
    [TName in T["name"]]: Table<S, TName> & {
      rows: {
        [rowId: number]: Row<S, TName>;
      };
    };
  }[T["name"]]
>;

export type TableEntities<
  S extends Structure, //
  T extends Tables<S>
> = Prettify<{
  [TId in T["id"]]: TableEntity<S, Extract<T, { id: TId }>>;
}>;

export function getEntitiesOfTable<
  S extends Structure,
  TNameOrNames extends TableName<S> | TableName<S>[],
  Inc extends TableFilterName<S, TableName<S>>[] | undefined = undefined,
  Exc extends (TableName<S> | TableFilterName<S, TableName<S>>)[] | undefined = undefined,
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
  }
): Promise<TableEntities<S, Table<S, Flat<TNameOrNames> | LTName>>>;
