// override with init.js
declare module "grud-aggregator/structure" {
  export type Structure = {
    material: {
      id: 1;
      name: "material";
      langtags: ["de-DE", "en-GB"];
      columns: {
        identifier: {
          id: 1;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 0;
        };
      };
    };
    color: {
      id: 2;
      name: "color";
      langtags: ["de-DE", "en-GB"];
      concatFormatPattern: "{{1}} | {{2}}";
      columns: {
        ID: {
          id: 0;
          name: "ID";
          kind: "concat";
          multilanguage: true;
          languageType: "language";
          concats: [
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
          formatPattern: "{{1}} | {{2}}";
          index: 0;
        };
        name: {
          id: 1;
          name: "name";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 1;
        };
        hexcode: {
          id: 2;
          name: "hexcode";
          kind: "shorttext";
          multilanguage: false;
          index: 2;
        };
      };
    };
    glossGrade: {
      id: 3;
      name: "glossGrade";
      langtags: ["de-DE", "en-GB"];
      columns: {
        identifier: {
          id: 1;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 0;
        };
      };
    };
    marketingColor: {
      id: 4;
      name: "marketingColor";
      langtags: ["de-DE", "en-GB"];
      columns: {
        ID: {
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
        };
        identifier: {
          id: 1;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 1;
        };
        mainColor: {
          id: 2;
          name: "mainColor";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 2;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
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
            formatPattern: "{{1}} | {{2}}";
          };
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
        };
        partialColor1: {
          id: 3;
          name: "partialColor1";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 2;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
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
            formatPattern: "{{1}} | {{2}}";
          };
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
        };
        partialColor2: {
          id: 4;
          name: "partialColor2";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 2;
          toColumn: {
            id: 0;
            name: "ID";
            kind: "concat";
            multilanguage: true;
            languageType: "language";
            concats: [
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
            formatPattern: "{{1}} | {{2}}";
          };
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
        };
        glossGrade: {
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
        };
      };
    };
    manufacturer: {
      id: 5;
      name: "manufacturer";
      langtags: ["de-DE", "en-GB"];
      columns: {
        identifier: {
          id: 1;
          name: "identifier";
          kind: "shorttext";
          multilanguage: false;
          index: 0;
        };
      };
    };
    engine: {
      id: 6;
      name: "engine";
      langtags: ["de-DE", "en-GB"];
      columns: {
        ID: {
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
        };
        manufacturer: {
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
        };
        identifier: {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        };
        power: {
          id: 3;
          name: "power";
          kind: "numeric";
          multilanguage: false;
          index: 3;
        };
        torque: {
          id: 4;
          name: "torque";
          kind: "numeric";
          multilanguage: false;
          index: 4;
        };
        speedLimit: {
          id: 5;
          name: "speedLimit";
          kind: "numeric";
          multilanguage: false;
          index: 5;
        };
        levelsOfAssistance: {
          id: 6;
          name: "levelsOfAssistance";
          kind: "numeric";
          multilanguage: false;
          index: 6;
        };
      };
    };
    headSet: {
      id: 7;
      name: "headSet";
      langtags: ["de-DE", "en-GB"];
      columns: {
        ID: {
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
        };
        manufacturer: {
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
        };
        identifier: {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        };
        material: {
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
        };
      };
    };
    connectivity: {
      id: 8;
      name: "connectivity";
      langtags: ["de-DE", "en-GB"];
      columns: {
        identifier: {
          id: 1;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 0;
        };
      };
    };
    displayColor: {
      id: 9;
      name: "displayColor";
      langtags: ["de-DE", "en-GB"];
      columns: {
        identifier: {
          id: 1;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 0;
        };
      };
    };
    display: {
      id: 10;
      name: "display";
      langtags: ["de-DE", "en-GB"];
      columns: {
        ID: {
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
        };
        manufacturer: {
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
        };
        identifier: {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        };
        connectivity: {
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
        };
        isDetachable: {
          id: 4;
          name: "isDetachable";
          kind: "boolean";
          multilanguage: false;
          index: 4;
        };
        displayColor: {
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
        };
        hasNavigation: {
          id: 6;
          name: "hasNavigation";
          kind: "boolean";
          multilanguage: false;
          index: 6;
        };
      };
    };
    lockout: {
      id: 11;
      name: "lockout";
      langtags: ["de-DE", "en-GB"];
      columns: {
        identifier: {
          id: 1;
          name: "identifier";
          kind: "shorttext";
          multilanguage: false;
          index: 0;
        };
      };
    };
    springMedium: {
      id: 12;
      name: "springMedium";
      langtags: ["de-DE", "en-GB"];
      columns: {
        identifier: {
          id: 1;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 0;
        };
      };
    };
    axle: {
      id: 13;
      name: "axle";
      langtags: ["de-DE", "en-GB"];
      columns: {
        identifier: {
          id: 1;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 0;
        };
      };
    };
    steerTube: {
      id: 14;
      name: "steerTube";
      langtags: ["de-DE", "en-GB"];
      columns: {
        identifier: {
          id: 1;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 0;
        };
        material: {
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
        };
      };
    };
    wheelSize: {
      id: 15;
      name: "wheelSize";
      langtags: ["de-DE", "en-GB"];
      columns: {
        ID: {
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
        };
        wheelSize: {
          id: 1;
          name: "wheelSize";
          kind: "numeric";
          multilanguage: false;
          index: 1;
        };
        hasPlusTire: {
          id: 2;
          name: "hasPlusTire";
          kind: "boolean";
          multilanguage: false;
          index: 2;
        };
      };
    };
    fork: {
      id: 16;
      name: "fork";
      langtags: ["de-DE", "en-GB"];
      columns: {
        ID: {
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
        };
        manufacturer: {
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
        };
        identifier: {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        };
        springMedium: {
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
        };
        forkLength: {
          id: 4;
          name: "forkLength";
          kind: "numeric";
          multilanguage: false;
          index: 4;
        };
        axle: {
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
        };
        steerTube: {
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
        };
        lockout: {
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
        };
      };
    };
    damper: {
      id: 17;
      name: "damper";
      langtags: ["de-DE", "en-GB"];
      columns: {
        ID: {
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
        };
        manufacturer: {
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
        };
        identifier: {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        };
        springMedium: {
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
        };
        lockout: {
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
        };
      };
    };
    chainGuide: {
      id: 18;
      name: "chainGuide";
      langtags: ["de-DE", "en-GB"];
      columns: {
        ID: {
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
        };
        manufacturer: {
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
        };
        identifier: {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        };
      };
    };
    chainGuard: {
      id: 19;
      name: "chainGuard";
      langtags: ["de-DE", "en-GB"];
      columns: {
        ID: {
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
        };
        manufacturer: {
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
        };
        identifier: {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        };
        marketingIdentifier: {
          id: 3;
          name: "marketingIdentifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 3;
        };
      };
    };
    chain: {
      id: 20;
      name: "chain";
      langtags: ["de-DE", "en-GB"];
      columns: {
        ID: {
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
        };
        manufacturer: {
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
        };
        identifier: {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        };
      };
    };
    assemblySide: {
      id: 21;
      name: "assemblySide";
      langtags: ["de-DE", "en-GB"];
      columns: {
        identifier: {
          id: 1;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 0;
        };
      };
    };
    gripWidth: {
      id: 22;
      name: "gripWidth";
      langtags: ["de-DE", "en-GB"];
      columns: {
        identifier: {
          id: 1;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 0;
        };
      };
    };
    brakeLever: {
      id: 23;
      name: "brakeLever";
      langtags: ["de-DE", "en-GB"];
      columns: {
        ID: {
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
        };
        manufacturer: {
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
        };
        identifier: {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        };
        gripWidth: {
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
        };
        gripWidthAdjustable: {
          id: 4;
          name: "gripWidthAdjustable";
          kind: "boolean";
          multilanguage: false;
          index: 4;
        };
        material: {
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
        };
        marketingColor: {
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
        };
        assemblySide: {
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
        };
      };
    };
    brakeKind: {
      id: 24;
      name: "brakeKind";
      langtags: ["de-DE", "en-GB"];
      columns: {
        identifier: {
          id: 1;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 0;
        };
        bidexCode: {
          id: 2;
          name: "bidexCode";
          kind: "shorttext";
          multilanguage: false;
          index: 1;
        };
      };
    };
    brake: {
      id: 25;
      name: "brake";
      langtags: ["de-DE", "en-GB"];
      columns: {
        ID: {
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
        };
        manufacturer: {
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
        };
        identifier: {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        };
        brakeKind: {
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
          index: 3;
        };
      };
    };
    discBrakeSystem: {
      id: 26;
      name: "discBrakeSystem";
      langtags: ["de-DE", "en-GB"];
      columns: {
        identifier: {
          id: 1;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 0;
        };
      };
    };
    coolingMechanism: {
      id: 27;
      name: "coolingMechanism";
      langtags: ["de-DE", "en-GB"];
      columns: {
        identifier: {
          id: 1;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 0;
        };
      };
    };
    brakeDisc: {
      id: 28;
      name: "brakeDisc";
      langtags: ["de-DE", "en-GB"];
      columns: {
        ID: {
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
        };
        manufacturer: {
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
        };
        identifier: {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        };
        discBrakeSystem: {
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
        };
        size: {
          id: 4;
          name: "size";
          kind: "numeric";
          multilanguage: false;
          index: 4;
        };
        material: {
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
        };
        coolingMechanism: {
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
        };
      };
    };
    gearLeverType: {
      id: 29;
      name: "gearLeverType";
      langtags: ["de-DE", "en-GB"];
      columns: {
        identifier: {
          id: 1;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 0;
        };
      };
    };
    gearLever: {
      id: 30;
      name: "gearLever";
      langtags: ["de-DE", "en-GB"];
      columns: {
        ID: {
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
        };
        manufacturer: {
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
        };
        identifier: {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        };
        gearLeverType: {
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
        };
        isElectronic: {
          id: 4;
          name: "isElectronic";
          kind: "boolean";
          multilanguage: false;
          index: 4;
        };
      };
    };
    derailleurType: {
      id: 31;
      name: "derailleurType";
      langtags: ["de-DE", "en-GB"];
      columns: {
        identifier: {
          id: 1;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 0;
        };
      };
    };
    derailleur: {
      id: 32;
      name: "derailleur";
      langtags: ["de-DE", "en-GB"];
      columns: {
        ID: {
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
        };
        manufacturer: {
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
        };
        identifier: {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        };
        derailleurType: {
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
        };
        isElectronic: {
          id: 4;
          name: "isElectronic";
          kind: "boolean";
          multilanguage: false;
          index: 4;
        };
      };
    };
    rearDerailleur: {
      id: 33;
      name: "rearDerailleur";
      langtags: ["de-DE", "en-GB"];
      columns: {
        ID: {
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
        };
        manufacturer: {
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
        };
        identifier: {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        };
        isElectronic: {
          id: 3;
          name: "isElectronic";
          kind: "boolean";
          multilanguage: false;
          index: 3;
        };
      };
    };
    gearHub: {
      id: 34;
      name: "gearHub";
      langtags: ["de-DE", "en-GB"];
      columns: {
        ID: {
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
        };
        manufacturer: {
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
        };
        identifier: {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        };
        isElectronic: {
          id: 3;
          name: "isElectronic";
          kind: "boolean";
          multilanguage: false;
          index: 3;
        };
      };
    };
    cassette: {
      id: 35;
      name: "cassette";
      langtags: ["de-DE", "en-GB"];
      columns: {
        ID: {
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
        };
        manufacturer: {
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
        };
        identifier: {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        };
        numberOfGears: {
          id: 3;
          name: "numberOfGears";
          kind: "numeric";
          multilanguage: false;
          index: 3;
        };
        numberOfTeethMin: {
          id: 4;
          name: "numberOfTeethMin";
          kind: "numeric";
          multilanguage: false;
          index: 4;
        };
        numberOfTeethMax: {
          id: 5;
          name: "numberOfTeethMax";
          kind: "numeric";
          multilanguage: false;
          index: 5;
        };
        marketingColor: {
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
        };
      };
    };
    sprocket: {
      id: 36;
      name: "sprocket";
      langtags: ["de-DE", "en-GB"];
      columns: {
        ID: {
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
        };
        manufacturer: {
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
        };
        identifier: {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        };
        numberOfTeeth: {
          id: 3;
          name: "numberOfTeeth";
          kind: "numeric";
          multilanguage: false;
          index: 3;
        };
        marketingColor: {
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
        };
      };
    };
    crankset: {
      id: 37;
      name: "crankset";
      langtags: ["de-DE", "en-GB"];
      columns: {
        ID: {
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
        };
        manufacturer: {
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
        };
        identifier: {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        };
        marketingIdentifier: {
          id: 3;
          name: "marketingIdentifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 3;
        };
        numberOfTeethLarge: {
          id: 4;
          name: "numberOfTeethLarge";
          kind: "numeric";
          multilanguage: false;
          index: 4;
        };
        numberOfTeethMedium: {
          id: 5;
          name: "numberOfTeethMedium";
          kind: "numeric";
          multilanguage: false;
          index: 5;
        };
        numberOfTeethSmall: {
          id: 6;
          name: "numberOfTeethSmall";
          kind: "numeric";
          multilanguage: false;
          index: 6;
        };
        material: {
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
        };
        marketingColor: {
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
        };
      };
    };
    chainRing: {
      id: 38;
      name: "chainRing";
      langtags: ["de-DE", "en-GB"];
      columns: {
        ID: {
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
        };
        manufacturer: {
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
        };
        identifier: {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        };
        numberOfTeethMin: {
          id: 3;
          name: "numberOfTeethMin";
          kind: "numeric";
          multilanguage: false;
          index: 3;
        };
        numberOfTeethMax: {
          id: 4;
          name: "numberOfTeethMax";
          kind: "numeric";
          multilanguage: false;
          index: 4;
        };
        material: {
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
        };
        marketingColor: {
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
        };
      };
    };
    crankAdmission: {
      id: 39;
      name: "crankAdmission";
      langtags: ["de-DE", "en-GB"];
      columns: {
        identifier: {
          id: 1;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 0;
        };
      };
    };
    crankArms: {
      id: 40;
      name: "crankArms";
      langtags: ["de-DE", "en-GB"];
      columns: {
        ID: {
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
        };
        manufacturer: {
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
        };
        identifier: {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        };
        marketingIdentifier: {
          id: 3;
          name: "marketingIdentifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 3;
        };
        material: {
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
        };
        crankAdmission: {
          id: 5;
          name: "crankAdmission";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 39;
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
        };
        marketingColor: {
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
        };
      };
    };
    bottomBracketSystem: {
      id: 41;
      name: "bottomBracketSystem";
      langtags: ["de-DE", "en-GB"];
      columns: {
        identifier: {
          id: 1;
          name: "identifier";
          kind: "shorttext";
          multilanguage: false;
          index: 0;
        };
      };
    };
    bottomBracket: {
      id: 42;
      name: "bottomBracket";
      langtags: ["de-DE", "en-GB"];
      columns: {
        ID: {
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
              toTable: 41;
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
        };
        manufacturer: {
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
        };
        identifier: {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        };
        bottomBracketSystem: {
          id: 3;
          name: "bottomBracketSystem";
          kind: "link";
          multilanguage: false;
          toTable: 41;
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
        };
        axleLength: {
          id: 4;
          name: "axleLength";
          kind: "numeric";
          multilanguage: false;
          index: 4;
        };
        crankAdmission: {
          id: 5;
          name: "crankAdmission";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 39;
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
        };
      };
    };
    systemWheelSet: {
      id: 43;
      name: "systemWheelSet";
      langtags: ["de-DE", "en-GB"];
      columns: {
        ID: {
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
        };
        manufacturer: {
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
        };
        identifier: {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        };
        isTubeless: {
          id: 3;
          name: "isTubeless";
          kind: "boolean";
          multilanguage: false;
          index: 3;
        };
        isTubelessReady: {
          id: 4;
          name: "isTubelessReady";
          kind: "boolean";
          multilanguage: false;
          index: 4;
        };
        isBoost: {
          id: 5;
          name: "isBoost";
          kind: "boolean";
          multilanguage: false;
          index: 5;
        };
        marketingColor: {
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
        };
      };
    };
    frontWheelHub: {
      id: 44;
      name: "frontWheelHub";
      langtags: ["de-DE", "en-GB"];
      columns: {
        ID: {
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
        };
        manufacturer: {
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
        };
        identifier: {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        };
        discBrakeSystem: {
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
        };
        isBoost: {
          id: 4;
          name: "isBoost";
          kind: "boolean";
          multilanguage: false;
          index: 4;
        };
        marketingColor: {
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
        };
      };
    };
    freeWheel: {
      id: 45;
      name: "freeWheel";
      langtags: ["de-DE", "en-GB"];
      columns: {
        ID: {
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
        };
        manufacturer: {
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
        };
        identifier: {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        };
      };
    };
    axleStandard: {
      id: 46;
      name: "axleStandard";
      langtags: ["de-DE", "en-GB"];
      columns: {
        identifier: {
          id: 1;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 0;
        };
      };
    };
    rearWheelHub: {
      id: 47;
      name: "rearWheelHub";
      langtags: ["de-DE", "en-GB"];
      columns: {
        ID: {
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
        };
        manufacturer: {
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
        };
        identifier: {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        };
        discBrakeSystem: {
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
        };
        axleStandard: {
          id: 4;
          name: "axleStandard";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 46;
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
        };
        freeWheel: {
          id: 5;
          name: "freeWheel";
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
          index: 5;
        };
        isBoost: {
          id: 6;
          name: "isBoost";
          kind: "boolean";
          multilanguage: false;
          index: 6;
        };
        marketingColor: {
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
        };
      };
    };
    rim: {
      id: 48;
      name: "rim";
      langtags: ["de-DE", "en-GB"];
      columns: {
        ID: {
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
        };
        manufacturer: {
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
        };
        identifier: {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        };
        hasEyelets: {
          id: 3;
          name: "hasEyelets";
          kind: "boolean";
          multilanguage: false;
          index: 3;
        };
        hasDoubleWall: {
          id: 4;
          name: "hasDoubleWall";
          kind: "boolean";
          multilanguage: false;
          index: 4;
        };
        isTubelessReady: {
          id: 5;
          name: "isTubelessReady";
          kind: "boolean";
          multilanguage: false;
          index: 5;
        };
        material: {
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
        };
      };
    };
    spokes: {
      id: 49;
      name: "spokes";
      langtags: ["de-DE", "en-GB"];
      columns: {
        ID: {
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
        };
        manufacturer: {
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
        };
        identifier: {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        };
        marketingColor: {
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
        };
      };
    };
    wheelSet: {
      id: 50;
      name: "wheelSet";
      langtags: ["de-DE", "en-GB"];
      columns: {
        identifier: {
          id: 1;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 0;
        };
        frontWheelHub: {
          id: 2;
          name: "frontWheelHub";
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
          index: 1;
        };
        rearWheelHub: {
          id: 3;
          name: "rearWheelHub";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 47;
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
        };
        frontRim: {
          id: 4;
          name: "frontRim";
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
          index: 3;
        };
        rearRim: {
          id: 5;
          name: "rearRim";
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
          index: 4;
        };
        spokes: {
          id: 6;
          name: "spokes";
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
          index: 5;
        };
        numberOfSpokes: {
          id: 7;
          name: "numberOfSpokes";
          kind: "numeric";
          multilanguage: false;
          index: 6;
        };
        spokesLengthFrontLeft: {
          id: 8;
          name: "spokesLengthFrontLeft";
          kind: "numeric";
          multilanguage: false;
          index: 7;
        };
        spokesLengthFrontRight: {
          id: 9;
          name: "spokesLengthFrontRight";
          kind: "numeric";
          multilanguage: false;
          index: 8;
        };
        spokesLengthRearLeft: {
          id: 10;
          name: "spokesLengthRearLeft";
          kind: "numeric";
          multilanguage: false;
          index: 9;
        };
        spokesLengthRearRight: {
          id: 11;
          name: "spokesLengthRearRight";
          kind: "numeric";
          multilanguage: false;
          index: 10;
        };
      };
    };
    tire: {
      id: 51;
      name: "tire";
      langtags: ["de-DE", "en-GB"];
      columns: {
        ID: {
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
        };
        manufacturer: {
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
        };
        identifier: {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        };
        sizeEtrto: {
          id: 3;
          name: "sizeEtrto";
          kind: "shorttext";
          multilanguage: false;
          index: 3;
        };
        sizeDiameterInch: {
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
        };
        sizeWidthInch: {
          id: 5;
          name: "sizeWidthInch";
          kind: "numeric";
          multilanguage: false;
          index: 5;
        };
        punctureProtection: {
          id: 6;
          name: "punctureProtection";
          kind: "boolean";
          multilanguage: false;
          index: 6;
        };
        hasReflectiveStrips: {
          id: 7;
          name: "hasReflectiveStrips";
          kind: "boolean";
          multilanguage: false;
          index: 7;
        };
        isCollapsible: {
          id: 8;
          name: "isCollapsible";
          kind: "boolean";
          multilanguage: false;
          index: 8;
        };
      };
    };
    valve: {
      id: 52;
      name: "valve";
      langtags: ["de-DE", "en-GB"];
      columns: {
        identifier: {
          id: 1;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 0;
        };
      };
    };
    tube: {
      id: 53;
      name: "tube";
      langtags: ["de-DE", "en-GB"];
      columns: {
        ID: {
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
        };
        manufacturer: {
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
        };
        identifier: {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        };
        valve: {
          id: 3;
          name: "valve";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 52;
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
        };
      };
    };
    grips: {
      id: 54;
      name: "grips";
      langtags: ["de-DE", "en-GB"];
      columns: {
        ID: {
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
        };
        manufacturer: {
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
        };
        identifier: {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        };
        marketingIdentifier: {
          id: 3;
          name: "marketingIdentifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 3;
        };
        lengthLeft: {
          id: 4;
          name: "lengthLeft";
          kind: "numeric";
          multilanguage: false;
          index: 4;
        };
        lengthRight: {
          id: 5;
          name: "lengthRight";
          kind: "numeric";
          multilanguage: false;
          index: 5;
        };
        marketingColor: {
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
        };
      };
    };
    handlebar: {
      id: 55;
      name: "handlebar";
      langtags: ["de-DE", "en-GB"];
      columns: {
        ID: {
          id: 10;
          name: "ID";
          kind: "group";
          multilanguage: true;
          languageType: "language";
          groups: [
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
              index: 2;
            },
          ];
          formatPattern: "{{1}} | {{2}} |  {{4}}";
          index: 0;
        };
        manufacturer: {
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
        };
        identifier: {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        };
        marketingIdentifier: {
          id: 3;
          name: "marketingIdentifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 3;
        };
        material: {
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
        };
        rise: {
          id: 5;
          name: "rise";
          kind: "numeric";
          multilanguage: false;
          index: 5;
        };
        backSweep: {
          id: 6;
          name: "backSweep";
          kind: "numeric";
          multilanguage: false;
          index: 6;
        };
        upSweep: {
          id: 7;
          name: "upSweep";
          kind: "numeric";
          multilanguage: false;
          index: 7;
        };
        clampingDiameter: {
          id: 8;
          name: "clampingDiameter";
          kind: "numeric";
          multilanguage: false;
          index: 8;
        };
        marketingColor: {
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
        };
      };
    };
    saddle: {
      id: 56;
      name: "saddle";
      langtags: ["de-DE", "en-GB"];
      columns: {
        ID: {
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
        };
        manufacturer: {
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
        };
        identifier: {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        };
        marketingIdentifier: {
          id: 3;
          name: "marketingIdentifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 3;
        };
        marketingColor: {
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
        };
      };
    };
    stemSystem: {
      id: 57;
      name: "stemSystem";
      langtags: ["de-DE", "en-GB"];
      columns: {
        identifier: {
          id: 1;
          name: "identifier";
          kind: "shorttext";
          multilanguage: false;
          index: 0;
        };
      };
    };
    stem: {
      id: 58;
      name: "stem";
      langtags: ["de-DE", "en-GB"];
      columns: {
        ID: {
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
              toTable: 57;
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
        };
        manufacturer: {
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
        };
        identifier: {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        };
        marketingIdentifier: {
          id: 3;
          name: "marketingIdentifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 3;
        };
        stemSystem: {
          id: 4;
          name: "stemSystem";
          kind: "link";
          multilanguage: false;
          toTable: 57;
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
        };
        adjustmentMin: {
          id: 5;
          name: "adjustmentMin";
          kind: "numeric";
          multilanguage: false;
          index: 5;
        };
        adjustmentMax: {
          id: 6;
          name: "adjustmentMax";
          kind: "numeric";
          multilanguage: false;
          index: 6;
        };
        handlebarWidth: {
          id: 7;
          name: "handlebarWidth";
          kind: "numeric";
          multilanguage: false;
          index: 7;
        };
        angle: {
          id: 8;
          name: "angle";
          kind: "numeric";
          multilanguage: false;
          index: 8;
        };
        marketingColor: {
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
        };
      };
    };
    spacer: {
      id: 59;
      name: "spacer";
      langtags: ["de-DE", "en-GB"];
      columns: {
        ID: {
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
        };
        manufacturer: {
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
        };
        identifier: {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        };
        material: {
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
        };
        height: {
          id: 4;
          name: "height";
          kind: "numeric";
          multilanguage: false;
          index: 4;
        };
        innerDiameter: {
          id: 5;
          name: "innerDiameter";
          kind: "numeric";
          multilanguage: false;
          index: 5;
        };
        marketingColor: {
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
        };
      };
    };
    saddleClampSystem: {
      id: 60;
      name: "saddleClampSystem";
      langtags: ["de-DE", "en-GB"];
      columns: {
        identifier: {
          id: 1;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 0;
        };
      };
    };
    saddleClamp: {
      id: 61;
      name: "saddleClamp";
      langtags: ["de-DE", "en-GB"];
      columns: {
        ID: {
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
        };
        manufacturer: {
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
        };
        identifier: {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        };
        marketingIdentifier: {
          id: 3;
          name: "marketingIdentifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 3;
        };
        saddleClampSystem: {
          id: 4;
          name: "saddleClampSystem";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 60;
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
        };
        innerDiameter: {
          id: 5;
          name: "innerDiameter";
          kind: "numeric";
          multilanguage: false;
          index: 5;
        };
        marketingColor: {
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
        };
      };
    };
    seatPostType: {
      id: 62;
      name: "seatPostType";
      langtags: ["de-DE", "en-GB"];
      columns: {
        ID: {
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
        };
        identifier: {
          id: 1;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 1;
        };
        springDeflection: {
          id: 2;
          name: "springDeflection";
          kind: "numeric";
          multilanguage: false;
          index: 2;
        };
        permittedTotalWeight: {
          id: 3;
          name: "permittedTotalWeight";
          kind: "numeric";
          multilanguage: false;
          index: 3;
        };
        adjustmentRange: {
          id: 4;
          name: "adjustmentRange";
          kind: "numeric";
          multilanguage: false;
          index: 4;
        };
      };
    };
    seatPost: {
      id: 63;
      name: "seatPost";
      langtags: ["de-DE", "en-GB"];
      columns: {
        ID: {
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
        };
        manufacturer: {
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
        };
        identifier: {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        };
        marketingIdentifier: {
          id: 3;
          name: "marketingIdentifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 3;
        };
        material: {
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
        };
        seatPostType: {
          id: 5;
          name: "seatPostType";
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
        };
        diameter: {
          id: 6;
          name: "diameter";
          kind: "numeric";
          multilanguage: false;
          index: 6;
        };
      };
    };
    dynamo: {
      id: 64;
      name: "dynamo";
      langtags: ["de-DE", "en-GB"];
      concatFormatPattern: "{{1}} | {{2}} | {{3}}";
      columns: {
        ID: {
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
          formatPattern: "{{1}} | {{2}} | {{3}}";
          index: 0;
        };
        manufacturer: {
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
        };
        identifier: {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        };
        power: {
          id: 3;
          name: "power";
          kind: "numeric";
          multilanguage: false;
          index: 3;
        };
      };
    };
    rearlight: {
      id: 65;
      name: "rearlight";
      langtags: ["de-DE", "en-GB"];
      columns: {
        ID: {
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
        };
        manufacturer: {
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
        };
        identifier: {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        };
        hasParkingLight: {
          id: 3;
          name: "hasParkingLight";
          kind: "boolean";
          multilanguage: false;
          index: 3;
        };
        hasBrakeLightFunction: {
          id: 4;
          name: "hasBrakeLightFunction";
          kind: "boolean";
          multilanguage: false;
          index: 4;
        };
      };
    };
    headlight: {
      id: 66;
      name: "headlight";
      langtags: ["de-DE", "en-GB"];
      columns: {
        ID: {
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
        };
        manufacturer: {
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
        };
        identifier: {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        };
        lumenOutput: {
          id: 3;
          name: "lumenOutput";
          kind: "numeric";
          multilanguage: false;
          index: 3;
        };
        hasParkingLight: {
          id: 4;
          name: "hasParkingLight";
          kind: "boolean";
          multilanguage: false;
          index: 4;
        };
        hasFloodLightFunction: {
          id: 5;
          name: "hasFloodLightFunction";
          kind: "boolean";
          multilanguage: false;
          index: 5;
        };
        hasAutomaticSensor: {
          id: 6;
          name: "hasAutomaticSensor";
          kind: "boolean";
          multilanguage: false;
          index: 6;
        };
        marketingColor: {
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
        };
      };
    };
    lockType: {
      id: 67;
      name: "lockType";
      langtags: ["de-DE", "en-GB"];
      columns: {
        identifier: {
          id: 1;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 0;
        };
      };
    };
    lock: {
      id: 68;
      name: "lock";
      langtags: ["de-DE", "en-GB"];
      columns: {
        ID: {
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
        };
        manufacturer: {
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
        };
        identifier: {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        };
        lockType: {
          id: 3;
          name: "lockType";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 67;
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
        };
        isElectronic: {
          id: 4;
          name: "isElectronic";
          kind: "boolean";
          multilanguage: false;
          index: 4;
        };
      };
    };
    controlUnit: {
      id: 69;
      name: "controlUnit";
      langtags: ["de-DE", "en-GB"];
      columns: {
        ID: {
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
        };
        manufacturer: {
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
        };
        identifier: {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        };
      };
    };
    accessory: {
      id: 70;
      name: "accessory";
      langtags: ["de-DE", "en-GB"];
      columns: {
        identifier: {
          id: 1;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 0;
        };
      };
    };
    pedals: {
      id: 71;
      name: "pedals";
      langtags: ["de-DE", "en-GB"];
      concatFormatPattern: "{{2}} | {{1}}";
      columns: {
        ID: {
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
          formatPattern: "{{2}} | {{1}}";
          index: 0;
        };
        manufacturer: {
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
        };
        identifier: {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        };
        marketingIdentifier: {
          id: 3;
          name: "marketingIdentifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 3;
        };
        material: {
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
        };
        marketingColor: {
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
        };
      };
    };
    standType: {
      id: 72;
      name: "standType";
      langtags: ["de-DE", "en-GB"];
      columns: {
        identifier: {
          id: 1;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 0;
        };
      };
    };
    kickstand: {
      id: 73;
      name: "kickstand";
      langtags: ["de-DE", "en-GB"];
      columns: {
        ID: {
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
              toTable: 72;
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
        };
        manufacturer: {
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
        };
        identifier: {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        };
        standType: {
          id: 3;
          name: "standType";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 72;
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
        };
        isAdjustable: {
          id: 4;
          name: "isAdjustable";
          kind: "boolean";
          multilanguage: false;
          index: 4;
        };
        marketingColor: {
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
        };
      };
    };
    mudguard: {
      id: 74;
      name: "mudguard";
      langtags: ["de-DE", "en-GB"];
      columns: {
        ID: {
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
        };
        manufacturer: {
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
        };
        identifier: {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        };
        marketingIdentifier: {
          id: 3;
          name: "marketingIdentifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 3;
        };
        material: {
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
        };
        width: {
          id: 5;
          name: "width";
          kind: "numeric";
          multilanguage: false;
          index: 5;
        };
        marketingColor: {
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
        };
      };
    };
    carrierSystem: {
      id: 75;
      name: "carrierSystem";
      langtags: ["de-DE", "en-GB"];
      columns: {
        identifier: {
          id: 1;
          name: "identifier";
          kind: "shorttext";
          multilanguage: false;
          index: 0;
        };
      };
    };
    carrier: {
      id: 76;
      name: "carrier";
      langtags: ["de-DE", "en-GB"];
      columns: {
        ID: {
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
              toTable: 75;
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
        };
        manufacturer: {
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
        };
        identifier: {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        };
        material: {
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
        };
        carrierSystem: {
          id: 4;
          name: "carrierSystem";
          kind: "link";
          multilanguage: false;
          toTable: 75;
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
        };
        maxPayload: {
          id: 5;
          name: "maxPayload";
          kind: "numeric";
          multilanguage: false;
          index: 5;
        };
        marketingColor: {
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
        };
      };
    };
    marketingCategory: {
      id: 77;
      name: "marketingCategory";
      langtags: ["de-DE", "en-GB"];
      type: "taxonomy";
      columns: {
        name: {
          id: 1;
          name: "name";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 0;
        };
        ordering: {
          id: 2;
          name: "ordering";
          kind: "numeric";
          multilanguage: false;
          index: 1;
        };
        code: {
          id: 3;
          name: "code";
          kind: "shorttext";
          multilanguage: false;
          index: 2;
        };
        parent: {
          id: 4;
          name: "parent";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 77;
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
        };
      };
    };
    bikeType: {
      id: 78;
      name: "bikeType";
      langtags: ["de-DE", "en-GB"];
      type: "taxonomy";
      columns: {
        name: {
          id: 1;
          name: "name";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 0;
        };
        ordering: {
          id: 2;
          name: "ordering";
          kind: "numeric";
          multilanguage: false;
          index: 1;
        };
        code: {
          id: 3;
          name: "code";
          kind: "shorttext";
          multilanguage: false;
          index: 2;
        };
        parent: {
          id: 4;
          name: "parent";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 78;
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
        };
      };
    };
    batteryPackType: {
      id: 79;
      name: "batteryPackType";
      langtags: ["de-DE", "en-GB"];
      columns: {
        identifier: {
          id: 1;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 0;
        };
      };
    };
    chargingVoltage: {
      id: 80;
      name: "chargingVoltage";
      langtags: ["de-DE", "en-GB"];
      columns: {
        identifier: {
          id: 1;
          name: "identifier";
          kind: "shorttext";
          multilanguage: false;
          index: 0;
        };
      };
    };
    batteryPack: {
      id: 81;
      name: "batteryPack";
      langtags: ["de-DE", "en-GB"];
      columns: {
        ID: {
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
              index: 3;
            },
          ];
          index: 0;
        };
        manufacturer: {
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
        };
        identifier: {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        };
        capacity: {
          id: 3;
          name: "capacity";
          kind: "numeric";
          multilanguage: false;
          index: 3;
        };
        batteryPackType: {
          id: 4;
          name: "batteryPackType";
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
          index: 4;
        };
        chargingVoltage: {
          id: 5;
          name: "chargingVoltage";
          kind: "link";
          multilanguage: false;
          toTable: 80;
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
        };
      };
    };
    modelYear: {
      id: 82;
      name: "modelYear";
      langtags: ["de-DE", "en-GB"];
      columns: {
        identifier: {
          id: 1;
          name: "identifier";
          kind: "numeric";
          multilanguage: false;
          index: 0;
        };
      };
    };
    award: {
      id: 83;
      name: "award";
      langtags: ["de-DE", "en-GB"];
      columns: {
        identifier: {
          id: 1;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 0;
        };
        image: {
          id: 2;
          name: "image";
          kind: "attachment";
          multilanguage: false;
          index: 1;
        };
        url: {
          id: 3;
          name: "url";
          kind: "shorttext";
          multilanguage: false;
          index: 2;
        };
      };
    };
    baseFrameShape: {
      id: 84;
      name: "baseFrameShape";
      langtags: ["de-DE", "en-GB"];
      columns: {
        identifier: {
          id: 1;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 0;
        };
        bidexCode: {
          id: 2;
          name: "bidexCode";
          kind: "shorttext";
          multilanguage: false;
          index: 1;
        };
        image: {
          id: 3;
          name: "image";
          kind: "attachment";
          multilanguage: false;
          index: 2;
        };
      };
    };
    frameShape: {
      id: 85;
      name: "frameShape";
      langtags: ["de-DE", "en-GB"];
      columns: {
        identifier: {
          id: 1;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 0;
        };
        baseFrameShape: {
          id: 2;
          name: "baseFrameShape";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 84;
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
        };
      };
    };
    frameSize: {
      id: 86;
      name: "frameSize";
      langtags: ["de-DE", "en-GB"];
      columns: {
        identifier: {
          id: 1;
          name: "identifier";
          kind: "shorttext";
          multilanguage: false;
          index: 0;
        };
      };
    };
    bearingSet: {
      id: 87;
      name: "bearingSet";
      langtags: ["de-DE", "en-GB"];
      columns: {
        ID: {
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
        };
        manufacturer: {
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
        };
        identifier: {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        };
      };
    };
    suspensionSystem: {
      id: 88;
      name: "suspensionSystem";
      langtags: ["de-DE", "en-GB"];
      columns: {
        identifier: {
          id: 1;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 0;
        };
      };
    };
    brakeStandard: {
      id: 89;
      name: "brakeStandard";
      langtags: ["de-DE", "en-GB"];
      columns: {
        identifier: {
          id: 1;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 0;
        };
      };
    };
    charger: {
      id: 90;
      name: "charger";
      langtags: ["de-DE", "en-GB"];
      columns: {
        ID: {
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
        };
        manufacturer: {
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
        };
        identifier: {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        };
      };
    };
    frame: {
      id: 91;
      name: "frame";
      langtags: ["de-DE", "en-GB"];
      concatFormatPattern: "{{33}} | {{37}}";
      columns: {
        ID: {
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
              toTable: 85;
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
            {
              id: 33;
              name: "bearingSet";
              kind: "link";
              multilanguage: true;
              languageType: "language";
              toTable: 87;
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
              index: 5;
            },
          ];
          formatPattern: "{{33}} | {{37}}";
          index: 0;
        };
        manufacturer: {
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
        };
        identifier: {
          id: 2;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 2;
        };
        frameShape: {
          id: 3;
          name: "frameShape";
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
        };
        suspensionSystem: {
          id: 4;
          name: "suspensionSystem";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 88;
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
        };
        travel: {
          id: 5;
          name: "travel";
          kind: "numeric";
          multilanguage: false;
          index: 5;
        };
        axleStandard: {
          id: 6;
          name: "axleStandard";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 46;
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
        };
        brakeStandard: {
          id: 7;
          name: "brakeStandard";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 89;
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
        };
        material: {
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
        };
        frameSize: {
          id: 9;
          name: "frameSize";
          kind: "link";
          multilanguage: false;
          toTable: 86;
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
        };
        frameHeight: {
          id: 10;
          name: "frameHeight";
          kind: "numeric";
          multilanguage: false;
          index: 10;
        };
        saddleHeight: {
          id: 11;
          name: "saddleHeight";
          kind: "numeric";
          multilanguage: false;
          index: 11;
        };
        topTubeLength: {
          id: 12;
          name: "topTubeLength";
          kind: "numeric";
          multilanguage: false;
          index: 12;
        };
        topTubeHorizontal: {
          id: 13;
          name: "topTubeHorizontal";
          kind: "numeric";
          multilanguage: false;
          index: 13;
        };
        headTubeAngle: {
          id: 14;
          name: "headTubeAngle";
          kind: "numeric";
          multilanguage: false;
          index: 14;
        };
        seatTubeAngle: {
          id: 15;
          name: "seatTubeAngle";
          kind: "numeric";
          multilanguage: false;
          index: 15;
        };
        chainStayLength: {
          id: 16;
          name: "chainStayLength";
          kind: "numeric";
          multilanguage: false;
          index: 16;
        };
        headTubeLength: {
          id: 17;
          name: "headTubeLength";
          kind: "numeric";
          multilanguage: false;
          index: 17;
        };
        bottomBracketDrop: {
          id: 18;
          name: "bottomBracketDrop";
          kind: "numeric";
          multilanguage: false;
          index: 18;
        };
        bottomBracketHeight: {
          id: 19;
          name: "bottomBracketHeight";
          kind: "numeric";
          multilanguage: false;
          index: 19;
        };
        forkBending: {
          id: 20;
          name: "forkBending";
          kind: "numeric";
          multilanguage: false;
          index: 20;
        };
        forkOverallHeight: {
          id: 21;
          name: "forkOverallHeight";
          kind: "numeric";
          multilanguage: false;
          index: 21;
        };
        sloping: {
          id: 22;
          name: "sloping";
          kind: "numeric";
          multilanguage: false;
          index: 22;
        };
        wheelSize: {
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
        };
        standOverHeight: {
          id: 24;
          name: "standOverHeight";
          kind: "numeric";
          multilanguage: false;
          index: 24;
        };
        seatTubeOffset: {
          id: 25;
          name: "seatTubeOffset";
          kind: "numeric";
          multilanguage: false;
          index: 25;
        };
        reach: {
          id: 26;
          name: "reach";
          kind: "numeric";
          multilanguage: false;
          index: 26;
        };
        stack: {
          id: 27;
          name: "stack";
          kind: "numeric";
          multilanguage: false;
          index: 27;
        };
        wheelbase: {
          id: 28;
          name: "wheelbase";
          kind: "numeric";
          multilanguage: false;
          index: 28;
        };
        damperInstallationLength: {
          id: 29;
          name: "damperInstallationLength";
          kind: "numeric";
          multilanguage: false;
          index: 29;
        };
        damperBush1: {
          id: 30;
          name: "damperBush1";
          kind: "numeric";
          multilanguage: false;
          index: 30;
        };
        damperBush2: {
          id: 31;
          name: "damperBush2";
          kind: "numeric";
          multilanguage: false;
          index: 31;
        };
        damperBoltLength: {
          id: 32;
          name: "damperBoltLength";
          kind: "numeric";
          multilanguage: false;
          index: 32;
        };
        bearingSet: {
          id: 33;
          name: "bearingSet";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 87;
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
        };
        packSize: {
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
        };
        length: {
          id: 34;
          name: "length";
          kind: "numeric";
          multilanguage: false;
          index: 35;
        };
        width: {
          id: 35;
          name: "width";
          kind: "numeric";
          multilanguage: false;
          index: 36;
        };
        height: {
          id: 36;
          name: "height";
          kind: "numeric";
          multilanguage: false;
          index: 37;
        };
      };
    };
    variant: {
      id: 92;
      name: "variant";
      langtags: ["de-DE", "en-GB"];
      columns: {
        ID: {
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
        };
        articleNumber: {
          id: 1;
          name: "articleNumber";
          kind: "shorttext";
          multilanguage: false;
          index: 1;
        };
        ean: {
          id: 2;
          name: "ean";
          kind: "shorttext";
          multilanguage: false;
          index: 2;
        };
        identifier: {
          id: 3;
          name: "identifier";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 3;
        };
        rrp: {
          id: 4;
          name: "rrp";
          kind: "currency";
          multilanguage: true;
          languageType: "country";
          countryCodes: ["DE", "US", "GB", "FR", "ES", "AT", "CH"];
          index: 4;
        };
        specialPrice: {
          id: 5;
          name: "specialPrice";
          kind: "currency";
          multilanguage: true;
          languageType: "country";
          countryCodes: ["DE", "US", "GB", "FR", "ES", "AT", "CH"];
          index: 5;
        };
        marketingColor: {
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
        };
        frame: {
          id: 7;
          name: "frame";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 91;
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
                toTable: 85;
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
              {
                id: 33;
                name: "bearingSet";
                kind: "link";
                multilanguage: true;
                languageType: "language";
                toTable: 87;
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
                index: 5;
              },
            ];
            formatPattern: "{{33}} | {{37}}";
          };
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
        };
        stemLength: {
          id: 8;
          name: "stemLength";
          kind: "numeric";
          multilanguage: false;
          index: 8;
        };
        handlebarWidth: {
          id: 9;
          name: "handlebarWidth";
          kind: "numeric";
          multilanguage: false;
          index: 9;
        };
        seatPostLength: {
          id: 10;
          name: "seatPostLength";
          kind: "numeric";
          multilanguage: false;
          index: 10;
        };
        seatPostStroke: {
          id: 11;
          name: "seatPostStroke";
          kind: "numeric";
          multilanguage: false;
          index: 11;
        };
        crankArmLength: {
          id: 12;
          name: "crankArmLength";
          kind: "numeric";
          multilanguage: false;
          index: 12;
        };
        cranksetLength: {
          id: 13;
          name: "cranksetLength";
          kind: "numeric";
          multilanguage: false;
          index: 13;
        };
        batteryPack: {
          id: 14;
          name: "batteryPack";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 81;
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
        };
        fork: {
          id: 15;
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
          index: 15;
        };
        tire: {
          id: 16;
          name: "tire";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 51;
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
        };
        rearTire: {
          id: 17;
          name: "rearTire";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 51;
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
          index: 17;
        };
        isRoadTrafficApproved: {
          id: 18;
          name: "isRoadTrafficApproved";
          kind: "boolean";
          multilanguage: false;
          index: 18;
        };
        imagesStraight: {
          id: 19;
          name: "imagesStraight";
          kind: "attachment";
          multilanguage: false;
          index: 19;
        };
        imagesDiagonal: {
          id: 20;
          name: "imagesDiagonal";
          kind: "attachment";
          multilanguage: false;
          index: 20;
        };
        imagesDetail: {
          id: 21;
          name: "imagesDetail";
          kind: "attachment";
          multilanguage: false;
          index: 21;
        };
        modelName: {
          id: 22;
          name: "modelName";
          kind: "shorttext";
          multilanguage: false;
          index: 22;
        };
        bikeModel: {
          id: 23;
          name: "bikeModel";
          kind: "link";
          multilanguage: false;
          toTable: 94;
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
          index: 23;
        };
      };
    };
    bidexCategory: {
      id: 93;
      name: "bidexCategory";
      langtags: ["de-DE", "en-GB"];
      type: "taxonomy";
      columns: {
        name: {
          id: 1;
          name: "name";
          kind: "shorttext";
          multilanguage: true;
          languageType: "language";
          index: 0;
        };
        ordering: {
          id: 2;
          name: "ordering";
          kind: "numeric";
          multilanguage: false;
          index: 1;
        };
        code: {
          id: 3;
          name: "code";
          kind: "shorttext";
          multilanguage: false;
          index: 2;
        };
        parent: {
          id: 4;
          name: "parent";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 93;
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
        };
      };
    };
    bikeModel: {
      id: 94;
      name: "bikeModel";
      langtags: ["de-DE", "en-GB"];
      columns: {
        ID: {
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
        };
        brand: {
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
        };
        modelName: {
          id: 2;
          name: "modelName";
          kind: "shorttext";
          multilanguage: false;
          index: 2;
        };
        modelYear: {
          id: 3;
          name: "modelYear";
          kind: "link";
          multilanguage: false;
          toTable: 82;
          toColumn: {
            id: 1;
            name: "identifier";
            kind: "numeric";
            multilanguage: false;
          };
          index: 3;
        };
        variants: {
          id: 4;
          name: "variants";
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
        };
        rrp: {
          id: 5;
          name: "rrp";
          kind: "currency";
          multilanguage: true;
          languageType: "country";
          countryCodes: ["DE", "US", "GB", "FR", "ES", "AT", "CH"];
          index: 5;
        };
        specialPrice: {
          id: 6;
          name: "specialPrice";
          kind: "currency";
          multilanguage: true;
          languageType: "country";
          countryCodes: ["DE", "US", "GB", "FR", "ES", "AT", "CH"];
          index: 6;
        };
        bidexCategory: {
          id: 7;
          name: "bidexCategory";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 93;
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
          index: 7;
        };
        marketingCategory: {
          id: 8;
          name: "marketingCategory";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 77;
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
          index: 8;
        };
        bikeType: {
          id: 9;
          name: "bikeType";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 78;
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
          index: 9;
        };
        description: {
          id: 10;
          name: "description";
          kind: "text";
          multilanguage: true;
          languageType: "language";
          index: 10;
        };
        weight: {
          id: 11;
          name: "weight";
          kind: "numeric";
          multilanguage: false;
          index: 11;
        };
        permittedTotalWeight: {
          id: 12;
          name: "permittedTotalWeight";
          kind: "numeric";
          multilanguage: false;
          index: 12;
        };
        numberOfGears: {
          id: 13;
          name: "numberOfGears";
          kind: "numeric";
          multilanguage: false;
          index: 13;
        };
        brakeLever: {
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
        };
        brakeFront: {
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
        };
        brakeRear: {
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
        };
        isCoasterBrake: {
          id: 17;
          name: "isCoasterBrake";
          kind: "boolean";
          multilanguage: false;
          index: 17;
        };
        brakeDiscFront: {
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
        };
        brakeDiscRear: {
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
        };
        derailleur: {
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
        };
        gearHub: {
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
        };
        rearDerailleur: {
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
        };
        sprocket: {
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
        };
        cassette: {
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
        };
        chainRing: {
          id: 25;
          name: "chainRing";
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
        };
        crankset: {
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
        };
        gearLeverLeft: {
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
        };
        gearLeverRight: {
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
        };
        crankArms: {
          id: 29;
          name: "crankArms";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 40;
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
        };
        bottomBracket: {
          id: 30;
          name: "bottomBracket";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 42;
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
                toTable: 41;
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
        };
        headSet: {
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
        };
        engine: {
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
        };
        display: {
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
        };
        controlUnit: {
          id: 34;
          name: "controlUnit";
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
          index: 34;
        };
        charger: {
          id: 35;
          name: "charger";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 90;
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
        };
        fork: {
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
        };
        damper: {
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
        };
        chainGuard: {
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
        };
        chain: {
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
        };
        chainGuide: {
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
        };
        systemWheelSet: {
          id: 41;
          name: "systemWheelSet";
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
        };
        wheelSet: {
          id: 42;
          name: "wheelSet";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 50;
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
          index: 42;
        };
        tire: {
          id: 43;
          name: "tire";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 51;
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
        };
        rearTire: {
          id: 44;
          name: "rearTire";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 51;
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
        };
        tube: {
          id: 45;
          name: "tube";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 53;
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
        };
        handlebar: {
          id: 46;
          name: "handlebar";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 55;
          toColumn: {
            id: 10;
            name: "ID";
            kind: "group";
            multilanguage: true;
            languageType: "language";
            groups: [
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
                index: 2;
              },
            ];
            formatPattern: "{{1}} | {{2}} |  {{4}}";
          };
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
        };
        grips: {
          id: 47;
          name: "grips";
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
          index: 47;
        };
        stem: {
          id: 48;
          name: "stem";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 58;
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
                toTable: 57;
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
        };
        spacer: {
          id: 49;
          name: "spacer";
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
        };
        saddle: {
          id: 50;
          name: "saddle";
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
          index: 50;
        };
        seatPost: {
          id: 51;
          name: "seatPost";
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
        };
        saddleClamp: {
          id: 52;
          name: "saddleClamp";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 61;
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
        };
        headlight: {
          id: 53;
          name: "headlight";
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
          index: 53;
        };
        rearlight: {
          id: 54;
          name: "rearlight";
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
        };
        dynamo: {
          id: 55;
          name: "dynamo";
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
              {
                id: 3;
                name: "power";
                kind: "numeric";
                multilanguage: false;
                index: 2;
              },
            ];
            formatPattern: "{{1}} | {{2}} | {{3}}";
          };
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
        };
        frontCarrier: {
          id: 56;
          name: "frontCarrier";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 76;
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
                toTable: 75;
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
        };
        carrier: {
          id: 57;
          name: "carrier";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 76;
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
                toTable: 75;
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
          index: 57;
        };
        mudguard: {
          id: 58;
          name: "mudguard";
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
        };
        kickstand: {
          id: 59;
          name: "kickstand";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 73;
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
                toTable: 72;
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
          index: 59;
        };
        pedals: {
          id: 60;
          name: "pedals";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 71;
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
            formatPattern: "{{2}} | {{1}}";
          };
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
        };
        lock: {
          id: 61;
          name: "lock";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 68;
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
          index: 61;
        };
        accessory: {
          id: 62;
          name: "accessory";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 70;
          toColumn: {
            id: 1;
            name: "identifier";
            kind: "shorttext";
            multilanguage: true;
            languageType: "language";
          };
          index: 62;
        };
        award: {
          id: 63;
          name: "award";
          kind: "link";
          multilanguage: true;
          languageType: "language";
          toTable: 83;
          toColumn: {
            id: 1;
            name: "identifier";
            kind: "shorttext";
            multilanguage: true;
            languageType: "language";
          };
          index: 63;
        };
        published: {
          id: 64;
          name: "published";
          kind: "boolean";
          multilanguage: false;
          index: 64;
        };
        publishDate: {
          id: 65;
          name: "publishDate";
          kind: "datetime";
          multilanguage: false;
          index: 65;
        };
      };
    };
  };
}
