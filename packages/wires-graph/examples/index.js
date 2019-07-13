const Graph = require('../../../dist/wires-graph.cjs');

function AndGate({ in1 = false, in2 = false } = {}) {
  const [count, setCount] = Graph.useState(0);

  console.log(count);
  setCount(count + 1);

  return {
    out: in1 && in2
  }
}

function Counter() {
  const [count, setCount] = Graph.useState(10);

  console.log('Counter', count);
  setCount(count + 1);

  return { out: count }
}

function createComponent(process) {
  return () => {
    return { process }
  }
}

const counter = createComponent(Counter);
const counter2 = createComponent(Counter);

Graph.process(counter);
Graph.process(counter);
Graph.process(counter);
Graph.process(counter);
Graph.process(counter);


Graph.process(counter2);
Graph.process(counter2);
Graph.process(counter2);
Graph.process(counter2);
Graph.process(counter2);

