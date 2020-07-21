import babel from 'rollup-plugin-babel';

export default {
    input: './cli/index.js',
    output: {
        file: 'build/cli/index.js',
        format: 'cjs'
    },
    plugins: [
        babel({
            exclude: 'node_module/**'
        })
    ]
}