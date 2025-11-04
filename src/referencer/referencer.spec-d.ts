import { describe, it, expectTypeOf } from "vitest";

// initialize structure of demo grud
import "../structure/structure.d.ts";
import type { referencer } from "./referencer.d.ts";
import { TableEntities } from "../entities.js";

describe("referencer", () => {
  it("should handle simple non localized table entities", () => {
    expectTypeOf<
      ReturnType<
        ReturnType<typeof referencer<TableEntities<"material" | "manufacturer" | "color">>>
      >
    >().toEqualTypeOf<{
      material: {
        [x: number]: {
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
      manufacturer: {
        [x: number]: {
          id: number;
          identifier: string | null;
        };
      };
      color: {
        [x: number]: {
          id: number;
          name: {
            de?: string | null;
            en?: string | null;
            fr?: string | null;
            es?: string | null;
            it?: string | null;
            hr?: string | null;
          };
          hexcode: string | null;
        };
      };
    }>();
  });

  it("should handle more complex (with links) non localized table entities", () => {
    expectTypeOf<
      ReturnType<ReturnType<typeof referencer<TableEntities<"engine" | "batteryPack">>>>
    >().toEqualTypeOf<{
      engine: {
        [x: number]: {
          id: number;
          manufacturer: [
            | {
                id: number;
                value: string | null;
              }
            | undefined
          ];
          identifier: {
            de?: string | null;
            en?: string | null;
            fr?: string | null;
            es?: string | null;
            it?: string | null;
            hr?: string | null;
          };
          power: number | null;
          torque: number | null;
          speedLimit: number | null;
          levelsOfAssistance: number | null;
        };
      };
      batteryPack: {
        [x: number]: {
          id: number;
          manufacturer: [
            | {
                id: number;
                value: string | null;
              }
            | undefined
          ];
          batteryPackType: [
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
          ];
          chargingVoltage: [
            | {
                id: number;
                value: string | null;
              }
            | undefined
          ];
          identifier: {
            de?: string | null;
            en?: string | null;
            fr?: string | null;
            es?: string | null;
            it?: string | null;
            hr?: string | null;
          };
          capacity: number | null;
        };
      };
    }>();
  });
});
