/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, it, expectTypeOf } from "vitest";

import type { Structure as S } from "./structure.demo.d.ts";
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
  LinkedTableName,
  Localize,
  Attachment,
  TableFilterName,
  TableColumns,
  RowValueMap
} from "../../common.d.ts";

describe("TableName", () => {
  it("should (roughly) match keys from Structure", () => {
    expectTypeOf<TableName<S>>().toBeString();
    expectTypeOf<
      "material" | "color" | "glossGrade" | "marketingColor" | "manufacturer"
    >().toExtend<TableName<S>>();
  });
});

describe("ColumnName", () => {
  it("should contain all ColumnNames of a given Table", () => {
    expectTypeOf<ColumnName<S, "marketingColor">>().toBeString();
    expectTypeOf<ColumnName<S, "marketingColor">>().toEqualTypeOf<
      "glossGrade" | "identifier" | "ID" | "mainColor" | "partialColor1" | "partialColor2"
    >();
  });
});

describe("TableFilterName", () => {
  it("should build correct filterNames for all columns of table", () => {
    expectTypeOf<TableFilterName<S, "marketingColor">>().toBeString();
    expectTypeOf<TableFilterName<S, "marketingColor">>().toEqualTypeOf<
      | "marketingColor.glossGrade"
      | "marketingColor.identifier"
      | "marketingColor.ID"
      | "marketingColor.mainColor"
      | "marketingColor.partialColor1"
      | "marketingColor.partialColor2"
    >();
  });

  it("should build correct filterNames for single column of table", () => {
    expectTypeOf<TableFilterName<S, "marketingColor", "glossGrade">>().toBeString();
    expectTypeOf<
      TableFilterName<S, "marketingColor", "glossGrade">
    >().toEqualTypeOf<"marketingColor.glossGrade">();
  });

  it("should not allow wrong columnName for table", () => {
    expectTypeOf<TableFilterName<S, "marketingColor", "forkLength">>().toBeNever();
    expectTypeOf<TableFilterName<S, "marketingColor", "forkLength">>().toEqualTypeOf<never>();
  });

  it("should build correct filterNames for mutliple tables with different columns", () => {
    expectTypeOf<TableFilterName<S, "brake" | "fork">>().toBeString();
    expectTypeOf<TableFilterName<S, "brake" | "fork">>().toEqualTypeOf<
      | "brake.manufacturer"
      | "brake.brakeKind"
      | "brake.ID"
      | "brake.identifier"
      | "fork.manufacturer"
      | "fork.lockout"
      | "fork.springMedium"
      | "fork.axle"
      | "fork.steerTube"
      | "fork.ID"
      | "fork.identifier"
      | "fork.forkLength"
    >();

    expectTypeOf<TableFilterName<S, "brake" | "fork", "brakeKind" | "forkLength">>().toEqualTypeOf<
      "brake.brakeKind" | "fork.forkLength"
    >();
  });
});

describe("TableColumns", () => {
  it("should contain all Columns of Table if no columns are specified", () => {
    expectTypeOf<TableColumns<S, "baseFrameShape">>().toEqualTypeOf<
      [
        {
          id: 1;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
        },
        {
          id: 2;
          name: "bidexCode";
          kind: "shorttext";
          multilanguage: false;
        },
        {
          id: 3;
          name: "image";
          kind: "attachment";
          multilanguage: false;
        }
      ]
    >();
  });

  it("should contain specified Columns of Table", () => {
    expectTypeOf<TableColumns<S, "baseFrameShape", "identifier" | "image">>().toEqualTypeOf<
      [
        {
          id: 1;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
        },
        {
          id: 3;
          name: "image";
          kind: "attachment";
          multilanguage: false;
        }
      ]
    >();
  });
});

describe("Columns", () => {
  it("should contain all Columns of Table", () => {
    expectTypeOf<Columns<S, "color">>().toEqualTypeOf<
      | {
          id: 1;
          name: "name";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
        }
      | {
          id: 2;
          name: "hexcode";
          kind: "shorttext";
          multilanguage: false;
        }
    >();
  });
});

