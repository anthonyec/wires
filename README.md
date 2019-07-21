# Wires

## Packages

### [Wires Graph](https://github.com/anthonyec/wires/tree/master/packages/wires-graph)

Foundation library to manage processes communicating in a graph.

### [Wires Components](https://github.com/anthonyec/wires/tree/master/packages/wires-components)

Standard set of components for Wires.

## Getting started

### Running tests

#### For all packages

By default, all tests will be run for all packages in parallel

```bash
npm run test
```

#### For a single package

Run tests using Lerna scopes. Use the name of the package you want to run tests for.

```bash
npm run test -- --scope wires-graph
```
