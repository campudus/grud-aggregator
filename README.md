# grud-aggregator

This module helps to extract and aggregate information from a tableaux database.

## Documentation

### Build and install

Use `npm run prepublish` to compile and test the code. This should be done before push and tag of a new version.

Use `npm run test` to run all tests once. `npm run test:watch` runs the tests while watching for changes.

### Usage

The aggregator module includes many functions that can be used in a chain of promises. It provides a way to easily fork
an aggregation process and use this to pull data from GRUD (tableaux) and reference it.

The easiest way to show how this works is by example. Imagine the following code 

```javascript
const GOOD_RATING_THRESHOLD = 4;

export default function start(step, progress, options) {
  return getEntitiesOfTable("songs", {pimUrl: "http://localhost:8080"})
    .then(step("Filter all songs with a good rating"))
    .then(filter({
      path: ["songs", "album"],
      predicate: album => album.rating > GOOD_RATING_THRESHOLD
    }))
    .then(step("Printing complete duration of all good songs"))
    .then(tablesCaintainingSongsWithGoodAlbummRatings => {
      const tables = referencer()(tablesCaintainingSongsWithGoodAlbummRatings);
      const songs = tables.songs;
      const summedDuration = songs.reduce((duration, song) => duration + song.duration);
      console.log("Duration of all songs with rating >", GOOD_RATING_THRESHOLD, " =", summedDuration);
    });
}
```

#### `start({ aggregatorFile, progress, timeoutToResendStatus[, ...other options] })`

* `aggregatorFile` (`string`, required) is the file that should be spawn into a process. It consists of an exported
  default function `start(step, progress[, options])`, which will be called with these parameters:
  * `step` - the factory function for promise chains that will count the current steps and sends a debug message as
    soon as the aggregator runs over this step. The factory returns a function which can be called with following
    parameters:
    * `data: any` - the data which will be passed through within the chain.
    * `options?: {message: string, suppress: boolean}` - additional options: `message` replaces the original message to
      be sent to progress function; `suppress` flag prevents the progress function to be called (while still counting
      the steps).
  * `progress` - the function is used for longer running "inner" processes, like minification of images. This
    function can be passed to some of the helper functions used in the promise chains.
  * `options` - a JSON object that was passed to the `start` function. This can be used to provide variables from the
    outer process to the forked one.
* `progress` is a function that will be called with an object three properties:
  * `steps` - the number of all counted steps. 
  * `currentStep` - the current step. Use `steps` and `currentStep` to calculate the percentage of your progress.
  * `message` - An optional message of the current step.
  * `error` - Usually `false`, but if there was an error during aggregation, you can make the outer process aware of it.
* `timeoutToResendStatus` (number, defaults to `2000`) is a number in milliseconds when the aggregator should resend the
  latest status to the `progress` function. This helps to prevent the closing of a channel if an aggregator takes too 
  long to respond with a new progress.
* All other keys in the argument passed to start will be sent to the newly spawned aggregation process. The options will
  be serialized to JSON and back, therefore it is not possible to pass functions.

#### `getEntitiesOfTable(tableName, options): Promise[GrudTables]`

* `tableName: String` is the entry point for downloading all entities that are (recursively) linked.
* <span id="getentitiesoftable-options"></span>`options: Object` is an object consisting of the following options:
  * `pimUrl: String` (required) - The URL pointing to the GRUD instance.
  * `includeColumns: String[]` (optional) - If specified, defines a list of columns on the top level that will be
    followed. This option can be combined with `includeTables` or `excludeTables` option.
  * `includeTables: String[]` (optional) - If specified, defines a list of tables that will be followed.
  * `excludeTables: String[]` (optional) - If specified, defines a list of tables that will **not** be followed.
  * `maxEntriesPerRequest: number` (optional) - Defaults to 500. An integer greater than 0 to limit the amount of 
    work on each request done by the Grud instance. Higher values make less requests but may run into timeouts if the 
    Grud instance is not able to handle as much data.
  * `archived: Boolean` (optional) - If set to false archived GRUD rows will get omitted. If set to true, only archived 
    GRUD rows will be returned.
  * `headers: Object` (optional) - Defaults to {}. An object with key values pairs for http headers to set on every request.

