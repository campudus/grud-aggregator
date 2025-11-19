/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, it, expectTypeOf, vi } from "vitest";

import type { getEntitiesOfTable as getEntitiesOfTableType } from "../../entities.d.ts";
import type { Structure as S } from "./structure.demo.d.ts";

// use mocked fn getEntitiesOfTable for type tests
const getEntitiesOfTable = vi.fn() as typeof getEntitiesOfTableType;

describe("getEntitiesOfTable", () => {
  it("should handle multiple tables", async () => {
    const entities = await getEntitiesOfTable(["material", "manufacturer"], { structure: {} as S });

    expectTypeOf<typeof entities>().toExtend<{
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

  it("should handle table with links", async () => {
    const entities = await getEntitiesOfTable("steerTube", { structure: {} as S });

    expectTypeOf<typeof entities>().toExtend<{
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
          },
          {
            id: 2;
            name: "material";
            kind: "link";
            multilanguage: true;
            languageType: "language";
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

  it("should handle include", async () => {
    const entitiesBrake = await getEntitiesOfTable("brake", {
      structure: {} as S,
      include: ["brake.brakeKind"]
    });

    expectTypeOf<typeof entitiesBrake>().not.toExtend<{
      5: { name: "manufacturer" };
    }>();

    expectTypeOf<typeof entitiesBrake>().toExtend<{
      24: { name: "brakeKind" };
      25: {
        name: "brake";
        columns: [
          {
            id: 3;
            name: "brakeKind";
            kind: "link";
            multilanguage: true;
            languageType: "language";
          }
        ];
        rows: {
          [x: number]: {
            id: number;
            values: [
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

    const entitiesFrame = await getEntitiesOfTable("frame", {
      structure: {} as S,
      include: ["frame.frameShape"]
    });

    expectTypeOf<typeof entitiesFrame>().not.toExtend<{
      5: { name: "manufacturer" };
    }>();

    expectTypeOf<typeof entitiesFrame>().toExtend<{
      86: { name: "baseFrameShape" };
      87: { name: "frameShape" };
      93: {
        name: "frame";
        columns: [
          {
            id: 3;
            name: "frameShape";
            kind: "link";
            multilanguage: true;
            languageType: "language";
          }
        ];
        rows: {
          [x: number]: {
            id: number;
            values: [
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

    const entitiesBrakeAndFrameShape = await getEntitiesOfTable(["brake", "frameShape"], {
      structure: {} as S,
      include: ["brake.identifier", "frameShape.identifier"]
    });

    expectTypeOf<typeof entitiesBrakeAndFrameShape>().toExtend<{
      25: {
        name: "brake";
        columns: [
          {
            id: 2;
            name: "identifier";
            kind: "shorttext";
            multilanguage: true;
            languageType: "language";
          }
        ];
      };
      87: {
        name: "frameShape";
        columns: [
          {
            id: 1;
            name: "identifier";
            kind: "shorttext";
            multilanguage: true;
            languageType: "language";
          }
        ];
      };
    }>();
  });

  it("should handle exclude", async () => {
    const entitiesFrameWithExcludedTable = await getEntitiesOfTable("frame", {
      structure: {} as S,
      exclude: ["baseFrameShape"] // exclude only table, but not link columns
    });

    expectTypeOf<typeof entitiesFrameWithExcludedTable>().not.toExtend<{
      86: { name: "baseFrameShape" };
    }>();

    expectTypeOf<typeof entitiesFrameWithExcludedTable>().toExtend<{
      87: {
        name: "frameShape";
        columns: [
          {
            id: 1;
            name: "identifier";
            kind: "shorttext";
            multilanguage: true;
            languageType: "language";
          },
          {
            id: 2;
            name: "baseFrameShape";
            kind: "link";
            multilanguage: true;
            languageType: "language";
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
      93: { name: "frame" };
    }>();

    const entitiesFrameWithExcludedColumn = await getEntitiesOfTable("frame", {
      structure: {} as S,
      exclude: ["frameShape.baseFrameShape"] // exclude link column and table
    });

    expectTypeOf<typeof entitiesFrameWithExcludedColumn>().not.toExtend<{
      86: { name: "baseFrameShape" };
    }>();

    expectTypeOf<typeof entitiesFrameWithExcludedColumn>().toExtend<{
      87: {
        name: "frameShape";
        columns: [
          {
            id: 1;
            name: "identifier";
            kind: "shorttext";
            multilanguage: true;
            languageType: "language";
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
      93: { name: "frame" };
    }>();

    const entitiesBikeModel = await getEntitiesOfTable("bikeModel", {
      structure: {} as S,
      exclude: ["variant"]
    });

    expectTypeOf<typeof entitiesBikeModel>().not.toExtend<{
      94: { name: "variant" };
      93: { name: "frame" };
    }>();

    expectTypeOf<typeof entitiesBikeModel>().toExtend<{
      1: { name: "material" };
      5: { name: "manufacturer" };
      // ...and many more
    }>();

    const entitiesBrake = await getEntitiesOfTable("brake", {
      structure: {} as S,
      exclude: ["brake.brakeKind"]
    });

    expectTypeOf<typeof entitiesBrake>().toExtend<{
      5: { name: "manufacturer" };
    }>();

    expectTypeOf<typeof entitiesBrake>().not.toExtend<{
      24: { name: "brakeKind" };
      25: { name: "brake" };
    }>();
  });

  it("should handle complex options with multiple tables, include and exclude", async () => {
    const entitiesBrakeAndFrameShape = await getEntitiesOfTable(["brake", "frameShape"], {
      structure: {} as S,
      include: ["brake.brakeKind"],
      exclude: ["frameShape.baseFrameShape"]
    });

    expectTypeOf<typeof entitiesBrakeAndFrameShape>().toExtend<{
      87: {
        name: "frameShape";
        columns: [
          {
            id: 1;
            name: "identifier";
            kind: "shorttext";
            multilanguage: true;
            languageType: "language";
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
      24: { name: "brakeKind" };
      25: {
        name: "brake";
        columns: [
          {
            id: 3;
            name: "brakeKind";
            kind: "link";
            multilanguage: true;
            languageType: "language";
          }
        ];
        rows: {
          [x: number]: {
            id: number;
            values: [
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

    expectTypeOf<typeof entitiesBrakeAndFrameShape>().not.toExtend<{
      86: { name: "baseFrameShape" };
    }>();
  });

  it("should handle referencing", async () => {
    const entitiesBrake = await getEntitiesOfTable("brake", {
      structure: {} as S,
      referenced: true
    });

    expectTypeOf<typeof entitiesBrake>().toEqualTypeOf<{
      manufacturer: {
        [rowId: number]: {
          id: number;
          identifier: string | null;
        };
      };
      brakeKind: {
        [rowId: number]: {
          id: number;
          identifier: {
            de?: string | null;
            en?: string | null;
            fr?: string | null;
            es?: string | null;
            it?: string | null;
            hr?: string | null;
          };
        };
      };
      brake: {
        [rowId: number]: {
          id: number;
          ID: [
            [
              | {
                  id: number;
                  value: string | null;
                }
              | undefined
            ],
            {
              de?: string | null;
              en?: string | null;
              fr?: string | null;
              es?: string | null;
              it?: string | null;
              hr?: string | null;
            }
          ];
          manufacturer: {
            id: number;
            identifier: string | null;
          }[];
          identifier: {
            de?: string | null;
            en?: string | null;
            fr?: string | null;
            es?: string | null;
            it?: string | null;
            hr?: string | null;
          };
          brakeKind: {
            id: number;
            identifier: {
              de?: string | null;
              en?: string | null;
              fr?: string | null;
              es?: string | null;
              it?: string | null;
              hr?: string | null;
            };
          }[];
        };
      };
    }>();
  });

  it("should handle referencing with includes and excludes", async () => {
    const entitiesBrakeAndFrameShape = await getEntitiesOfTable(["brake", "frameShape"], {
      structure: {} as S,
      include: ["brake.brakeKind"],
      exclude: ["frameShape.baseFrameShape"],
      referenced: true
    });

    expectTypeOf<typeof entitiesBrakeAndFrameShape>().toEqualTypeOf<{
      brake: {
        [rowId: number]: {
          id: number;
          brakeKind: {
            id: number;
            identifier: {
              de?: string | null;
              en?: string | null;
              fr?: string | null;
              es?: string | null;
              it?: string | null;
              hr?: string | null;
            };
          }[];
        };
      };
      frameShape: {
        [rowId: number]: {
          id: number;
          identifier: {
            de?: string | null;
            en?: string | null;
            fr?: string | null;
            es?: string | null;
            it?: string | null;
            hr?: string | null;
          };
        };
      };
      brakeKind: {
        [rowId: number]: {
          id: number;
          identifier: {
            de?: string | null;
            en?: string | null;
            fr?: string | null;
            es?: string | null;
            it?: string | null;
            hr?: string | null;
          };
        };
      };
    }>();
  });
});
