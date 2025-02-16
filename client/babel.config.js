module.exports = {
    presets: [
        ['@babel/preset-env', {
            targets: { node: 'current' },
            modules: 'commonjs' // Ajout crucial
        }],
        '@babel/preset-react',
        '@babel/preset-typescript',
    ],
    plugins: [
        '@babel/plugin-transform-modules-commonjs', // Nouveau plugin
        '@babel/plugin-transform-runtime'
    ]
};