export default function start(step, progress, options) {
  return Promise
    .resolve()
    .then(step("echoing options"))
    .then(() => options);
}
