import typescript from '@rollup/plugin-typescript';

export default {
  external: [
    'json5'
  ],
  input: 'src/index.ts',
  output: {
    file: 'lib/wili.mjs',
    format: 'esm',
    sourcemap: true
  },
  plugins: [
    typescript()
  ]
};
