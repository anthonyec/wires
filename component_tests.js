// {
//   "in1": "any",
//   "in2": "any",
//   "out": "boolean"
// }

// {
//   icon: function(ctx, props) {

//   },
//   execute: ComparatorGate
// }

const e = {
  migrator: (wires, prevVersion, nextVersion, prevProps) => {
    if (prevVersion === 1 && nextVersion === 2) {
      const { context, x, y, w, h } = prevProps;

      wires.warn('Context changed!');

      return {
        ctx: context
      }
    }
  },
  renderer: (ctx, props) => {
    ctx.fillText("Box!", 0, 0);
  },
  executor: () => {}
};

function Log({ value = '' } = {}) {
  console.log('Log!', value);
}

function Toggle({ toggledOn = true } = {}) {
  return { out: toggledOn }
}

function AndGate({ in1 = false, in2 = false }) {
  return {
    out: in1 && in2
  };
};

function OrGate({ in1, in2 }) {
  return {
    out: in1 || in2
  };
};

function ComparatorGate({ in1, in2, comparator = '>' }) {
  return {
    out: in1 > in2
  };
};

function Delay({ time = 1000 } = {}) {
  return (execute) => {
    setTimeout(() => {
      execute({ out: true });
    }, time);
  };
}

function Interval({ time = 1000 } = {}) {
  return (execute) => {
    setInterval(() => {
      execute({ out: Math.random() * 10 });
    }, time);
  };
}

function DrawBox({ ctx, x, y, w, h } = {}) {
  ctx.fillRect(x, y, w, h);
  // useRequestAnimationFrame(() => {
  // });

  return { ctx, x, y, w, h };
};

function DrawText({ ctx, text, x, y, font = '18px Arial' } = {}) {
  ctx.font = font;
  ctx.fillText(text, x, y);

  const { width, height } = ctx.measureText(text)

  return { ctx, text, x, y, width, height };
};

// console.log(AndGate({ in1: true, in2: true }));
// console.log(OrGate({ in1: true, in2: false }));
// console.log(ComparatorGate({ in1: 2, in2: 1 }));

// const comOut = Delay();

// if (typeof comOut === 'function') {
//   const executor = (props) => {
//     console.log('async execute', props);
//   };
//   const t = comOut(executor);
// }


function ComparatorGateComponent() {
  return {
    executor: ComparatorGate,
    renderer: (ctx, props) => {
      ctx.fillText(props.comparator, 0, 0);
    }
  };
}

const AndGateComponent = {
  executor: AndGate
};

function Board() {
  const board = {
    lastId: 0,
    components: {},
    connections: [],

    createComponent: function (component) {
      const id = `${component.name}_${this.lastId}`;
      const createdComponent = {
        id,
        props: {},
        execute: props => {
          const storedComponent = this.components[id];
          const computedProps = component(props);
          const isThunk = typeof computedProps === 'function';

          console.log(`execute: ${id}`, storedComponent.props, isThunk);

          if (!isThunk) {
            doStuff.call(this, computedProps);
          } else {
            console.log('do thunky stuff');
            const executor = (props) => {
              doStuff.call(this, props);
            };

            const t = component()(executor);
          }

          function doStuff(newComputedProps) {
            storedComponent.props = {
              ...storedComponent.props,
              ...newComputedProps
            };

            const outletConnectionsForComponent = this.connections.filter(connection => {
              return connection.from[0] === id;
            });

            let affectedComponents = outletConnectionsForComponent.map(connection => {
              const outlet = connection.from[1];
              const value = newComputedProps[outlet];

              return {
                id: connection.to[0],
                inlet: connection.to[1],
                value
              }
            })

            affectedComponents.filter(affectedComponent => !!affectedComponent.value);

            if (!affectedComponents.length) {
              return;
            }

            affectedComponents.forEach(component => {
              const { id: toId, inlet, value } = component;
              const storedAffectedComponent = this.components[toId];

              const newProps = {
                ...storedAffectedComponent.props,
                ...{ [inlet]: value }
              }

              storedAffectedComponent.props = newProps;

              this.components[toId].execute(storedAffectedComponent.props)
            });
          }
        }
      };

      this.components[id] = createdComponent;
      this.lastId += 1;

      return createdComponent;
    },

    connect: function (createdComponent, outlet) {
      const { id: fromId } = createdComponent;

      return {
        to: (createdComponent, inlet) => {
          const { id: toId } = createdComponent;
          console.log(`connect: ${fromId} [${outlet}] ---> [${inlet}] ${toId}`);

          this.connections.push({
            from: [fromId, outlet],
            to: [toId, inlet],
          });
        }
      };
    }
  };

  return board;
}

const board = new Board();

const andGate = board.createComponent(AndGate);
const toggle = board.createComponent(Toggle);
const toggle2 = board.createComponent(Toggle);
const log = board.createComponent(Log);
const delay = board.createComponent(Delay);
const interval1 = board.createComponent(Interval);
const interval2 = board.createComponent(Interval);
const comparator = board.createComponent(ComparatorGate);

board.connect(toggle, 'out').to(andGate, 'in1');
board.connect(toggle2, 'out').to(andGate, 'in2');
board.connect(andGate, 'out').to(log, 'value');

toggle.execute();
toggle2.execute({ toggledOn: true });
toggle.execute({ toggledOn: false });
toggle.execute({ toggledOn: true });


board.connect(delay, 'out').to(interval1, '');
board.connect(delay, 'out').to(interval2, '');
board.connect(interval1, 'out').to(comparator, 'in1');
board.connect(interval2, 'out').to(comparator, 'in2');
board.connect(comparator, 'out').to(log, 'value');

delay.execute();
// interval2.execute();
