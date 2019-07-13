const Graph = require('../../../dist/wires-graph.cjs');

function Counter() {
  const [count, setCount] = Graph.useState(0);
  // const [text, setText] = Graph.useState('foo'); // 2nd state hook!

  // Graph.useEffect(() => {
  //   console.log('effect', count, text);
  // }, [count, text]);

  return () => {
    console.log('render', { count })
    setCount(count + 1);

    return { count: count + 1 }
  };
}

function Counter2() {
  const [count, setCount] = Graph.useState(10);
  // const [text, setText] = Graph.useState('foo'); // 2nd state hook!

  // Graph.useEffect(() => {
  //   console.log('effect', count, text);
  // }, [count, text]);

  return () => {
    console.log('render', { count })
    setCount(count + 1);

    return { count: count + 1 }
  };
}

let App;

app = Graph.render(Counter);
app = Graph.render(Counter);
app = Graph.render(Counter);
app = Graph.render(Counter);

console.log(app());
