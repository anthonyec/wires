import NotGate from './process';
import { BOOLEAN } from '../../types';

export default {
  version: 1,
  name: 'NOT Gate',
  description: 'Output the inverted input',
  props: {
    in1: {
      label: 'Input',
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
  process: NotGate,
  migrate: (prevVersion, currentVersion, savedProps) => {},
  icon: ''
};
