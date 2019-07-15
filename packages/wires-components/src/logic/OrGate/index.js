import OrGate from './process';
import { BOOLEAN } from '../../types';

export default {
  version: 1,
  name: 'OR Gate',
  description: 'Output true when either of of the inputs are true',
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
  process: OrGate,
  migrate: (prevVersion, currentVersion, savedProps) => {},
  icon: ''
};
