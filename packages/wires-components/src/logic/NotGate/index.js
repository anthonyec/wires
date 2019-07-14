import NotGate from './process';

export default {
  version: 1,
  name: 'NOT Gate',
  description: 'Output the inverted input',
  props: {
    in1: {
      label: 'Input',
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
  process: NotGate,
  migrate: (prevVersion, currentVersion, savedProps) => {},
  icon: ''
};
