export default function start(step) {
  process.on("SIGTERM", () => {
    // Intentionally ignored to verify the parent escalates to SIGKILL.
  });

  return Promise
    .resolve()
    .then(step(`${process.pid}`))
    .then(() => new Promise(() => {}));
}
