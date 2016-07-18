import low from 'lowdb';
import lowdbAsyncStorage from 'lowdb/lib/file-async';

export class Database {

  constructor(databaseFile) {
    this.database = low(databaseFile, {
      storage : lowdbAsyncStorage,
      writeOnChange : false
    });
  }

  find(attachment, key) {
    return this.database
      .defaultsDeep({[attachment] : {[key] : false}})
      .get(attachment)
      .get(key)
      .value();
  }

  insert(attachment, key) {
    this.database
      .defaultsDeep({[attachment] : {[key] : false}})
      .get(attachment)
      .assign({[key] : true})
      .value();
  }

  save() {
    return this.database.write();
  }

}
