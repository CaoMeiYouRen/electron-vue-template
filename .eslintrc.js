module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        "eslint:recommended",
        "@vue/typescript/recommended",
        'cmyr/vue',
    ],
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: new Date().getFullYear(),
        sourceType: 'module',
        ecmaFeatures: {
            modules: true,
            jsx: true,
        },
    },
    rules: {
        'vue/require-name-property': [0]
    }
};
