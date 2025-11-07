/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, it, expectTypeOf, vi } from "vitest";

import type { Structure as S } from "./structure.demo.d.ts";
import type { GetEntitiesOfTable } from "../../entities.d.ts";

const getEntitiesOfTable = vi.fn() as GetEntitiesOfTable<S>;

describe("getEntitiesOfTable", () => {
  it("should handle multiple tables", async () => {
    const entities = await getEntitiesOfTable(["material", "manufacturer"]);

    expectTypeOf<typeof entities>().toEqualTypeOf<{
      1: {
        id: 1;
        name: "material";
        langtags: ["de", "en", "fr", "es", "it", "hr"];
        columns: [
          {
            id: 1;
            name: "identifier";
            kind: "shorttext";
            multilanguage: true;
            languageType: "language";
            index: 0;
          }
        ];
        rows: {
          [x: number]: {
            id: number;
            values: [
              {
                de?: string | null;
                en?: string | null;
                fr?: string | null;
                es?: string | null;
                it?: string | null;
                hr?: string | null;
              }
            ];
          };
        };
      };
      5: {
        id: 5;
        name: "manufacturer";
        langtags: ["de", "en", "fr", "es", "it", "hr"];
        columns: [
          {
            id: 1;
            name: "identifier";
            kind: "shorttext";
            multilanguage: false;
            index: 0;
          }
        ];
        rows: {
          [x: number]: {
            id: number;
            values: [string | null];
          };
        };
      };
    }>();
  });

  it("should have correct return type", async () => {
    const entities = await getEntitiesOfTable("steerTube");

    expectTypeOf<typeof entities>().toEqualTypeOf<{
      1: {
        id: 1;
        name: "material";
        langtags: ["de", "en", "fr", "es", "it", "hr"];
        columns: [
          {
            id: 1;
            name: "identifier";
            kind: "shorttext";
            multilanguage: true;
            languageType: "language";
            index: 0;
          }
        ];
        rows: {
          [x: number]: {
            id: number;
            values: [
              {
                de?: string | null;
                en?: string | null;
                fr?: string | null;
                es?: string | null;
                it?: string | null;
                hr?: string | null;
              }
            ];
          };
        };
      };
      14: {
        id: 14;
        name: "steerTube";
        langtags: ["de", "en", "fr", "es", "it", "hr"];
        columns: [
          {
            id: 1;
            name: "identifier";
            kind: "shorttext";
            multilanguage: true;
            languageType: "language";
            index: 0;
          },
          {
            id: 2;
            name: "material";
            kind: "link";
            multilanguage: true;
            languageType: "language";
            toTable: 1;
            toColumn: {
              id: 1;
              name: "identifier";
              kind: "shorttext";
              multilanguage: true;
              languageType: "language";
            };
            constraint: {
              cardinality: {
                from: 0;
                to: 1;
              };
              deleteCascade: false;
              archiveCascade: false;
              finalCascade: false;
            };
            index: 1;
          }
        ];
        rows: {
          [x: number]: {
            id: number;
            values: [
              {
                de?: string | null;
                en?: string | null;
                fr?: string | null;
                es?: string | null;
                it?: string | null;
                hr?: string | null;
              },
              [
                | {
                    id: number;
                    value: {
                      de?: string | null;
                      en?: string | null;
                      fr?: string | null;
                      es?: string | null;
                      it?: string | null;
                      hr?: string | null;
                    };
                  }
                | undefined
              ]
            ];
          };
        };
      };
    }>();
  });

  it("should handle include columns", async () => {
    const entitiesBrake = await getEntitiesOfTable("brake", { includeColumns: ["brakeKind"] });

    expectTypeOf<typeof entitiesBrake>().not.toExtend<{
      5: { name: "manufacturer" };
    }>();

    expectTypeOf<typeof entitiesBrake>().toExtend<{
      24: { name: "brakeKind" };
      25: { name: "brake" };
    }>();

    const entitiesFrame = await getEntitiesOfTable("frame", { includeColumns: ["frameShape"] });

    expectTypeOf<typeof entitiesFrame>().not.toExtend<{
      5: { name: "manufacturer" };
    }>();

    expectTypeOf<typeof entitiesFrame>().toExtend<{
      86: { name: "baseFrameShape" };
      87: { name: "frameShape" };
      93: { name: "frame" };
    }>();
  });

  it("should handle include tables", async () => {
    const entitiesBrake = await getEntitiesOfTable("brake", { includeTables: ["brakeKind"] });

    expectTypeOf<typeof entitiesBrake>().not.toExtend<{
      5: { name: "manufacturer" };
    }>();

    expectTypeOf<typeof entitiesBrake>().toExtend<{
      24: { name: "brakeKind" };
      25: { name: "brake" };
    }>();

    const entitiesFrame = await getEntitiesOfTable("frame", { includeTables: ["frameShape"] });

    expectTypeOf<typeof entitiesFrame>().not.toExtend<{
      86: { name: "baseFrameShape" };
    }>();

    expectTypeOf<typeof entitiesFrame>().toExtend<{
      87: { name: "frameShape" };
      93: { name: "frame" };
    }>();
  });

  it("should handle exclude tables", async () => {
    const entitiesFrame = await getEntitiesOfTable("frame", { excludeTables: ["baseFrameShape"] });

    expectTypeOf<typeof entitiesFrame>().not.toExtend<{
      86: { name: "baseFrameShape" };
    }>();

    expectTypeOf<typeof entitiesFrame>().toExtend<{
      87: { name: "frameShape" };
      93: { name: "frame" };
    }>();

    const entitiesBikeModel = await getEntitiesOfTable("bikeModel", { excludeTables: ["variant"] });

    expectTypeOf<typeof entitiesBikeModel>().not.toExtend<{
      94: { name: "variant" };
      93: { name: "frame" };
    }>();

    expectTypeOf<typeof entitiesBikeModel>().toExtend<{
      1: { name: "material" };
      5: { name: "manufacturer" };
      // ...and many more
    }>();
  });
});
