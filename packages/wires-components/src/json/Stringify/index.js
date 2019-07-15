import process from './process';
import { OBJECT, STRING } from '../../types';

export default {
  version: 1,
  name: 'Stringify',
  description: 'Stringify JSON object to string',
  props: {
    jsonObject: {
      label: 'JSON Object',
      type: OBJECT,
      input: true
    },
    out: {
      label: 'JSON String',
      type: STRING,
      output: true
    }
  },
  process,
  icon: ''
};
