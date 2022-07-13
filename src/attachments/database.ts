import low from "lowdb";
import lowdbAsyncStorage from "lowdb/lib/file-async";

export class Database {
  constructor(databaseFile) {
    // @ts-ignore
    // TODO: fix with eslint update
    this.database = low(databaseFile, {
      storage: lowdbAsyncStorage,
      writeOnChange: false
    });
  }

  find(attachment, key) {
    return this
      // @ts-ignore
      // TODO: fix with eslint update
      .database
      .defaults({attachments: {}})
      .get("attachments")
      .defaultsDeep({
        [attachment]: {
          "id": attachment,
          [key]: false
        }
      })
      .get(attachment)
      .get(key)
      .value();
  }

  insert(attachment, key) {
    this
      // @ts-ignore
      // TODO: fix with eslint update
      .database
      .defaults({attachments: {}})
      .get("attachments")
      .defaultsDeep({
        [attachment]: {
          "id": attachment,
          [key]: false
        }
      })
      .get(attachment)
      .assign({[key]: true})
      .value();
  }

  save() {
    // @ts-ignore
    // TODO: fix with eslint update
    return this.database.write();
  }

}
