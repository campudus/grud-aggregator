# Release Notes

## 8.6.0 - Extended `getEntitiesOfTable()` function by `timeout` option

* `timeout: Number` option has been added for `getEntitiesOfTable()`. Default is 120000 milliseconds (2 minutes).
  The timeout limits the time for the request to GRUD. If the request takes longer than this time,
  it will be aborted and an error will be thrown.
* `timeout: Number` option has also been added for the API functions `getAllTables()`, `getTablesByNames()`,
  and `getCompleteTable()`. It works the same way as described above.

## 8.5.0 - Extended `getEntitiesOfTable()` function by `archived` option

* `archived: Boolean` option has been added for `getEntitiesOfTable()`. If set to `false` archived GRUD rows will get omitted. If set to `true`, 
  only archived GRUD rows will be returned.

## 8.4.0 - Added `getEntitiesOfTables()` function

* Extension of `getEntitiesOfTable()` function for multiple tables at once.

## 8.3.0 - Extended `getEntitiesOfTable()` function by `includeColumns` option

* `includeColumns: String[]` option has been added for `getEntitiesOfTable()`. Specified as an array of strings, it
  defines columns that will be followed on the top level.

## 8.2.0 - Extended `step()` function by additional options

* Extended `step(data, options)` function passed to aggregator by `options` parameter:
  * `options.message` - replaces the step message on call.
  * `options.suppress` - suppresses the call of the `progress()` function while still counting the steps.

## 8.1.0 - Added functionality to trim images

* Added a `trim` option to `modifyImages`. If set to `true`, it will trim pixels from all edges that contain values similar to the color of the top-left pixel. Default is `false`.

## 8.0.0 - Breaking change - Replaced jimp with sharp

* Removed `jimp` with plugins `pngquant` and `jpegoptim`
* Added `sharp` as a replacement for `jimp`
* The API stays the same but `sharp` has other dependencies on native libraries which can break current deployments

## 7.0.3 - Moved `@babel/core` from `devDependencies` to `dependencies`

* Moved`@babel/core` from `devDependencies` to `dependencies`.

## 7.0.2 - Removed deprecated `request-promise-native`

* Removed deprecated package `request-promise-native`.
* Added `axios` as an alternative.

## 7.0.1 - Return aggregation result

* The aggregator now properly returns its result in a Promise to the caller of the `start()` function.

## 7.0.0 - Upgraded to Babel 7

* Updated `babel-*` node packages to `@babel/*`, `babel-register` hook to `@babel/register` and `.babelrc` configuration file.

## 6.2.3 - Fixed `getaddrinfo ENOTFOUND` errors in request

* We've added a workaround for API requests resulting in above error message. We need to use `family: 4` in our requests
  which could be done by using the `request-promise-native` library rather than `superagent`.

## 6.2.2 - Fixed `downloader` to work with https connections

* When the protocol used for downloading attachments was https, the downloader broke. This is now fixed and https 
  connections are possible.

## 6.2.1 - Fixed missing `headers` option in `downloader`

* Added headers option from 6.2.0 to `downloader` to be able to set headers for the http requests when downloading 
  attachments.

## 6.2.0 - Feature `headers` option in `getEntitiesOfTable`

* Added option to `getEntitiesOfTable` to be able to set headers for the http requests.

## 6.1.0 - Feature: `filterBacklinks` option in `filter`

* Added option to `filterBacklinks` in `filter`. This option is set to `false` by default. It is usually a good idea to
  use this option instead of `excludeBacklinks` which will completely remove such columns.

## 6.0.1 - Bugfix

* When aggregator broke, it would still send progress callbacks. This is fixed and the aggregator process should stop if
  the process was crashing.

## 6.0.0 - Breaking change `fallbackOnEmptyString`

* Added option to `tablesToLanguages` to fallback on empty strings or strings which become empty after a trim. This 
  option is set to `true` on default and hence breaking.

### 5.1.0 - Feature: `fallbackOnly` option in `tablesToLanguages`

* Added option to `tablesToLanguages` to be able to not use the key of a language, but just the fallbacks in the 
  langtags. This way it is not necessary to have a valid language key as a key in the `fallbacks`. 

#### 5.0.1 - Bugfix

* Moved `babel-register` into `dependencies` as `start` uses it.

## 5.0.0 - Breaking change

* `referencer` now works without using `tablesToLanguages` before, without adding the link results into `linkRowId`. As 
  someone may have used this bug, this could break changes. An integration test was added to test that existing code 
  usually should not break, if not abusing the bug-behavior. Obviously, `tablesToLanguages` does more than it should do
  currently, which should be changed in a future version.

## 4.0.0 - Breaking change

* Add `timeoutToResendStatus` option that generally resends the progress status, if the aggregator does not send a new 
  status by itself. You should not rely on the count of messages but on the real `currentStep` / `steps` provided in the
  progress message.

## 3.0.0 - Breaking change

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
