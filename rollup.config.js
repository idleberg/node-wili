import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';

const plugins = [
  commonjs(),
  json()
];

const compilerOptions = {
  allowSyntheticDefaultImports: true,
  moduleResolution: "node",
  strictNullChecks: true,
  typeRoots: ['./types', './node_modules/@types']
};

const external = [
  'child_process',
  'events',
  'os',
  'stream'
];

export default [
  {
    external,
    input: 'src/index.ts',
    output: {
      file: 'lib/wili.cjs',
      format: 'cjs'
    },
    plugins: [
      ...plugins,
      typescript(compilerOptions)
    ]
  },
  {
    external,
    input: 'src/index.ts',
    output: {
      file: 'lib/wili.mjs',
      format: 'esm'
    },
    plugins: [
      ...plugins,
      typescript({
        ...compilerOptions,
        module: "ES2020",
        moduleResolution: "node"
      })
    ]
  }
];
