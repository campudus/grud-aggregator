import type { Structure, Langtag, Localize, Prettify, Table, TableName } from "./common.d.ts";
import type { TableEntities } from "./entities.d.ts";

export function tablesToLanguages<S extends Structure>(
  langtags: Partial<Record<Langtag<S>, Langtag<S>[]>>,
  options?: { fallbackOnly?: boolean; fallbackOnEmptyString?: boolean }
): <Entities extends Partial<TableEntities<S, Table<S, TableName<S>>>>>(
  entities: Entities
) => Prettify<Partial<Record<Langtag<S>, Localize<S, Entities>>>>;
