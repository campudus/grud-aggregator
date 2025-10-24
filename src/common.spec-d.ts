/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, it, expectTypeOf } from "vitest";

// initialize structure of demo grud
import "./structure/structure.d.ts";
import type {
  TableName,
  ColumnInfo,
  ColumnName,
  Columns,
  Column,
  Langtag,
  CountryCode,
  LanguageType,
  LanguageTypeKey,
  Row,
  RowValue,
  LinkedTableName
} from "./common.d.ts";

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
      "glossGrade" | "identifier" | "ID" | "mainColor" | "partialColor1" | "partialColor2"
    >();
  });
});

describe("Columns", () => {
  it("should contain all Columns of Table", () => {
    expectTypeOf<Columns<"color">>().toEqualTypeOf<
      | {
          id: 1;
          name: "name";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 0;
        }
      | {
          id: 2;
          name: "hexcode";
          kind: "shorttext";
          multilanguage: false;
          index: 1;
        }
    >();
  });
});

describe("Column", () => {
  it("should contain specific Column of Table", () => {
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
    expectTypeOf<Langtag>().toEqualTypeOf<"de" | "en" | "fr" | "es" | "it" | "hr">();
  });
});

describe("CountryCode", () => {
  it("should match all CountryCodes", () => {
    expectTypeOf<CountryCode>().toBeString();
    expectTypeOf<CountryCode>().toEqualTypeOf<"DE" | "US" | "GB" | "FR" | "ES" | "AT" | "CH">();
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
      "de" | "en" | "fr" | "es" | "it" | "hr"
    >();
  });
  it("should match CountryCode for key 'country'", () => {
    expectTypeOf<LanguageTypeKey<"country">>().toBeString();
    expectTypeOf<LanguageTypeKey<"country">>().toEqualTypeOf<
      "DE" | "US" | "GB" | "FR" | "ES" | "AT" | "CH"
    >();
  });
});

describe("LinkedTableName", () => {
  it("should find all names of recursively linked tables", () => {
    expectTypeOf<LinkedTableName<"frame">>().toEqualTypeOf<
      | "material"
      | "manufacturer"
      | "wheelSize"
      | "axleStandard"
      | "baseFrameShape"
      | "frameShape"
      | "frameSize"
      | "bearingSet"
      | "suspensionSystem"
      | "brakeStandard"
    >();
  });

  it("should handle includeColumns", () => {
    expectTypeOf<LinkedTableName<"frame", "frameShape">>().toEqualTypeOf<
      "frameShape" | "baseFrameShape"
    >();

    expectTypeOf<LinkedTableName<"variant", "frame" | "fork">>().toEqualTypeOf<
      | "frame"
      | "material"
      | "manufacturer"
      | "lockout"
      | "springMedium"
      | "axle"
      | "steerTube"
      | "wheelSize"
      | "fork"
      | "axleStandard"
      | "baseFrameShape"
      | "frameShape"
      | "frameSize"
      | "bearingSet"
      | "suspensionSystem"
      | "brakeStandard"
    >();
  });

  it("should handle includeTables", () => {
    expectTypeOf<LinkedTableName<"frame", undefined, "frameShape">>().toEqualTypeOf<"frameShape">();
    expectTypeOf<LinkedTableName<"bikeModel", undefined, "variant" | "fork">>().toEqualTypeOf<
      "variant" | "fork"
    >();
  });

  it("should handle excludeTables", () => {
    expectTypeOf<
      LinkedTableName<"frame", undefined, undefined, "frameShape" | "wheelSize">
    >().toEqualTypeOf<
      | "material"
      | "manufacturer"
      | "axleStandard"
      | "frameSize"
      | "bearingSet"
      | "suspensionSystem"
      | "brakeStandard"
    >();

    expectTypeOf<LinkedTableName<"bikeModel", undefined, undefined, "material" | "manufacturer">>()
      .extract<"material" | "manufacturer">()
      .toEqualTypeOf<never>();

    expectTypeOf<LinkedTableName<"bikeModel", undefined, undefined, "variant">>()
      .extract<"frame" | "frameShape">()
      .toEqualTypeOf<never>();
  });
});

