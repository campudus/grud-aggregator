import expect from "must";
import tmp from "tmp";
import { cleanUpWhenDone, statOf } from "./__tests__/fsHelpers";
import { Database } from "./database";

describe("database", () => {
  it("is able to set values", () => {
    const database = new Database();
    expect(() => database.insert("test", "foo")).not.to.throw();
  });

  it("is able to save values", () => {
    const tmpDir = tmp.dirSync({ unsafeCleanup: true });
    const myFile = `${tmpDir.name}/test-db.json`;
    const database = new Database(myFile);
    database.insert("test", "foo");
    expect(() => database.save()).not.to.throw();
    return cleanUpWhenDone(tmpDir)(
      statOf(myFile).then((file) => {
        expect(file.size).to.be.gt(0);
      })
    );
  });

  it("is able to get values", () => {
    const database = new Database();
    expect(database.find("test", "foo")).to.be.false();
    database.insert("test", "foo");
    expect(database.find("test", "foo")).to.be.true();
  });

  it("can set / get multiple values", () => {
    const database = new Database();
    database.insert("test", "foo");
    database.insert("test", "bar");
    database.insert("other", "baz");
    expect(database.find("test", "foo")).to.be.true();
    expect(database.find("test", "bar")).to.be.true();
    expect(database.find("other", "baz")).to.be.true();
  });
});
