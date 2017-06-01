const wait = () => new Promise(resolve => {
  process.once("SIGINT", () => {
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
      process.kill(options.pid, "SIGINT");
    })
    .catch(err => {
      console.log("should not get here", err);
      throw err;
    });
}
