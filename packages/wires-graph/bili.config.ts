import { Config } from 'bili';

const config: Config = {
  input: 'src/',
  output: {
    moduleName: 'WiresGraph',
    fileName: 'wires-graph[min].[format][ext]',
    minify: false,
    format: ['cjs', 'iife-min', 'es-min']
  }
};

export default config;
