function logger(...args) {
  console.log(...args);
}

function combinePropsWithValues(props, mapping) {
  return Object.keys(mapping).reduce((combinedProps, mappingKey) => {
    const mappingPropKey = mapping[mappingKey];

    if (!combinedProps[mappingPropKey]) {
      combinedProps[mappingKey] = props[mappingPropKey];
    }

    return combinedProps;
  }, {});
};

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

    applyPropsToState: function(uid, outletPropsFromComponent) {
      // Get the next component the current component is connected to.
      const connections = this.connections.filter((connection) => {
        return connection.from.uid === uid;
      });

      // For each next component:
      connections.forEach((connection, index) => {
        // Get the next component.
        const nextComponent = this.components[connection.to.uid];

        // Get the outlet to inlet mapping for the next component.
        const mapping = getConnectionMapping(connection);

        // Combine values from the output to the input mapping.
        const combinedProps = combinePropsWithValues(outletPropsFromComponent, mapping);

        // Store combinedProps as state for next time for value are additive.
        nextComponent.setProps(combinedProps);

        // Execute next component with combined props/values in state.
        nextComponent.execute(nextComponent.props);

        // Repeat.....recurssion....lovelyness
      });
    },

    executeComponent: function(uid, props) {
      logger('executeComponent:', uid);

      // Execute current component with input props and get the output.
      const outletPropsFromComponent = this.components[uid].executor(props);

      // Check if output props is a function
      if (typeof outletPropsFromComponent === 'function') {
        // Execute the function returned and pass in a callback
        outletPropsFromComponent((callbackProps) => {

          // When the callback is done, do the rest of the stuff...
          this.applyPropsToState(uid, callbackProps);
        });

        return;
      }

      this.applyPropsToState(uid, outletPropsFromComponent);
    },


    createComponent(component) {
      const { name } = component;
      const uid = this.getUid(name);
      const createdComponent = {
        uid,
        props: {},
        executor: component,
        execute: (props) => this.executeComponent.call(
          this,
          uid,
          props
        ),
        setProps: function (props) {
          this.props = { ...this.props, ...props };
        }
      };

      const newComponents = {
        ...this.components,
        ...{ [uid]: createdComponent }
      };

      this.components = newComponents;
      this.lastId += 1;

      return createdComponent;
    },

    createComponents: function (...components) {
      return components.map((arg) => {
        return this.createComponent(arg);
      });
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

    _connect: function(fromCreatedComponent, toCreatedComponent, outlet, inlet) {
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
      logger(`connect: ${fromUid} [${outlet}] ---> [${inlet}] ${toUid}`);
    },

    _disconnect: function(fromCreatedComponent, toCreatedComponent, outlet, inlet) {
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
      logger(`disconnect: ${fromUid} [${outlet}] -X-> [${inlet}] ${toUid}`);
    },

    connect: function(fromCreatedComponent, outlet) {
      return {
        to: (toCreatedComponent, inlet) => this._connect.call(this, fromCreatedComponent, toCreatedComponent, outlet, inlet)
      }
    }
  };
}

module.exports = function() {
  return new Graph();
};
