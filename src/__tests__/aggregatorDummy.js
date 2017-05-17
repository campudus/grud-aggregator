export default function start(step) {
  return Promise
    .resolve()
    .then(step("step A"))
    .then(step("step B"))
    .then(step("step C"))
    .then(step("step D"));
}
