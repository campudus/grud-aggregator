const wait = () => new Promise<void>(resolve => {
  process.once("SIGHUP", () => {
    process.disconnect();
    resolve();
  });
});

export default function start(step, progress, options) {
  return Promise
    .resolve()
    .then(step(process.pid))
    .then(wait)
    .then(step("second step (channel should be closed)"))
    .then(() => {
      process.kill(options.pid, "SIGHUP");
    })
    .catch(err => {
      console.log("should not get here", err);
      throw err;
    });
}
