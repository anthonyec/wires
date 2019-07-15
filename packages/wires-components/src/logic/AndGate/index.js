import AndGate from './process';
import { BOOLEAN } from '../../types';

export default {
  version: 1,
  name: 'AND Gate',
  description: 'Output true when all of the inputs are true',
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
    out: {
      label: 'Output',
      type: BOOLEAN,
      output: true
    }
  },
  process: AndGate,
  migrate: (prevVersion, currentVersion, savedProps) => {},
  icon: ''
};
