import type {
  Column,
  Langtag,
  Prettify,
  RowValue,
  TableName,
  UnionToIntersection,
  Values
} from "../common.d.ts";
import type { TableEntities } from "../entities.d.ts";

export type ReferencedEntities<
  Entities extends
    | Partial<TableEntities<TableName>>
    | Partial<Record<Langtag, Partial<TableEntities<TableName>>>>
> = Prettify<
  UnionToIntersection<
    Entities extends Partial<TableEntities<TableName>>
      ? Values<Entities> extends infer Entity
        ? Entity extends Values<TableEntities<TableName>>
          ? {
              [TName in Entity["name"]]: {
                [rowId: number]: Prettify<
                  { id: number } & {
                    [CName in Exclude<Entity["columns"][number]["name"], "ID">]: RowValue<
                      Column<TName, CName>
                    >;
                  }
                >;
              };
            }
          : never
        : never
      : unknown // TODO: add types for multilanguage: true
  >
>;

export function referencer<
  Entities extends
    | Partial<TableEntities<TableName>>
    | Partial<Record<Langtag, Partial<TableEntities<TableName>>>>
>(): (entities: Entities) => ReferencedEntities<Entities>;
