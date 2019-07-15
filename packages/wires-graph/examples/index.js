const createGraph = require('../dist/wires-graph.cjs').default;

const Log = require('../components/log');
const { Prepend } = require('../components/text');
const { Request } = require('../components/network');
const { ParseJson, Pluck } = require('../components/json');
const { Round, Abs, Operate } = require('../components/math');

// Initiate the graph
const graph = createGraph();

// Create components like this...
const operate = graph.createComponent(Operate);
const abs = graph.createComponent(Abs);
const round = graph.createComponent(Round);

// Or like this.
const [log, prepend, request, parseJson, pluck] = graph.createComponents(
  Log,
  Prepend,
  Request,
  ParseJson,
  Pluck
);

graph.on('connected', (evt) => {
  console.log('connected', evt);
});

graph.on('disconnected', (evt) => {
  console.log('Disconnect');
});

graph.on('created', (evt) => {
  console.log('Component created');
});

graph.on('destroyed', (evt) => {
  console.log('Component destroyed');
});

graph.on('executed', (evt) => {
  console.log('execute', evt);
});

// Setup
//// Math
graph.connect(operate, 'out').to(round, 'in1');
graph.connect(round, 'out').to(abs, 'in1');
graph.connect(abs, 'out').to(log, 'in1');

//// Network
graph.connect(request, 'data').to(parseJson, 'in1');
graph.connect(parseJson, 'out').to(pluck, 'json');
graph.connect(pluck, 'out').to(prepend, 'text');
graph.connect(prepend, 'text').to(log, 'in1');

/// Errors
graph.connect(pluck, 'err').to(log, 'in1');
graph.connect(parseJson, 'err').to(log, 'in1');
graph.connect(request, 'err').to(log, 'in1');

/*
  operate[out] -> [in1]round[out] -> [in1]abs[out] -> [in1]log
  request[data] -> [in1]parseJson[out] -> [in1]pluck[out] -> [text]prepend[text] -> [in1]log
*/

// Initial props
//// Maths
operate.setProps({ in1: 10, operator: '/', in2: 4 });

//// Network
prepend.setProps({ textToPrepend: 'London weather: ' });
pluck.setProps({ path: '.weather[0].main' });
request.setProps({
  url:
    'https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22'
});

// Run the graph!
graph.start();
