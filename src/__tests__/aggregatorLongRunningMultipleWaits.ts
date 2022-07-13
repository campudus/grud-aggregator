export default function start(step, progress, options) {
  const howLong = options.howLong;

  return Promise.resolve(0)
    .then(step("started"))
    .then((zero) => zero + 1)
    .then(step("waiting 1"))
    .then(waitLonger)
    .then(step("waiting 2"))
    .then(waitLonger)
    .then(step("waiting 3"))
    .then(waitLonger)
    .then(step("waiting 4"))
    .then(waitLonger)
    .then(step("second"))
    .then((one) => one + 1);

  function waitLonger(message) {
    return new Promise<any>((resolve) => {
      setTimeout(() => {
        resolve(message);
      }, howLong);
    });
  }
}
