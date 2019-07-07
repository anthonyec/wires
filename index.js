const createGraph = require('./lib/graph');
const { AndGate } = require('./components/gates');
const Log = require('./components/log');
const Toggle = require('./components/toggle');
const Delay = require('./components/delay');

const graph = createGraph();

const node1 = graph.createComponent(({ in1 = false } = {}) => {
  return { out1: in1 + 'out1', out2: in1 + 'out2' }
});
const node2 = graph.createComponent(({ in1 = false } = {}) => {
  return { out1: in1 + 'out1', out2: in1 + 'out2' }
});
function FakeDelay({ in1 = false } = {}) {
  return { out: in1 }
};
const andGate = graph.createComponent(AndGate);
const log = graph.createComponent(Log);
const log2 = graph.createComponent(Log);
const toggle1 = graph.createComponent(Toggle);
const toggle2 = graph.createComponent(Toggle);
const delay = graph.createComponent(Delay);

console.log(graph);

/*
                                          .-> [in1]node2[out1] ----.-> [in1]delay[out] --.
                                          |                        |                     |
                                [out1]----'                        |---------------------'
                  .-> [in1]node1                                   '-> [value]log2
  toggle1[out] ---              [out2] ----------------------------`
                  `-> [in1]
                          andGate[out] ---> [value]log
                  .-> [in2]
  toggle2[out] ---
*/

console.log('-- connections --');
graph.from(toggle1).link('out', 'in1').to(node1);
graph.from(node1).link('out1', 'in1').to(node2);
graph.from(node2).link('out1', 'value').to(log2);
graph.from(node2).link('out1', 'in1').to(delay);
graph.from(delay).link('out', 'value').to(log2);
graph.from(node1).link('out2', 'value').to(log2);
graph.from(toggle1).link('out', 'in1').to(andGate);
graph.from(toggle2).link('out', 'in2').to(andGate);
graph.from(andGate).link('out', 'value').to(log);
console.log('');

console.log('-- execution --');
toggle1.execute({ toggledOn: true });
toggle2.execute({ toggledOn: true });
// console.log('');
