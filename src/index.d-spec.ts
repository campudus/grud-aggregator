import { describe, it, expectTypeOf } from "vitest";

import "./structure/structure.d.ts";
import type { TableName } from "./index.d.ts";

describe("grud-aggregator types", () => {
  it("TableName should (roughly) match TableNames from Structure", () => {
    expectTypeOf<TableName>().toBeString();
    expectTypeOf<
      "material" | "color" | "glossGrade" | "marketingColor" | "manufacturer"
    >().toExtend<TableName>();
  });

  it("TableName should (roughly) match TableNames from Structure", () => {
    expectTypeOf<TableName>().toBeString();
    expectTypeOf<
      "material" | "color" | "glossGrade" | "marketingColor" | "manufacturer"
    >().toExtend<TableName>();
  });
});
