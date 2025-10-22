declare module "grud-aggregator/structure" {
  export type Structure = [
    {
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
        },
      ];
    },
    {
      id: 2;
      name: "color";
      langtags: ["de", "en", "fr", "es", "it", "hr"];
      columns: [
        {
          id: 1;
          name: "name";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 0;
        },
        {
          id: 2;
          name: "hexcode";
          kind: "shorttext";
          multilanguage: false;
          index: 1;
        },
      ];
    },
    {
      id: 3;
      name: "glossGrade";
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
      ];
    },
    {
      id: 4;
      name: "marketingColor";
      langtags: ["de", "en", "fr", "es", "it", "hr"];
      columns: [
        {
          id: 0;
          name: "ID";
          kind: "concat";
          multilanguage: true;
          languageType: "language";
          concats: [
            {
              id: 1;
              name: "identifier";
              kind: "shorttext";
              multilanguage: true;
              languageType: "language";
              index: 0;
            },
            {
              id: 5;
              name: "glossGrade";
              kind: "link";
              multilanguage: true;
              languageType: "language";
              toTable: 3;
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
            },
          ];
          index: 0;
        },
        {
          id: 1;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 1;
        },
        {
          id: 2;
          name: "mainColor";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 2;
          toColumn: {
            id: 1;
            name: "name";
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
          index: 2;
        },
        {
          id: 3;
          name: "partialColor1";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 2;
          toColumn: {
            id: 1;
            name: "name";
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
          index: 3;
        },
        {
          id: 4;
          name: "partialColor2";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 2;
          toColumn: {
            id: 1;
            name: "name";
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
          index: 4;
        },
        {
          id: 5;
          name: "glossGrade";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 3;
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
          index: 5;
        },
      ];
    },
    {
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
        },
      ];
    },
    {
      id: 6;
      name: "engine";
      langtags: ["de", "en", "fr", "es", "it", "hr"];
      columns: [
        {
          id: 0;
          name: "ID";
          kind: "concat";
          multilanguage: true;
          languageType: "language";
          concats: [
            {
              id: 1;
              name: "manufacturer";
              kind: "link";
              multilanguage: false;
              toTable: 5;
              toColumn: {
                id: 1;
                name: "identifier";
                kind: "shorttext";
                multilanguage: false;
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
              index: 0;
            },
            {
              id: 2;
              name: "identifier";
              kind: "shorttext";
              multilanguage: true;
              languageType: "language";
              index: 1;
            },
            {
              id: 3;
              name: "power";
              kind: "numeric";
              multilanguage: false;
              index: 2;
            },
          ];
          index: 0;
        },
        {
          id: 1;
          name: "manufacturer";
          kind: "link";
          multilanguage: false;
          toTable: 5;
          toColumn: {
            id: 1;
            name: "identifier";
            kind: "shorttext";
            multilanguage: false;
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
        },
        {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        },
        {
          id: 3;
          name: "power";
          kind: "numeric";
          multilanguage: false;
          index: 3;
        },
        {
          id: 4;
          name: "torque";
          kind: "numeric";
          multilanguage: false;
          index: 4;
        },
        {
          id: 5;
          name: "speedLimit";
          kind: "numeric";
          multilanguage: false;
          index: 5;
        },
        {
          id: 6;
          name: "levelsOfAssistance";
          kind: "numeric";
          multilanguage: false;
          index: 6;
        },
      ];
    },
    {
      id: 7;
      name: "headSet";
      langtags: ["de", "en", "fr", "es", "it", "hr"];
      columns: [
        {
          id: 0;
          name: "ID";
          kind: "concat";
          multilanguage: true;
          languageType: "language";
          concats: [
            {
              id: 1;
              name: "manufacturer";
              kind: "link";
              multilanguage: false;
              toTable: 5;
              toColumn: {
                id: 1;
                name: "identifier";
                kind: "shorttext";
                multilanguage: false;
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
              index: 0;
            },
            {
              id: 2;
              name: "identifier";
              kind: "shorttext";
              multilanguage: true;
              languageType: "language";
              index: 1;
            },
          ];
          index: 0;
        },
        {
          id: 1;
          name: "manufacturer";
          kind: "link";
          multilanguage: false;
          toTable: 5;
          toColumn: {
            id: 1;
            name: "identifier";
            kind: "shorttext";
            multilanguage: false;
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
        },
        {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        },
        {
          id: 3;
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
          index: 3;
        },
      ];
    },
    {
      id: 8;
      name: "connectivity";
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
      ];
    },
    {
      id: 9;
      name: "displayColor";
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
      ];
    },
    {
      id: 10;
      name: "display";
      langtags: ["de", "en", "fr", "es", "it", "hr"];
      columns: [
        {
          id: 0;
          name: "ID";
          kind: "concat";
          multilanguage: true;
          languageType: "language";
          concats: [
            {
              id: 1;
              name: "manufacturer";
              kind: "link";
              multilanguage: false;
              toTable: 5;
              toColumn: {
                id: 1;
                name: "identifier";
                kind: "shorttext";
                multilanguage: false;
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
              index: 0;
            },
            {
              id: 2;
              name: "identifier";
              kind: "shorttext";
              multilanguage: true;
              languageType: "language";
              index: 1;
            },
            {
              id: 3;
              name: "connectivity";
              kind: "link";
              multilanguage: true;
              languageType: "language";
              toTable: 8;
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
              index: 2;
            },
          ];
          index: 0;
        },
        {
          id: 1;
          name: "manufacturer";
          kind: "link";
          multilanguage: false;
          toTable: 5;
          toColumn: {
            id: 1;
            name: "identifier";
            kind: "shorttext";
            multilanguage: false;
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
        },
        {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        },
        {
          id: 3;
          name: "connectivity";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 8;
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
          index: 3;
        },
        {
          id: 4;
          name: "isDetachable";
          kind: "boolean";
          multilanguage: false;
          index: 4;
        },
        {
          id: 5;
          name: "displayColor";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 9;
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
          index: 5;
        },
        {
          id: 6;
          name: "hasNavigation";
          kind: "boolean";
          multilanguage: false;
          index: 6;
        },
      ];
    },
    {
      id: 11;
      name: "lockout";
      langtags: ["de", "en", "fr", "es", "it", "hr"];
      columns: [
        {
          id: 1;
          name: "identifier";
          kind: "shorttext";
          multilanguage: false;
          index: 0;
        },
      ];
    },
    {
      id: 12;
      name: "springMedium";
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
      ];
    },
    {
      id: 13;
      name: "axle";
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
      ];
    },
    {
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
        },
      ];
    },
    {
      id: 15;
      name: "wheelSize";
      langtags: ["de", "en", "fr", "es", "it", "hr"];
      columns: [
        {
          id: 0;
          name: "ID";
          kind: "concat";
          multilanguage: false;
          concats: [
            {
              id: 1;
              name: "wheelSize";
              kind: "numeric";
              multilanguage: false;
              index: 0;
            },
            {
              id: 2;
              name: "hasPlusTire";
              kind: "boolean";
              multilanguage: false;
              index: 1;
            },
          ];
          index: 0;
        },
        {
          id: 1;
          name: "wheelSize";
          kind: "numeric";
          multilanguage: false;
          index: 1;
        },
        {
          id: 2;
          name: "hasPlusTire";
          kind: "boolean";
          multilanguage: false;
          index: 2;
        },
      ];
    },
    {
      id: 16;
      name: "fork";
      langtags: ["de", "en", "fr", "es", "it", "hr"];
      columns: [
        {
          id: 0;
          name: "ID";
          kind: "concat";
          multilanguage: true;
          languageType: "language";
          concats: [
            {
              id: 1;
              name: "manufacturer";
              kind: "link";
              multilanguage: false;
              toTable: 5;
              toColumn: {
                id: 1;
                name: "identifier";
                kind: "shorttext";
                multilanguage: false;
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
              index: 0;
            },
            {
              id: 2;
              name: "identifier";
              kind: "shorttext";
              multilanguage: true;
              languageType: "language";
              index: 1;
            },
            {
              id: 3;
              name: "springMedium";
              kind: "link";
              multilanguage: true;
              languageType: "language";
              toTable: 12;
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
              index: 2;
            },
            {
              id: 4;
              name: "forkLength";
              kind: "numeric";
              multilanguage: false;
              index: 3;
            },
          ];
          index: 0;
        },
        {
          id: 1;
          name: "manufacturer";
          kind: "link";
          multilanguage: false;
          toTable: 5;
          toColumn: {
            id: 1;
            name: "identifier";
            kind: "shorttext";
            multilanguage: false;
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
        },
        {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        },
        {
          id: 3;
          name: "springMedium";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 12;
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
          index: 3;
        },
        {
          id: 4;
          name: "forkLength";
          kind: "numeric";
          multilanguage: false;
          index: 4;
        },
        {
          id: 5;
          name: "axle";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 13;
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
          index: 5;
        },
        {
          id: 6;
          name: "steerTube";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 14;
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
          index: 6;
        },
        {
          id: 7;
          name: "lockout";
          kind: "link";
          multilanguage: false;
          toTable: 11;
          toColumn: {
            id: 1;
            name: "identifier";
            kind: "shorttext";
            multilanguage: false;
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
          index: 7;
        },
      ];
    },
    {
      id: 17;
      name: "damper";
      langtags: ["de", "en", "fr", "es", "it", "hr"];
      columns: [
        {
          id: 0;
          name: "ID";
          kind: "concat";
          multilanguage: true;
          languageType: "language";
          concats: [
            {
              id: 1;
              name: "manufacturer";
              kind: "link";
              multilanguage: false;
              toTable: 5;
              toColumn: {
                id: 1;
                name: "identifier";
                kind: "shorttext";
                multilanguage: false;
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
              index: 0;
            },
            {
              id: 2;
              name: "identifier";
              kind: "shorttext";
              multilanguage: true;
              languageType: "language";
              index: 1;
            },
            {
              id: 3;
              name: "springMedium";
              kind: "link";
              multilanguage: true;
              languageType: "language";
              toTable: 12;
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
              index: 2;
            },
          ];
          index: 0;
        },
        {
          id: 1;
          name: "manufacturer";
          kind: "link";
          multilanguage: false;
          toTable: 5;
          toColumn: {
            id: 1;
            name: "identifier";
            kind: "shorttext";
            multilanguage: false;
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
        },
        {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        },
        {
          id: 3;
          name: "springMedium";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 12;
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
          index: 3;
        },
        {
          id: 4;
          name: "lockout";
          kind: "link";
          multilanguage: false;
          toTable: 11;
          toColumn: {
            id: 1;
            name: "identifier";
            kind: "shorttext";
            multilanguage: false;
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
          index: 4;
        },
      ];
    },
    {
      id: 18;
      name: "chainGuide";
      langtags: ["de", "en", "fr", "es", "it", "hr"];
      columns: [
        {
          id: 0;
          name: "ID";
          kind: "concat";
          multilanguage: true;
          languageType: "language";
          concats: [
            {
              id: 1;
              name: "manufacturer";
              kind: "link";
              multilanguage: false;
              toTable: 5;
              toColumn: {
                id: 1;
                name: "identifier";
                kind: "shorttext";
                multilanguage: false;
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
              index: 0;
            },
            {
              id: 2;
              name: "identifier";
              kind: "shorttext";
              multilanguage: true;
              languageType: "language";
              index: 1;
            },
          ];
          index: 0;
        },
        {
          id: 1;
          name: "manufacturer";
          kind: "link";
          multilanguage: false;
          toTable: 5;
          toColumn: {
            id: 1;
            name: "identifier";
            kind: "shorttext";
            multilanguage: false;
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
        },
        {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        },
      ];
    },
    {
      id: 19;
      name: "chainGuard";
      langtags: ["de", "en", "fr", "es", "it", "hr"];
      columns: [
        {
          id: 0;
          name: "ID";
          kind: "concat";
          multilanguage: true;
          languageType: "language";
          concats: [
            {
              id: 1;
              name: "manufacturer";
              kind: "link";
              multilanguage: false;
              toTable: 5;
              toColumn: {
                id: 1;
                name: "identifier";
                kind: "shorttext";
                multilanguage: false;
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
              index: 0;
            },
            {
              id: 2;
              name: "identifier";
              kind: "shorttext";
              multilanguage: true;
              languageType: "language";
              index: 1;
            },
          ];
          index: 0;
        },
        {
          id: 1;
          name: "manufacturer";
          kind: "link";
          multilanguage: false;
          toTable: 5;
          toColumn: {
            id: 1;
            name: "identifier";
            kind: "shorttext";
            multilanguage: false;
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
        },
        {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        },
        {
          id: 3;
          name: "marketingIdentifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 3;
        },
      ];
    },
    {
      id: 20;
      name: "chain";
      langtags: ["de", "en", "fr", "es", "it", "hr"];
      columns: [
        {
          id: 0;
          name: "ID";
          kind: "concat";
          multilanguage: true;
          languageType: "language";
          concats: [
            {
              id: 1;
              name: "manufacturer";
              kind: "link";
              multilanguage: false;
              toTable: 5;
              toColumn: {
                id: 1;
                name: "identifier";
                kind: "shorttext";
                multilanguage: false;
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
              index: 0;
            },
            {
              id: 2;
              name: "identifier";
              kind: "shorttext";
              multilanguage: true;
              languageType: "language";
              index: 1;
            },
          ];
          index: 0;
        },
        {
          id: 1;
          name: "manufacturer";
          kind: "link";
          multilanguage: false;
          toTable: 5;
          toColumn: {
            id: 1;
            name: "identifier";
            kind: "shorttext";
            multilanguage: false;
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
        },
        {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        },
      ];
    },
    {
      id: 21;
      name: "assemblySide";
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
      ];
    },
    {
      id: 22;
      name: "gripWidth";
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
      ];
    },
    {
      id: 23;
      name: "brakeLever";
      langtags: ["de", "en", "fr", "es", "it", "hr"];
      columns: [
        {
          id: 0;
          name: "ID";
          kind: "concat";
          multilanguage: true;
          languageType: "language";
          concats: [
            {
              id: 1;
              name: "manufacturer";
              kind: "link";
              multilanguage: false;
              toTable: 5;
              toColumn: {
                id: 1;
                name: "identifier";
                kind: "shorttext";
                multilanguage: false;
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
              index: 0;
            },
            {
              id: 2;
              name: "identifier";
              kind: "shorttext";
              multilanguage: true;
              languageType: "language";
              index: 1;
            },
            {
              id: 3;
              name: "gripWidth";
              kind: "link";
              multilanguage: true;
              languageType: "language";
              toTable: 22;
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
              index: 2;
            },
            {
              id: 4;
              name: "gripWidthAdjustable";
              kind: "boolean";
              multilanguage: false;
              index: 3;
            },
            {
              id: 7;
              name: "assemblySide";
              kind: "link";
              multilanguage: true;
              languageType: "language";
              toTable: 21;
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
              index: 4;
            },
          ];
          index: 0;
        },
        {
          id: 1;
          name: "manufacturer";
          kind: "link";
          multilanguage: false;
          toTable: 5;
          toColumn: {
            id: 1;
            name: "identifier";
            kind: "shorttext";
            multilanguage: false;
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
        },
        {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        },
        {
          id: 3;
          name: "gripWidth";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 22;
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
          index: 3;
        },
        {
          id: 4;
          name: "gripWidthAdjustable";
          kind: "boolean";
          multilanguage: false;
          index: 4;
        },
        {
          id: 5;
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
          index: 5;
        },
        {
          id: 6;
          name: "marketingColor";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 4;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
              {
                id: 1;
                name: "identifier";
                kind: "shorttext";
                multilanguage: true;
                languageType: "language";
                index: 0;
              },
              {
                id: 5;
                name: "glossGrade";
                kind: "link";
                multilanguage: true;
                languageType: "language";
                toTable: 3;
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
              },
            ];
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
          index: 6;
        },
        {
          id: 7;
          name: "assemblySide";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 21;
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
          index: 7;
        },
      ];
    },
    {
      id: 24;
      name: "brakeKind";
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
      ];
    },
    {
      id: 25;
      name: "brake";
      langtags: ["de", "en", "fr", "es", "it", "hr"];
      columns: [
        {
          id: 0;
          name: "ID";
          kind: "concat";
          multilanguage: true;
          languageType: "language";
          concats: [
            {
              id: 1;
              name: "manufacturer";
              kind: "link";
              multilanguage: false;
              toTable: 5;
              toColumn: {
                id: 1;
                name: "identifier";
                kind: "shorttext";
                multilanguage: false;
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
              index: 0;
            },
            {
              id: 2;
              name: "identifier";
              kind: "shorttext";
              multilanguage: true;
              languageType: "language";
              index: 1;
            },
          ];
          index: 0;
        },
        {
          id: 1;
          name: "manufacturer";
          kind: "link";
          multilanguage: false;
          toTable: 5;
          toColumn: {
            id: 1;
            name: "identifier";
            kind: "shorttext";
            multilanguage: false;
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
        },
        {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        },
        {
          id: 3;
          name: "brakeKind";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 24;
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
          index: 3;
        },
      ];
    },
    {
      id: 26;
      name: "discBrakeSystem";
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
      ];
    },
    {
      id: 27;
      name: "coolingMechanism";
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
      ];
    },
    {
      id: 28;
      name: "brakeDisc";
      langtags: ["de", "en", "fr", "es", "it", "hr"];
      columns: [
        {
          id: 0;
          name: "ID";
          kind: "concat";
          multilanguage: true;
          languageType: "language";
          concats: [
            {
              id: 1;
              name: "manufacturer";
              kind: "link";
              multilanguage: false;
              toTable: 5;
              toColumn: {
                id: 1;
                name: "identifier";
                kind: "shorttext";
                multilanguage: false;
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
              index: 0;
            },
            {
              id: 2;
              name: "identifier";
              kind: "shorttext";
              multilanguage: true;
              languageType: "language";
              index: 1;
            },
          ];
          index: 0;
        },
        {
          id: 1;
          name: "manufacturer";
          kind: "link";
          multilanguage: false;
          toTable: 5;
          toColumn: {
            id: 1;
            name: "identifier";
            kind: "shorttext";
            multilanguage: false;
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
        },
        {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        },
        {
          id: 3;
          name: "discBrakeSystem";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 26;
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
          index: 3;
        },
        {
          id: 4;
          name: "size";
          kind: "numeric";
          multilanguage: false;
          index: 4;
        },
        {
          id: 5;
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
          index: 5;
        },
        {
          id: 6;
          name: "coolingMechanism";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 27;
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
          index: 6;
        },
      ];
    },
    {
      id: 29;
      name: "gearLeverType";
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
      ];
    },
    {
      id: 30;
      name: "gearLever";
      langtags: ["de", "en", "fr", "es", "it", "hr"];
      columns: [
        {
          id: 0;
          name: "ID";
          kind: "concat";
          multilanguage: true;
          languageType: "language";
          concats: [
            {
              id: 1;
              name: "manufacturer";
              kind: "link";
              multilanguage: false;
              toTable: 5;
              toColumn: {
                id: 1;
                name: "identifier";
                kind: "shorttext";
                multilanguage: false;
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
              index: 0;
            },
            {
              id: 2;
              name: "identifier";
              kind: "shorttext";
              multilanguage: true;
              languageType: "language";
              index: 1;
            },
          ];
          index: 0;
        },
        {
          id: 1;
          name: "manufacturer";
          kind: "link";
          multilanguage: false;
          toTable: 5;
          toColumn: {
            id: 1;
            name: "identifier";
            kind: "shorttext";
            multilanguage: false;
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
        },
        {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        },
        {
          id: 3;
          name: "gearLeverType";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 29;
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
          index: 3;
        },
        {
          id: 4;
          name: "isElectronic";
          kind: "boolean";
          multilanguage: false;
          index: 4;
        },
      ];
    },
    {
      id: 31;
      name: "derailleurType";
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
      ];
    },
    {
      id: 32;
      name: "derailleur";
      langtags: ["de", "en", "fr", "es", "it", "hr"];
      columns: [
        {
          id: 0;
          name: "ID";
          kind: "concat";
          multilanguage: true;
          languageType: "language";
          concats: [
            {
              id: 1;
              name: "manufacturer";
              kind: "link";
              multilanguage: false;
              toTable: 5;
              toColumn: {
                id: 1;
                name: "identifier";
                kind: "shorttext";
                multilanguage: false;
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
              index: 0;
            },
            {
              id: 2;
              name: "identifier";
              kind: "shorttext";
              multilanguage: true;
              languageType: "language";
              index: 1;
            },
            {
              id: 3;
              name: "derailleurType";
              kind: "link";
              multilanguage: true;
              languageType: "language";
              toTable: 31;
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
              index: 2;
            },
          ];
          index: 0;
        },
        {
          id: 1;
          name: "manufacturer";
          kind: "link";
          multilanguage: false;
          toTable: 5;
          toColumn: {
            id: 1;
            name: "identifier";
            kind: "shorttext";
            multilanguage: false;
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
        },
        {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        },
        {
          id: 3;
          name: "derailleurType";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 31;
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
          index: 3;
        },
        {
          id: 4;
          name: "isElectronic";
          kind: "boolean";
          multilanguage: false;
          index: 4;
        },
      ];
    },
    {
      id: 33;
      name: "rearDerailleur";
      langtags: ["de", "en", "fr", "es", "it", "hr"];
      columns: [
        {
          id: 0;
          name: "ID";
          kind: "concat";
          multilanguage: true;
          languageType: "language";
          concats: [
            {
              id: 1;
              name: "manufacturer";
              kind: "link";
              multilanguage: false;
              toTable: 5;
              toColumn: {
                id: 1;
                name: "identifier";
                kind: "shorttext";
                multilanguage: false;
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
              index: 0;
            },
            {
              id: 2;
              name: "identifier";
              kind: "shorttext";
              multilanguage: true;
              languageType: "language";
              index: 1;
            },
          ];
          index: 0;
        },
        {
          id: 1;
          name: "manufacturer";
          kind: "link";
          multilanguage: false;
          toTable: 5;
          toColumn: {
            id: 1;
            name: "identifier";
            kind: "shorttext";
            multilanguage: false;
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
        },
        {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        },
        {
          id: 3;
          name: "isElectronic";
          kind: "boolean";
          multilanguage: false;
          index: 3;
        },
      ];
    },
    {
      id: 34;
      name: "gearHub";
      langtags: ["de", "en", "fr", "es", "it", "hr"];
      columns: [
        {
          id: 0;
          name: "ID";
          kind: "concat";
          multilanguage: true;
          languageType: "language";
          concats: [
            {
              id: 1;
              name: "manufacturer";
              kind: "link";
              multilanguage: false;
              toTable: 5;
              toColumn: {
                id: 1;
                name: "identifier";
                kind: "shorttext";
                multilanguage: false;
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
              index: 0;
            },
            {
              id: 2;
              name: "identifier";
              kind: "shorttext";
              multilanguage: true;
              languageType: "language";
              index: 1;
            },
          ];
          index: 0;
        },
        {
          id: 1;
          name: "manufacturer";
          kind: "link";
          multilanguage: false;
          toTable: 5;
          toColumn: {
            id: 1;
            name: "identifier";
            kind: "shorttext";
            multilanguage: false;
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
        },
        {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        },
        {
          id: 3;
          name: "isElectronic";
          kind: "boolean";
          multilanguage: false;
          index: 3;
        },
      ];
    },
    {
      id: 35;
      name: "cassette";
      langtags: ["de", "en", "fr", "es", "it", "hr"];
      columns: [
        {
          id: 0;
          name: "ID";
          kind: "concat";
          multilanguage: true;
          languageType: "language";
          concats: [
            {
              id: 1;
              name: "manufacturer";
              kind: "link";
              multilanguage: false;
              toTable: 5;
              toColumn: {
                id: 1;
                name: "identifier";
                kind: "shorttext";
                multilanguage: false;
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
              index: 0;
            },
            {
              id: 2;
              name: "identifier";
              kind: "shorttext";
              multilanguage: true;
              languageType: "language";
              index: 1;
            },
            {
              id: 3;
              name: "numberOfGears";
              kind: "numeric";
              multilanguage: false;
              index: 2;
            },
          ];
          index: 0;
        },
        {
          id: 1;
          name: "manufacturer";
          kind: "link";
          multilanguage: false;
          toTable: 5;
          toColumn: {
            id: 1;
            name: "identifier";
            kind: "shorttext";
            multilanguage: false;
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
        },
        {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        },
        {
          id: 3;
          name: "numberOfGears";
          kind: "numeric";
          multilanguage: false;
          index: 3;
        },
        {
          id: 4;
          name: "numberOfTeethMin";
          kind: "numeric";
          multilanguage: false;
          index: 4;
        },
        {
          id: 5;
          name: "numberOfTeethMax";
          kind: "numeric";
          multilanguage: false;
          index: 5;
        },
        {
          id: 6;
          name: "marketingColor";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 4;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
              {
                id: 1;
                name: "identifier";
                kind: "shorttext";
                multilanguage: true;
                languageType: "language";
                index: 0;
              },
              {
                id: 5;
                name: "glossGrade";
                kind: "link";
                multilanguage: true;
                languageType: "language";
                toTable: 3;
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
              },
            ];
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
          index: 6;
        },
      ];
    },
    {
      id: 36;
      name: "sprocket";
      langtags: ["de", "en", "fr", "es", "it", "hr"];
      columns: [
        {
          id: 0;
          name: "ID";
          kind: "concat";
          multilanguage: true;
          languageType: "language";
          concats: [
            {
              id: 1;
              name: "manufacturer";
              kind: "link";
              multilanguage: false;
              toTable: 5;
              toColumn: {
                id: 1;
                name: "identifier";
                kind: "shorttext";
                multilanguage: false;
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
              index: 0;
            },
            {
              id: 2;
              name: "identifier";
              kind: "shorttext";
              multilanguage: true;
              languageType: "language";
              index: 1;
            },
            {
              id: 3;
              name: "numberOfTeeth";
              kind: "numeric";
              multilanguage: false;
              index: 2;
            },
          ];
          index: 0;
        },
        {
          id: 1;
          name: "manufacturer";
          kind: "link";
          multilanguage: false;
          toTable: 5;
          toColumn: {
            id: 1;
            name: "identifier";
            kind: "shorttext";
            multilanguage: false;
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
        },
        {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        },
        {
          id: 3;
          name: "numberOfTeeth";
          kind: "numeric";
          multilanguage: false;
          index: 3;
        },
        {
          id: 4;
          name: "marketingColor";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 4;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
              {
                id: 1;
                name: "identifier";
                kind: "shorttext";
                multilanguage: true;
                languageType: "language";
                index: 0;
              },
              {
                id: 5;
                name: "glossGrade";
                kind: "link";
                multilanguage: true;
                languageType: "language";
                toTable: 3;
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
              },
            ];
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
          index: 4;
        },
      ];
    },
    {
      id: 37;
      name: "crankset";
      langtags: ["de", "en", "fr", "es", "it", "hr"];
      columns: [
        {
          id: 0;
          name: "ID";
          kind: "concat";
          multilanguage: true;
          languageType: "language";
          concats: [
            {
              id: 1;
              name: "manufacturer";
              kind: "link";
              multilanguage: false;
              toTable: 5;
              toColumn: {
                id: 1;
                name: "identifier";
                kind: "shorttext";
                multilanguage: false;
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
              index: 0;
            },
            {
              id: 2;
              name: "identifier";
              kind: "shorttext";
              multilanguage: true;
              languageType: "language";
              index: 1;
            },
            {
              id: 4;
              name: "numberOfTeethLarge";
              kind: "numeric";
              multilanguage: false;
              index: 2;
            },
            {
              id: 5;
              name: "numberOfTeethMedium";
              kind: "numeric";
              multilanguage: false;
              index: 3;
            },
            {
              id: 6;
              name: "numberOfTeethSmall";
              kind: "numeric";
              multilanguage: false;
              index: 4;
            },
          ];
          index: 0;
        },
        {
          id: 1;
          name: "manufacturer";
          kind: "link";
          multilanguage: false;
          toTable: 5;
          toColumn: {
            id: 1;
            name: "identifier";
            kind: "shorttext";
            multilanguage: false;
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
        },
        {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        },
        {
          id: 3;
          name: "marketingIdentifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 3;
        },
        {
          id: 4;
          name: "numberOfTeethLarge";
          kind: "numeric";
          multilanguage: false;
          index: 4;
        },
        {
          id: 5;
          name: "numberOfTeethMedium";
          kind: "numeric";
          multilanguage: false;
          index: 5;
        },
        {
          id: 6;
          name: "numberOfTeethSmall";
          kind: "numeric";
          multilanguage: false;
          index: 6;
        },
        {
          id: 7;
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
          index: 7;
        },
        {
          id: 8;
          name: "marketingColor";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 4;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
              {
                id: 1;
                name: "identifier";
                kind: "shorttext";
                multilanguage: true;
                languageType: "language";
                index: 0;
              },
              {
                id: 5;
                name: "glossGrade";
                kind: "link";
                multilanguage: true;
                languageType: "language";
                toTable: 3;
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
              },
            ];
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
          index: 8;
        },
      ];
    },
    {
      id: 38;
      name: "spider";
      langtags: ["de", "en", "fr", "es", "it", "hr"];
      columns: [
        {
          id: 0;
          name: "ID";
          kind: "concat";
          multilanguage: true;
          languageType: "language";
          concats: [
            {
              id: 1;
              name: "manufacturer";
              kind: "link";
              multilanguage: false;
              toTable: 5;
              toColumn: {
                id: 1;
                name: "identifier";
                kind: "shorttext";
                multilanguage: false;
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
              index: 0;
            },
            {
              id: 2;
              name: "identifier";
              kind: "shorttext";
              multilanguage: true;
              languageType: "language";
              index: 1;
            },
            {
              id: 3;
              name: "offset";
              kind: "numeric";
              multilanguage: false;
              index: 2;
            },
            {
              id: 4;
              name: "marketingColor";
              kind: "link";
              multilanguage: true;
              languageType: "language";
              toTable: 4;
              toColumn: {
                id: 0;
                name: "ID";
                kind: "concat";
                multilanguage: true;
                languageType: "language";
                concats: [
                  {
                    id: 1;
                    name: "identifier";
                    kind: "shorttext";
                    multilanguage: true;
                    languageType: "language";
                    index: 0;
                  },
                  {
                    id: 5;
                    name: "glossGrade";
                    kind: "link";
                    multilanguage: true;
                    languageType: "language";
                    toTable: 3;
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
                  },
                ];
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
              index: 3;
            },
          ];
          index: 0;
        },
        {
          id: 1;
          name: "manufacturer";
          kind: "link";
          multilanguage: false;
          toTable: 5;
          toColumn: {
            id: 1;
            name: "identifier";
            kind: "shorttext";
            multilanguage: false;
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
        },
        {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        },
        {
          id: 3;
          name: "offset";
          kind: "numeric";
          multilanguage: false;
          index: 3;
        },
        {
          id: 4;
          name: "marketingColor";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 4;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
              {
                id: 1;
                name: "identifier";
                kind: "shorttext";
                multilanguage: true;
                languageType: "language";
                index: 0;
              },
              {
                id: 5;
                name: "glossGrade";
                kind: "link";
                multilanguage: true;
                languageType: "language";
                toTable: 3;
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
              },
            ];
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
          index: 4;
        },
      ];
    },
    {
      id: 39;
      name: "chainRing";
      langtags: ["de", "en", "fr", "es", "it", "hr"];
      columns: [
        {
          id: 0;
          name: "ID";
          kind: "concat";
          multilanguage: true;
          languageType: "language";
          concats: [
            {
              id: 1;
              name: "manufacturer";
              kind: "link";
              multilanguage: false;
              toTable: 5;
              toColumn: {
                id: 1;
                name: "identifier";
                kind: "shorttext";
                multilanguage: false;
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
              index: 0;
            },
            {
              id: 2;
              name: "identifier";
              kind: "shorttext";
              multilanguage: true;
              languageType: "language";
              index: 1;
            },
          ];
          index: 0;
        },
        {
          id: 1;
          name: "manufacturer";
          kind: "link";
          multilanguage: false;
          toTable: 5;
          toColumn: {
            id: 1;
            name: "identifier";
            kind: "shorttext";
            multilanguage: false;
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
        },
        {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        },
        {
          id: 3;
          name: "numberOfTeethMin";
          kind: "numeric";
          multilanguage: false;
          index: 3;
        },
        {
          id: 4;
          name: "numberOfTeethMax";
          kind: "numeric";
          multilanguage: false;
          index: 4;
        },
        {
          id: 5;
          name: "spider";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 38;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
              {
                id: 1;
                name: "manufacturer";
                kind: "link";
                multilanguage: false;
                toTable: 5;
                toColumn: {
                  id: 1;
                  name: "identifier";
                  kind: "shorttext";
                  multilanguage: false;
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
                index: 0;
              },
              {
                id: 2;
                name: "identifier";
                kind: "shorttext";
                multilanguage: true;
                languageType: "language";
                index: 1;
              },
              {
                id: 3;
                name: "offset";
                kind: "numeric";
                multilanguage: false;
                index: 2;
              },
              {
                id: 4;
                name: "marketingColor";
                kind: "link";
                multilanguage: true;
                languageType: "language";
                toTable: 4;
                toColumn: {
                  id: 0;
                  name: "ID";
                  kind: "concat";
                  multilanguage: true;
                  languageType: "language";
                  concats: [
                    {
                      id: 1;
                      name: "identifier";
                      kind: "shorttext";
                      multilanguage: true;
                      languageType: "language";
                      index: 0;
                    },
                    {
                      id: 5;
                      name: "glossGrade";
                      kind: "link";
                      multilanguage: true;
                      languageType: "language";
                      toTable: 3;
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
                    },
                  ];
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
                index: 3;
              },
            ];
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
          index: 5;
        },
        {
          id: 6;
          name: "marketingColor";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 4;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
              {
                id: 1;
                name: "identifier";
                kind: "shorttext";
                multilanguage: true;
                languageType: "language";
                index: 0;
              },
              {
                id: 5;
                name: "glossGrade";
                kind: "link";
                multilanguage: true;
                languageType: "language";
                toTable: 3;
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
              },
            ];
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
          index: 6;
        },
      ];
    },
    {
      id: 40;
      name: "crankAdmission";
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
      ];
    },
    {
      id: 41;
      name: "crankArms";
      langtags: ["de", "en", "fr", "es", "it", "hr"];
      columns: [
        {
          id: 0;
          name: "ID";
          kind: "concat";
          multilanguage: true;
          languageType: "language";
          concats: [
            {
              id: 1;
              name: "manufacturer";
              kind: "link";
              multilanguage: false;
              toTable: 5;
              toColumn: {
                id: 1;
                name: "identifier";
                kind: "shorttext";
                multilanguage: false;
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
              index: 0;
            },
            {
              id: 2;
              name: "identifier";
              kind: "shorttext";
              multilanguage: true;
              languageType: "language";
              index: 1;
            },
          ];
          index: 0;
        },
        {
          id: 1;
          name: "manufacturer";
          kind: "link";
          multilanguage: false;
          toTable: 5;
          toColumn: {
            id: 1;
            name: "identifier";
            kind: "shorttext";
            multilanguage: false;
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
        },
        {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        },
        {
          id: 3;
          name: "marketingIdentifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 3;
        },
        {
          id: 4;
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
          index: 4;
        },
        {
          id: 5;
          name: "crankAdmission";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 40;
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
          index: 5;
        },
        {
          id: 6;
          name: "marketingColor";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 4;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
              {
                id: 1;
                name: "identifier";
                kind: "shorttext";
                multilanguage: true;
                languageType: "language";
                index: 0;
              },
              {
                id: 5;
                name: "glossGrade";
                kind: "link";
                multilanguage: true;
                languageType: "language";
                toTable: 3;
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
              },
            ];
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
          index: 6;
        },
      ];
    },
    {
      id: 42;
      name: "bottomBracketSystem";
      langtags: ["de", "en", "fr", "es", "it", "hr"];
      columns: [
        {
          id: 1;
          name: "identifier";
          kind: "shorttext";
          multilanguage: false;
          index: 0;
        },
      ];
    },
    {
      id: 43;
      name: "bottomBracket";
      langtags: ["de", "en", "fr", "es", "it", "hr"];
      columns: [
        {
          id: 0;
          name: "ID";
          kind: "concat";
          multilanguage: true;
          languageType: "language";
          concats: [
            {
              id: 1;
              name: "manufacturer";
              kind: "link";
              multilanguage: false;
              toTable: 5;
              toColumn: {
                id: 1;
                name: "identifier";
                kind: "shorttext";
                multilanguage: false;
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
              index: 0;
            },
            {
              id: 2;
              name: "identifier";
              kind: "shorttext";
              multilanguage: true;
              languageType: "language";
              index: 1;
            },
            {
              id: 3;
              name: "bottomBracketSystem";
              kind: "link";
              multilanguage: false;
              toTable: 42;
              toColumn: {
                id: 1;
                name: "identifier";
                kind: "shorttext";
                multilanguage: false;
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
              index: 2;
            },
            {
              id: 4;
              name: "axleLength";
              kind: "numeric";
              multilanguage: false;
              index: 3;
            },
          ];
          index: 0;
        },
        {
          id: 1;
          name: "manufacturer";
          kind: "link";
          multilanguage: false;
          toTable: 5;
          toColumn: {
            id: 1;
            name: "identifier";
            kind: "shorttext";
            multilanguage: false;
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
        },
        {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        },
        {
          id: 3;
          name: "bottomBracketSystem";
          kind: "link";
          multilanguage: false;
          toTable: 42;
          toColumn: {
            id: 1;
            name: "identifier";
            kind: "shorttext";
            multilanguage: false;
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
          index: 3;
        },
        {
          id: 4;
          name: "axleLength";
          kind: "numeric";
          multilanguage: false;
          index: 4;
        },
        {
          id: 5;
          name: "crankAdmission";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 40;
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
          index: 5;
        },
      ];
    },
    {
      id: 44;
      name: "systemWheelSet";
      langtags: ["de", "en", "fr", "es", "it", "hr"];
      columns: [
        {
          id: 0;
          name: "ID";
          kind: "concat";
          multilanguage: true;
          languageType: "language";
          concats: [
            {
              id: 1;
              name: "manufacturer";
              kind: "link";
              multilanguage: false;
              toTable: 5;
              toColumn: {
                id: 1;
                name: "identifier";
                kind: "shorttext";
                multilanguage: false;
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
              index: 0;
            },
            {
              id: 2;
              name: "identifier";
              kind: "shorttext";
              multilanguage: true;
              languageType: "language";
              index: 1;
            },
          ];
          index: 0;
        },
        {
          id: 1;
          name: "manufacturer";
          kind: "link";
          multilanguage: false;
          toTable: 5;
          toColumn: {
            id: 1;
            name: "identifier";
            kind: "shorttext";
            multilanguage: false;
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
        },
        {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        },
        {
          id: 3;
          name: "isTubeless";
          kind: "boolean";
          multilanguage: false;
          index: 3;
        },
        {
          id: 4;
          name: "isTubelessReady";
          kind: "boolean";
          multilanguage: false;
          index: 4;
        },
        {
          id: 5;
          name: "isBoost";
          kind: "boolean";
          multilanguage: false;
          index: 5;
        },
        {
          id: 6;
          name: "marketingColor";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 4;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
              {
                id: 1;
                name: "identifier";
                kind: "shorttext";
                multilanguage: true;
                languageType: "language";
                index: 0;
              },
              {
                id: 5;
                name: "glossGrade";
                kind: "link";
                multilanguage: true;
                languageType: "language";
                toTable: 3;
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
              },
            ];
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
          index: 6;
        },
      ];
    },
    {
      id: 45;
      name: "frontWheelHub";
      langtags: ["de", "en", "fr", "es", "it", "hr"];
      columns: [
        {
          id: 0;
          name: "ID";
          kind: "concat";
          multilanguage: true;
          languageType: "language";
          concats: [
            {
              id: 1;
              name: "manufacturer";
              kind: "link";
              multilanguage: false;
              toTable: 5;
              toColumn: {
                id: 1;
                name: "identifier";
                kind: "shorttext";
                multilanguage: false;
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
              index: 0;
            },
            {
              id: 2;
              name: "identifier";
              kind: "shorttext";
              multilanguage: true;
              languageType: "language";
              index: 1;
            },
          ];
          index: 0;
        },
        {
          id: 1;
          name: "manufacturer";
          kind: "link";
          multilanguage: false;
          toTable: 5;
          toColumn: {
            id: 1;
            name: "identifier";
            kind: "shorttext";
            multilanguage: false;
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
        },
        {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        },
        {
          id: 3;
          name: "discBrakeSystem";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 26;
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
          index: 3;
        },
        {
          id: 4;
          name: "isBoost";
          kind: "boolean";
          multilanguage: false;
          index: 4;
        },
        {
          id: 5;
          name: "marketingColor";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 4;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
              {
                id: 1;
                name: "identifier";
                kind: "shorttext";
                multilanguage: true;
                languageType: "language";
                index: 0;
              },
              {
                id: 5;
                name: "glossGrade";
                kind: "link";
                multilanguage: true;
                languageType: "language";
                toTable: 3;
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
              },
            ];
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
          index: 5;
        },
      ];
    },
    {
      id: 46;
      name: "freeWheel";
      langtags: ["de", "en", "fr", "es", "it", "hr"];
      columns: [
        {
          id: 0;
          name: "ID";
          kind: "concat";
          multilanguage: true;
          languageType: "language";
          concats: [
            {
              id: 1;
              name: "manufacturer";
              kind: "link";
              multilanguage: false;
              toTable: 5;
              toColumn: {
                id: 1;
                name: "identifier";
                kind: "shorttext";
                multilanguage: false;
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
              index: 0;
            },
            {
              id: 2;
              name: "identifier";
              kind: "shorttext";
              multilanguage: true;
              languageType: "language";
              index: 1;
            },
          ];
          index: 0;
        },
        {
          id: 1;
          name: "manufacturer";
          kind: "link";
          multilanguage: false;
          toTable: 5;
          toColumn: {
            id: 1;
            name: "identifier";
            kind: "shorttext";
            multilanguage: false;
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
        },
        {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        },
      ];
    },
    {
      id: 47;
      name: "axleStandard";
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
      ];
    },
    {
      id: 48;
      name: "rearWheelHub";
      langtags: ["de", "en", "fr", "es", "it", "hr"];
      columns: [
        {
          id: 0;
          name: "ID";
          kind: "concat";
          multilanguage: true;
          languageType: "language";
          concats: [
            {
              id: 1;
              name: "manufacturer";
              kind: "link";
              multilanguage: false;
              toTable: 5;
              toColumn: {
                id: 1;
                name: "identifier";
                kind: "shorttext";
                multilanguage: false;
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
              index: 0;
            },
            {
              id: 2;
              name: "identifier";
              kind: "shorttext";
              multilanguage: true;
              languageType: "language";
              index: 1;
            },
          ];
          index: 0;
        },
        {
          id: 1;
          name: "manufacturer";
          kind: "link";
          multilanguage: false;
          toTable: 5;
          toColumn: {
            id: 1;
            name: "identifier";
            kind: "shorttext";
            multilanguage: false;
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
        },
        {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        },
        {
          id: 3;
          name: "discBrakeSystem";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 26;
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
          index: 3;
        },
        {
          id: 4;
          name: "axleStandard";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 47;
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
          index: 4;
        },
        {
          id: 5;
          name: "freeWheel";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 46;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
              {
                id: 1;
                name: "manufacturer";
                kind: "link";
                multilanguage: false;
                toTable: 5;
                toColumn: {
                  id: 1;
                  name: "identifier";
                  kind: "shorttext";
                  multilanguage: false;
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
                index: 0;
              },
              {
                id: 2;
                name: "identifier";
                kind: "shorttext";
                multilanguage: true;
                languageType: "language";
                index: 1;
              },
            ];
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
          index: 5;
        },
        {
          id: 6;
          name: "isBoost";
          kind: "boolean";
          multilanguage: false;
          index: 6;
        },
        {
          id: 7;
          name: "marketingColor";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 4;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
              {
                id: 1;
                name: "identifier";
                kind: "shorttext";
                multilanguage: true;
                languageType: "language";
                index: 0;
              },
              {
                id: 5;
                name: "glossGrade";
                kind: "link";
                multilanguage: true;
                languageType: "language";
                toTable: 3;
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
              },
            ];
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
          index: 7;
        },
      ];
    },
    {
      id: 49;
      name: "rim";
      langtags: ["de", "en", "fr", "es", "it", "hr"];
      columns: [
        {
          id: 0;
          name: "ID";
          kind: "concat";
          multilanguage: true;
          languageType: "language";
          concats: [
            {
              id: 1;
              name: "manufacturer";
              kind: "link";
              multilanguage: false;
              toTable: 5;
              toColumn: {
                id: 1;
                name: "identifier";
                kind: "shorttext";
                multilanguage: false;
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
              index: 0;
            },
            {
              id: 2;
              name: "identifier";
              kind: "shorttext";
              multilanguage: true;
              languageType: "language";
              index: 1;
            },
          ];
          index: 0;
        },
        {
          id: 1;
          name: "manufacturer";
          kind: "link";
          multilanguage: false;
          toTable: 5;
          toColumn: {
            id: 1;
            name: "identifier";
            kind: "shorttext";
            multilanguage: false;
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
        },
        {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        },
        {
          id: 3;
          name: "hasEyelets";
          kind: "boolean";
          multilanguage: false;
          index: 3;
        },
        {
          id: 4;
          name: "hasDoubleWall";
          kind: "boolean";
          multilanguage: false;
          index: 4;
        },
        {
          id: 5;
          name: "isTubelessReady";
          kind: "boolean";
          multilanguage: false;
          index: 5;
        },
        {
          id: 6;
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
          index: 6;
        },
      ];
    },
    {
      id: 50;
      name: "spokes";
      langtags: ["de", "en", "fr", "es", "it", "hr"];
      columns: [
        {
          id: 0;
          name: "ID";
          kind: "concat";
          multilanguage: true;
          languageType: "language";
          concats: [
            {
              id: 1;
              name: "manufacturer";
              kind: "link";
              multilanguage: false;
              toTable: 5;
              toColumn: {
                id: 1;
                name: "identifier";
                kind: "shorttext";
                multilanguage: false;
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
              index: 0;
            },
            {
              id: 2;
              name: "identifier";
              kind: "shorttext";
              multilanguage: true;
              languageType: "language";
              index: 1;
            },
          ];
          index: 0;
        },
        {
          id: 1;
          name: "manufacturer";
          kind: "link";
          multilanguage: false;
          toTable: 5;
          toColumn: {
            id: 1;
            name: "identifier";
            kind: "shorttext";
            multilanguage: false;
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
        },
        {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        },
        {
          id: 3;
          name: "marketingColor";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 4;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
              {
                id: 1;
                name: "identifier";
                kind: "shorttext";
                multilanguage: true;
                languageType: "language";
                index: 0;
              },
              {
                id: 5;
                name: "glossGrade";
                kind: "link";
                multilanguage: true;
                languageType: "language";
                toTable: 3;
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
              },
            ];
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
          index: 3;
        },
      ];
    },
    {
      id: 51;
      name: "wheelSet";
      langtags: ["de", "en", "fr", "es", "it", "hr"];
      columns: [
        {
          id: 1;
          name: "internalName";
          kind: "shorttext";
          multilanguage: false;
          index: 0;
        },
        {
          id: 2;
          name: "frontWheelHub";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 45;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
              {
                id: 1;
                name: "manufacturer";
                kind: "link";
                multilanguage: false;
                toTable: 5;
                toColumn: {
                  id: 1;
                  name: "identifier";
                  kind: "shorttext";
                  multilanguage: false;
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
                index: 0;
              },
              {
                id: 2;
                name: "identifier";
                kind: "shorttext";
                multilanguage: true;
                languageType: "language";
                index: 1;
              },
            ];
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
        },
        {
          id: 3;
          name: "rearWheelHub";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 48;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
              {
                id: 1;
                name: "manufacturer";
                kind: "link";
                multilanguage: false;
                toTable: 5;
                toColumn: {
                  id: 1;
                  name: "identifier";
                  kind: "shorttext";
                  multilanguage: false;
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
                index: 0;
              },
              {
                id: 2;
                name: "identifier";
                kind: "shorttext";
                multilanguage: true;
                languageType: "language";
                index: 1;
              },
            ];
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
          index: 2;
        },
        {
          id: 4;
          name: "frontRim";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 49;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
              {
                id: 1;
                name: "manufacturer";
                kind: "link";
                multilanguage: false;
                toTable: 5;
                toColumn: {
                  id: 1;
                  name: "identifier";
                  kind: "shorttext";
                  multilanguage: false;
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
                index: 0;
              },
              {
                id: 2;
                name: "identifier";
                kind: "shorttext";
                multilanguage: true;
                languageType: "language";
                index: 1;
              },
            ];
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
          index: 3;
        },
        {
          id: 5;
          name: "rearRim";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 49;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
              {
                id: 1;
                name: "manufacturer";
                kind: "link";
                multilanguage: false;
                toTable: 5;
                toColumn: {
                  id: 1;
                  name: "identifier";
                  kind: "shorttext";
                  multilanguage: false;
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
                index: 0;
              },
              {
                id: 2;
                name: "identifier";
                kind: "shorttext";
                multilanguage: true;
                languageType: "language";
                index: 1;
              },
            ];
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
          index: 4;
        },
        {
          id: 6;
          name: "spokes";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 50;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
              {
                id: 1;
                name: "manufacturer";
                kind: "link";
                multilanguage: false;
                toTable: 5;
                toColumn: {
                  id: 1;
                  name: "identifier";
                  kind: "shorttext";
                  multilanguage: false;
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
                index: 0;
              },
              {
                id: 2;
                name: "identifier";
                kind: "shorttext";
                multilanguage: true;
                languageType: "language";
                index: 1;
              },
            ];
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
          index: 5;
        },
        {
          id: 7;
          name: "numberOfSpokes";
          kind: "numeric";
          multilanguage: false;
          index: 6;
        },
        {
          id: 8;
          name: "spokesLengthFrontLeft";
          kind: "numeric";
          multilanguage: false;
          index: 7;
        },
        {
          id: 9;
          name: "spokesLengthFrontRight";
          kind: "numeric";
          multilanguage: false;
          index: 8;
        },
        {
          id: 10;
          name: "spokesLengthRearLeft";
          kind: "numeric";
          multilanguage: false;
          index: 9;
        },
        {
          id: 11;
          name: "spokesLengthRearRight";
          kind: "numeric";
          multilanguage: false;
          index: 10;
        },
      ];
    },
    {
      id: 52;
      name: "tire";
      langtags: ["de", "en", "fr", "es", "it", "hr"];
      columns: [
        {
          id: 0;
          name: "ID";
          kind: "concat";
          multilanguage: true;
          languageType: "language";
          concats: [
            {
              id: 1;
              name: "manufacturer";
              kind: "link";
              multilanguage: false;
              toTable: 5;
              toColumn: {
                id: 1;
                name: "identifier";
                kind: "shorttext";
                multilanguage: false;
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
              index: 0;
            },
            {
              id: 2;
              name: "identifier";
              kind: "shorttext";
              multilanguage: true;
              languageType: "language";
              index: 1;
            },
            {
              id: 3;
              name: "sizeEtrto";
              kind: "shorttext";
              multilanguage: false;
              index: 2;
            },
          ];
          index: 0;
        },
        {
          id: 1;
          name: "manufacturer";
          kind: "link";
          multilanguage: false;
          toTable: 5;
          toColumn: {
            id: 1;
            name: "identifier";
            kind: "shorttext";
            multilanguage: false;
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
        },
        {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        },
        {
          id: 3;
          name: "sizeEtrto";
          kind: "shorttext";
          multilanguage: false;
          index: 3;
        },
        {
          id: 4;
          name: "sizeDiameterInch";
          kind: "link";
          multilanguage: false;
          toTable: 15;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: false;
            concats: [
              {
                id: 1;
                name: "wheelSize";
                kind: "numeric";
                multilanguage: false;
                index: 0;
              },
              {
                id: 2;
                name: "hasPlusTire";
                kind: "boolean";
                multilanguage: false;
                index: 1;
              },
            ];
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
          index: 4;
        },
        {
          id: 5;
          name: "sizeWidthInch";
          kind: "numeric";
          multilanguage: false;
          index: 5;
        },
        {
          id: 6;
          name: "punctureProtection";
          kind: "boolean";
          multilanguage: false;
          index: 6;
        },
        {
          id: 7;
          name: "hasReflectiveStrips";
          kind: "boolean";
          multilanguage: false;
          index: 7;
        },
        {
          id: 8;
          name: "isCollapsible";
          kind: "boolean";
          multilanguage: false;
          index: 8;
        },
      ];
    },
    {
      id: 53;
      name: "valve";
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
      ];
    },
    {
      id: 54;
      name: "tube";
      langtags: ["de", "en", "fr", "es", "it", "hr"];
      columns: [
        {
          id: 0;
          name: "ID";
          kind: "concat";
          multilanguage: true;
          languageType: "language";
          concats: [
            {
              id: 1;
              name: "manufacturer";
              kind: "link";
              multilanguage: false;
              toTable: 5;
              toColumn: {
                id: 1;
                name: "identifier";
                kind: "shorttext";
                multilanguage: false;
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
              index: 0;
            },
            {
              id: 2;
              name: "identifier";
              kind: "shorttext";
              multilanguage: true;
              languageType: "language";
              index: 1;
            },
          ];
          index: 0;
        },
        {
          id: 1;
          name: "manufacturer";
          kind: "link";
          multilanguage: false;
          toTable: 5;
          toColumn: {
            id: 1;
            name: "identifier";
            kind: "shorttext";
            multilanguage: false;
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
        },
        {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        },
        {
          id: 3;
          name: "valve";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 53;
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
          index: 3;
        },
      ];
    },
    {
      id: 55;
      name: "grips";
      langtags: ["de", "en", "fr", "es", "it", "hr"];
      columns: [
        {
          id: 0;
          name: "ID";
          kind: "concat";
          multilanguage: true;
          languageType: "language";
          concats: [
            {
              id: 1;
              name: "manufacturer";
              kind: "link";
              multilanguage: false;
              toTable: 5;
              toColumn: {
                id: 1;
                name: "identifier";
                kind: "shorttext";
                multilanguage: false;
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
              index: 0;
            },
            {
              id: 2;
              name: "identifier";
              kind: "shorttext";
              multilanguage: true;
              languageType: "language";
              index: 1;
            },
          ];
          index: 0;
        },
        {
          id: 1;
          name: "manufacturer";
          kind: "link";
          multilanguage: false;
          toTable: 5;
          toColumn: {
            id: 1;
            name: "identifier";
            kind: "shorttext";
            multilanguage: false;
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
        },
        {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        },
        {
          id: 3;
          name: "marketingIdentifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 3;
        },
        {
          id: 4;
          name: "lengthLeft";
          kind: "numeric";
          multilanguage: false;
          index: 4;
        },
        {
          id: 5;
          name: "lengthRight";
          kind: "numeric";
          multilanguage: false;
          index: 5;
        },
        {
          id: 6;
          name: "marketingColor";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 4;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
              {
                id: 1;
                name: "identifier";
                kind: "shorttext";
                multilanguage: true;
                languageType: "language";
                index: 0;
              },
              {
                id: 5;
                name: "glossGrade";
                kind: "link";
                multilanguage: true;
                languageType: "language";
                toTable: 3;
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
              },
            ];
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
          index: 6;
        },
      ];
    },
    {
      id: 56;
      name: "handlebar";
      langtags: ["de", "en", "fr", "es", "it", "hr"];
      columns: [
        {
          id: 0;
          name: "ID";
          kind: "concat";
          multilanguage: true;
          languageType: "language";
          concats: [
            {
              id: 1;
              name: "manufacturer";
              kind: "link";
              multilanguage: false;
              toTable: 5;
              toColumn: {
                id: 1;
                name: "identifier";
                kind: "shorttext";
                multilanguage: false;
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
              index: 0;
            },
            {
              id: 2;
              name: "identifier";
              kind: "shorttext";
              multilanguage: true;
              languageType: "language";
              index: 1;
            },
          ];
          index: 0;
        },
        {
          id: 1;
          name: "manufacturer";
          kind: "link";
          multilanguage: false;
          toTable: 5;
          toColumn: {
            id: 1;
            name: "identifier";
            kind: "shorttext";
            multilanguage: false;
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
        },
        {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        },
        {
          id: 3;
          name: "marketingIdentifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 3;
        },
        {
          id: 4;
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
          index: 4;
        },
        {
          id: 5;
          name: "rise";
          kind: "numeric";
          multilanguage: false;
          index: 5;
        },
        {
          id: 6;
          name: "backSweep";
          kind: "numeric";
          multilanguage: false;
          index: 6;
        },
        {
          id: 7;
          name: "upSweep";
          kind: "numeric";
          multilanguage: false;
          index: 7;
        },
        {
          id: 8;
          name: "clampingDiameter";
          kind: "numeric";
          multilanguage: false;
          index: 8;
        },
        {
          id: 9;
          name: "marketingColor";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 4;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
              {
                id: 1;
                name: "identifier";
                kind: "shorttext";
                multilanguage: true;
                languageType: "language";
                index: 0;
              },
              {
                id: 5;
                name: "glossGrade";
                kind: "link";
                multilanguage: true;
                languageType: "language";
                toTable: 3;
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
              },
            ];
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
          index: 9;
        },
      ];
    },
    {
      id: 57;
      name: "saddle";
      langtags: ["de", "en", "fr", "es", "it", "hr"];
      columns: [
        {
          id: 0;
          name: "ID";
          kind: "concat";
          multilanguage: true;
          languageType: "language";
          concats: [
            {
              id: 1;
              name: "manufacturer";
              kind: "link";
              multilanguage: false;
              toTable: 5;
              toColumn: {
                id: 1;
                name: "identifier";
                kind: "shorttext";
                multilanguage: false;
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
              index: 0;
            },
            {
              id: 2;
              name: "identifier";
              kind: "shorttext";
              multilanguage: true;
              languageType: "language";
              index: 1;
            },
          ];
          index: 0;
        },
        {
          id: 1;
          name: "manufacturer";
          kind: "link";
          multilanguage: false;
          toTable: 5;
          toColumn: {
            id: 1;
            name: "identifier";
            kind: "shorttext";
            multilanguage: false;
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
        },
        {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        },
        {
          id: 3;
          name: "marketingIdentifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 3;
        },
        {
          id: 4;
          name: "marketingColor";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 4;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
              {
                id: 1;
                name: "identifier";
                kind: "shorttext";
                multilanguage: true;
                languageType: "language";
                index: 0;
              },
              {
                id: 5;
                name: "glossGrade";
                kind: "link";
                multilanguage: true;
                languageType: "language";
                toTable: 3;
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
              },
            ];
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
          index: 4;
        },
      ];
    },
    {
      id: 58;
      name: "stemSystem";
      langtags: ["de", "en", "fr", "es", "it", "hr"];
      columns: [
        {
          id: 1;
          name: "identifier";
          kind: "shorttext";
          multilanguage: false;
          index: 0;
        },
      ];
    },
    {
      id: 59;
      name: "stem";
      langtags: ["de", "en", "fr", "es", "it", "hr"];
      columns: [
        {
          id: 0;
          name: "ID";
          kind: "concat";
          multilanguage: true;
          languageType: "language";
          concats: [
            {
              id: 1;
              name: "manufacturer";
              kind: "link";
              multilanguage: false;
              toTable: 5;
              toColumn: {
                id: 1;
                name: "identifier";
                kind: "shorttext";
                multilanguage: false;
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
              index: 0;
            },
            {
              id: 2;
              name: "identifier";
              kind: "shorttext";
              multilanguage: true;
              languageType: "language";
              index: 1;
            },
            {
              id: 4;
              name: "stemSystem";
              kind: "link";
              multilanguage: false;
              toTable: 58;
              toColumn: {
                id: 1;
                name: "identifier";
                kind: "shorttext";
                multilanguage: false;
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
              index: 2;
            },
          ];
          index: 0;
        },
        {
          id: 1;
          name: "manufacturer";
          kind: "link";
          multilanguage: false;
          toTable: 5;
          toColumn: {
            id: 1;
            name: "identifier";
            kind: "shorttext";
            multilanguage: false;
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
        },
        {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        },
        {
          id: 3;
          name: "marketingIdentifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 3;
        },
        {
          id: 4;
          name: "stemSystem";
          kind: "link";
          multilanguage: false;
          toTable: 58;
          toColumn: {
            id: 1;
            name: "identifier";
            kind: "shorttext";
            multilanguage: false;
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
          index: 4;
        },
        {
          id: 5;
          name: "adjustmentMin";
          kind: "numeric";
          multilanguage: false;
          index: 5;
        },
        {
          id: 6;
          name: "adjustmentMax";
          kind: "numeric";
          multilanguage: false;
          index: 6;
        },
        {
          id: 7;
          name: "handlebarWidth";
          kind: "numeric";
          multilanguage: false;
          index: 7;
        },
        {
          id: 8;
          name: "angle";
          kind: "numeric";
          multilanguage: false;
          index: 8;
        },
        {
          id: 9;
          name: "marketingColor";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 4;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
              {
                id: 1;
                name: "identifier";
                kind: "shorttext";
                multilanguage: true;
                languageType: "language";
                index: 0;
              },
              {
                id: 5;
                name: "glossGrade";
                kind: "link";
                multilanguage: true;
                languageType: "language";
                toTable: 3;
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
              },
            ];
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
          index: 9;
        },
      ];
    },
    {
      id: 60;
      name: "spacer";
      langtags: ["de", "en", "fr", "es", "it", "hr"];
      columns: [
        {
          id: 0;
          name: "ID";
          kind: "concat";
          multilanguage: true;
          languageType: "language";
          concats: [
            {
              id: 1;
              name: "manufacturer";
              kind: "link";
              multilanguage: false;
              toTable: 5;
              toColumn: {
                id: 1;
                name: "identifier";
                kind: "shorttext";
                multilanguage: false;
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
              index: 0;
            },
            {
              id: 2;
              name: "identifier";
              kind: "shorttext";
              multilanguage: true;
              languageType: "language";
              index: 1;
            },
          ];
          index: 0;
        },
        {
          id: 1;
          name: "manufacturer";
          kind: "link";
          multilanguage: false;
          toTable: 5;
          toColumn: {
            id: 1;
            name: "identifier";
            kind: "shorttext";
            multilanguage: false;
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
        },
        {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        },
        {
          id: 3;
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
          index: 3;
        },
        {
          id: 4;
          name: "height";
          kind: "numeric";
          multilanguage: false;
          index: 4;
        },
        {
          id: 5;
          name: "innerDiameter";
          kind: "numeric";
          multilanguage: false;
          index: 5;
        },
        {
          id: 6;
          name: "marketingColor";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 4;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
              {
                id: 1;
                name: "identifier";
                kind: "shorttext";
                multilanguage: true;
                languageType: "language";
                index: 0;
              },
              {
                id: 5;
                name: "glossGrade";
                kind: "link";
                multilanguage: true;
                languageType: "language";
                toTable: 3;
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
              },
            ];
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
          index: 6;
        },
      ];
    },
    {
      id: 61;
      name: "saddleClampSystem";
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
      ];
    },
    {
      id: 62;
      name: "saddleClamp";
      langtags: ["de", "en", "fr", "es", "it", "hr"];
      columns: [
        {
          id: 0;
          name: "ID";
          kind: "concat";
          multilanguage: true;
          languageType: "language";
          concats: [
            {
              id: 1;
              name: "manufacturer";
              kind: "link";
              multilanguage: false;
              toTable: 5;
              toColumn: {
                id: 1;
                name: "identifier";
                kind: "shorttext";
                multilanguage: false;
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
              index: 0;
            },
            {
              id: 2;
              name: "identifier";
              kind: "shorttext";
              multilanguage: true;
              languageType: "language";
              index: 1;
            },
          ];
          index: 0;
        },
        {
          id: 1;
          name: "manufacturer";
          kind: "link";
          multilanguage: false;
          toTable: 5;
          toColumn: {
            id: 1;
            name: "identifier";
            kind: "shorttext";
            multilanguage: false;
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
        },
        {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        },
        {
          id: 3;
          name: "marketingIdentifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 3;
        },
        {
          id: 4;
          name: "saddleClampSystem";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 61;
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
          index: 4;
        },
        {
          id: 5;
          name: "innerDiameter";
          kind: "numeric";
          multilanguage: false;
          index: 5;
        },
        {
          id: 6;
          name: "marketingColor";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 4;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
              {
                id: 1;
                name: "identifier";
                kind: "shorttext";
                multilanguage: true;
                languageType: "language";
                index: 0;
              },
              {
                id: 5;
                name: "glossGrade";
                kind: "link";
                multilanguage: true;
                languageType: "language";
                toTable: 3;
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
              },
            ];
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
          index: 6;
        },
      ];
    },
    {
      id: 63;
      name: "seatPostType";
      langtags: ["de", "en", "fr", "es", "it", "hr"];
      columns: [
        {
          id: 0;
          name: "ID";
          kind: "concat";
          multilanguage: true;
          languageType: "language";
          concats: [
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
              name: "springDeflection";
              kind: "numeric";
              multilanguage: false;
              index: 1;
            },
            {
              id: 3;
              name: "permittedTotalWeight";
              kind: "numeric";
              multilanguage: false;
              index: 2;
            },
            {
              id: 4;
              name: "adjustmentRange";
              kind: "numeric";
              multilanguage: false;
              index: 3;
            },
          ];
          index: 0;
        },
        {
          id: 1;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 1;
        },
        {
          id: 2;
          name: "springDeflection";
          kind: "numeric";
          multilanguage: false;
          index: 2;
        },
        {
          id: 3;
          name: "permittedTotalWeight";
          kind: "numeric";
          multilanguage: false;
          index: 3;
        },
        {
          id: 4;
          name: "adjustmentRange";
          kind: "numeric";
          multilanguage: false;
          index: 4;
        },
      ];
    },
    {
      id: 64;
      name: "seatPost";
      langtags: ["de", "en", "fr", "es", "it", "hr"];
      columns: [
        {
          id: 0;
          name: "ID";
          kind: "concat";
          multilanguage: true;
          languageType: "language";
          concats: [
            {
              id: 1;
              name: "manufacturer";
              kind: "link";
              multilanguage: false;
              toTable: 5;
              toColumn: {
                id: 1;
                name: "identifier";
                kind: "shorttext";
                multilanguage: false;
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
              index: 0;
            },
            {
              id: 2;
              name: "identifier";
              kind: "shorttext";
              multilanguage: true;
              languageType: "language";
              index: 1;
            },
          ];
          index: 0;
        },
        {
          id: 1;
          name: "manufacturer";
          kind: "link";
          multilanguage: false;
          toTable: 5;
          toColumn: {
            id: 1;
            name: "identifier";
            kind: "shorttext";
            multilanguage: false;
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
        },
        {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        },
        {
          id: 3;
          name: "marketingIdentifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 3;
        },
        {
          id: 4;
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
          index: 4;
        },
        {
          id: 5;
          name: "seatPostType";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 63;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
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
                name: "springDeflection";
                kind: "numeric";
                multilanguage: false;
                index: 1;
              },
              {
                id: 3;
                name: "permittedTotalWeight";
                kind: "numeric";
                multilanguage: false;
                index: 2;
              },
              {
                id: 4;
                name: "adjustmentRange";
                kind: "numeric";
                multilanguage: false;
                index: 3;
              },
            ];
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
          index: 5;
        },
        {
          id: 6;
          name: "diameter";
          kind: "numeric";
          multilanguage: false;
          index: 6;
        },
      ];
    },
    {
      id: 65;
      name: "dynamo";
      langtags: ["de", "en", "fr", "es", "it", "hr"];
      columns: [
        {
          id: 0;
          name: "ID";
          kind: "concat";
          multilanguage: true;
          languageType: "language";
          concats: [
            {
              id: 1;
              name: "manufacturer";
              kind: "link";
              multilanguage: false;
              toTable: 5;
              toColumn: {
                id: 1;
                name: "identifier";
                kind: "shorttext";
                multilanguage: false;
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
              index: 0;
            },
            {
              id: 2;
              name: "identifier";
              kind: "shorttext";
              multilanguage: true;
              languageType: "language";
              index: 1;
            },
            {
              id: 3;
              name: "power";
              kind: "numeric";
              multilanguage: false;
              index: 2;
            },
          ];
          index: 0;
        },
        {
          id: 1;
          name: "manufacturer";
          kind: "link";
          multilanguage: false;
          toTable: 5;
          toColumn: {
            id: 1;
            name: "identifier";
            kind: "shorttext";
            multilanguage: false;
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
        },
        {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        },
        {
          id: 3;
          name: "power";
          kind: "numeric";
          multilanguage: false;
          index: 3;
        },
      ];
    },
    {
      id: 66;
      name: "rearlight";
      langtags: ["de", "en", "fr", "es", "it", "hr"];
      columns: [
        {
          id: 0;
          name: "ID";
          kind: "concat";
          multilanguage: true;
          languageType: "language";
          concats: [
            {
              id: 1;
              name: "manufacturer";
              kind: "link";
              multilanguage: false;
              toTable: 5;
              toColumn: {
                id: 1;
                name: "identifier";
                kind: "shorttext";
                multilanguage: false;
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
              index: 0;
            },
            {
              id: 2;
              name: "identifier";
              kind: "shorttext";
              multilanguage: true;
              languageType: "language";
              index: 1;
            },
          ];
          index: 0;
        },
        {
          id: 1;
          name: "manufacturer";
          kind: "link";
          multilanguage: false;
          toTable: 5;
          toColumn: {
            id: 1;
            name: "identifier";
            kind: "shorttext";
            multilanguage: false;
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
        },
        {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        },
        {
          id: 3;
          name: "hasParkingLight";
          kind: "boolean";
          multilanguage: false;
          index: 3;
        },
        {
          id: 4;
          name: "hasBrakeLightFunction";
          kind: "boolean";
          multilanguage: false;
          index: 4;
        },
      ];
    },
    {
      id: 67;
      name: "headlight";
      langtags: ["de", "en", "fr", "es", "it", "hr"];
      columns: [
        {
          id: 0;
          name: "ID";
          kind: "concat";
          multilanguage: true;
          languageType: "language";
          concats: [
            {
              id: 1;
              name: "manufacturer";
              kind: "link";
              multilanguage: false;
              toTable: 5;
              toColumn: {
                id: 1;
                name: "identifier";
                kind: "shorttext";
                multilanguage: false;
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
              index: 0;
            },
            {
              id: 2;
              name: "identifier";
              kind: "shorttext";
              multilanguage: true;
              languageType: "language";
              index: 1;
            },
          ];
          index: 0;
        },
        {
          id: 1;
          name: "manufacturer";
          kind: "link";
          multilanguage: false;
          toTable: 5;
          toColumn: {
            id: 1;
            name: "identifier";
            kind: "shorttext";
            multilanguage: false;
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
        },
        {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        },
        {
          id: 3;
          name: "lumenOutput";
          kind: "numeric";
          multilanguage: false;
          index: 3;
        },
        {
          id: 4;
          name: "hasParkingLight";
          kind: "boolean";
          multilanguage: false;
          index: 4;
        },
        {
          id: 5;
          name: "hasFloodLightFunction";
          kind: "boolean";
          multilanguage: false;
          index: 5;
        },
        {
          id: 6;
          name: "hasAutomaticSensor";
          kind: "boolean";
          multilanguage: false;
          index: 6;
        },
        {
          id: 7;
          name: "marketingColor";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 4;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
              {
                id: 1;
                name: "identifier";
                kind: "shorttext";
                multilanguage: true;
                languageType: "language";
                index: 0;
              },
              {
                id: 5;
                name: "glossGrade";
                kind: "link";
                multilanguage: true;
                languageType: "language";
                toTable: 3;
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
              },
            ];
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
          index: 7;
        },
      ];
    },
    {
      id: 68;
      name: "lockType";
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
      ];
    },
    {
      id: 69;
      name: "lock";
      langtags: ["de", "en", "fr", "es", "it", "hr"];
      columns: [
        {
          id: 0;
          name: "ID";
          kind: "concat";
          multilanguage: true;
          languageType: "language";
          concats: [
            {
              id: 1;
              name: "manufacturer";
              kind: "link";
              multilanguage: false;
              toTable: 5;
              toColumn: {
                id: 1;
                name: "identifier";
                kind: "shorttext";
                multilanguage: false;
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
              index: 0;
            },
            {
              id: 2;
              name: "identifier";
              kind: "shorttext";
              multilanguage: true;
              languageType: "language";
              index: 1;
            },
          ];
          index: 0;
        },
        {
          id: 1;
          name: "manufacturer";
          kind: "link";
          multilanguage: false;
          toTable: 5;
          toColumn: {
            id: 1;
            name: "identifier";
            kind: "shorttext";
            multilanguage: false;
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
        },
        {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        },
        {
          id: 3;
          name: "lockType";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 68;
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
          index: 3;
        },
        {
          id: 4;
          name: "isElectronic";
          kind: "boolean";
          multilanguage: false;
          index: 4;
        },
      ];
    },
    {
      id: 70;
      name: "controlUnit";
      langtags: ["de", "en", "fr", "es", "it", "hr"];
      columns: [
        {
          id: 0;
          name: "ID";
          kind: "concat";
          multilanguage: true;
          languageType: "language";
          concats: [
            {
              id: 1;
              name: "manufacturer";
              kind: "link";
              multilanguage: false;
              toTable: 5;
              toColumn: {
                id: 1;
                name: "identifier";
                kind: "shorttext";
                multilanguage: false;
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
              index: 0;
            },
            {
              id: 2;
              name: "identifier";
              kind: "shorttext";
              multilanguage: true;
              languageType: "language";
              index: 1;
            },
          ];
          index: 0;
        },
        {
          id: 1;
          name: "manufacturer";
          kind: "link";
          multilanguage: false;
          toTable: 5;
          toColumn: {
            id: 1;
            name: "identifier";
            kind: "shorttext";
            multilanguage: false;
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
        },
        {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        },
      ];
    },
    {
      id: 71;
      name: "accessory";
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
      ];
    },
    {
      id: 72;
      name: "pedals";
      langtags: ["de", "en", "fr", "es", "it", "hr"];
      columns: [
        {
          id: 0;
          name: "ID";
          kind: "concat";
          multilanguage: true;
          languageType: "language";
          concats: [
            {
              id: 1;
              name: "manufacturer";
              kind: "link";
              multilanguage: false;
              toTable: 5;
              toColumn: {
                id: 1;
                name: "identifier";
                kind: "shorttext";
                multilanguage: false;
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
              index: 0;
            },
            {
              id: 2;
              name: "identifier";
              kind: "shorttext";
              multilanguage: true;
              languageType: "language";
              index: 1;
            },
          ];
          index: 0;
        },
        {
          id: 1;
          name: "manufacturer";
          kind: "link";
          multilanguage: false;
          toTable: 5;
          toColumn: {
            id: 1;
            name: "identifier";
            kind: "shorttext";
            multilanguage: false;
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
        },
        {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        },
        {
          id: 3;
          name: "marketingIdentifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 3;
        },
        {
          id: 4;
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
          index: 4;
        },
        {
          id: 5;
          name: "marketingColor";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 4;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
              {
                id: 1;
                name: "identifier";
                kind: "shorttext";
                multilanguage: true;
                languageType: "language";
                index: 0;
              },
              {
                id: 5;
                name: "glossGrade";
                kind: "link";
                multilanguage: true;
                languageType: "language";
                toTable: 3;
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
              },
            ];
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
          index: 5;
        },
      ];
    },
    {
      id: 73;
      name: "standType";
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
      ];
    },
    {
      id: 74;
      name: "kickstand";
      langtags: ["de", "en", "fr", "es", "it", "hr"];
      columns: [
        {
          id: 0;
          name: "ID";
          kind: "concat";
          multilanguage: true;
          languageType: "language";
          concats: [
            {
              id: 1;
              name: "manufacturer";
              kind: "link";
              multilanguage: false;
              toTable: 5;
              toColumn: {
                id: 1;
                name: "identifier";
                kind: "shorttext";
                multilanguage: false;
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
              index: 0;
            },
            {
              id: 2;
              name: "identifier";
              kind: "shorttext";
              multilanguage: true;
              languageType: "language";
              index: 1;
            },
            {
              id: 3;
              name: "standType";
              kind: "link";
              multilanguage: true;
              languageType: "language";
              toTable: 73;
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
              index: 2;
            },
          ];
          index: 0;
        },
        {
          id: 1;
          name: "manufacturer";
          kind: "link";
          multilanguage: false;
          toTable: 5;
          toColumn: {
            id: 1;
            name: "identifier";
            kind: "shorttext";
            multilanguage: false;
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
        },
        {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        },
        {
          id: 3;
          name: "standType";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 73;
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
          index: 3;
        },
        {
          id: 4;
          name: "isAdjustable";
          kind: "boolean";
          multilanguage: false;
          index: 4;
        },
        {
          id: 5;
          name: "marketingColor";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 4;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
              {
                id: 1;
                name: "identifier";
                kind: "shorttext";
                multilanguage: true;
                languageType: "language";
                index: 0;
              },
              {
                id: 5;
                name: "glossGrade";
                kind: "link";
                multilanguage: true;
                languageType: "language";
                toTable: 3;
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
              },
            ];
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
          index: 5;
        },
      ];
    },
    {
      id: 75;
      name: "mudguard";
      langtags: ["de", "en", "fr", "es", "it", "hr"];
      columns: [
        {
          id: 0;
          name: "ID";
          kind: "concat";
          multilanguage: true;
          languageType: "language";
          concats: [
            {
              id: 1;
              name: "manufacturer";
              kind: "link";
              multilanguage: false;
              toTable: 5;
              toColumn: {
                id: 1;
                name: "identifier";
                kind: "shorttext";
                multilanguage: false;
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
              index: 0;
            },
            {
              id: 2;
              name: "identifier";
              kind: "shorttext";
              multilanguage: true;
              languageType: "language";
              index: 1;
            },
          ];
          index: 0;
        },
        {
          id: 1;
          name: "manufacturer";
          kind: "link";
          multilanguage: false;
          toTable: 5;
          toColumn: {
            id: 1;
            name: "identifier";
            kind: "shorttext";
            multilanguage: false;
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
        },
        {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        },
        {
          id: 3;
          name: "marketingIdentifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 3;
        },
        {
          id: 4;
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
          index: 4;
        },
        {
          id: 5;
          name: "width";
          kind: "numeric";
          multilanguage: false;
          index: 5;
        },
        {
          id: 6;
          name: "marketingColor";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 4;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
              {
                id: 1;
                name: "identifier";
                kind: "shorttext";
                multilanguage: true;
                languageType: "language";
                index: 0;
              },
              {
                id: 5;
                name: "glossGrade";
                kind: "link";
                multilanguage: true;
                languageType: "language";
                toTable: 3;
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
              },
            ];
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
          index: 6;
        },
      ];
    },
    {
      id: 76;
      name: "carrierSystem";
      langtags: ["de", "en", "fr", "es", "it", "hr"];
      columns: [
        {
          id: 1;
          name: "identifier";
          kind: "shorttext";
          multilanguage: false;
          index: 0;
        },
      ];
    },
    {
      id: 77;
      name: "carrier";
      langtags: ["de", "en", "fr", "es", "it", "hr"];
      columns: [
        {
          id: 0;
          name: "ID";
          kind: "concat";
          multilanguage: true;
          languageType: "language";
          concats: [
            {
              id: 1;
              name: "manufacturer";
              kind: "link";
              multilanguage: false;
              toTable: 5;
              toColumn: {
                id: 1;
                name: "identifier";
                kind: "shorttext";
                multilanguage: false;
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
              index: 0;
            },
            {
              id: 2;
              name: "identifier";
              kind: "shorttext";
              multilanguage: true;
              languageType: "language";
              index: 1;
            },
            {
              id: 4;
              name: "carrierSystem";
              kind: "link";
              multilanguage: false;
              toTable: 76;
              toColumn: {
                id: 1;
                name: "identifier";
                kind: "shorttext";
                multilanguage: false;
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
              index: 2;
            },
          ];
          index: 0;
        },
        {
          id: 1;
          name: "manufacturer";
          kind: "link";
          multilanguage: false;
          toTable: 5;
          toColumn: {
            id: 1;
            name: "identifier";
            kind: "shorttext";
            multilanguage: false;
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
        },
        {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        },
        {
          id: 3;
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
          index: 3;
        },
        {
          id: 4;
          name: "carrierSystem";
          kind: "link";
          multilanguage: false;
          toTable: 76;
          toColumn: {
            id: 1;
            name: "identifier";
            kind: "shorttext";
            multilanguage: false;
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
          index: 4;
        },
        {
          id: 5;
          name: "maxPayload";
          kind: "numeric";
          multilanguage: false;
          index: 5;
        },
        {
          id: 6;
          name: "marketingColor";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 4;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
              {
                id: 1;
                name: "identifier";
                kind: "shorttext";
                multilanguage: true;
                languageType: "language";
                index: 0;
              },
              {
                id: 5;
                name: "glossGrade";
                kind: "link";
                multilanguage: true;
                languageType: "language";
                toTable: 3;
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
              },
            ];
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
          index: 6;
        },
      ];
    },
    {
      id: 78;
      name: "marketingCategory";
      langtags: ["de", "en", "fr", "es", "it", "hr"];
      columns: [
        {
          id: 0;
          name: "ID";
          kind: "concat";
          multilanguage: true;
          languageType: "language";
          concats: [
            {
              id: 1;
              name: "manufacturer";
              kind: "link";
              multilanguage: false;
              toTable: 5;
              toColumn: {
                id: 1;
                name: "identifier";
                kind: "shorttext";
                multilanguage: false;
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
              index: 0;
            },
            {
              id: 2;
              name: "identifier";
              kind: "shorttext";
              multilanguage: true;
              languageType: "language";
              index: 1;
            },
            {
              id: 6;
              name: "sorting";
              kind: "numeric";
              multilanguage: false;
              index: 2;
            },
          ];
          index: 0;
        },
        {
          id: 1;
          name: "manufacturer";
          kind: "link";
          multilanguage: false;
          toTable: 5;
          toColumn: {
            id: 1;
            name: "identifier";
            kind: "shorttext";
            multilanguage: false;
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
        },
        {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        },
        {
          id: 3;
          name: "slug";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 3;
        },
        {
          id: 4;
          name: "description";
          kind: "text";
          multilanguage: true;
          languageType: "language";
          index: 4;
        },
        {
          id: 5;
          name: "image";
          kind: "attachment";
          multilanguage: false;
          index: 5;
        },
        {
          id: 6;
          name: "sorting";
          kind: "numeric";
          multilanguage: false;
          index: 6;
        },
      ];
    },
    {
      id: 79;
      name: "b2bShopCategory";
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
      ];
    },
    {
      id: 80;
      name: "bikeType";
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
      ];
    },
    {
      id: 81;
      name: "batteryPackType";
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
      ];
    },
    {
      id: 82;
      name: "chargingVoltage";
      langtags: ["de", "en", "fr", "es", "it", "hr"];
      columns: [
        {
          id: 1;
          name: "identifier";
          kind: "shorttext";
          multilanguage: false;
          index: 0;
        },
      ];
    },
    {
      id: 83;
      name: "batteryPack";
      langtags: ["de", "en", "fr", "es", "it", "hr"];
      columns: [
        {
          id: 0;
          name: "ID";
          kind: "concat";
          multilanguage: true;
          languageType: "language";
          concats: [
            {
              id: 1;
              name: "manufacturer";
              kind: "link";
              multilanguage: false;
              toTable: 5;
              toColumn: {
                id: 1;
                name: "identifier";
                kind: "shorttext";
                multilanguage: false;
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
              index: 0;
            },
            {
              id: 2;
              name: "identifier";
              kind: "shorttext";
              multilanguage: true;
              languageType: "language";
              index: 1;
            },
            {
              id: 3;
              name: "capacity";
              kind: "numeric";
              multilanguage: false;
              index: 2;
            },
            {
              id: 4;
              name: "batteryPackType";
              kind: "link";
              multilanguage: true;
              languageType: "language";
              toTable: 81;
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
              index: 3;
            },
          ];
          index: 0;
        },
        {
          id: 1;
          name: "manufacturer";
          kind: "link";
          multilanguage: false;
          toTable: 5;
          toColumn: {
            id: 1;
            name: "identifier";
            kind: "shorttext";
            multilanguage: false;
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
        },
        {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        },
        {
          id: 3;
          name: "capacity";
          kind: "numeric";
          multilanguage: false;
          index: 3;
        },
        {
          id: 4;
          name: "batteryPackType";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 81;
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
          index: 4;
        },
        {
          id: 5;
          name: "chargingVoltage";
          kind: "link";
          multilanguage: false;
          toTable: 82;
          toColumn: {
            id: 1;
            name: "identifier";
            kind: "shorttext";
            multilanguage: false;
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
          index: 5;
        },
      ];
    },
    {
      id: 84;
      name: "modelYear";
      langtags: ["de", "en", "fr", "es", "it", "hr"];
      columns: [
        {
          id: 1;
          name: "identifier";
          kind: "numeric";
          multilanguage: false;
          index: 0;
        },
      ];
    },
    {
      id: 85;
      name: "award";
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
          name: "image";
          kind: "attachment";
          multilanguage: false;
          index: 1;
        },
        {
          id: 3;
          name: "url";
          kind: "shorttext";
          multilanguage: false;
          index: 2;
        },
      ];
    },
    {
      id: 86;
      name: "baseFrameShape";
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
          name: "bidexCode";
          kind: "shorttext";
          multilanguage: false;
          index: 1;
        },
        {
          id: 3;
          name: "image";
          kind: "attachment";
          multilanguage: false;
          index: 2;
        },
      ];
    },
    {
      id: 87;
      name: "frameShape";
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
          name: "baseFrameShape";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 86;
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
        },
      ];
    },
    {
      id: 88;
      name: "frameSize";
      langtags: ["de", "en", "fr", "es", "it", "hr"];
      columns: [
        {
          id: 1;
          name: "identifier";
          kind: "shorttext";
          multilanguage: false;
          index: 0;
        },
      ];
    },
    {
      id: 89;
      name: "bearingSet";
      langtags: ["de", "en", "fr", "es", "it", "hr"];
      columns: [
        {
          id: 0;
          name: "ID";
          kind: "concat";
          multilanguage: true;
          languageType: "language";
          concats: [
            {
              id: 1;
              name: "manufacturer";
              kind: "link";
              multilanguage: false;
              toTable: 5;
              toColumn: {
                id: 1;
                name: "identifier";
                kind: "shorttext";
                multilanguage: false;
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
              index: 0;
            },
            {
              id: 2;
              name: "identifier";
              kind: "shorttext";
              multilanguage: true;
              languageType: "language";
              index: 1;
            },
          ];
          index: 0;
        },
        {
          id: 1;
          name: "manufacturer";
          kind: "link";
          multilanguage: false;
          toTable: 5;
          toColumn: {
            id: 1;
            name: "identifier";
            kind: "shorttext";
            multilanguage: false;
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
        },
        {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        },
      ];
    },
    {
      id: 90;
      name: "suspensionSystem";
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
      ];
    },
    {
      id: 91;
      name: "brakeStandard";
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
      ];
    },
    {
      id: 92;
      name: "charger";
      langtags: ["de", "en", "fr", "es", "it", "hr"];
      columns: [
        {
          id: 0;
          name: "ID";
          kind: "concat";
          multilanguage: true;
          languageType: "language";
          concats: [
            {
              id: 1;
              name: "manufacturer";
              kind: "link";
              multilanguage: false;
              toTable: 5;
              toColumn: {
                id: 1;
                name: "identifier";
                kind: "shorttext";
                multilanguage: false;
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
              index: 0;
            },
            {
              id: 2;
              name: "identifier";
              kind: "shorttext";
              multilanguage: true;
              languageType: "language";
              index: 1;
            },
          ];
          index: 0;
        },
        {
          id: 1;
          name: "manufacturer";
          kind: "link";
          multilanguage: false;
          toTable: 5;
          toColumn: {
            id: 1;
            name: "identifier";
            kind: "shorttext";
            multilanguage: false;
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
        },
        {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        },
      ];
    },
    {
      id: 93;
      name: "frame";
      langtags: ["de", "en", "fr", "es", "it", "hr"];
      columns: [
        {
          id: 0;
          name: "ID";
          kind: "concat";
          multilanguage: true;
          languageType: "language";
          concats: [
            {
              id: 1;
              name: "manufacturer";
              kind: "link";
              multilanguage: false;
              toTable: 5;
              toColumn: {
                id: 1;
                name: "identifier";
                kind: "shorttext";
                multilanguage: false;
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
              index: 0;
            },
            {
              id: 2;
              name: "identifier";
              kind: "shorttext";
              multilanguage: true;
              languageType: "language";
              index: 1;
            },
            {
              id: 3;
              name: "frameShape";
              kind: "link";
              multilanguage: true;
              languageType: "language";
              toTable: 87;
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
              index: 2;
            },
            {
              id: 10;
              name: "frameHeight";
              kind: "numeric";
              multilanguage: false;
              index: 3;
            },
          ];
          index: 0;
        },
        {
          id: 1;
          name: "manufacturer";
          kind: "link";
          multilanguage: false;
          toTable: 5;
          toColumn: {
            id: 1;
            name: "identifier";
            kind: "shorttext";
            multilanguage: false;
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
        },
        {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        },
        {
          id: 3;
          name: "frameShape";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 87;
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
          index: 3;
        },
        {
          id: 4;
          name: "suspensionSystem";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 90;
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
          index: 4;
        },
        {
          id: 5;
          name: "travel";
          kind: "numeric";
          multilanguage: false;
          index: 5;
        },
        {
          id: 6;
          name: "axleStandard";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 47;
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
          index: 6;
        },
        {
          id: 7;
          name: "brakeStandard";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 91;
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
          index: 7;
        },
        {
          id: 8;
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
          index: 8;
        },
        {
          id: 9;
          name: "frameSize";
          kind: "link";
          multilanguage: false;
          toTable: 88;
          toColumn: {
            id: 1;
            name: "identifier";
            kind: "shorttext";
            multilanguage: false;
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
          index: 9;
        },
        {
          id: 10;
          name: "frameHeight";
          kind: "numeric";
          multilanguage: false;
          index: 10;
        },
        {
          id: 11;
          name: "saddleHeight";
          kind: "numeric";
          multilanguage: false;
          index: 11;
        },
        {
          id: 12;
          name: "topTubeLength";
          kind: "numeric";
          multilanguage: false;
          index: 12;
        },
        {
          id: 13;
          name: "topTubeHorizontal";
          kind: "numeric";
          multilanguage: false;
          index: 13;
        },
        {
          id: 14;
          name: "headTubeAngle";
          kind: "numeric";
          multilanguage: false;
          index: 14;
        },
        {
          id: 15;
          name: "seatTubeAngle";
          kind: "numeric";
          multilanguage: false;
          index: 15;
        },
        {
          id: 16;
          name: "chainStayLength";
          kind: "numeric";
          multilanguage: false;
          index: 16;
        },
        {
          id: 17;
          name: "headTubeLength";
          kind: "numeric";
          multilanguage: false;
          index: 17;
        },
        {
          id: 18;
          name: "bottomBracketDrop";
          kind: "numeric";
          multilanguage: false;
          index: 18;
        },
        {
          id: 19;
          name: "bottomBracketHeight";
          kind: "numeric";
          multilanguage: false;
          index: 19;
        },
        {
          id: 20;
          name: "forkBending";
          kind: "numeric";
          multilanguage: false;
          index: 20;
        },
        {
          id: 21;
          name: "forkOverallHeight";
          kind: "numeric";
          multilanguage: false;
          index: 21;
        },
        {
          id: 22;
          name: "sloping";
          kind: "numeric";
          multilanguage: false;
          index: 22;
        },
        {
          id: 23;
          name: "wheelSize";
          kind: "link";
          multilanguage: false;
          toTable: 15;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: false;
            concats: [
              {
                id: 1;
                name: "wheelSize";
                kind: "numeric";
                multilanguage: false;
                index: 0;
              },
              {
                id: 2;
                name: "hasPlusTire";
                kind: "boolean";
                multilanguage: false;
                index: 1;
              },
            ];
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
          index: 23;
        },
        {
          id: 24;
          name: "standOverHeight";
          kind: "numeric";
          multilanguage: false;
          index: 24;
        },
        {
          id: 25;
          name: "seatTubeOffset";
          kind: "numeric";
          multilanguage: false;
          index: 25;
        },
        {
          id: 26;
          name: "reach";
          kind: "numeric";
          multilanguage: false;
          index: 26;
        },
        {
          id: 27;
          name: "stack";
          kind: "numeric";
          multilanguage: false;
          index: 27;
        },
        {
          id: 28;
          name: "wheelbase";
          kind: "numeric";
          multilanguage: false;
          index: 28;
        },
        {
          id: 29;
          name: "damperInstallationLength";
          kind: "numeric";
          multilanguage: false;
          index: 29;
        },
        {
          id: 30;
          name: "damperBush1";
          kind: "numeric";
          multilanguage: false;
          index: 30;
        },
        {
          id: 31;
          name: "damperBush2";
          kind: "numeric";
          multilanguage: false;
          index: 31;
        },
        {
          id: 32;
          name: "damperBoltLength";
          kind: "numeric";
          multilanguage: false;
          index: 32;
        },
        {
          id: 33;
          name: "bearingSet";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 89;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
              {
                id: 1;
                name: "manufacturer";
                kind: "link";
                multilanguage: false;
                toTable: 5;
                toColumn: {
                  id: 1;
                  name: "identifier";
                  kind: "shorttext";
                  multilanguage: false;
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
                index: 0;
              },
              {
                id: 2;
                name: "identifier";
                kind: "shorttext";
                multilanguage: true;
                languageType: "language";
                index: 1;
              },
            ];
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
          index: 33;
        },
        {
          id: 37;
          name: "packSize";
          kind: "group";
          multilanguage: false;
          groups: [
            {
              id: 34;
              name: "length";
              kind: "numeric";
              multilanguage: false;
              index: 0;
            },
            {
              id: 35;
              name: "width";
              kind: "numeric";
              multilanguage: false;
              index: 1;
            },
            {
              id: 36;
              name: "height";
              kind: "numeric";
              multilanguage: false;
              index: 2;
            },
          ];
          formatPattern: "{{34}} mm × {{35}} mm × {{36}} mm";
          index: 34;
        },
        {
          id: 34;
          name: "length";
          kind: "numeric";
          multilanguage: false;
          index: 35;
        },
        {
          id: 35;
          name: "width";
          kind: "numeric";
          multilanguage: false;
          index: 36;
        },
        {
          id: 36;
          name: "height";
          kind: "numeric";
          multilanguage: false;
          index: 37;
        },
      ];
    },
    {
      id: 94;
      name: "variant";
      langtags: ["de", "en", "fr", "es", "it", "hr"];
      columns: [
        {
          id: 0;
          name: "ID";
          kind: "concat";
          multilanguage: true;
          languageType: "language";
          concats: [
            {
              id: 1;
              name: "articleNumber";
              kind: "shorttext";
              multilanguage: false;
              index: 0;
            },
            {
              id: 3;
              name: "identifier";
              kind: "shorttext";
              multilanguage: true;
              languageType: "language";
              index: 1;
            },
          ];
          index: 0;
        },
        {
          id: 1;
          name: "articleNumber";
          kind: "shorttext";
          multilanguage: false;
          index: 1;
        },
        {
          id: 2;
          name: "ean";
          kind: "shorttext";
          multilanguage: false;
          index: 2;
        },
        {
          id: 3;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 3;
        },
        {
          id: 4;
          name: "rrp";
          kind: "currency";
          multilanguage: true;
          languageType: "country";
          countryCodes: ["DE", "US", "GB", "FR", "ES", "AT", "CH"];
          index: 4;
        },
        {
          id: 5;
          name: "marketingColor";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 4;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
              {
                id: 1;
                name: "identifier";
                kind: "shorttext";
                multilanguage: true;
                languageType: "language";
                index: 0;
              },
              {
                id: 5;
                name: "glossGrade";
                kind: "link";
                multilanguage: true;
                languageType: "language";
                toTable: 3;
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
              },
            ];
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
          index: 5;
        },
        {
          id: 6;
          name: "frame";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 93;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
              {
                id: 1;
                name: "manufacturer";
                kind: "link";
                multilanguage: false;
                toTable: 5;
                toColumn: {
                  id: 1;
                  name: "identifier";
                  kind: "shorttext";
                  multilanguage: false;
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
                index: 0;
              },
              {
                id: 2;
                name: "identifier";
                kind: "shorttext";
                multilanguage: true;
                languageType: "language";
                index: 1;
              },
              {
                id: 3;
                name: "frameShape";
                kind: "link";
                multilanguage: true;
                languageType: "language";
                toTable: 87;
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
                index: 2;
              },
              {
                id: 10;
                name: "frameHeight";
                kind: "numeric";
                multilanguage: false;
                index: 3;
              },
            ];
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
          index: 6;
        },
        {
          id: 7;
          name: "stemLength";
          kind: "numeric";
          multilanguage: false;
          index: 7;
        },
        {
          id: 8;
          name: "handlebarWidth";
          kind: "numeric";
          multilanguage: false;
          index: 8;
        },
        {
          id: 9;
          name: "seatPostLength";
          kind: "numeric";
          multilanguage: false;
          index: 9;
        },
        {
          id: 10;
          name: "seatPostStroke";
          kind: "numeric";
          multilanguage: false;
          index: 10;
        },
        {
          id: 11;
          name: "crankArmLength";
          kind: "numeric";
          multilanguage: false;
          index: 11;
        },
        {
          id: 12;
          name: "cranksetLength";
          kind: "numeric";
          multilanguage: false;
          index: 12;
        },
        {
          id: 13;
          name: "batteryPack";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 83;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
              {
                id: 1;
                name: "manufacturer";
                kind: "link";
                multilanguage: false;
                toTable: 5;
                toColumn: {
                  id: 1;
                  name: "identifier";
                  kind: "shorttext";
                  multilanguage: false;
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
                index: 0;
              },
              {
                id: 2;
                name: "identifier";
                kind: "shorttext";
                multilanguage: true;
                languageType: "language";
                index: 1;
              },
              {
                id: 3;
                name: "capacity";
                kind: "numeric";
                multilanguage: false;
                index: 2;
              },
              {
                id: 4;
                name: "batteryPackType";
                kind: "link";
                multilanguage: true;
                languageType: "language";
                toTable: 81;
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
                index: 3;
              },
            ];
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
          index: 13;
        },
        {
          id: 14;
          name: "fork";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 16;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
              {
                id: 1;
                name: "manufacturer";
                kind: "link";
                multilanguage: false;
                toTable: 5;
                toColumn: {
                  id: 1;
                  name: "identifier";
                  kind: "shorttext";
                  multilanguage: false;
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
                index: 0;
              },
              {
                id: 2;
                name: "identifier";
                kind: "shorttext";
                multilanguage: true;
                languageType: "language";
                index: 1;
              },
              {
                id: 3;
                name: "springMedium";
                kind: "link";
                multilanguage: true;
                languageType: "language";
                toTable: 12;
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
                index: 2;
              },
              {
                id: 4;
                name: "forkLength";
                kind: "numeric";
                multilanguage: false;
                index: 3;
              },
            ];
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
          index: 14;
        },
        {
          id: 15;
          name: "tire";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 52;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
              {
                id: 1;
                name: "manufacturer";
                kind: "link";
                multilanguage: false;
                toTable: 5;
                toColumn: {
                  id: 1;
                  name: "identifier";
                  kind: "shorttext";
                  multilanguage: false;
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
                index: 0;
              },
              {
                id: 2;
                name: "identifier";
                kind: "shorttext";
                multilanguage: true;
                languageType: "language";
                index: 1;
              },
              {
                id: 3;
                name: "sizeEtrto";
                kind: "shorttext";
                multilanguage: false;
                index: 2;
              },
            ];
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
          index: 15;
        },
        {
          id: 16;
          name: "rearTire";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 52;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
              {
                id: 1;
                name: "manufacturer";
                kind: "link";
                multilanguage: false;
                toTable: 5;
                toColumn: {
                  id: 1;
                  name: "identifier";
                  kind: "shorttext";
                  multilanguage: false;
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
                index: 0;
              },
              {
                id: 2;
                name: "identifier";
                kind: "shorttext";
                multilanguage: true;
                languageType: "language";
                index: 1;
              },
              {
                id: 3;
                name: "sizeEtrto";
                kind: "shorttext";
                multilanguage: false;
                index: 2;
              },
            ];
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
          index: 16;
        },
        {
          id: 17;
          name: "isRoadTrafficApproved";
          kind: "boolean";
          multilanguage: false;
          index: 17;
        },
        {
          id: 18;
          name: "imagesStraight";
          kind: "attachment";
          multilanguage: false;
          index: 18;
        },
        {
          id: 19;
          name: "imagesDiagonal";
          kind: "attachment";
          multilanguage: false;
          index: 19;
        },
        {
          id: 20;
          name: "imagesDetail";
          kind: "attachment";
          multilanguage: false;
          index: 20;
        },
        {
          id: 21;
          name: "modelName";
          kind: "shorttext";
          multilanguage: false;
          index: 21;
        },
        {
          id: 22;
          name: "bikeModel";
          kind: "link";
          multilanguage: false;
          toTable: 95;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: false;
            concats: [
              {
                id: 1;
                name: "brand";
                kind: "link";
                multilanguage: false;
                toTable: 5;
                toColumn: {
                  id: 1;
                  name: "identifier";
                  kind: "shorttext";
                  multilanguage: false;
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
                index: 0;
              },
              {
                id: 2;
                name: "modelName";
                kind: "shorttext";
                multilanguage: false;
                index: 1;
              },
            ];
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
          index: 22;
        },
      ];
    },
    {
      id: 95;
      name: "bikeModel";
      langtags: ["de", "en", "fr", "es", "it", "hr"];
      columns: [
        {
          id: 0;
          name: "ID";
          kind: "concat";
          multilanguage: false;
          concats: [
            {
              id: 1;
              name: "brand";
              kind: "link";
              multilanguage: false;
              toTable: 5;
              toColumn: {
                id: 1;
                name: "identifier";
                kind: "shorttext";
                multilanguage: false;
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
              index: 0;
            },
            {
              id: 2;
              name: "modelName";
              kind: "shorttext";
              multilanguage: false;
              index: 1;
            },
          ];
          index: 0;
        },
        {
          id: 1;
          name: "brand";
          kind: "link";
          multilanguage: false;
          toTable: 5;
          toColumn: {
            id: 1;
            name: "identifier";
            kind: "shorttext";
            multilanguage: false;
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
        },
        {
          id: 2;
          name: "modelName";
          kind: "shorttext";
          multilanguage: false;
          index: 2;
        },
        {
          id: 3;
          name: "modelYear";
          kind: "link";
          multilanguage: false;
          toTable: 84;
          toColumn: {
            id: 1;
            name: "identifier";
            kind: "numeric";
            multilanguage: false;
          };
          index: 3;
        },
        {
          id: 4;
          name: "variants";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 94;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
              {
                id: 1;
                name: "articleNumber";
                kind: "shorttext";
                multilanguage: false;
                index: 0;
              },
              {
                id: 3;
                name: "identifier";
                kind: "shorttext";
                multilanguage: true;
                languageType: "language";
                index: 1;
              },
            ];
          };
          constraint: {
            cardinality: {
              from: 1;
              to: 0;
            };
            deleteCascade: false;
            archiveCascade: false;
            finalCascade: false;
          };
          index: 4;
        },
        {
          id: 5;
          name: "rrp";
          kind: "currency";
          multilanguage: true;
          languageType: "country";
          countryCodes: ["DE", "US", "GB", "FR", "ES", "AT", "CH"];
          index: 5;
        },
        {
          id: 6;
          name: "marketingCategory";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 78;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
              {
                id: 1;
                name: "manufacturer";
                kind: "link";
                multilanguage: false;
                toTable: 5;
                toColumn: {
                  id: 1;
                  name: "identifier";
                  kind: "shorttext";
                  multilanguage: false;
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
                index: 0;
              },
              {
                id: 2;
                name: "identifier";
                kind: "shorttext";
                multilanguage: true;
                languageType: "language";
                index: 1;
              },
              {
                id: 6;
                name: "sorting";
                kind: "numeric";
                multilanguage: false;
                index: 2;
              },
            ];
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
          index: 6;
        },
        {
          id: 7;
          name: "b2bShopCategory";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 79;
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
          index: 7;
        },
        {
          id: 8;
          name: "bikeType";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 80;
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
          index: 8;
        },
        {
          id: 9;
          name: "bidexProductCode";
          kind: "shorttext";
          multilanguage: false;
          index: 9;
        },
        {
          id: 10;
          name: "description";
          kind: "text";
          multilanguage: true;
          languageType: "language";
          index: 10;
        },
        {
          id: 11;
          name: "weight";
          kind: "numeric";
          multilanguage: false;
          index: 11;
        },
        {
          id: 12;
          name: "permittedTotalWeight";
          kind: "numeric";
          multilanguage: false;
          index: 12;
        },
        {
          id: 13;
          name: "numberOfGears";
          kind: "numeric";
          multilanguage: false;
          index: 13;
        },
        {
          id: 14;
          name: "brakeLever";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 23;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
              {
                id: 1;
                name: "manufacturer";
                kind: "link";
                multilanguage: false;
                toTable: 5;
                toColumn: {
                  id: 1;
                  name: "identifier";
                  kind: "shorttext";
                  multilanguage: false;
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
                index: 0;
              },
              {
                id: 2;
                name: "identifier";
                kind: "shorttext";
                multilanguage: true;
                languageType: "language";
                index: 1;
              },
              {
                id: 3;
                name: "gripWidth";
                kind: "link";
                multilanguage: true;
                languageType: "language";
                toTable: 22;
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
                index: 2;
              },
              {
                id: 4;
                name: "gripWidthAdjustable";
                kind: "boolean";
                multilanguage: false;
                index: 3;
              },
              {
                id: 7;
                name: "assemblySide";
                kind: "link";
                multilanguage: true;
                languageType: "language";
                toTable: 21;
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
                index: 4;
              },
            ];
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
          index: 14;
        },
        {
          id: 15;
          name: "brakeFront";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 25;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
              {
                id: 1;
                name: "manufacturer";
                kind: "link";
                multilanguage: false;
                toTable: 5;
                toColumn: {
                  id: 1;
                  name: "identifier";
                  kind: "shorttext";
                  multilanguage: false;
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
                index: 0;
              },
              {
                id: 2;
                name: "identifier";
                kind: "shorttext";
                multilanguage: true;
                languageType: "language";
                index: 1;
              },
            ];
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
          index: 15;
        },
        {
          id: 16;
          name: "brakeRear";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 25;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
              {
                id: 1;
                name: "manufacturer";
                kind: "link";
                multilanguage: false;
                toTable: 5;
                toColumn: {
                  id: 1;
                  name: "identifier";
                  kind: "shorttext";
                  multilanguage: false;
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
                index: 0;
              },
              {
                id: 2;
                name: "identifier";
                kind: "shorttext";
                multilanguage: true;
                languageType: "language";
                index: 1;
              },
            ];
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
          index: 16;
        },
        {
          id: 17;
          name: "isCoasterBrake";
          kind: "boolean";
          multilanguage: false;
          index: 17;
        },
        {
          id: 18;
          name: "brakeDiscFront";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 28;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
              {
                id: 1;
                name: "manufacturer";
                kind: "link";
                multilanguage: false;
                toTable: 5;
                toColumn: {
                  id: 1;
                  name: "identifier";
                  kind: "shorttext";
                  multilanguage: false;
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
                index: 0;
              },
              {
                id: 2;
                name: "identifier";
                kind: "shorttext";
                multilanguage: true;
                languageType: "language";
                index: 1;
              },
            ];
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
          index: 18;
        },
        {
          id: 19;
          name: "brakeDiscRear";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 28;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
              {
                id: 1;
                name: "manufacturer";
                kind: "link";
                multilanguage: false;
                toTable: 5;
                toColumn: {
                  id: 1;
                  name: "identifier";
                  kind: "shorttext";
                  multilanguage: false;
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
                index: 0;
              },
              {
                id: 2;
                name: "identifier";
                kind: "shorttext";
                multilanguage: true;
                languageType: "language";
                index: 1;
              },
            ];
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
          index: 19;
        },
        {
          id: 20;
          name: "derailleur";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 32;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
              {
                id: 1;
                name: "manufacturer";
                kind: "link";
                multilanguage: false;
                toTable: 5;
                toColumn: {
                  id: 1;
                  name: "identifier";
                  kind: "shorttext";
                  multilanguage: false;
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
                index: 0;
              },
              {
                id: 2;
                name: "identifier";
                kind: "shorttext";
                multilanguage: true;
                languageType: "language";
                index: 1;
              },
              {
                id: 3;
                name: "derailleurType";
                kind: "link";
                multilanguage: true;
                languageType: "language";
                toTable: 31;
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
                index: 2;
              },
            ];
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
          index: 20;
        },
        {
          id: 21;
          name: "gearHub";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 34;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
              {
                id: 1;
                name: "manufacturer";
                kind: "link";
                multilanguage: false;
                toTable: 5;
                toColumn: {
                  id: 1;
                  name: "identifier";
                  kind: "shorttext";
                  multilanguage: false;
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
                index: 0;
              },
              {
                id: 2;
                name: "identifier";
                kind: "shorttext";
                multilanguage: true;
                languageType: "language";
                index: 1;
              },
            ];
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
          index: 21;
        },
        {
          id: 22;
          name: "rearDerailleur";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 33;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
              {
                id: 1;
                name: "manufacturer";
                kind: "link";
                multilanguage: false;
                toTable: 5;
                toColumn: {
                  id: 1;
                  name: "identifier";
                  kind: "shorttext";
                  multilanguage: false;
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
                index: 0;
              },
              {
                id: 2;
                name: "identifier";
                kind: "shorttext";
                multilanguage: true;
                languageType: "language";
                index: 1;
              },
            ];
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
          index: 22;
        },
        {
          id: 23;
          name: "sprocket";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 36;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
              {
                id: 1;
                name: "manufacturer";
                kind: "link";
                multilanguage: false;
                toTable: 5;
                toColumn: {
                  id: 1;
                  name: "identifier";
                  kind: "shorttext";
                  multilanguage: false;
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
                index: 0;
              },
              {
                id: 2;
                name: "identifier";
                kind: "shorttext";
                multilanguage: true;
                languageType: "language";
                index: 1;
              },
              {
                id: 3;
                name: "numberOfTeeth";
                kind: "numeric";
                multilanguage: false;
                index: 2;
              },
            ];
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
          index: 23;
        },
        {
          id: 24;
          name: "cassette";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 35;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
              {
                id: 1;
                name: "manufacturer";
                kind: "link";
                multilanguage: false;
                toTable: 5;
                toColumn: {
                  id: 1;
                  name: "identifier";
                  kind: "shorttext";
                  multilanguage: false;
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
                index: 0;
              },
              {
                id: 2;
                name: "identifier";
                kind: "shorttext";
                multilanguage: true;
                languageType: "language";
                index: 1;
              },
              {
                id: 3;
                name: "numberOfGears";
                kind: "numeric";
                multilanguage: false;
                index: 2;
              },
            ];
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
          index: 24;
        },
        {
          id: 25;
          name: "chainRing";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 39;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
              {
                id: 1;
                name: "manufacturer";
                kind: "link";
                multilanguage: false;
                toTable: 5;
                toColumn: {
                  id: 1;
                  name: "identifier";
                  kind: "shorttext";
                  multilanguage: false;
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
                index: 0;
              },
              {
                id: 2;
                name: "identifier";
                kind: "shorttext";
                multilanguage: true;
                languageType: "language";
                index: 1;
              },
            ];
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
          index: 25;
        },
        {
          id: 26;
          name: "crankset";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 37;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
              {
                id: 1;
                name: "manufacturer";
                kind: "link";
                multilanguage: false;
                toTable: 5;
                toColumn: {
                  id: 1;
                  name: "identifier";
                  kind: "shorttext";
                  multilanguage: false;
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
                index: 0;
              },
              {
                id: 2;
                name: "identifier";
                kind: "shorttext";
                multilanguage: true;
                languageType: "language";
                index: 1;
              },
              {
                id: 4;
                name: "numberOfTeethLarge";
                kind: "numeric";
                multilanguage: false;
                index: 2;
              },
              {
                id: 5;
                name: "numberOfTeethMedium";
                kind: "numeric";
                multilanguage: false;
                index: 3;
              },
              {
                id: 6;
                name: "numberOfTeethSmall";
                kind: "numeric";
                multilanguage: false;
                index: 4;
              },
            ];
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
          index: 26;
        },
        {
          id: 27;
          name: "gearLeverLeft";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 30;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
              {
                id: 1;
                name: "manufacturer";
                kind: "link";
                multilanguage: false;
                toTable: 5;
                toColumn: {
                  id: 1;
                  name: "identifier";
                  kind: "shorttext";
                  multilanguage: false;
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
                index: 0;
              },
              {
                id: 2;
                name: "identifier";
                kind: "shorttext";
                multilanguage: true;
                languageType: "language";
                index: 1;
              },
            ];
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
          index: 27;
        },
        {
          id: 28;
          name: "gearLeverRight";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 30;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
              {
                id: 1;
                name: "manufacturer";
                kind: "link";
                multilanguage: false;
                toTable: 5;
                toColumn: {
                  id: 1;
                  name: "identifier";
                  kind: "shorttext";
                  multilanguage: false;
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
                index: 0;
              },
              {
                id: 2;
                name: "identifier";
                kind: "shorttext";
                multilanguage: true;
                languageType: "language";
                index: 1;
              },
            ];
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
          index: 28;
        },
        {
          id: 29;
          name: "crankArms";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 41;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
              {
                id: 1;
                name: "manufacturer";
                kind: "link";
                multilanguage: false;
                toTable: 5;
                toColumn: {
                  id: 1;
                  name: "identifier";
                  kind: "shorttext";
                  multilanguage: false;
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
                index: 0;
              },
              {
                id: 2;
                name: "identifier";
                kind: "shorttext";
                multilanguage: true;
                languageType: "language";
                index: 1;
              },
            ];
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
          index: 29;
        },
        {
          id: 30;
          name: "bottomBracket";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 43;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
              {
                id: 1;
                name: "manufacturer";
                kind: "link";
                multilanguage: false;
                toTable: 5;
                toColumn: {
                  id: 1;
                  name: "identifier";
                  kind: "shorttext";
                  multilanguage: false;
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
                index: 0;
              },
              {
                id: 2;
                name: "identifier";
                kind: "shorttext";
                multilanguage: true;
                languageType: "language";
                index: 1;
              },
              {
                id: 3;
                name: "bottomBracketSystem";
                kind: "link";
                multilanguage: false;
                toTable: 42;
                toColumn: {
                  id: 1;
                  name: "identifier";
                  kind: "shorttext";
                  multilanguage: false;
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
                index: 2;
              },
              {
                id: 4;
                name: "axleLength";
                kind: "numeric";
                multilanguage: false;
                index: 3;
              },
            ];
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
          index: 30;
        },
        {
          id: 31;
          name: "headSet";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 7;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
              {
                id: 1;
                name: "manufacturer";
                kind: "link";
                multilanguage: false;
                toTable: 5;
                toColumn: {
                  id: 1;
                  name: "identifier";
                  kind: "shorttext";
                  multilanguage: false;
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
                index: 0;
              },
              {
                id: 2;
                name: "identifier";
                kind: "shorttext";
                multilanguage: true;
                languageType: "language";
                index: 1;
              },
            ];
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
          index: 31;
        },
        {
          id: 32;
          name: "engine";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 6;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
              {
                id: 1;
                name: "manufacturer";
                kind: "link";
                multilanguage: false;
                toTable: 5;
                toColumn: {
                  id: 1;
                  name: "identifier";
                  kind: "shorttext";
                  multilanguage: false;
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
                index: 0;
              },
              {
                id: 2;
                name: "identifier";
                kind: "shorttext";
                multilanguage: true;
                languageType: "language";
                index: 1;
              },
              {
                id: 3;
                name: "power";
                kind: "numeric";
                multilanguage: false;
                index: 2;
              },
            ];
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
          index: 32;
        },
        {
          id: 33;
          name: "display";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 10;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
              {
                id: 1;
                name: "manufacturer";
                kind: "link";
                multilanguage: false;
                toTable: 5;
                toColumn: {
                  id: 1;
                  name: "identifier";
                  kind: "shorttext";
                  multilanguage: false;
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
                index: 0;
              },
              {
                id: 2;
                name: "identifier";
                kind: "shorttext";
                multilanguage: true;
                languageType: "language";
                index: 1;
              },
              {
                id: 3;
                name: "connectivity";
                kind: "link";
                multilanguage: true;
                languageType: "language";
                toTable: 8;
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
                index: 2;
              },
            ];
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
          index: 33;
        },
        {
          id: 34;
          name: "controlUnit";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 70;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
              {
                id: 1;
                name: "manufacturer";
                kind: "link";
                multilanguage: false;
                toTable: 5;
                toColumn: {
                  id: 1;
                  name: "identifier";
                  kind: "shorttext";
                  multilanguage: false;
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
                index: 0;
              },
              {
                id: 2;
                name: "identifier";
                kind: "shorttext";
                multilanguage: true;
                languageType: "language";
                index: 1;
              },
            ];
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
          index: 34;
        },
        {
          id: 35;
          name: "charger";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 92;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
              {
                id: 1;
                name: "manufacturer";
                kind: "link";
                multilanguage: false;
                toTable: 5;
                toColumn: {
                  id: 1;
                  name: "identifier";
                  kind: "shorttext";
                  multilanguage: false;
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
                index: 0;
              },
              {
                id: 2;
                name: "identifier";
                kind: "shorttext";
                multilanguage: true;
                languageType: "language";
                index: 1;
              },
            ];
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
          index: 35;
        },
        {
          id: 36;
          name: "fork";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 16;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
              {
                id: 1;
                name: "manufacturer";
                kind: "link";
                multilanguage: false;
                toTable: 5;
                toColumn: {
                  id: 1;
                  name: "identifier";
                  kind: "shorttext";
                  multilanguage: false;
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
                index: 0;
              },
              {
                id: 2;
                name: "identifier";
                kind: "shorttext";
                multilanguage: true;
                languageType: "language";
                index: 1;
              },
              {
                id: 3;
                name: "springMedium";
                kind: "link";
                multilanguage: true;
                languageType: "language";
                toTable: 12;
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
                index: 2;
              },
              {
                id: 4;
                name: "forkLength";
                kind: "numeric";
                multilanguage: false;
                index: 3;
              },
            ];
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
          index: 36;
        },
        {
          id: 37;
          name: "damper";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 17;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
              {
                id: 1;
                name: "manufacturer";
                kind: "link";
                multilanguage: false;
                toTable: 5;
                toColumn: {
                  id: 1;
                  name: "identifier";
                  kind: "shorttext";
                  multilanguage: false;
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
                index: 0;
              },
              {
                id: 2;
                name: "identifier";
                kind: "shorttext";
                multilanguage: true;
                languageType: "language";
                index: 1;
              },
              {
                id: 3;
                name: "springMedium";
                kind: "link";
                multilanguage: true;
                languageType: "language";
                toTable: 12;
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
                index: 2;
              },
            ];
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
          index: 37;
        },
        {
          id: 38;
          name: "chainGuard";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 19;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
              {
                id: 1;
                name: "manufacturer";
                kind: "link";
                multilanguage: false;
                toTable: 5;
                toColumn: {
                  id: 1;
                  name: "identifier";
                  kind: "shorttext";
                  multilanguage: false;
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
                index: 0;
              },
              {
                id: 2;
                name: "identifier";
                kind: "shorttext";
                multilanguage: true;
                languageType: "language";
                index: 1;
              },
            ];
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
          index: 38;
        },
        {
          id: 39;
          name: "chain";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 20;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
              {
                id: 1;
                name: "manufacturer";
                kind: "link";
                multilanguage: false;
                toTable: 5;
                toColumn: {
                  id: 1;
                  name: "identifier";
                  kind: "shorttext";
                  multilanguage: false;
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
                index: 0;
              },
              {
                id: 2;
                name: "identifier";
                kind: "shorttext";
                multilanguage: true;
                languageType: "language";
                index: 1;
              },
            ];
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
          index: 39;
        },
        {
          id: 40;
          name: "chainGuide";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 18;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
              {
                id: 1;
                name: "manufacturer";
                kind: "link";
                multilanguage: false;
                toTable: 5;
                toColumn: {
                  id: 1;
                  name: "identifier";
                  kind: "shorttext";
                  multilanguage: false;
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
                index: 0;
              },
              {
                id: 2;
                name: "identifier";
                kind: "shorttext";
                multilanguage: true;
                languageType: "language";
                index: 1;
              },
            ];
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
          index: 40;
        },
        {
          id: 41;
          name: "systemWheelSet";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 44;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
              {
                id: 1;
                name: "manufacturer";
                kind: "link";
                multilanguage: false;
                toTable: 5;
                toColumn: {
                  id: 1;
                  name: "identifier";
                  kind: "shorttext";
                  multilanguage: false;
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
                index: 0;
              },
              {
                id: 2;
                name: "identifier";
                kind: "shorttext";
                multilanguage: true;
                languageType: "language";
                index: 1;
              },
            ];
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
          index: 41;
        },
        {
          id: 42;
          name: "wheelSet";
          kind: "link";
          multilanguage: false;
          toTable: 51;
          toColumn: {
            id: 1;
            name: "internalName";
            kind: "shorttext";
            multilanguage: false;
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
          index: 42;
        },
        {
          id: 43;
          name: "tire";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 52;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
              {
                id: 1;
                name: "manufacturer";
                kind: "link";
                multilanguage: false;
                toTable: 5;
                toColumn: {
                  id: 1;
                  name: "identifier";
                  kind: "shorttext";
                  multilanguage: false;
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
                index: 0;
              },
              {
                id: 2;
                name: "identifier";
                kind: "shorttext";
                multilanguage: true;
                languageType: "language";
                index: 1;
              },
              {
                id: 3;
                name: "sizeEtrto";
                kind: "shorttext";
                multilanguage: false;
                index: 2;
              },
            ];
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
          index: 43;
        },
        {
          id: 44;
          name: "rearTire";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 52;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
              {
                id: 1;
                name: "manufacturer";
                kind: "link";
                multilanguage: false;
                toTable: 5;
                toColumn: {
                  id: 1;
                  name: "identifier";
                  kind: "shorttext";
                  multilanguage: false;
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
                index: 0;
              },
              {
                id: 2;
                name: "identifier";
                kind: "shorttext";
                multilanguage: true;
                languageType: "language";
                index: 1;
              },
              {
                id: 3;
                name: "sizeEtrto";
                kind: "shorttext";
                multilanguage: false;
                index: 2;
              },
            ];
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
          index: 44;
        },
        {
          id: 45;
          name: "tube";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 54;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
              {
                id: 1;
                name: "manufacturer";
                kind: "link";
                multilanguage: false;
                toTable: 5;
                toColumn: {
                  id: 1;
                  name: "identifier";
                  kind: "shorttext";
                  multilanguage: false;
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
                index: 0;
              },
              {
                id: 2;
                name: "identifier";
                kind: "shorttext";
                multilanguage: true;
                languageType: "language";
                index: 1;
              },
            ];
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
          index: 45;
        },
        {
          id: 46;
          name: "handlebar";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 56;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
              {
                id: 1;
                name: "manufacturer";
                kind: "link";
                multilanguage: false;
                toTable: 5;
                toColumn: {
                  id: 1;
                  name: "identifier";
                  kind: "shorttext";
                  multilanguage: false;
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
                index: 0;
              },
              {
                id: 2;
                name: "identifier";
                kind: "shorttext";
                multilanguage: true;
                languageType: "language";
                index: 1;
              },
            ];
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
          index: 46;
        },
        {
          id: 47;
          name: "grips";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 55;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
              {
                id: 1;
                name: "manufacturer";
                kind: "link";
                multilanguage: false;
                toTable: 5;
                toColumn: {
                  id: 1;
                  name: "identifier";
                  kind: "shorttext";
                  multilanguage: false;
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
                index: 0;
              },
              {
                id: 2;
                name: "identifier";
                kind: "shorttext";
                multilanguage: true;
                languageType: "language";
                index: 1;
              },
            ];
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
          index: 47;
        },
        {
          id: 48;
          name: "stem";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 59;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
              {
                id: 1;
                name: "manufacturer";
                kind: "link";
                multilanguage: false;
                toTable: 5;
                toColumn: {
                  id: 1;
                  name: "identifier";
                  kind: "shorttext";
                  multilanguage: false;
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
                index: 0;
              },
              {
                id: 2;
                name: "identifier";
                kind: "shorttext";
                multilanguage: true;
                languageType: "language";
                index: 1;
              },
              {
                id: 4;
                name: "stemSystem";
                kind: "link";
                multilanguage: false;
                toTable: 58;
                toColumn: {
                  id: 1;
                  name: "identifier";
                  kind: "shorttext";
                  multilanguage: false;
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
                index: 2;
              },
            ];
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
          index: 48;
        },
        {
          id: 49;
          name: "spacer";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 60;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
              {
                id: 1;
                name: "manufacturer";
                kind: "link";
                multilanguage: false;
                toTable: 5;
                toColumn: {
                  id: 1;
                  name: "identifier";
                  kind: "shorttext";
                  multilanguage: false;
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
                index: 0;
              },
              {
                id: 2;
                name: "identifier";
                kind: "shorttext";
                multilanguage: true;
                languageType: "language";
                index: 1;
              },
            ];
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
          index: 49;
        },
        {
          id: 50;
          name: "saddle";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 57;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
              {
                id: 1;
                name: "manufacturer";
                kind: "link";
                multilanguage: false;
                toTable: 5;
                toColumn: {
                  id: 1;
                  name: "identifier";
                  kind: "shorttext";
                  multilanguage: false;
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
                index: 0;
              },
              {
                id: 2;
                name: "identifier";
                kind: "shorttext";
                multilanguage: true;
                languageType: "language";
                index: 1;
              },
            ];
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
          index: 50;
        },
        {
          id: 51;
          name: "seatPost";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 64;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
              {
                id: 1;
                name: "manufacturer";
                kind: "link";
                multilanguage: false;
                toTable: 5;
                toColumn: {
                  id: 1;
                  name: "identifier";
                  kind: "shorttext";
                  multilanguage: false;
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
                index: 0;
              },
              {
                id: 2;
                name: "identifier";
                kind: "shorttext";
                multilanguage: true;
                languageType: "language";
                index: 1;
              },
            ];
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
          index: 51;
        },
        {
          id: 52;
          name: "saddleClamp";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 62;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
              {
                id: 1;
                name: "manufacturer";
                kind: "link";
                multilanguage: false;
                toTable: 5;
                toColumn: {
                  id: 1;
                  name: "identifier";
                  kind: "shorttext";
                  multilanguage: false;
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
                index: 0;
              },
              {
                id: 2;
                name: "identifier";
                kind: "shorttext";
                multilanguage: true;
                languageType: "language";
                index: 1;
              },
            ];
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
          index: 52;
        },
        {
          id: 53;
          name: "headlight";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 67;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
              {
                id: 1;
                name: "manufacturer";
                kind: "link";
                multilanguage: false;
                toTable: 5;
                toColumn: {
                  id: 1;
                  name: "identifier";
                  kind: "shorttext";
                  multilanguage: false;
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
                index: 0;
              },
              {
                id: 2;
                name: "identifier";
                kind: "shorttext";
                multilanguage: true;
                languageType: "language";
                index: 1;
              },
            ];
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
          index: 53;
        },
        {
          id: 54;
          name: "rearlight";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 66;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
              {
                id: 1;
                name: "manufacturer";
                kind: "link";
                multilanguage: false;
                toTable: 5;
                toColumn: {
                  id: 1;
                  name: "identifier";
                  kind: "shorttext";
                  multilanguage: false;
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
                index: 0;
              },
              {
                id: 2;
                name: "identifier";
                kind: "shorttext";
                multilanguage: true;
                languageType: "language";
                index: 1;
              },
            ];
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
          index: 54;
        },
        {
          id: 55;
          name: "dynamo";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 65;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
              {
                id: 1;
                name: "manufacturer";
                kind: "link";
                multilanguage: false;
                toTable: 5;
                toColumn: {
                  id: 1;
                  name: "identifier";
                  kind: "shorttext";
                  multilanguage: false;
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
                index: 0;
              },
              {
                id: 2;
                name: "identifier";
                kind: "shorttext";
                multilanguage: true;
                languageType: "language";
                index: 1;
              },
              {
                id: 3;
                name: "power";
                kind: "numeric";
                multilanguage: false;
                index: 2;
              },
            ];
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
          index: 55;
        },
        {
          id: 56;
          name: "carrier";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 77;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
              {
                id: 1;
                name: "manufacturer";
                kind: "link";
                multilanguage: false;
                toTable: 5;
                toColumn: {
                  id: 1;
                  name: "identifier";
                  kind: "shorttext";
                  multilanguage: false;
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
                index: 0;
              },
              {
                id: 2;
                name: "identifier";
                kind: "shorttext";
                multilanguage: true;
                languageType: "language";
                index: 1;
              },
              {
                id: 4;
                name: "carrierSystem";
                kind: "link";
                multilanguage: false;
                toTable: 76;
                toColumn: {
                  id: 1;
                  name: "identifier";
                  kind: "shorttext";
                  multilanguage: false;
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
                index: 2;
              },
            ];
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
          index: 56;
        },
        {
          id: 57;
          name: "mudguard";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 75;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
              {
                id: 1;
                name: "manufacturer";
                kind: "link";
                multilanguage: false;
                toTable: 5;
                toColumn: {
                  id: 1;
                  name: "identifier";
                  kind: "shorttext";
                  multilanguage: false;
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
                index: 0;
              },
              {
                id: 2;
                name: "identifier";
                kind: "shorttext";
                multilanguage: true;
                languageType: "language";
                index: 1;
              },
            ];
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
          index: 57;
        },
        {
          id: 58;
          name: "kickstand";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 74;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
              {
                id: 1;
                name: "manufacturer";
                kind: "link";
                multilanguage: false;
                toTable: 5;
                toColumn: {
                  id: 1;
                  name: "identifier";
                  kind: "shorttext";
                  multilanguage: false;
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
                index: 0;
              },
              {
                id: 2;
                name: "identifier";
                kind: "shorttext";
                multilanguage: true;
                languageType: "language";
                index: 1;
              },
              {
                id: 3;
                name: "standType";
                kind: "link";
                multilanguage: true;
                languageType: "language";
                toTable: 73;
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
                index: 2;
              },
            ];
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
          index: 58;
        },
        {
          id: 59;
          name: "pedals";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 72;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
              {
                id: 1;
                name: "manufacturer";
                kind: "link";
                multilanguage: false;
                toTable: 5;
                toColumn: {
                  id: 1;
                  name: "identifier";
                  kind: "shorttext";
                  multilanguage: false;
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
                index: 0;
              },
              {
                id: 2;
                name: "identifier";
                kind: "shorttext";
                multilanguage: true;
                languageType: "language";
                index: 1;
              },
            ];
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
          index: 59;
        },
        {
          id: 60;
          name: "lock";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 69;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
              {
                id: 1;
                name: "manufacturer";
                kind: "link";
                multilanguage: false;
                toTable: 5;
                toColumn: {
                  id: 1;
                  name: "identifier";
                  kind: "shorttext";
                  multilanguage: false;
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
                index: 0;
              },
              {
                id: 2;
                name: "identifier";
                kind: "shorttext";
                multilanguage: true;
                languageType: "language";
                index: 1;
              },
            ];
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
          index: 60;
        },
        {
          id: 61;
          name: "accessory";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 71;
          toColumn: {
            id: 1;
            name: "identifier";
            kind: "shorttext";
            multilanguage: true;
            languageType: "language";
          };
          index: 61;
        },
        {
          id: 62;
          name: "award";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 85;
          toColumn: {
            id: 1;
            name: "identifier";
            kind: "shorttext";
            multilanguage: true;
            languageType: "language";
          };
          index: 62;
        },
      ];
    },
  ];
}
