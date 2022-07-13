import expect from "must";
import express from "express";
import tmp from "tmp";
import fs from "fs-extra";
import entitiesWithAttachments from "./__tests__/entitiesWithAttachments.json";
import { Database } from "./database";
import { downloader } from "./downloader";
import { findAttachments } from "./findAttachments";
import { filter } from "../filter";

describe("attachments integration", () => {
  const TEST_PORT = 14432;
  const SERVER_FIXTURES = `${__dirname}/__tests__/server`;
  const SERVER_URL = `http://localhost:${TEST_PORT}`;
  let server;

  before(() => {
    return new Promise((resolve, reject) => {
      const app = express();
      app.use("/files", express.static(SERVER_FIXTURES));
      server = app.listen(TEST_PORT, function (err) {
        if (err) {
          return reject(err);
        } else {
          return resolve();
        }
      });
    });
  });

  after((done) => {
    server.close(done);
  });

  it("is possible to download single attachment", () => {
    const tmpDir = tmp.dirSync({ unsafeCleanup: true });
    const outPath = tmpDir.name;
    const database = new Database(`${outPath}/attachments.json`);

    return Promise.resolve(entitiesWithAttachments)
      .then(
        filter({
          path: ["testTable"],
          predicate: (v) => v.identifier === "1",
        })
      )
      .then(findAttachments())
      .then(
        downloader({
          database,
          pimUrl: SERVER_URL,
          downloadPath: outPath,
        })
      )
      .then((downloaded) => {
        expect(downloaded.length).to.be(1);
        return Promise.all([
          statOf(
            `${__dirname}/__tests__/server/11111111-1111-1111-1111-111111111111/en/1-english.png`
          ),
          statOf(
            `${__dirname}/__tests__/server/11111111-1111-1111-1111-111111111111/de/1-deutsch.png`
          ),
          statOf(`${outPath}/11111111-1111-1111-0000-111111111111.png`),
        ]);
      })
      .then(([expectedA, expectedB, actualA]) => {
        expect(actualA.size).to.be(expectedA.size);
        expect(actualA.size).to.be(expectedB.size);
      })
      .catch((err) => {
        expect(err).to.be.null();
      })
      .then(cleanUp(tmpDir));
  });

  it("can download multiple attachments at once", () => {
    const tmpDir = tmp.dirSync({ unsafeCleanup: true });
    const outPath = tmpDir.name;
    const database = new Database(`${outPath}/attachments.json`);

    return Promise.resolve(entitiesWithAttachments)
      .then(
        filter({
          path: ["testTable"],
          predicate: (v) => v.identifier === "2",
        })
      )
      .then(findAttachments())
      .then(
        downloader({
          database,
          pimUrl: SERVER_URL,
          downloadPath: outPath,
        })
      )
      .then((downloaded) => {
        expect(downloaded.length).to.be(2);
        return Promise.all([
          statOf(
            `${__dirname}/__tests__/server/22222222-2222-2222-2222-aaaaaaaaaaaa/en/2a-english.png`
          ),
          statOf(
            `${__dirname}/__tests__/server/22222222-2222-2222-2222-bbbbbbbbbbbb/de/2b-deutsch.png`
          ),
          statOf(`${outPath}/22222222-2222-2222-0000-aaaaaaaaaaaa.png`),
          statOf(`${outPath}/22222222-2222-2222-0000-bbbbbbbbbbbb.png`),
        ]);
      })
      .then(([expectedA, expectedB, actualA, actualB]) => {
        expect(actualA.size).to.be(expectedA.size);
        expect(actualB.size).to.be(expectedB.size);
      })
      .catch((err) => expect(err).to.be.null())
      .then(cleanUp(tmpDir));
  });

  it("can download all sorts of attachments at once", () => {
    const tmpDir = tmp.dirSync({ unsafeCleanup: true });
    const outPath = tmpDir.name;
    const database = new Database(`${outPath}/attachments.json`);

    return Promise.resolve(entitiesWithAttachments)
      .then(findAttachments())
      .then(
        downloader({
          database,
          pimUrl: SERVER_URL,
          downloadPath: outPath,
        })
      )
      .then((downloaded) => {
        expect(downloaded.length).to.be(9);
        return Promise.all([
          statOf(
            `${__dirname}/__tests__/server/11111111-1111-1111-1111-111111111111/en/1-english.png`
          ),
          statOf(
            `${__dirname}/__tests__/server/22222222-2222-2222-2222-aaaaaaaaaaaa/en/2a-english.png`
          ),
          statOf(
            `${__dirname}/__tests__/server/22222222-2222-2222-2222-bbbbbbbbbbbb/de/2b-deutsch.png`
          ),
          statOf(
            `${__dirname}/__tests__/server/33333333-3333-3333-3333-aaaaaaaaaaaa/en/3a-english.png`
          ),
          statOf(
            `${__dirname}/__tests__/server/33333333-3333-3333-3333-bbbbbbbbbbbb/de/3b-deutsch.png`
          ),
          statOf(
            `${__dirname}/__tests__/server/33333333-3333-3333-3333-cccccccccccc/en/3c-english.png`
          ),
          statOf(
            `${__dirname}/__tests__/server/33333333-3333-3333-3333-dddddddddddd/de/3d-deutsch.png`
          ),
          statOf(
            `${__dirname}/__tests__/server/33333333-3333-3333-3333-eeeeeeeeeeee/en/3e-english.png`
          ),
          statOf(
            `${__dirname}/__tests__/server/33333333-3333-3333-3333-ffffffffffff/de/3f-deutsch.png`
          ),
          statOf(`${outPath}/11111111-1111-1111-0000-111111111111.png`),
          statOf(`${outPath}/22222222-2222-2222-0000-aaaaaaaaaaaa.png`),
          statOf(`${outPath}/22222222-2222-2222-0000-bbbbbbbbbbbb.png`),
          statOf(`${outPath}/33333333-3333-3333-0000-aaaaaaaaaaaa.png`),
          statOf(`${outPath}/33333333-3333-3333-0000-bbbbbbbbbbbb.png`),
          statOf(`${outPath}/33333333-3333-3333-0000-cccccccccccc.png`),
          statOf(`${outPath}/33333333-3333-3333-0000-dddddddddddd.png`),
          statOf(`${outPath}/33333333-3333-3333-0000-eeeeeeeeeeee.png`),
          statOf(`${outPath}/33333333-3333-3333-0000-ffffffffffff.png`),
        ]);
      })
      .then(
        expected1, expected2a, expected2b, expected3a, expected3b, expected3c, expected3d, expected3e, expected3f,
        actual1, actual2a, actual2b, actual3a, actual3b, actual3c, actual3d, actual3e, actual3f
        ]) => {
          expect(actual1.size).to.be(expected1.size);
          expect(actual2a.size).to.be(expected2a.size);
          expect(actual2b.size).to.be(expected2b.size);
          expect(actual3a.size).to.be(expected3a.size);
          expect(actual3b.size).to.be(expected3b.size);
          expect(actual3c.size).to.be(expected3c.size);
          expect(actual3d.size).to.be(expected3d.size);
          expect(actual3e.size).to.be(expected3e.size);
          expect(actual3f.size).to.be(expected3f.size);
        }
      )
      .catch((err) => expect(err).to.be.null())
      .then(cleanUp(tmpDir));
  });
});

function cleanUp(tmpDir) {
  return () => {
    tmpDir.removeCallback();
  };
}

function statOf(file) {
  return new Promise((resolve, reject) => {
    fs.stat(file, (err, stats) => {
      if (err) {
        reject(err);
      } else {
        resolve(stats);
      }
    });
  });
}
