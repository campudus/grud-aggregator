import type {
  Column,
  Langtag,
  Localize,
  Prettify,
  RowValue,
  TableName,
  UnionToIntersection,
  Values
} from "../common.d.ts";
import type { TableEntities } from "../entities.d.ts";

type ReferencedEntities<
  Entities extends Partial<TableEntities<TableName>> | Localize<Partial<TableEntities<TableName>>>
> = Prettify<
  UnionToIntersection<
    Values<Entities> extends infer Entity
      ? Entity extends Values<TableEntities<TableName>> | Localize<Values<TableEntities<TableName>>>
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
  >
>;

export function referencer(options?: {
  withLanguages?: boolean;
}): <
  Entities extends
    | Partial<TableEntities<TableName>>
    | Partial<Record<Langtag, Localize<Partial<TableEntities<TableName>>>>>
>(
  entities: Entities
) => Prettify<
  Entities extends Partial<TableEntities<TableName>>
    ? ReferencedEntities<Entities>
    : NonNullable<Values<Entities>> extends Localize<Partial<TableEntities<TableName>>>
      ? Partial<
          Record<Langtag, Localize<Partial<ReferencedEntities<NonNullable<Values<Entities>>>>>>
        >
      : never
>;
