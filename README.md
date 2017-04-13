# tableaux-aggregator

This module helps to extract and aggregate information from a tableaux database.

## Documentation

### Build and install

Use `npm run prepublish` to compile and test the code. This should be done before push and tag of a new version.

Use `npm run test` to run all tests once. `npm run test:watch` runs the tests while watching for changes.

### Usage

The aggregator module includes many functions that can be used in a chain of promises. It provides a way to easily fork
an aggregation process and use this to pull data from GRUD (tableaux) and reference it.

#### `start(aggregatorFile, progress[, options])`

* `aggregatorFile` is the file that should be spawn into a process. It consists of an exported default function 
`start(step, progress[, options])`, which will be called with these parameters: `step` is a function for promise chains
that will count the current steps and sends a debug message as soon as the aggregator runs over this step. The 
`progress` function is used for longer running "inner" processes, like minification of images. This function can be 
passed to some of the helper functions used in the promise chains. `options` is a JSON object that was passed to the 
`start` function. This can be used to provide variables from the outer process to the forked one. 
* `progress` is a function that will be called with an object three properties:
  * `steps` - the number of all counted steps. 
  * `currentStep` - the current step. Use `steps` and `currentStep` to calculate the percentage of your progress.
  * `message` - An optional message of the current step.
  * `error` - Usually `false`, but if there was an error during aggregation, you can make the outer process aware of it.
* `options` is an object containing variables that should be sent to the newly spawned aggregation process. The options 
will be serialized to JSON and back, therefore it is not possible to pass functions.

#### `getEntitiesOfTable(tableName, options)`

* `tableName` is the entry point for downloading all entities that are (recursively) linked.
* `options` is an object consisting of the following options:
  * `pimUrl`, `String` (required) - The URL pointing to the GRUD instance.
  * `disableFollow`, `Array[String]`(optional) - An array of column names that will not be followed.


## Release Notes

### 2.0.0 - Breaking change

* `getEntitiesOfTable()` now requires the tableName parameter and `pimUrl` option. If getEntitiesOfTable was used 
correctly, this should still not throw any exceptions. If it was used incorrectly, it would not have thrown but was 
probably not used as it would have resulted in an error during the aggregation.
