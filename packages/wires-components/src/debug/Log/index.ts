import Log from './process';

export default {
  version: 1,
  name: 'Log',
  description: 'Log input to the developer console',
  props: {
    value: {
      label: 'Value',
      type: 'string',
      default: '',
      input: true,
      output: true
    },
    logger: {
      type: 'object',
      private: true
    }
  },
  process: Log,
  migrate: (prevVersion, currentVersion, savedProps) => { },
  icon: ''
};


