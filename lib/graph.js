function mapOutletPropsToInletProps(outletProps = {}, inletProps = {}, mapping = {}) {
  const mapped = Object.keys(inletProps).reduce((mem, inletProp) => {
    const outletMapping = mapping[inletProp];

    // Exists in mapping
    if (outletMapping) {
      mem[inletProp] = outletProps[outletMapping];
    }

    return mem;
  }, inletProps);

  return mapped;
}

function getConnectionMapping(connection = {}) {
  return {
    [connection.to.prop]: connection.from.prop
  }
}

function Graph() {
  return {
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

    // executeStep: function(step) {

    // },

    executeComponent: function(uid, props) {
      console.log('executeComponent:', uid);

      const connections = this.connections.filter((connection) => {
        return connection.from.uid === uid;
      });

      connections.forEach((connection) => {
        this.tracePath(connection, [], (path) => {
          const newPath = [...[connection], ...path];
          const pathString = newPath.reduce((mem, step, index) => {
            return mem + this.getConnectionAsString(step, index !== 0);
          }, '');
          const pathArr = newPath.reduce((mem, step, index) => {
            console.log(step.from.uid)
            return [...mem, {
              uid: step.from.uid
            }];
          }, []);

          const mapping = getConnectionMapping(connection);
          const newProps = mapOutletPropsToInletProps(props, this.components[uid].props, mapping);
          console.log(newProps);

          // console.log('path:', pathString);
          // let carriedProps = {};

          pathArr.forEach((step, index) => {
            // const mapping = getConnectionMapping(step);
          //   const componentInStore = this.components[uid];
          //   const propsToPassIn = index === 0 ? props : mapOutPropsToInProps(props, carriedProps);

          //   carriedProps = componentInStore.executor(props);

          //   console.log(step.uid, carriedProps);
          });
        });
      });

      // connections.forEach(connection => console.log(this.getConnectionAsString(connection)));
    },

    createComponent: function (component) {
      const { name } = component;
      const uid = this.getUid(name);
      const createdComponent = {
        uid,
        props: {},
        executor: component,
        execute: (props) => this.executeComponent.call(
          this,
          uid,
          // component,
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
    }
  };
}

module.exports = function() {
  return new Graph();
};
