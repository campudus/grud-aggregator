export default function start(step) {
  return Promise.resolve(0)
    .then(doSomething(step, 'one'))
    .then(doSomething(step, 'two'))
    .then(doSomething(step, 'three'))
    .then(doSomething(step, 'four'));
}

function doSomething(step, message) {
  return Promise.resolve(step(message))
    .then(data => data + 1);
}
