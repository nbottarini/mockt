import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'
import excludeDependenciesFromBundle from 'rollup-plugin-exclude-dependencies-from-bundle'
import terser from '@rollup/plugin-terser'
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const packageJson = require('./package.json');

export default [
    {
        input: 'src/index.ts',
        output: [
            {
                file: packageJson.main,
                format: 'cjs',
                sourcemap: true,
            },
            {
                file: packageJson.module,
                format: 'esm',
                sourcemap: true,
            },
        ],
        plugins: [
            excludeDependenciesFromBundle({ peerDependencies: true, dependencies: true }),
            resolve(),
            commonjs(),
            typescript({ tsconfig: './tsconfig.json', declaration: false }),
            terser({ mangle: false }),
        ],
    },
    {
        input: 'src/index.ts',
        output: [{ file: 'dist/types/index.d.ts', format: 'esm' }],
        plugins: [
            dts()
        ],
    },
]
