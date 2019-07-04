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

    executeComponent: function(uid, component, props = {}) {

      const storedComponent = this.components[uid];
      const componentComputedProps = {
        ...storedComponent.props,
        ...component(props)
      };

      console.log('executeComponent', uid, componentComputedProps);

      const connections = this.connections.filter((connection) => {
        return connection.from.uid === uid;
      }).map((connection) => {
        return connection.to;
      });

      console.log(connections);

      // console.log(uid, component, props, storedComponent);
      // console.log('execute', uid, props);
    },

    getUid(name) {
      if (!this.usedNames[name]) {
        this.usedNames[name] = 1;
      }

      const uid = `${name}_${this.usedNames[name]}`;
      this.usedNames[name] += 1;

      return uid;
    },

    createComponent: function (component) {
      const { name } = component;
      const uid = this.getUid(name);
      const createdComponent = {
        uid,
        props: {},
        execute: (props) => this.executeComponent.call(
          this,
          uid,
          component,
          props
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

    connect: function (createdComponent, outlet) {
      const { uid: fromUid } = createdComponent;

      return {
        to: (createdComponent, inlet) => {
          const { uid: toUid } = createdComponent;
          console.log(`connect: ${fromUid} [${outlet}] ---> [${inlet}] ${toUid}`);

          this.connections.push({
            from: { uid: fromUid, prop: outlet },
            to: { uid: toUid, prop: inlet },
          });
        }
      };
    }
  };

  return board;
}

const board = new Board();

const toggle = board.createComponent(Toggle);
const toggle2 = board.createComponent(Toggle);
const andGate = board.createComponent(AndGate);

console.log('board.components', board.components);

console.log('--- connections ---');

board.connect(toggle, 'out').to(andGate, 'in1');
board.connect(toggle2, 'out').to(andGate, 'in2');

console.log(' ');
console.log('---- simulate ----');

toggle.execute();
toggle2.execute({ toggledOn: true });
