# tableaux-aggregator

This module helps to extract and aggregate information from a tableaux database.

## Breaking changes

### 2.0.0

* getEntitiesOfTable() now requires the tableName parameter and `pimUrl` option. If getEntitiesOfTable was used 
correctly, this should still not throw any exceptions. If it was used incorrectly, it would not have thrown but was 
probably not used as it would have resulted in an error during the aggregation.
