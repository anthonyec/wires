const { createGraph, sideEffect } = require('../src');

const Log = require('../components/log');

// Initiate the graph
const graph = createGraph();

function Mouse() {
  return (next) => {
    function handleMouseMove(evt) {
      next({ x: evt.clientX, y: evt.clientX });
    }

    sideEffect(() => {
      console.log('mount');

      return () => {
        console.log('unmount');
      };
    });
  };
}

const log = graph.createComponent(Log);
const mouse = graph.createComponent(Mouse);

// Setup
graph.connect(mouse, 'x').to(log, 'in1');
graph.connect(mouse, 'y').to(log, 'in1');

// Run the graph!
graph.start();
graph.start();

graph.destroyComponent(mouse);

graph.start();
