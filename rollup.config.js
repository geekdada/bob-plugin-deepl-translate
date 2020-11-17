import { join } from 'path'
import copy from 'rollup-plugin-copy'
import json from '@rollup/plugin-json'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import nodePolyfills from 'rollup-plugin-node-polyfills'
import typescript from '@rollup/plugin-typescript'

export default {
  input: join(__dirname, './src/main.ts'),
  output: {
    format: 'cjs',
    exports: 'auto',
    dir: join(__dirname, `./build`),
    preserveModules: true,
  },
  plugins: [
    copy({
      targets: [
        // { src: './src/info.json', dest: `build` },
      ],
    }),
    json({ namedExports: false }),
    resolve({
      extensions: ['.js', '.ts'],
      preferBuiltins: true,
    }),
    commonjs({
      include: ['node_modules/**'],
    }),
    nodePolyfills(),
    typescript({}),
  ],
  external: [
    'crypto-js',
    '$util',
    '$http',
    '$info',
    '$option',
    '$log',
    '$data',
    '$file',
  ],
}
