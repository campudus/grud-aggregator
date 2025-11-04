import type { Langtag, Localize, Prettify, TableName } from "./common.d.ts";
import type { TableEntities } from "./entities.d.ts";

export function tablesToLanguages(
  langtags: Partial<Record<Langtag, Langtag[]>>,
  options?: { fallbackOnly?: boolean; fallbackOnEmptyString?: boolean }
): <Entities extends Partial<TableEntities<TableName>>>(
  entities: Entities
) => Prettify<Partial<Record<Langtag, Localize<Entities>>>>;
