import { describe, it, expectTypeOf } from "vitest";

// initialize structure of demo grud
import type { Structure as S } from "./structure/structure.d.ts";
import type { getEntitiesOfTable } from "./entities.d.ts";

describe("getEntitiesOfTable", () => {
  it("should handle multiple tables", () => {
    expectTypeOf<
      Awaited<ReturnType<typeof getEntitiesOfTable<S, ["material", "manufacturer"]>>>
    >().toEqualTypeOf<{
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

  it("should have correct return type", () => {
    expectTypeOf<Awaited<ReturnType<typeof getEntitiesOfTable<S, "steerTube">>>>().toEqualTypeOf<{
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

  it("should handle include columns", () => {
    expectTypeOf<
      Awaited<ReturnType<typeof getEntitiesOfTable<S, "brake", ["brakeKind"]>>>
    >().not.toExtend<{
      5: { name: "manufacturer" };
    }>();

    expectTypeOf<
      Awaited<ReturnType<typeof getEntitiesOfTable<S, "brake", ["brakeKind"]>>>
    >().toExtend<{
      24: { name: "brakeKind" };
      25: { name: "brake" };
    }>();

    expectTypeOf<
      Awaited<ReturnType<typeof getEntitiesOfTable<S, "frame", ["frameShape"]>>>
    >().not.toExtend<{
      5: { name: "manufacturer" };
    }>();

    expectTypeOf<
      Awaited<ReturnType<typeof getEntitiesOfTable<S, "frame", ["frameShape"]>>>
    >().toExtend<{
      86: { name: "baseFrameShape" };
      87: { name: "frameShape" };
      93: { name: "frame" };
    }>();
  });

  it("should handle include tables", () => {
    expectTypeOf<
      Awaited<ReturnType<typeof getEntitiesOfTable<S, "brake", undefined, ["brakeKind"]>>>
    >().not.toExtend<{
      5: { name: "manufacturer" };
    }>();

    expectTypeOf<
      Awaited<ReturnType<typeof getEntitiesOfTable<S, "brake", undefined, ["brakeKind"]>>>
    >().toExtend<{
      24: { name: "brakeKind" };
      25: { name: "brake" };
    }>();

    expectTypeOf<
      Awaited<ReturnType<typeof getEntitiesOfTable<S, "frame", undefined, ["frameShape"]>>>
    >().not.toExtend<{
      86: { name: "baseFrameShape" };
    }>();

    expectTypeOf<
      Awaited<ReturnType<typeof getEntitiesOfTable<S, "frame", undefined, ["frameShape"]>>>
    >().toExtend<{
      87: { name: "frameShape" };
      93: { name: "frame" };
    }>();
  });

  it("should handle exclude tables", () => {
    expectTypeOf<
      Awaited<
        ReturnType<typeof getEntitiesOfTable<S, "frame", undefined, undefined, ["baseFrameShape"]>>
      >
    >().not.toExtend<{
      86: { name: "baseFrameShape" };
    }>();

    expectTypeOf<
      Awaited<
        ReturnType<typeof getEntitiesOfTable<S, "frame", undefined, undefined, ["baseFrameShape"]>>
      >
    >().toExtend<{
      87: { name: "frameShape" };
      93: { name: "frame" };
    }>();

    expectTypeOf<
      Awaited<
        ReturnType<typeof getEntitiesOfTable<S, "bikeModel", undefined, undefined, ["variant"]>>
      >
    >().not.toExtend<{
      94: { name: "variant" };
      93: { name: "frame" };
    }>();

    expectTypeOf<
      Awaited<
        ReturnType<typeof getEntitiesOfTable<S, "bikeModel", undefined, undefined, ["variant"]>>
      >
    >().toExtend<{
      1: { name: "material" };
      5: { name: "manufacturer" };
      // ...and many more
    }>();
  });
});
