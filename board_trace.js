function Node({ in1 } = {}) {
  return { out: in1 };
}

function Log({ value = '' } = {}) {
  console.log('Log!', value);
}

function Toggle({ toggledOn = true } = {}) {
  return { out: toggledOn }
}

function AndGate({ in1 = false, in2 = false } = {}) {
  return {
    out: in1 && in2
  };
};

function OrGate({ in1, in2 } = {}) {
  return {
    out: in1 || in2
  };
};


function Board() {
  const board = {
    usedNames: {},

    components: {},
    connections: [],

    tracePath: function({ to: { uid }}, path = [], callback = () => {}) {
      const nextConnection = this.connections.filter((connection) => {
        return connection.from.uid === uid;
      });

      if (nextConnection.length) {
        const mem = [...path, nextConnection[0]];
        this.tracePath.call(this, nextConnection[0], mem, callback);
      } else {
        callback(path);
      }
    },

    executeComponent: function(uid) {
      console.log('executeComponent:', uid);

      const connections = this.connections.filter((connection) => {
        return connection.from.uid === uid;
      });

      connections.forEach((connection) => {
        console.log(' ');
        console.log('PATH ---');
        this.tracePath(connection, [], (path) => {
          const newPath = [...[connection], ...path];
          const pathString = newPath.reduce((mem, step, index) => {
            return mem + this.getConnectionAsString(step, index !== 0);
          }, '');

          console.log(pathString);
        });
      });

      // connections.forEach(connection => console.log(this.getConnectionAsString(connection)));
      console.log(' ')
    },

    createComponent: function (component) {
      const { name } = component;
      const uid = this.getUid(name);
      const createdComponent = {
        uid,
        props: {},
        // executor: component,
        execute: (props) => this.executeComponent.call(
          this,
          uid
          // component,
          // props
        )
      };

      const newComponents = {
        ...this.components,
        ...{ [uid]: createdComponent }
      };

      this.components = newComponents;
      this.lastId += 1;

      return createdComponent;
    },

    getConnectionAsString(connection, ignoreStart) {
      const startUid = !ignoreStart ? `(${connection.from.uid})` : '';
      return `${startUid}[${connection.from.prop}] ---> [${connection.to.prop}](${connection.to.uid})`;
    },

    getUid(name) {
      if (!this.usedNames[name]) {
        this.usedNames[name] = 1;
      }

      const uid = `${name}_${this.usedNames[name]}`;
      this.usedNames[name] += 1;

      return uid;
    },

    connect: function(fromCreatedComponent, toCreatedComponent, outlet, inlet) {
      const { uid: fromUid } = fromCreatedComponent;
      const { uid: toUid } = toCreatedComponent;
      const newConnection = {
        from: { uid: fromUid, prop: outlet },
        to: { uid: toUid, prop: inlet },
      };
      const newConnections = [
        ...this.connections,
        newConnection
      ];

      this.connections = newConnections;

      console.log(`connect: ${fromUid} [${outlet}] ---> [${inlet}] ${toUid}`);
    },

    disconnect: function(fromCreatedComponent, toCreatedComponent, outlet, inlet) {
      const { uid: fromUid } = fromCreatedComponent;
      const { uid: toUid } = toCreatedComponent;

      const indexToRemove = this.connections.findIndex((connection) => {
        return connection.from.uid === fromUid &&
               connection.from.prop === outlet &&
               connection.to.uid === toUid &&
               connection.to.prop === inlet;
      });

      // https://vincent.billey.me/pure-javascript-immutable-array/
      const newConnections = this.connections.slice(0, indexToRemove).concat(this.connections.slice(indexToRemove + 1));

      this.connections = newConnections;

      console.log(`disconnect: ${fromUid} [${outlet}] -X-> [${inlet}] ${toUid}`);
    },

    from: function(fromCreatedComponent) {
      return {
        link: (outlet, inlet) => {
          return {
            to: (toCreatedComponent) => this.connect.call(this, fromCreatedComponent, toCreatedComponent, outlet, inlet)
          }
        },

        unlink: (outlet, inlet) => {
          return {
            to: (toCreatedComponent) => this.disconnect.call(this, fromCreatedComponent, toCreatedComponent, outlet, inlet)
          }
        }
      }
    },

    // connect: function (createdComponent, outlet) {
    //   const { uid: fromUid } = createdComponent;

    //   return {
    //     to: (createdComponent, inlet) => {
    //       const { uid: toUid } = createdComponent;
    //       const newConnection = {
    //         from: { uid: fromUid, prop: outlet },
    //         to: { uid: toUid, prop: inlet },
    //       };
    //       const newConnections = [
    //         ...this.connections,
    //         newConnection
    //       ];

    //       this.connections = newConnections;

    //       console.log(`connect: ${fromUid} [${outlet}] ---> [${inlet}] ${toUid}`);
    //     }
    //   };
    // }
  };

  return board;
}

const board = new Board();

const toggle = board.createComponent(Toggle);
const toggle2 = board.createComponent(Toggle);
const andGate = board.createComponent(AndGate);
const log = board.createComponent(Log);
const node = board.createComponent(Node);
const node2 = board.createComponent(Node);
const node3 = board.createComponent(Node);

console.log(board.components);

console.log(' ');
console.log('--- connections ---');

// board.connect(toggle, 'out').to(andGate, 'in1');
// board.connect(toggle2, 'out').to(andGate, 'in2');
// board.connect(andGate, 'out').to(log, 'value');

// board.connect(toggle, 'out').to(node, 'in1');
// board.connect(node, 'out').to(node2, 'in1');
// board.connect(node2, 'out').to(node3, 'in1');
// board.connect(node3, 'out').to(log, 'value');

board.from(toggle).link('out', 'in1').to(andGate);
board.from(toggle2).link('out', 'in2').to(andGate);
board.from(toggle).unlink('out', 'in1').to(andGate);

console.log(' ');
console.log('---- simulate ----');

// toggle.execute();
// toggle2.execute({ toggledOn: true });

// board.disconnect(toggle, 'out').from(andGate, 'in1');
// board.from(toggle).via('out', 'in1').to(andGate);
// board.from(toggle2).via('out', 'in2').to(andGate);

// board.from(toggle2).unlink('out', 'in2').to(andGate);
