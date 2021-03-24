module.exports = {
    extends: './node_modules/mwts/',
    ignorePatterns: [
        'node_modules',
        'dist',
        'test',
        'jest.config.js',
        'typings',
    ],
    env: {
        jest: true,
    },
    rules: {
        // "typescript-eslint/explicit-module-boundary-types": ["error", "never"],
        // "typescript-eslint/explicit-function-return-type": ["error", "never"]
        // "object-curly-spacing": ["error", "never"]
    },
};
