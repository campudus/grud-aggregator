# Release Notes

## [9.2.0](https://github.com/campudus/grud-aggregator/compare/grud-aggregator-v9.1.0...grud-aggregator-v9.2.0) (2026-06-26)


### Features

* add archived option to getEntitiesOfTable ([29965a2](https://github.com/campudus/grud-aggregator/commit/29965a24b0856b9d6f1759771f846b5b6ad53b36))
* add includeArchived option to getEntitiesOfTable ([16f223a](https://github.com/campudus/grud-aggregator/commit/16f223aaca8bb7558a4fa64c2cb60a98fef72e66))
* add support for aborting running exports with AbortSignal ([d0b2907](https://github.com/campudus/grud-aggregator/commit/d0b2907517312d5321e8efb410024f646e6a8009))
* add trim option to modifyImages ([0e778e4](https://github.com/campudus/grud-aggregator/commit/0e778e4b5841a8f105136b4d6502ea2b132ae1da))
* add trim option to modifyImages ([6b36333](https://github.com/campudus/grud-aggregator/commit/6b363339482c857919c0d9f12a7f14ef9b91a858))
* added 'timeout' option for API requests ([a223ad5](https://github.com/campudus/grud-aggregator/commit/a223ad5cc6a102fd36317bf169e044a473dffbd0))
* added 'timeout' option to 'getEntitiesOfTable()' ([3f539da](https://github.com/campudus/grud-aggregator/commit/3f539da15b709735cf08f424afc96f4cb85caf80))
* added timeout option for requests ([885c1e5](https://github.com/campudus/grud-aggregator/commit/885c1e5a167854ef9d236c45511b216d6860e17e))
* enhanced 'disableFollow' option with support for '*' and '**' placeholders ([9a44a68](https://github.com/campudus/grud-aggregator/commit/9a44a68976a41a049412caa2e2e90b93a52b510c))
* enhanced 'disableFollow' option with support for '*' and '**placeholders ([9f2b352](https://github.com/campudus/grud-aggregator/commit/9f2b35213a47bef175351e043c55c9b10cd2186f))
* integrate typescript with cjs and esm output ([8f2a751](https://github.com/campudus/grud-aggregator/commit/8f2a751227c016e25f5c0d472119faaaedbed3ca))
* replaced axios with node-fetch and added timeout handling ([581e063](https://github.com/campudus/grud-aggregator/commit/581e06357cab9caa1a08f5f33268380446371740))
* replaced axios with node-fetch and added timeout handling ([599f0d1](https://github.com/campudus/grud-aggregator/commit/599f0d147ff01a930e1cd8f8e9822dc58a39f38f))
* replaced jimp with sharp ([8b49f27](https://github.com/campudus/grud-aggregator/commit/8b49f275071506549e90308c9c747efbc690444b))
* replaced jimp with sharp ([ebe858f](https://github.com/campudus/grud-aggregator/commit/ebe858f51140fc10afcd3c099014829d9b9bfd04))
* some more fixes to ts build and output ([97b44e2](https://github.com/campudus/grud-aggregator/commit/97b44e26b78baa356deb43b50a8c8d78dc132c30))


### Bug Fixes

* add group sub columns to columns root array ([d0b1c43](https://github.com/campudus/grud-aggregator/commit/d0b1c431b6d955f79aeb05ccbb15b623299b6d5e))
* change grud-aggregator to esmodule in package.json ([18c9160](https://github.com/campudus/grud-aggregator/commit/18c9160c256ba52bdc7368bebfb50aaed2dcffb3))
* changelog typo ([f932f80](https://github.com/campudus/grud-aggregator/commit/f932f800169fa89431bc7f6be4c3d5b603b0d77d))
* clean way for creating log message ([e8213e2](https://github.com/campudus/grud-aggregator/commit/e8213e2192357252cad587ce3d2d30b10b6740b2))
* configure @babel/eslint-parser to handle import attributes syntax ([7416461](https://github.com/campudus/grud-aggregator/commit/74164619ab2a2710d9f039e717d645d12c5f4f7d))
* default timeout is now set for 'getEntitiesOfTable()' instead of 'request()' api helper' ([3516696](https://github.com/campudus/grud-aggregator/commit/35166965038c451065787c9e3fc3fcaeecd12809))
* enforce single occurrence of '*' and '**' in disableFollow column lists ([324ff39](https://github.com/campudus/grud-aggregator/commit/324ff3976bd7a0969cae0bd4cbb98b577d1fb822))
* esm/cjs mismatch during process fork ([32cd415](https://github.com/campudus/grud-aggregator/commit/32cd415398fd679ba5a7edc6604b43cdeeabd38a))
* expose getEntitiesOfTables ([3dee032](https://github.com/campudus/grud-aggregator/commit/3dee03290daff0dfb1f82836420face070dd2c9c))
* fix nyc coverage ([670931e](https://github.com/campudus/grud-aggregator/commit/670931e6bef75901c6150a5daade1e04004d8715))
* fixed typo ([13c631f](https://github.com/campudus/grud-aggregator/commit/13c631f7d11651781dfb4f786dae9de1ea187ef0))
* handle null checks for group columns with links and multilanguage support ([5aa6dae](https://github.com/campudus/grud-aggregator/commit/5aa6daecba15531ddbece68769bc984dcbe53939))
* image tests ([97571b4](https://github.com/campudus/grud-aggregator/commit/97571b4b6634eaa6f4d2c7c459569b266cc91f2c))
* install prettier version which is compatible with import attributes ([6284a4d](https://github.com/campudus/grud-aggregator/commit/6284a4d98e8eb5661596e2bee5dcebc51dbc5d2f))
* name shadowing ([f5b31c8](https://github.com/campudus/grud-aggregator/commit/f5b31c8cb2e70893201101b39ff7781fc47fd2a2))
* refernecer can reference group columns with links correctly ([1e1b2c1](https://github.com/campudus/grud-aggregator/commit/1e1b2c157364d8405e50c19028bc7fdcb37c944c))
* stop resending progress after abort ([2f46a77](https://github.com/campudus/grud-aggregator/commit/2f46a77e5219e83bb255787395b170a5e3df6517))
* tablesToLanguages handles group columns with multilang and links correctly ([4ad11a3](https://github.com/campudus/grud-aggregator/commit/4ad11a397fc50c14735aa78f9bdf96de9a1f0177))
* typo ([4384184](https://github.com/campudus/grud-aggregator/commit/4384184e47775492490db1cb76295994a59995b8))
* updated lib with missing compiled stuff ([4fc93f2](https://github.com/campudus/grud-aggregator/commit/4fc93f2224d22d31187c092d6aa6bfcc33ae6085))
* updated package-lock.json ([fb57c9e](https://github.com/campudus/grud-aggregator/commit/fb57c9e87940a77da3e5dabf418584f0cc829249))
* use native fetch instead of node-fetch ([b1c2d28](https://github.com/campudus/grud-aggregator/commit/b1c2d28871b4e0b24b6d56f1684e7ba80f361068))

## 9.1.0 - Added cancellation support for `start() function`

* Added `abort` option to `start()` that groups the new cancellation-related settings in a dedicated object. This keeps
  their key names out of the rest-parameter namespace that is forwarded as `options` to the aggregator, so existing
  callers remain unaffected.
  * `abort.signal` (`AbortSignal`): Aborting the signal terminates the forked aggregator process (`SIGTERM`) and rejects
    the returned promise with the signal's `reason`. If the signal is already aborted when `start` is called, the
    promise rejects immediately and no child process is spawned.
  * `abort.abortGracePeriod` (number, defaults to `1000` ms): After `SIGTERM`, the parent waits this long before
    escalating to `SIGKILL`, giving the aggregator time to clean up (e.g. flushing database transactions or in-flight
    uploads).

## 9.0.0 - Convert to ES-Module

* Replaced `@babel/core` with `tsdown`
* Add builds/exports for esm and cjs
* Replaced `node-fetch` with `fetch`
* Updated `prettier`, `eslint` and `nyc`

## 8.9.0 - Fixed group column handling of multilanguage and link columns for 'tablesToLanguages' and 'referencer'

* Fixed an issue where multilanguage and link columns inside group columns were not handled correctly in the `tablesToLanguages` function.
* Fixed an issue where link columns inside group columns were not handled correctly in the `referencer` function

## 8.8.0 - Replaced axios with node-fetch

* Replaced outdated `axios` with `node-fetch` to reduce dependencies and avoid timeout issues.
  See also GitHub issues [#6721](https://github.com/axios/axios/issues/5267)
  and [#5267](https://github.com/axios/axios/issues/5267).

## 8.7.0 - Extended `disableFollow` option in `getEntitiesOfTable` and `getEntitiesOfTables` by placeholders

* Added support for `*` and `**` in `disableFollow` option of `getEntitiesOfTable()` and `getEntitiesOfTables()` to be
  able to exclude all columns on a specific level or all following levels. See the documentation of these functions for
  more information.

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
