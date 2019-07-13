const Graph = (function() {
  let _val, _deps; // hold our state and dependencies in scope

  return {
    process(Component) {
      const Comp = Component();
      const result = Comp.process();

      console.log(result);

      return Comp;
    },
    useEffect(callback, depArray) {
      const hasNoDeps = !depArray;
      const hasChangedDeps = _deps
        ? !depArray.every((el, i) => el === _deps[i])
        : true;
      if (hasNoDeps || hasChangedDeps) {
        callback();
        _deps = depArray;
      }
    },
    useState(initialValue) {
      _val = _val || initialValue;
      function setState(newVal) {
        _val = newVal;
      }
      return [_val, setState];
    }
  };
})();

export default Graph;
