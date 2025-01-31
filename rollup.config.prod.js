import commonjs from '@rollup/plugin-commonjs'
import filesize from 'rollup-plugin-filesize'
import postcss from 'rollup-plugin-postcss'
import progress from 'rollup-plugin-progress'
import replace from '@rollup/plugin-replace'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import ts from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'
import typescript from 'typescript'
import * as pkg from './package.json'

const input = ['src/index.tsx']

const name = 'ReactTooltip'

const banner = `
/*
* React Tooltip
* {@link https://github.com/ReactTooltip/react-tooltip}
* @copyright ReactTooltip Team
* @license MIT
*/

'use client';` // this 'use client' prevent break Next.js 13 projects when using tooltip on server side components

const external = [
  ...Object.keys(pkg.peerDependencies ?? {}),
  ...Object.keys(pkg.dependencies ?? {}),
]

const buildFormats = [
  /**
   * Temporary build to keep the extracted CSS file.
   * I don't want to do a major release now with only the CSS change,
   * so, we will keep the css being exported by the lib and now
   * we will inject the css into the head by default.
   * The CSS file import is deprecated and the file is only
   * for style reference now.
   */
  {
    file: 'dist/react-tooltip.mjs',
    format: 'es',
    extractCSS: true,
  },
  {
    file: 'dist/react-tooltip.umd.js',
    format: 'umd',
    globals: {
      '@floating-ui/dom': 'FloatingUIDOM',
      react: 'React',
      'react-dom': 'ReactDOM',
      classnames: 'classNames',
      'prop-types': 'PropTypes',
    },
  },
  {
    file: 'dist/react-tooltip.cjs',
    format: 'cjs',
  },
  {
    file: 'dist/react-tooltip.mjs',
    format: 'es',
  },
]

const sharedPlugins = [
  progress(),
  replace({
    preventAssignment: true,
    values: {
      'process.env.NODE_ENV': JSON.stringify('development'),
    },
  }),
  nodeResolve(),
  ts({
    typescript,
    tsconfig: './tsconfig.json',
    noEmitOnError: false,
    // declaration: true,
    // declarationDir: './build',
  }),
  commonjs({
    include: 'node_modules/**',
  }),
]
// this step is just to build the minified javascript files
const minifiedBuildFormats = buildFormats.map(({ file, extractCSS, ...rest }) => ({
  file: file.replace(/(\.[cm]?js)$/, '.min$1'),
  ...rest,
  minify: true,
  extractCSS,
  plugins: [terser({ compress: { directives: false } }), filesize()],
}))

const allBuildFormats = [...buildFormats, ...minifiedBuildFormats]

const config = allBuildFormats.map(
  ({ file, format, globals, plugins: specificPlugins, minify, extractCSS }) => {
    const plugins = [
      ...sharedPlugins,
      postcss({
        // eslint-disable-next-line no-nested-ternary
        extract: extractCSS ? (minify ? 'react-tooltip.min.css' : 'react-tooltip.css') : false, // this will generate a specific file and override on multiples build, but the css will be the same
        autoModules: true,
        include: '**/*.css',
        extensions: ['.css'],
        plugins: [],
        minimize: Boolean(minify),
      }),
    ]

    if (specificPlugins && specificPlugins.length) {
      plugins.push(...specificPlugins)
    }

    return {
      input,
      output: {
        file,
        format,
        name,
        globals,
        sourcemap: true,
        banner,
      },
      external,
      plugins,
    }
  },
)

export default config
