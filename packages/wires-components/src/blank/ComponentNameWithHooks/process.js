const DEFAULT_HOOKS = {
  sideEffect: () => {},
};

export default function ProcessName({ in1 = false } = {}, hooks = DEFAULT_HOOKS) {
  hooks.sideEffect(() => {
    console.log('mount');

    return () => {
      console.log('unmount');
    }
  });

  return {
    out: in1
  };
}
