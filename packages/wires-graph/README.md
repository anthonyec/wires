# Wires Graph

Minimal [FBP](https://en.wikipedia.org/wiki/Flow-based_programming) library to manage processes communicating in a graph.

## Getting started

### Creating a graph

```js
// Initiate a new graph
const graph = createGraph();

// Let the graph know about a new process it can use as a component
const toggle = graph.createComponent(Toggle);
const log = graph.createComponent(Log);
```

### Connecting components

```js
// Connect the toggle output prop "out" to log input prop "in1"
graph.connect(toggle, "out").to(log, "in1");
```

### Executing components

Components can be run by calling `execute()` on them. This executes the process inside the component. It will pass output from the process to components it is connected to.

```js
// Execute the toggle component which will execute any component it is connected to.
toggle.execute({ toggledOn: true });

// In this case toggle is connected to log, which will be executed and log out the result.
// output: LOG: true
```

#### Top level components

If you execute component's process directly, execute the component at the top of it's connection chain. This is so that all connected component's procceses get executed.

```txt
// Executing `toggle` will execute `log`. But executing `log` will not execute `toggle`.
toggle[out] ---> [in1]log
```

Instead of manually executing each top level component, `start()` will look for all top level components and execute their processes.

```js
graph.start();
```

However, props can't be passed to them via `start()`. Set props with `setProps()` on components that need them.

```js
toggle.setProps({ toggledOn: true });

graph.start();
```

### Full example

The final graph visualised:

```txt
toggle[out] ---> [in1]log
```

And to create it in code:

```js
import createGraph from "graph";
import { Toggle, Log } from "graph/components";

const toggle = graph.createComponent(Toggle);
const log = graph.createComponent(Log);

toggle.execute({ toggledOn: true });
```

## Design

### Components are functions

Processes inside components are functions that accept an `object` of props as input and return an `object` of props as output. This keeps the API boilerplate free (hopefully).

```js
// An example of an [AND gate](https://en.wikipedia.org/wiki/AND_gate) as a component.
function AndGate({ in1 = false, in2 = false } = {}) {
  return { out: in1 && in2 };
}
```

### Everything is a prop

There isn't a distinction between input and output. Everything that goes into a process is a prop and stored internally. This allows props to be set on processes without connections and for props to be memorized like "state".

```js
// An example of setting a prop on a component to forever be `true`.
andGate.setProps({ in1: true });
```

## Schema

### Connections

```js
{
  from: { uid: 'Text_1', prop: 'out' }
  to: { uid: 'Log_1', prop: 'in1' }
}
```
