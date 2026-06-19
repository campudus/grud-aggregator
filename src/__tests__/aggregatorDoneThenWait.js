export default function start(step) {
  return Promise
    .resolve()
    .then(step("done soon"))
    .then(() => "finished");
}
