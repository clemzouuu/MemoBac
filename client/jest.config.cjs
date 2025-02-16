module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
    transformIgnorePatterns: [
        'node_modules/(?!axios|@babel/runtime)', // Pattern corrigé
    ],
    extensionsToTreatAsEms: ['.ts', '.tsx'],
    globals: {
        'ts-jest': {
            babelConfig: true,
        }
    }
};