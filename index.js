const createGraph = require('./lib/graph');
const { AndGate } = require('./components/gates');
const Log = require('./components/log');
const Toggle = require('./components/toggle');

const graph = createGraph();

const andGate = graph.createComponent(AndGate);
const log = graph.createComponent(Log);
const toggle1 = graph.createComponent(Toggle);
const toggle2 = graph.createComponent(Toggle);

graph.from(toggle1).link('out', 'in1').to(andGate);
graph.from(toggle2).link('out', 'in2').to(andGate);
graph.from(andGate).link('out', 'value').to(log);

toggle1.execute({ toggledOn: true });
toggle2.execute({ toggledOn: true });

// console.log(graph);


function mapOutletPropsToInletProps(outletProps = {}, inletProps = {}, mapping = {}) {
  const mapped = Object.keys(inletProps).reduce((mem, inletProp) => {
    const outletMapping = mapping[inletProp];

    // Exists in mapping
    if (outletMapping) {
      mem[inletProp] = outletProps[outletMapping];
    }

    return mem;
  }, inletProps);

  return mapped;
}

const t = mapOutletPropsToInletProps({ toggledOn: true }, { in1: false, in2: false }, { in1: 'toggledOn' });
console.log(t);