describe("RowValue", () => {
  it("should match correct value for text, shorttext, richtext without multilanguage", () => {
    const textColumn = {
      kind: "text",
      multilanguage: false
    } as const satisfies ColumnInfo;
    const shorttextColumn = {
      kind: "shorttext",
      multilanguage: false
    } as const satisfies ColumnInfo;
    const richtextColumn = {
      kind: "richtext",
      multilanguage: false
    } as const satisfies ColumnInfo;

    expectTypeOf<RowValue<typeof textColumn>>().toEqualTypeOf<string | null>();
    expectTypeOf<RowValue<typeof shorttextColumn>>().toEqualTypeOf<string | null>();
    expectTypeOf<RowValue<typeof richtextColumn>>().toEqualTypeOf<string | null>();
  });

  it("should match correct value for text, shorttext, richtext with multilanguage", () => {
    const textColumn = {
      kind: "text",
      multilanguage: true
    } as const satisfies ColumnInfo;
    const shorttextColumn = {
      kind: "shorttext",
      multilanguage: true
    } as const satisfies ColumnInfo;
    const richtextColumn = {
      kind: "richtext",
      multilanguage: true
    } as const satisfies ColumnInfo;

    expectTypeOf<RowValue<typeof textColumn>>().toEqualTypeOf<{
      de?: string | null;
      en?: string | null;
      fr?: string | null;
      es?: string | null;
      it?: string | null;
      hr?: string | null;
    }>();
    expectTypeOf<RowValue<typeof shorttextColumn>>().toEqualTypeOf<{
      de?: string | null;
      en?: string | null;
      fr?: string | null;
      es?: string | null;
      it?: string | null;
      hr?: string | null;
    }>();
    expectTypeOf<RowValue<typeof richtextColumn>>().toEqualTypeOf<{
      de?: string | null;
      en?: string | null;
      fr?: string | null;
      es?: string | null;
      it?: string | null;
      hr?: string | null;
    }>();
  });

  it("should match correct value for boolean without multilanguage", () => {
    const booleanColumn = { kind: "boolean", multilanguage: false } as const satisfies ColumnInfo;

    expectTypeOf<RowValue<typeof booleanColumn>>().toEqualTypeOf<boolean | null>();
  });

  it("should match correct value for boolean with multilanguage", () => {
    const booleanColumn = { kind: "boolean", multilanguage: true } as const satisfies ColumnInfo;

    expectTypeOf<RowValue<typeof booleanColumn>>().toEqualTypeOf<{
      de?: boolean | null;
      en?: boolean | null;
      fr?: boolean | null;
      es?: boolean | null;
      it?: boolean | null;
      hr?: boolean | null;
    }>();
  });

  it("should match correct value for numeric without multilanguage", () => {
    const numericColumn = {
      kind: "numeric",
      multilanguage: false
    } as const satisfies ColumnInfo;

    expectTypeOf<RowValue<typeof numericColumn>>().toEqualTypeOf<number | null>();
  });

  it("should match correct value for numeric with multilanguage", () => {
    const numericColumn = {
      kind: "numeric",
      multilanguage: true
    } as const satisfies ColumnInfo;

    expectTypeOf<RowValue<typeof numericColumn>>().toEqualTypeOf<{
      de?: number | null;
      en?: number | null;
      fr?: number | null;
      es?: number | null;
      it?: number | null;
      hr?: number | null;
    }>();
  });

  it("should match correct value for currency without multilanguage", () => {
    const currencyColumn = {
      kind: "currency",
      multilanguage: false
    } as const satisfies ColumnInfo;

    expectTypeOf<RowValue<typeof currencyColumn>>().toEqualTypeOf<number | null>();
  });

  it("should match correct value for currency with multilanguage", () => {
    const currencyColumn = {
      kind: "currency",
      multilanguage: true
    } as const satisfies ColumnInfo;

    expectTypeOf<RowValue<typeof currencyColumn>>().toEqualTypeOf<{
      DE?: number | null;
      US?: number | null;
      GB?: number | null;
      FR?: number | null;
      ES?: number | null;
      AT?: number | null;
      CH?: number | null;
    }>();
  });

  it("should match correct value for date and datetime", () => {
    const dateColumn = {
      kind: "date",
      multilanguage: false
    } as const satisfies ColumnInfo;
    const datetimeColumn = {
      kind: "date",
      multilanguage: false
    } as const satisfies ColumnInfo;

    expectTypeOf<RowValue<typeof dateColumn>>().toEqualTypeOf<string | null>();
    expectTypeOf<RowValue<typeof datetimeColumn>>().toEqualTypeOf<string | null>();
  });

  it("should match correct value for status", () => {
    const statusColumn = {
      kind: "status",
      multilanguage: false
    } as const satisfies ColumnInfo;

    expectTypeOf<RowValue<typeof statusColumn>>().toEqualTypeOf<boolean[]>();
  });

  it("should match correct value for attachment", () => {
    const attachmentColumn = {
      kind: "attachment",
      multilanguage: false
    } as const satisfies ColumnInfo;

    expectTypeOf<RowValue<typeof attachmentColumn>>().toEqualTypeOf<
      {
        ordering: number;
        url: {
          de?: string;
          en?: string;
          fr?: string;
          es?: string;
          it?: string;
          hr?: string;
        };
        uuid: string;
        folder: number | null;
        folders: number[];
        title: {
          de?: string;
          en?: string;
          fr?: string;
          es?: string;
          it?: string;
          hr?: string;
        };
        description: {
          de?: string;
          en?: string;
          fr?: string;
          es?: string;
          it?: string;
          hr?: string;
        };
        internalName: {
          de?: string;
          en?: string;
          fr?: string;
          es?: string;
          it?: string;
          hr?: string;
        };
        externalName: {
          de?: string;
          en?: string;
          fr?: string;
          es?: string;
          it?: string;
          hr?: string;
        };
        mimeType: {
          de?: string;
          en?: string;
          fr?: string;
          es?: string;
          it?: string;
          hr?: string;
        };
        createdAt: string;
        updatedAt: string;
      }[]
    >();
  });

  it("should match correct value for concat", () => {
    const concatColumn = {
      kind: "concat",
      multilanguage: false,
      concats: [
        { index: 0, kind: "shorttext", multilanguage: true },
        { index: 1, kind: "currency", multilanguage: true },
        { index: 2, kind: "boolean", multilanguage: false }
      ]
    } as const satisfies ColumnInfo;

    expectTypeOf<RowValue<typeof concatColumn>>().toEqualTypeOf<
      [
        {
          de?: string | null;
          en?: string | null;
          fr?: string | null;
          es?: string | null;
          it?: string | null;
          hr?: string | null;
        },
        {
          DE?: number | null;
          US?: number | null;
          GB?: number | null;
          FR?: number | null;
          ES?: number | null;
          AT?: number | null;
          CH?: number | null;
        },
        boolean | null
      ]
    >();
  });

  it("should match correct value for link with constraint", () => {
    const linkColumn = {
      name: "manufacturer",
      kind: "link",
      multilanguage: false,
      toTable: 5,
      toColumn: {
        id: 1,
        name: "identifier"
      },
      constraint: {
        cardinality: {
          from: 0,
          to: 1
        }
      }
    } as const satisfies ColumnInfo;

    expectTypeOf<RowValue<typeof linkColumn>>().toEqualTypeOf<
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
    const linkColumn = {
      name: "manufacturer",
      kind: "link",
      multilanguage: false,
      toTable: 5,
      toColumn: {
        id: 1,
        name: "identifier"
      }
    } as const satisfies ColumnInfo;

    expectTypeOf<RowValue<typeof linkColumn>>().toEqualTypeOf<
      {
        id: number;
        value: string | null;
      }[]
    >();
  });

  it("should match correct value for group", () => {
    const groupColumn = {
      kind: "group",
      multilanguage: false,
      groups: [
        { index: 0, kind: "numeric", multilanguage: false },
        { index: 1, kind: "shorttext", multilanguage: false },
        { index: 2, kind: "boolean", multilanguage: false }
      ]
    } as const satisfies ColumnInfo;

    expectTypeOf<RowValue<typeof groupColumn>>().toEqualTypeOf<
      [number | null, string | null, boolean | null]
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
            de?: string | null;
            en?: string | null;
            fr?: string | null;
            es?: string | null;
            it?: string | null;
            hr?: string | null;
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
    }>();
  });
});
