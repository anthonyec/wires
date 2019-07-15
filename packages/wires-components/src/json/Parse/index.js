import process from './process';
import { STRING, OBJECT } from '../../types';

export default {
  version: 1,
  name: 'Parse',
  description: 'Parse JSON string to object',
  props: {
    jsonString: {
      label: 'JSON String',
      type: STRING,
      input: true
    },
    out: {
      label: 'JSON Output',
      type: OBJECT,
      output: true
    }
  },
  process,
  icon: ''
};
