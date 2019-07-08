# Wires Graph
Minimal FBP library to manage components communicating in a graph

## Getting started
### Creating a graph
```js
// Initiate a new graph
const graph = createGraph();

// Let the graph know about a new component it can use
const toggle = graph.createComponent(Toggle);
const log = graph.createComponent(Log);
```

### Connecting components
```js
// Connect the toggle output prop "out" to log input prop "in1"
graph.connect(toggle, 'out').to(log, 'in1');
```

### Executing components
Components can be run by calling `execute()` on them. This executes the function the component is created from. And passes it's output to any components it is connected from.

```js
// Execute the toggle component which will execute any component it is connected to.
toggle.execute({ toggledOn: true });

// In this case toggle is connected to log, which will be executed and log out the result.
// output: LOG: true
```

#### Top level components
If you execute components directly, you'll want usually execute the component at the top of it's connection chain. This is so that all connected components get ran. 

```txt
toggle[out] ---> [in1]log
```
_`toggle` is at the top of it's connection chain. Executing `toggle` will execute `log`. But executing `log` will not execute `toggle`_

Instead of manually executing each top level component, `start()` will look for all top level components and execute them.
```js
graph.start();
```

However, props can't be passed to them as it isn't certain which components will be top level. Set props with `setProps()` on components that need them.

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
import createGraph from 'graph';
import { Toggle, Log } from 'graph/components';

const toggle = graph.createComponent(Toggle);
const log = graph.createComponent(Log);

toggle.execute({ toggledOn: true });
```

## Design
### Components are functions
Components are functions that accept an `object` of props as input and return an `object` of props as output. This keeps the API boilerplate free (hopefully).

```js
function AndGate({ in1 = false, in2 = false } = {}) {
  return { out: in1 && in2 };
};
```
_An example of an [AND gate](https://en.wikipedia.org/wiki/AND_gate) as a component._

### Everything is a prop
There isn't a distinction between input and output. Everything that goes into is a component is a prop and stored internally. This allows props to be set on components without connections and for props to be remembered like "state".

```js
andGate.setProps({ in1: true });
```
_An example of setting a prop on a component to forever be `true`_

## Schema
### Connections
```js
{
  from: { uid: 'Text_1', prop: 'out' }
  to: { uid: 'Log_1', prop: 'in1' }
}
```
