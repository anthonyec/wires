function logger(...args) {
  console.log(...args);
}

function combinePropsWithValues(props = {}, mapping = {}) {
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

      // For each next component connection:
      connections.forEach((connection) => {
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

    executeComponent: function(uid, props = {}) {
      logger('executeComponent:', uid);

      // Combine with existing props that may be there on init.
      const propsToPassIn = {
        ...this.components[uid].props,
        ...props
      };

      // Execute current component with input props and get the output.
      const outletPropsFromComponent = this.components[uid].process(propsToPassIn);

      // Check if output props is a function
      if (typeof outletPropsFromComponent === 'function') {
        // Execute the function returned and pass in a callback
        outletPropsFromComponent((callbackProps) => {

          // When the callback is done, do the rest of the stuff...
          this.applyPropsToState(uid, callbackProps);
        });

        return;
      }

      if (typeof outletPropsFromComponent !== 'object') {
        console.warn(`${uid} does not return object props. Non-object props has not been implemented.`);
        return;
      }

      this.applyPropsToState(uid, outletPropsFromComponent);
    },


    createComponent: function(component) {
      const { name } = component;
      const uid = this.getUid(name);
      const createdComponent = {
        uid,
        props: {},
        process: component,
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

    getUid(name) {
      if (!this.usedNames[name]) {
        this.usedNames[name] = 1;
      }

      const uid = `${name}_${this.usedNames[name]}`;
      this.usedNames[name] += 1;

      return uid;
    },

    // Components at the top of the graph with no connections to them.
    getTopComponents: function() {
      const topComponents = Object.keys(this.components).filter((uid) => {
        const componentWithNoInlets = this.connections.filter((connection) => {
          return connection.to.uid === uid;
        });

        const componentWithOutlets = this.connections.filter((connection) => {
          return connection.from.uid === uid;
        });

        return componentWithNoInlets.length === 0 &&
               componentWithOutlets.length !== 0;
      });

      return topComponents.map((uid) => {
        return this.components[uid];
      });
    },

    start: function() {
      const tippyToppies = this.getTopComponents();
      logger('start:', tippyToppies.map(({ uid }) => uid));
      tippyToppies.forEach((component) => component.execute());
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