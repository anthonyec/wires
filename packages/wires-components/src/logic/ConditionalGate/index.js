import ConditionalGate from './process';
import { BOOLEAN, STRING } from '../../types';

export default {
  version: 1,
  name: 'Conditional Gate',
  description: 'Compare two values and output either true or false',
  props: {
    in1: {
      label: 'Input 1',
      type: BOOLEAN,
      default: false,
      input: true
    },
    in2: {
      label: 'Input 2',
      type: BOOLEAN,
      default: false,
      input: true
    },
    comparator: {
      label: 'Comparator',
      type: STRING,
      default: '>',
      options: ['>', '<', '>=', '<=', '==', '!='],
      input: true
    },
    out: {
      label: 'Output',
      type: BOOLEAN,
      output: true
    }
  },
  process: ConditionalGate,
  migrate: (prevVersion, currentVersion, savedProps) => {},
  icon: ''
};
