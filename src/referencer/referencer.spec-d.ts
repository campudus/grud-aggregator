/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, it, expectTypeOf } from "vitest";

// initialize structure of demo grud
import "../structure/structure.d.ts";
import { referencer as buildReferencer } from "./referencer.d.js";
import { TableEntities } from "../entities.js";
import { Langtag, Localize } from "../common.js";

describe("referencer", () => {
  const referencer = buildReferencer();

  describe("without tablesToLanguages", () => {
    it("should handle simple table entities", () => {
      expectTypeOf<
        ReturnType<typeof referencer<TableEntities<"material" | "manufacturer" | "color">>>
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

    it("should handle more complex (with links) table entities", () => {
      expectTypeOf<
        ReturnType<typeof referencer<TableEntities<"engine" | "batteryPack">>>
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

  describe("with tablesToLanguages", () => {
    it("should handle simple table entities", () => {
      expectTypeOf<
        ReturnType<
          typeof referencer<Partial<Record<Langtag, Localize<TableEntities<"material" | "color">>>>>
        >
      >().toEqualTypeOf<
        Partial<
          Record<
            Langtag,
            {
              material?: {
                [x: number]: {
                  id: number;
                  identifier: string | null;
                };
              };
              color?: {
                [x: number]: {
                  id: number;
                  name: string | null;
                  hexcode: string | null;
                };
              };
            }
          >
        >
      >();
    });

    it("should handle more complex (with links) table entities", () => {
      expectTypeOf<
        ReturnType<
          typeof referencer<
            Partial<Record<Langtag, Localize<TableEntities<"engine" | "batteryPack">>>>
          >
        >
      >().toEqualTypeOf<
        Partial<
          Record<
            Langtag,
            {
              engine?: {
                [x: number]: {
                  id: number;
                  manufacturer: [
                    | {
                        id: number;
                        value: string | null;
                      }
                    | undefined
                  ];
                  identifier: string | null;
                  power: number | null;
                  torque: number | null;
                  speedLimit: number | null;
                  levelsOfAssistance: number | null;
                };
              };
              batteryPack?: {
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
                        value: string | null;
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
                  identifier: string | null;
                  capacity: number | null;
                };
              };
            }
          >
        >
      >();
    });
  });
});
