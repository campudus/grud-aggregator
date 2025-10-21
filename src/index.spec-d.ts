import { describe, it, expectTypeOf } from "vitest";

// initialize structure of demo grud
import "./structure/structure.demo.d.ts";
import type {
  TableName,
  ColumnName,
  Column,
  Langtag,
  CountryCode,
  LanguageType,
  LanguageTypeKey,
  LinkedTableId,
  Row,
  RowValue,
  getEntitiesOfTable
} from "./index.d.ts";

describe("TableName", () => {
  it("should (roughly) match keys from Structure", () => {
    expectTypeOf<TableName>().toBeString();
    expectTypeOf<
      "material" | "color" | "glossGrade" | "marketingColor" | "manufacturer"
    >().toExtend<TableName>();
  });
});

describe("ColumnName", () => {
  it("should contain all ColumnNames of a given Table", () => {
    expectTypeOf<ColumnName<"marketingColor">>().toBeString();
    expectTypeOf<ColumnName<"marketingColor">>().toEqualTypeOf<
      | "glossGrade"
      | "identifier"
      | "ID"
      | "mainColor"
      | "partialColor1"
      | "partialColor2"
    >();
  });
});

describe("Column", () => {
  it("should contain all Columns of Table if only given TableName", () => {
    expectTypeOf<Column<"brakeKind">>().toEqualTypeOf<
      | {
          id: 1;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 0;
        }
      | {
          id: 2;
          name: "bidexCode";
          kind: "shorttext";
          multilanguage: false;
          index: 1;
        }
    >();
  });

  it("should contain single Column if given TableName and ColumnName", () => {
    expectTypeOf<Column<"chain", "identifier">>().toEqualTypeOf<{
      id: 2;
      name: "identifier";
      kind: "shorttext";
      multilanguage: true;
      languageType: "language";
      index: 2;
    }>();
  });
});

describe("Langtag", () => {
  it("should match all Langtags", () => {
    expectTypeOf<Langtag>().toBeString();
    expectTypeOf<Langtag>().toEqualTypeOf<"de-DE" | "en-GB">();
  });
});

describe("CountryCode", () => {
  it("should match all CountryCodes", () => {
    expectTypeOf<CountryCode>().toBeString();
    expectTypeOf<CountryCode>().toEqualTypeOf<
      "DE" | "US" | "GB" | "FR" | "ES" | "AT" | "CH"
    >();
  });
});

describe("LanguageType", () => {
  it("should match LanguageTypes", () => {
    expectTypeOf<LanguageType>().toBeString();
    expectTypeOf<LanguageType>().toEqualTypeOf<"language" | "country">();
  });
});

describe("LanguageTypeKey", () => {
  it("should match Langtag for key 'language'", () => {
    expectTypeOf<LanguageTypeKey<"language">>().toBeString();
    expectTypeOf<LanguageTypeKey<"language">>().toEqualTypeOf<
      "de-DE" | "en-GB"
    >();
  });
  it("should match CountryCode for key 'country'", () => {
    expectTypeOf<LanguageTypeKey<"country">>().toBeString();
    expectTypeOf<LanguageTypeKey<"country">>().toEqualTypeOf<
      "DE" | "US" | "GB" | "FR" | "ES" | "AT" | "CH"
    >();
  });
});

describe("LinkedTableId", () => {
  it("should find all ids of recursively linked tables", () => {
    // id of frame table is 91
    type FrameTableId = 91;
    expectTypeOf<LinkedTableId<FrameTableId>>().toEqualTypeOf<
      1 | 5 | 15 | 46 | 84 | 85 | 86 | 87 | 88 | 89
    >();
  });
});

