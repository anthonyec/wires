# Wires Graph
Minimal FBP library to manage components communicating in a graph

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
`
{
  from: { uid: 'Text_1', prop: 'out' }
  to: { uid: 'Log_1', prop: 'in1' }
}
`
