import type { Langtag, Localize, Prettify, Table, TableName } from "./common.d.ts";
import type { TableEntities } from "./entities.d.ts";

export function tablesToLanguages(
  langtags: Partial<Record<Langtag, Langtag[]>>,
  options?: { fallbackOnly?: boolean; fallbackOnEmptyString?: boolean }
): <Entities extends Partial<TableEntities<Table<TableName>>>>(
  entities: Entities
) => Prettify<Partial<Record<Langtag, Localize<Entities>>>>;