describe("RowValue", () => {
  it("should match correct value for text, shorttext, richtext without multilanguage", () => {
    expectTypeOf<RowValue<"color", "hexcode">>().toEqualTypeOf<string | null>();
    expectTypeOf<RowValue<"manufacturer", "identifier">>().toEqualTypeOf<
      string | null
    >();
    // TODO: add kind "richtext" to demo structure
  });

  it("should match correct value for text, shorttext, richtext with multilanguage", () => {
    expectTypeOf<RowValue<"material", "identifier">>().toEqualTypeOf<{
      "de-DE"?: string | undefined;
      "en-GB"?: string | undefined;
    }>();
    expectTypeOf<RowValue<"bikeModel", "description">>().toEqualTypeOf<{
      "de-DE"?: string | undefined;
      "en-GB"?: string | undefined;
    }>();
    // TODO: add kind "richtext" to demo structure
  });

  it("should match correct value for boolean", () => {
    expectTypeOf<RowValue<"headlight", "hasParkingLight">>().toEqualTypeOf<
      boolean | null
    >();
    expectTypeOf<
      RowValue<"headlight", "hasFloodLightFunction">
    >().toEqualTypeOf<boolean | null>();
  });

  it("should match correct value for numeric", () => {
    expectTypeOf<RowValue<"fork", "forkLength">>().toEqualTypeOf<
      number | null
    >();
    expectTypeOf<RowValue<"engine", "power">>().toEqualTypeOf<number | null>();
  });

  it("should match correct value for currency", () => {
    expectTypeOf<RowValue<"variant", "rrp">>().toEqualTypeOf<{
      DE?: number | undefined;
      US?: number | undefined;
      GB?: number | undefined;
      FR?: number | undefined;
      ES?: number | undefined;
      AT?: number | undefined;
      CH?: number | undefined;
    }>();
    expectTypeOf<RowValue<"bikeModel", "rrp">>().toEqualTypeOf<{
      DE?: number | undefined;
      US?: number | undefined;
      GB?: number | undefined;
      FR?: number | undefined;
      ES?: number | undefined;
      AT?: number | undefined;
      CH?: number | undefined;
    }>();
  });

  it("should match correct value for date and datetime", () => {
    expectTypeOf<RowValue<"bikeModel", "publishDate">>().toEqualTypeOf<
      string | null
    >();
    // TODO: add kind "date" to demo structure
  });

  it("should match correct value for status", () => {
    // TODO: add kind "status" to demo structure
  });

  it("should match correct value for attachment", () => {
    expectTypeOf<RowValue<"award", "image">>().toEqualTypeOf<
      {
        ordering: number;
        url: {
          "de-DE"?: string | undefined;
          "en-GB"?: string | undefined;
        };
        uuid: string;
        folder: number | null;
        folders: number[];
        title: {
          "de-DE"?: string | undefined;
          "en-GB"?: string | undefined;
        };
        description: {
          "de-DE"?: string | undefined;
          "en-GB"?: string | undefined;
        };
        internalName: {
          "de-DE"?: string | undefined;
          "en-GB"?: string | undefined;
        };
        externalName: {
          "de-DE"?: string | undefined;
          "en-GB"?: string | undefined;
        };
        mimeType: {
          "de-DE"?: string | undefined;
          "en-GB"?: string | undefined;
        };
        createdAt: string;
        updatedAt: string;
      }[]
    >();
  });

  it("should match correct value for concat", () => {
    expectTypeOf<RowValue<"engine", "ID">>().toEqualTypeOf<
      [
        [
          | {
              id: number;
              value: string | null;
            }
          | undefined
        ],
        {
          "de-DE"?: string | undefined;
          "en-GB"?: string | undefined;
        },
        number | null
      ]
    >();
  });

  it("should match correct value for link with constraint", () => {
    expectTypeOf<RowValue<"engine", "manufacturer">>().toEqualTypeOf<
      [
        | {
            id: number;
            value: string | null;
          }
        | undefined
      ]
    >();
  });

  it("should match correct value for link without constraint", () => {
    expectTypeOf<RowValue<"bikeModel", "accessory">>().toEqualTypeOf<
      {
        id: number;
        value: {
          "de-DE"?: string | undefined;
          "en-GB"?: string | undefined;
        };
      }[]
    >();
  });

  it("should match correct value for group", () => {
    expectTypeOf<RowValue<"frame", "packSize">>().toEqualTypeOf<
      [number | null, number | null, number | null]
    >();
    expectTypeOf<RowValue<"handlebar", "ID">>().toEqualTypeOf<
      [
        [
          | {
              id: number;
              value: string | null;
            }
          | undefined
        ],
        {
          "de-DE"?: string | undefined;
          "en-GB"?: string | undefined;
        },
        [
          | {
              id: number;
              value: {
                "de-DE"?: string | undefined;
                "en-GB"?: string | undefined;
              };
            }
          | undefined
        ]
      ]
    >();
  });
});

describe("Row", () => {
  it("should match complete Row if only given TableName", () => {
    expectTypeOf<Row<"headSet">>().toEqualTypeOf<{
      id: number;
      values: [
        [
          [
            | {
                id: number;
                value: string | null;
              }
            | undefined
          ],
          {
            "de-DE"?: string | undefined;
            "en-GB"?: string | undefined;
          }
        ],
        [
          | {
              id: number;
              value: string | null;
            }
          | undefined
        ],
        {
          "de-DE"?: string | undefined;
          "en-GB"?: string | undefined;
        },
        [
          | {
              id: number;
              value: {
                "de-DE"?: string | undefined;
                "en-GB"?: string | undefined;
              };
            }
          | undefined
        ]
      ];
    }>();
  });

  it("should match Row of single Column if given TableName and ColumnName", () => {
    expectTypeOf<Row<"engine", "power">>().toEqualTypeOf<{
      id: number;
      values: [number | null];
    }>();

    expectTypeOf<Row<"marketingColor", "mainColor">>().toEqualTypeOf<{
      id: number;
      values: [
        [
          | {
              id: number;
              value: [
                {
                  "de-DE"?: string | undefined;
                  "en-GB"?: string | undefined;
                },
                string | null
              ];
            }
          | undefined
        ]
      ];
    }>();
  });
});

describe("getEntitiesOfTable", () => {
  it("should handle multiple tables", () => {
    expectTypeOf<
      Awaited<
        ReturnType<typeof getEntitiesOfTable<["material", "manufacturer"]>>
      >
    >().toEqualTypeOf<{
      1: {
        id: 1;
        name: "material";
        langtags: ["de-DE", "en-GB"];
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
                "de-DE"?: string;
                "en-GB"?: string;
              }
            ];
          };
        };
      };
      5: {
        id: 5;
        name: "manufacturer";
        langtags: ["de-DE", "en-GB"];
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
    expectTypeOf<
      Awaited<ReturnType<typeof getEntitiesOfTable<"steerTube">>>
    >().toEqualTypeOf<{
      1: {
        id: 1;
        name: "material";
        langtags: ["de-DE", "en-GB"];
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
                "de-DE"?: string | undefined;
                "en-GB"?: string | undefined;
              }
            ];
          };
        };
      };
      14: {
        id: 14;
        name: "steerTube";
        langtags: ["de-DE", "en-GB"];
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
                "de-DE"?: string | undefined;
                "en-GB"?: string | undefined;
              },
              [
                | {
                    id: number;
                    value: {
                      "de-DE"?: string | undefined;
                      "en-GB"?: string | undefined;
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
});
// TODO: more types and tests
