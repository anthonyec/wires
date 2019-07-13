const { createGraph, sideEffect }  = require('../lib/graph');

const Log = require('../components/log');

// Initiate the graph
const graph = createGraph();

function Mouse({ domNode }) {
  return (next) => {
    function handleMouseMove(evt) {
      next({ x: evt.clientX, y: evt.clientX })
    }

    sideEffect(() => {
      console.log('Do my mounting');
      domNode.addEventListener('mousemove', handleMouseMove);

      return () => {
        console.log('Do some unmounting');
        domNode.removeEventListener('mousemove', handleMouseMove, {
          passive: true
        });
      }
    });
  };
}

const log = graph.createComponent(Log);
const mouse = graph.createComponent(Mouse);
const mouse2 = graph.createComponent(Mouse);

// Setup
graph.connect(mouse, 'x').to(log, 'in1');
graph.connect(mouse, 'y').to(log, 'in1');

// Run the graph!
graph.start();
graph.start();

graph.destroyComponent(mouse);

graph.start();

