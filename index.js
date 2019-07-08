const createGraph = require('./lib/graph');

const Log = require('./components/log');
const { Prepend } = require('./components/text');
const { Request } = require('./components/network');
const { ParseJson, Pluck } = require('./components/json');

const graph = createGraph();

const [
  log,
  prepend,
  request,
  parseJson,
  pluck
] = graph.createComponents(
  Log,
  Prepend,
  Request,
  ParseJson,
  Pluck
);

// Main
graph.connect(request, 'data').to(parseJson, 'in1');
graph.connect(parseJson, 'out').to(pluck, 'json');
graph.connect(pluck, 'out').to(prepend, 'text');
graph.connect(prepend, 'text').to(log, 'in1');

// Errors
graph.connect(pluck, 'err').to(log, 'in1');
graph.connect(parseJson, 'err').to(log, 'in1');
graph.connect(request, 'err').to(log, 'in1');

prepend.setProps({ textToPrepend: 'London weather: ' });
pluck.setProps({ path: '.weather[0].main' });
request.setProps({ url: 'https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22' });

graph.start();