describe("Column", () => {
  it("should contain specific Column of Table", () => {
    expectTypeOf<Column<S, "chain", "identifier">>().toEqualTypeOf<{
      id: 2;
      name: "identifier";
      kind: "shorttext";
      multilanguage: true;
      languageType: "language";
    }>();
  });
});

describe("Langtag", () => {
  it("should match all Langtags", () => {
    expectTypeOf<Langtag<S>>().toBeString();
    expectTypeOf<Langtag<S>>().toEqualTypeOf<"de" | "en" | "fr" | "es" | "it" | "hr">();
  });
});

describe("CountryCode", () => {
  it("should match all CountryCodes", () => {
    expectTypeOf<CountryCode<S>>().toBeString();
    expectTypeOf<CountryCode<S>>().toEqualTypeOf<"DE" | "US" | "GB" | "FR" | "ES" | "AT" | "CH">();
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
    expectTypeOf<LanguageTypeKey<S, "language">>().toBeString();
    expectTypeOf<LanguageTypeKey<S, "language">>().toEqualTypeOf<
      "de" | "en" | "fr" | "es" | "it" | "hr"
    >();
  });
  it("should match CountryCode for key 'country'", () => {
    expectTypeOf<LanguageTypeKey<S, "country">>().toBeString();
    expectTypeOf<LanguageTypeKey<S, "country">>().toEqualTypeOf<
      "DE" | "US" | "GB" | "FR" | "ES" | "AT" | "CH"
    >();
  });
});

