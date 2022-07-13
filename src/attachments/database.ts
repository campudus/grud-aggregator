import low from "lowdb";
import lowdbAsyncStorage from "lowdb/lib/file-async";

export class Database {
  constructor(databaseFile) {
    // @ts-ignore
    // TODO: fix with eslint update
    this.database = low(databaseFile, {
      storage: lowdbAsyncStorage,
      writeOnChange: false,
    });
  }

  find(attachment, key) {
    return this.database // TODO: fix with eslint update // @ts-ignore
      .defaults({ attachments: {} })
      .get("attachments")
      .defaultsDeep({
        [attachment]: {
          id: attachment,
          [key]: false,
        },
      })
      .get(attachment)
      .get(key)
      .value();
  }

  insert(attachment, key) {
    this.database // TODO: fix with eslint update // @ts-ignore
      .defaults({ attachments: {} })
      .get("attachments")
      .defaultsDeep({
        [attachment]: {
          id: attachment,
          [key]: false,
        },
      })
      .get(attachment)
      .assign({ [key]: true })
      .value();
  }

  save() {
    // @ts-ignore
    // TODO: fix with eslint update
    return this.database.write();
  }
}
