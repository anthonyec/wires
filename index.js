const createGraph = require('./lib/graph');

const { AndGate } = require('./components/gates');
const Log = require('./components/log');
const { WriteFile, ReadFile } = require('./components/file');
const { Interval, Delay } = require('./components/time');
const { Round, Random, Compare } = require('./components/number');
const { Prepend } = require('./components/text');

const graph = createGraph();

const [
  random,
  log,
  interval,
  writeFile,
  round,
  readFile,
  prepend,
  andGate,
  compare,
  delay
] = graph.createComponents(
  Random,
  Log,
  Interval,
  WriteFile,
  Round,
  ReadFile,
  Prepend,
  AndGate,
  Compare,
  Delay
);

graph.connect(interval, 'out').to(random, 'generate');
graph.connect(random, 'number').to(round, 'number');
graph.connect(round, 'roundedNumber').to(writeFile, 'content');
graph.connect(writeFile, 'err').to(log, 'in1');
graph.connect(writeFile, 'path').to(readFile, 'path');
graph.connect(readFile, 'content').to(prepend, 'text');
graph.connect(prepend, 'text').to(log, 'in1');

graph.connect(round, 'roundedNumber').to(compare, 'in1');
graph.connect(compare, 'out').to(andGate, 'in1');
graph.connect(readFile, 'content').to(andGate, 'in2');
graph.connect(andGate, 'out').to(delay, 'in1');
graph.connect(delay, 'out').to(log, 'in1');

writeFile.setProps({ path: './output.txt' });
compare.setProps({ in2: 50 });
prepend.setProps({ textToPrepend: 'Text in file: ' });
interval.execute();