describe("LinkedTableName", () => {
  it("should find all names of recursively linked tables", () => {
    expectTypeOf<LinkedTableName<S, "frame">>().toEqualTypeOf<
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

  it("should handle include", () => {
    expectTypeOf<LinkedTableName<S, "frame", "frameShape.identifier">>().toEqualTypeOf<
      | "material"
      | "manufacturer"
      | "wheelSize"
      | "axleStandard"
      // | "baseFrameShape" // filtered because "frameShape.baseFrameShape" is not included
      | "frameShape"
      | "frameSize"
      | "bearingSet"
      | "suspensionSystem"
      | "brakeStandard"
    >();

    expectTypeOf<LinkedTableName<S, "frame", "frame.bearingSet">>().toEqualTypeOf<
      "manufacturer" | "bearingSet"
    >();

    expectTypeOf<
      LinkedTableName<S, "brake" | "frame", "brake.identifier" | "frame.height">
    >().toEqualTypeOf<never>();
  });

  it("should handle exclude", () => {
    expectTypeOf<
      LinkedTableName<S, "frame", undefined, "frameShape" | "wheelSize">
    >().toEqualTypeOf<
      | "material"
      | "manufacturer"
      | "axleStandard"
      | "frameSize"
      | "bearingSet"
      | "suspensionSystem"
      | "brakeStandard"
    >();

    expectTypeOf<
      LinkedTableName<S, "frame", undefined, "frame.bearingSet" | "wheelSize">
    >().toEqualTypeOf<
      | "material"
      | "manufacturer"
      | "axleStandard"
      | "frameShape"
      | "baseFrameShape"
      | "frameSize"
      | "suspensionSystem"
      | "brakeStandard"
    >();

    expectTypeOf<LinkedTableName<S, "bikeModel", undefined, "material" | "manufacturer">>()
      .extract<"material" | "manufacturer">()
      .toEqualTypeOf<never>();

    expectTypeOf<LinkedTableName<S, "bikeModel", undefined, "variant">>()
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

    expectTypeOf<RowValue<S, typeof textColumn>>().toEqualTypeOf<string | null>();
    expectTypeOf<RowValue<S, typeof shorttextColumn>>().toEqualTypeOf<string | null>();
    expectTypeOf<RowValue<S, typeof richtextColumn>>().toEqualTypeOf<string | null>();
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

    expectTypeOf<RowValue<S, typeof textColumn>>().toEqualTypeOf<{
      de?: string | null;
      en?: string | null;
      fr?: string | null;
      es?: string | null;
      it?: string | null;
      hr?: string | null;
    }>();
    expectTypeOf<RowValue<S, typeof shorttextColumn>>().toEqualTypeOf<{
      de?: string | null;
      en?: string | null;
      fr?: string | null;
      es?: string | null;
      it?: string | null;
      hr?: string | null;
    }>();
    expectTypeOf<RowValue<S, typeof richtextColumn>>().toEqualTypeOf<{
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

    expectTypeOf<RowValue<S, typeof booleanColumn>>().toEqualTypeOf<boolean | null>();
  });

  it("should match correct value for boolean with multilanguage", () => {
    const booleanColumn = { kind: "boolean", multilanguage: true } as const satisfies ColumnInfo;

    expectTypeOf<RowValue<S, typeof booleanColumn>>().toEqualTypeOf<{
      de?: boolean | null;
      en?: boolean | null;
      fr?: boolean | null;
      es?: boolean | null;
      it?: boolean | null;
      hr?: boolean | null;
    }>();
  });

  it("should match correct value for integer without multilanguage", () => {
    const integerColumn = {
      kind: "integer",
      multilanguage: false
    } as const satisfies ColumnInfo;

    expectTypeOf<RowValue<S, typeof integerColumn>>().toEqualTypeOf<number | null>();
  });

  it("should match correct value for integer with multilanguage", () => {
    const integerColumn = {
      kind: "integer",
      multilanguage: true
    } as const satisfies ColumnInfo;

    expectTypeOf<RowValue<S, typeof integerColumn>>().toEqualTypeOf<{
      de?: number | null;
      en?: number | null;
      fr?: number | null;
      es?: number | null;
      it?: number | null;
      hr?: number | null;
    }>();
  });

  it("should match correct value for numeric without multilanguage", () => {
    const numericColumn = {
      kind: "numeric",
      multilanguage: false
    } as const satisfies ColumnInfo;

    expectTypeOf<RowValue<S, typeof numericColumn>>().toEqualTypeOf<number | null>();
  });

  it("should match correct value for numeric with multilanguage", () => {
    const numericColumn = {
      kind: "numeric",
      multilanguage: true
    } as const satisfies ColumnInfo;

    expectTypeOf<RowValue<S, typeof numericColumn>>().toEqualTypeOf<{
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

    expectTypeOf<RowValue<S, typeof currencyColumn>>().toEqualTypeOf<number | null>();
  });

  it("should match correct value for currency with multilanguage", () => {
    const currencyColumn = {
      kind: "currency",
      multilanguage: true
    } as const satisfies ColumnInfo;

    expectTypeOf<RowValue<S, typeof currencyColumn>>().toEqualTypeOf<{
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

    expectTypeOf<RowValue<S, typeof dateColumn>>().toEqualTypeOf<string | null>();
    expectTypeOf<RowValue<S, typeof datetimeColumn>>().toEqualTypeOf<string | null>();
  });

  it("should match correct value for status", () => {
    const statusColumn = {
      kind: "status",
      multilanguage: false
    } as const satisfies ColumnInfo;

    expectTypeOf<RowValue<S, typeof statusColumn>>().toEqualTypeOf<boolean[]>();
  });

  it("should match correct value for attachment", () => {
    const attachmentColumn = {
      kind: "attachment",
      multilanguage: false
    } as const satisfies ColumnInfo;

    expectTypeOf<RowValue<S, typeof attachmentColumn>>().toEqualTypeOf<
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

    expectTypeOf<RowValue<S, typeof concatColumn>>().toEqualTypeOf<
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

    expectTypeOf<RowValue<S, typeof linkColumn>>().toEqualTypeOf<
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

    expectTypeOf<RowValue<S, typeof linkColumn>>().toEqualTypeOf<
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

    expectTypeOf<RowValue<S, typeof groupColumn>>().toEqualTypeOf<
      [number | null, string | null, boolean | null]
    >();
  });
});

describe("RowValueMap", () => {
  it("should list correct row values for table filter names", () => {
    expectTypeOf<RowValueMap<S>>().toExtend<{
      "accessory.identifier": {
        de?: string | null;
        en?: string | null;
        fr?: string | null;
        es?: string | null;
        it?: string | null;
        hr?: string | null;
      };
      "variant.frame": never[]; // does not resolve links!
      "material.identifier": {
        de?: string | null;
        en?: string | null;
        fr?: string | null;
        es?: string | null;
        it?: string | null;
        hr?: string | null;
      };
      "manufacturer.identifier": string | null;
      "brake.brakeKind": never[]; // does not resolve links!
      "brakeKind.identifier": {
        de?: string | null;
        en?: string | null;
        fr?: string | null;
        es?: string | null;
        it?: string | null;
        hr?: string | null;
      };
      "brake.ID": [
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
    }>();
  });
});

describe("Row", () => {
  it("should match complete Row if only given TableName", () => {
    expectTypeOf<Row<S, "headSet">>().toEqualTypeOf<{
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
    expectTypeOf<Row<S, "engine", "power">>().toEqualTypeOf<{
      id: number;
      values: [number | null];
    }>();

    expectTypeOf<Row<S, "marketingColor", "mainColor">>().toEqualTypeOf<{
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

describe("Localize", () => {
  it("should keep primitive value types", () => {
    expectTypeOf<Localize<S, string>>().toEqualTypeOf<string>();
    expectTypeOf<Localize<S, number>>().toEqualTypeOf<number>();
    expectTypeOf<Localize<S, boolean>>().toEqualTypeOf<boolean>();
    expectTypeOf<Localize<S, undefined>>().toEqualTypeOf<undefined>();
    expectTypeOf<Localize<S, null>>().toEqualTypeOf<null>();
  });

  it("should localize Attachment type", () => {
    expectTypeOf<Localize<S, Attachment<S>>>().toEqualTypeOf<{
      ordering: number;
      url: string;
      uuid: string;
      folder: number | null;
      folders: number[];
      title: string;
      description: string;
      internalName: string;
      externalName: string;
      mimeType: string;
      createdAt: string;
      updatedAt: string;
    }>();
  });

  it("should localize multilanguage values", () => {
    expectTypeOf<
      Localize<
        S,
        {
          de: string | null;
          en: string | null;
        }
      >
    >().toEqualTypeOf<string | null>();
    expectTypeOf<
      Localize<
        S,
        {
          de: number | null;
          en: number | null;
        }
      >
    >().toEqualTypeOf<number | null>();
    expectTypeOf<
      Localize<
        S,
        {
          de: boolean | null;
          en: boolean | null;
        }
      >
    >().toEqualTypeOf<boolean | null>();
  });

  it("should keep non multilanguage value ", () => {
    expectTypeOf<Localize<S, string | null>>().toEqualTypeOf<string | null>();
    expectTypeOf<Localize<S, number | null>>().toEqualTypeOf<number | null>();
    expectTypeOf<Localize<S, boolean | null>>().toEqualTypeOf<boolean | null>();
  });

  it("should localize deeply nested values", () => {
    expectTypeOf<
      Localize<
        S,
        {
          some: {
            very: [
              {
                id: number;
                deep: {
                  de: string | null;
                  en: string | null;
                };
              }
            ];
            anotherValue: {
              de: number | null;
              en: number | null;
            };
          };
        }
      >
    >().toEqualTypeOf<{
      some: {
        very: [
          {
            id: number;
            deep: string | null;
          }
        ];
        anotherValue: number | null;
      };
    }>();
  });
});
