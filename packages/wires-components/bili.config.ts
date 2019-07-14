import { Config } from 'bili';

const config: Config = {
  input: 'src/',
  output: {
    moduleName: 'WiresComponents',
    fileName: 'wires-components[min].[format][ext]',
    minify: false,
    format: ['cjs', 'iife-min', 'es-min']
  }
};

export default config;
