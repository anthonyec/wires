import process from './process';

export default {
  version: 1,
  name: 'Stringify',
  description: 'Stringify JSON object to string',
  props: {
    jsonObject: {
      label: 'JSON Object',
      type: 'object',
      input: true
    },
    out: {
      label: 'JSON String',
      type: 'string',
      output: true
    }
  },
  process,
  icon: ''
};
