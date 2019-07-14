import OrGate from './process';

export default {
  version: 1,
  name: 'OR Gate',
  description: 'Output true when either of of the inputs are true',
  props: {
    in1: {
      label: 'Input 1',
      type: 'bool',
      default: false,
      input: true
    },
    in2: {
      label: 'Input 2',
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
  process: OrGate,
  migrate: (prevVersion, currentVersion, savedProps) => {},
  icon: ''
};
