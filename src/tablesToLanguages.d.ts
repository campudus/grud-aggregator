import type { Langtag, Localize, TableName } from "./common.d.ts";
import type { TableEntities } from "./entities.d.ts";

export function tablesToLanguages<Entities extends Partial<TableEntities<TableName>>>(
  langtags: Record<Langtag, Langtag[]>,
  options?: { fallbackOnly?: boolean; fallbackOnEmptyString?: boolean }
): (entities: Entities) => Partial<Record<Langtag, Localize<Entities>>>;
