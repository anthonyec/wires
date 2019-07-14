import process from './process';

export default {
  version: 1,
  name: 'Parse',
  description: 'Parse JSON string to object',
  props: {
    jsonString: {
      label: 'JSON String',
      type: 'string',
      input: true
    },
    out: {
      label: 'JSON Output',
      type: 'object',
      output: true
    }
  },
  process,
  icon: ''
};
