# Release Notes

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
