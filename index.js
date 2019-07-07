const createGraph = require('./lib/graph');

const Log = require('./components/log');
const { WriteFile, ReadFile } = require('./components/file');
const { Interval } = require('./components/time');
const { Round, Random } = require('./components/number');
const { Prepend } = require('./components/text');

const graph = createGraph();

// const [
//   random,
//   log,
//   interval,
//   writeFile,
//   round,
//   readFile,
//   prepend
// ] = graph.createComponent(
//   Random,
//   Log,
//   Interval,
//   WriteFile,
//   Round,
//   ReadFile,
//   Prepend
// );

const random = graph.createComponent(Random);
const log = graph.createComponent(Log);
const interval = graph.createComponent(Interval);
const writeFile = graph.createComponent(WriteFile);
const round = graph.createComponent(Round);
const readFile = graph.createComponent(ReadFile);
const prepend = graph.createComponent(Prepend);

graph.connect(interval, 'out').to(random, 'generate');
graph.connect(random, 'number').to(round, 'number');
graph.connect(round, 'roundedNumber').to(writeFile, 'content');
graph.connect(writeFile, 'err').to(log, 'in1');
graph.connect(writeFile, 'path').to(readFile, 'path');
graph.connect(readFile, 'content').to(prepend, 'text');
graph.connect(prepend, 'text').to(log, 'in1');

writeFile.setProps({ path: './output.txt' });
prepend.setProps({ textToPrepend: 'Text in file: ' });
interval.execute();
