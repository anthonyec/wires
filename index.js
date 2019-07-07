const createGraph = require('./lib/graph');
const { AndGate } = require('./components/gates');
const Log = require('./components/log');
const Toggle = require('./components/toggle');

const graph = createGraph();

const andGate = graph.createComponent(AndGate);
const log = graph.createComponent(Log);
const log2 = graph.createComponent(Log);
const toggle1 = graph.createComponent(Toggle);
const toggle2 = graph.createComponent(Toggle);

/*
                  .-> [value]log2
  toggle1[out] ---
                  `-> [in1]
                          andGate[out] ---> [value]log
                  .-> [in2]
  toggle2[out] ---
*/

console.log('-- connections --');
graph.from(toggle1).link('out', 'value').to(log2);
graph.from(toggle1).link('out', 'in1').to(andGate);
graph.from(toggle2).link('out', 'in2').to(andGate);
graph.from(andGate).link('out', 'value').to(log);
console.log('');

console.log('-- execution --');
toggle1.execute({ toggledOn: true });
toggle2.execute({ toggledOn: true });
console.log('');
