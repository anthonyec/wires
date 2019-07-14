import ConditionalGate from './process';

export default {
  version: 1,
  name: 'Conditional Gate',
  description: 'Compare two values and output either true or false',
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
    comparator: {
      label: 'Comparator',
      type: 'selection',
      default: '>',
      options: [
        '>',
        '<',
        '>=',
        '<=',
        '==',
        '!='
      ],
      input: true
    },
    out: {
      label: 'Output',
      type: 'bool',
      output: true
    }
  },
  process: ConditionalGate,
  migrate: (prevVersion, currentVersion, savedProps) => {},
  icon: ''
};
