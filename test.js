const DEFAULT_HOOKS = {
  effect: () => {},
};

function Mouse(
  { dom = null, in1 = false } = {},
  hooks = DEFAULT_HOOKS
) {
  console.log('ProcessName', dom);

  hooks.effect(() => {
    console.log('mount');

    return () => {
      console.log('unmount');
    }
  }, [dom]);


  if (!dom) {
    return {};
  }

  return {
    out: in1
  };
}

let mount = null;
let unmount = null;

const hooks = {
  effect: (callback) => {
    mount = callback;
  }
}

Mouse({ in1: true, dom: true }, hooks);
unmount = mount();

