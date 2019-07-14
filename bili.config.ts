import { Config } from 'bili';

const config: Config = {
  input: 'packages/wires-graph/src/index.js',
  output: {
    moduleName: 'WiresGraph',
    fileName: 'wires-graph[min].[format][ext]',
    minify: false,
    format: ['cjs', 'iife-min']
  }
};

export default config;
