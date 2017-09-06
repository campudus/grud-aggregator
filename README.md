# tableaux-aggregator

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
  default function `start(step, progress[, options])`, which will be called with these parameters: `step` is a function 
  for promise chains that will count the current steps and sends a debug message as soon as the aggregator runs over 
  this step. The `progress` function is used for longer running "inner" processes, like minification of images. This 
  function can be passed to some of the helper functions used in the promise chains. `options` is a JSON object that was
   passed to the `start` function. This can be used to provide variables from the outer process to the forked one. 
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

* `tableName` is the entry point for downloading all entities that are (recursively) linked.
* `options` is an object consisting of the following options:
  * `pimUrl`, `String` (required) - The URL pointing to the GRUD instance.
  * `disableFollow`, `Array[String]` (optional) - Defaults to empty array. An array of column names that will not be 
    followed.
  * `maxEntriesPerRequest`, `Integer` (optional) - Defaults to 500. An integer greater than 0 to limit the amount of 
    work on each request done by the Grud instance. Higher values make less requests but may run into timeouts if the 
    Grud instance is not able to handle as much data.

#### `filter(options): GrudTables => GrudTables`

This function filters all entities in the promise chain matching a specific condition.

* `options` is an object containing:
  * `excludeBacklinks` (`Boolean`, optional) - Defaults to false. This option will exclude all backlinks from another 
    table, meaning if a cyclic link occurs, this link will not add new entities to the filtered table.
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
  * `fallbackOnly` (`Boolean`, optional, defaults to `true`), this assumes the fallback array as the single source of 
    truth, meaning the key in the `fallbacks` options are not used as default language, but the first element in the 
    provided array for each key. If you turn this option on, you need to have at least one language set in each array or
    the call to `tablesToLanguages` will result in an error.

## Release Notes

##### 5.0.1 - Bugfix

* Moved `babel-register` into `dependencies` as `start` uses it.

### 5.0.0 - Breaking change

* `referencer` now works without using `tablesToLanguages` before, without adding the link results into `linkRowId`. As 
  someone may have used this bug, this could break changes. An integration test was added to test that existing code 
  usually should not break, if not abusing the bug-behavior. Obviously, `tablesToLanguages` does more than it should do
  currently, which should be changed in a future version.

### 4.0.0 - Breaking change

* Add `timeoutToResendStatus` option that generally resends the progress status, if the aggregator does not send a new 
  status by itself. You should not rely on the count of messages but on the real `currentStep` / `steps` provided in the
  progress message.

### 3.0.0 - Breaking change

Channel closed exceptions are now automatically handled / swallowed. You should not rely on a closed channel for your
aggregator to work.

### 2.6.0 - Feature

* Add `exclude` to filter out data.

### 2.5.0 - Feature 

* Use pagination to request data from Grud. Introduced `maxEntriesPerRequest` option to `getEntitiesOfTable()` to set 
  this limit.

### 2.4.0 - Feature

* Expose `getAllTables` to retrieve all table names of a Grud instance.

### 2.0.0 - Breaking change

* `getEntitiesOfTable()` now requires the tableName parameter and `pimUrl` option. If getEntitiesOfTable was used 
  correctly, this should still not throw any exceptions. If it was used incorrectly, it would not have thrown but was 
  probably not used as it would have resulted in an error during the aggregation.
