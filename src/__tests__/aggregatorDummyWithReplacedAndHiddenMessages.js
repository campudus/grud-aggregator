export default function start(step) {
  const stepA = step("step A");
  const stepB = step("step B");
  const stepC = step("step C");
  const stepD = step("step D");

  return Promise
    .resolve()
    .then(stepA)
    .then(data => stepB(data, { message: "step B - REPLACED!" }))
    .then(data => stepC(data, { suppress: true }))
    .then(stepD);
}
