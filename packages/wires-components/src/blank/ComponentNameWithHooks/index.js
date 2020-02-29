import process from './process';

export default {
  version: 1,
  name: 'Component Name',
  description: 'Small description about the component',
  props: {
    in1: {
      label: 'Input 1',
      type: 'bool',
      default: false,
      input: true
    },
    out: {
      label: 'Output',
      type: 'bool',
      output: true
    }
  },
  process,
  icon: ''
};
