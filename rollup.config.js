import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';

const plugins = [
  commonjs(),
  json(),
  nodeResolve({
    preferBuiltins: true
  }),
  typescript({
    allowSyntheticDefaultImports: true
  })
];

export default [
  {
    input: 'src/index.ts',
    output: {
      dir: 'lib',
      format: 'esm'
    },
    plugins: plugins
  },

];
