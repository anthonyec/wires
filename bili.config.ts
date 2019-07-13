import { Config } from 'bili';

const config: Config = {
  input: 'packages/wires-graph/src/index.ts',
  output: {
    fileName: 'wires-graph[min].[format][ext]',
    minify: true
  }
}

export default config;
