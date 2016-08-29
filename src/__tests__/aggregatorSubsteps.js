export default function start(step) {
  return Promise.resolve(0)
    .then(add('one'))
    .then(mult('two'))
    .then(add('three'))
    .then(mult('four'))
    .then(add('five'))
    .then(mult('six'))
    .then(step('seven'));

  function add(message) {
    const addStep = step(message);
    return data => Promise.resolve(data)
      .then(addStep)
      .then(data => new Promise(resolve => {
        setTimeout(() => {
          const result = data + 1;
          resolve(result);
        }, Math.random() * 50);
      }));
  }

  function mult(message) {
    const multStep = step(message);
    return data => Promise.resolve(data)
      .then(multStep)
      .then(data => new Promise(resolve => {
        setTimeout(() => {
          const result = data * 2;
          resolve(result);
        }, Math.random() * 50);
      }));
  }

}

