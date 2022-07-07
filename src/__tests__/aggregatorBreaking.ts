export default function start(step) {
  return Promise
    .resolve()
    .then(step("step A"))
    .then(() => Promise.reject(new Error("oops")));
}
