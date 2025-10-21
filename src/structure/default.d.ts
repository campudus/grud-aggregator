// override module declararion with script in init.js
declare module "grud-aggregator/structure" {
  export type Structure = {
    [tableName: string]: {
      id: number;
      name: string;
      langtags: string[];
      columns: {
        [columnName: string]: {
          id: number;
          index: number;
          name: string;
          kind: string;
          multilanguage: boolean;
          languageType: string;
        };
      },
    };
  };
}