#### `getEntitiesOfTables(tableNames, options): Promise[GrudTables]`

An extended version of [getEntitiesOfTable()](#getentitiesoftabletablename-options-promisegrudtables) for multiple
tables at once. For a high amount of tables, this may result in a dramatic increase of performance as linked tables
which are shared among initial tables will only be downloaded once.

* `tableNames: String[]` - Table names for which all entities will be downloaded and recursively linked.
* `options: Object` - See [options](#getentitiesoftable-options) of `getEntitiesOfTable()`.

#### `filter(options): GrudTables => GrudTables`

This function filters all entities in the promise chain matching a specific condition.

* `options` is an object containing:
  * `excludeBacklinks` (`Boolean`, optional) - Defaults to false. This option will exclude all backlinks from another 
    table, meaning if a cyclic link occurs, this link will not add new entities to the filtered table. Most of the time
    you will want to use `filterBacklinks` instead of removing all columns containing a link to the first table.
  * `filterBacklinks` (`Boolean`, optional) - Defaults to false. This option will exclude all backlinks from another 
    table if the entity is not already in the first table. You want to use this option when you want to keep links to 
    the first table but remove all links to entities that do not match your initial `predicate`.
  * `ignoreMissing` (`Boolean`, optional) - Defaults to false. If a table is missing, the `filter` method usually emits 
    a `console.warn` warning. This warning can be disabled by setting `ignoreMissing` to `true`.
  * `path` (`Array[String]`, reguired) - The path to follow for the `predicate`.
  * `predicate` (`(object) => Boolean`, required) - This function checks `object` for a specified condition.

#### `exclude(options): GrudTables => GrudTables`

To remove columns from the resulting GrudTables.

* `options` is an object containing:
  * `paths` (`Array[Array[String]]`, optional) - The paths contain the names of the table and column to kick. For 
    example:
```
[
  ['tableA', 'columnInTableA'],
  ['tableB', 'columnInTableB']
]
```
  * `predicate` (`(GrudColumn, GrudTable) => Boolean`, optional) - A function to check if this column should be excluded
    in the result.
  * `preserveConcats` (`Boolean`, optional, defaults to `true`) - To remove all concat columns, set the flag to `false`. 

#### `referencer([options]): (MultilanguageGrudTables|GrudTables) => GrudEntities`

This function can be called in the promise chain or used in client code to denormalize the entities. Use it to simplify
following links.

* `options` may contain
  * `withLanguages` (`Boolean`, optional, defaults to `false`), this assumes that the first level are languages and not 
    tables. When using `tablesToLanguages`, this needs to be set, otherwise it can not correctly denormalize the 
    entities. If set to `false`, all multi-language columns will still contain objects with te values for all languages.

#### `tablesToLanguages(fallbacks, [options]): GrudTables => MultilanguageGrudTables`

This function separates the tables into languages set in the `fallbacks` object. 

* `fallbacks` is an object containing language keys as keys and an `Array[LanguageKey]` to define fallback languages to 
  use if the selected language is not set.
* `options` may contain
  * `fallbackOnly` (`Boolean`, optional, defaults to `false`), this assumes the fallback array as the single source of 
    truth, meaning the key in the `fallbacks` options are not used as default language, but the first element in the 
    provided array for each key. If you turn this option on, you need to have at least one language set in each array or
    the call to `tablesToLanguages` will result in an error.
  * `fallbackOnEmptyString` (`Boolean`, optional, defaults to `true`), will trim texts (based on the column kind) and 
    use the fallback languages if the trimmed text is empty.

## Changelog

See [CHANGELOG.md](CHANGELOG.md).

## License

    Copyright 2016-present Campudus GmbH.
    
    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at
    
        http://www.apache.org/licenses/LICENSE-2.0
    
    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
