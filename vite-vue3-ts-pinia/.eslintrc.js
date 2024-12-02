module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true
    },
    extends: [
        'plugin:vue/vue3-recommended',
        'standard'
    ],
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@babel/eslint-parser',
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    rules: {
        // 自定义规则
        'semi': ['error', 'always'],
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
    },
    ignorePatterns: [
        'dist/**/*',       // 忽略 dist 目录下的所有文件
        'node_modules/**', // 忽略 node_modules 目录下的所有文件
        '**/*.test.js'     // 忽略所有以 .test.js 结尾的文件
    ],
    overrides: [
        {
            files: ['src/**/*.vue','src/**/*.ts'], // 包括 src/components 目录下的所有 .vue 文件
            rules: {
                'vue/html-self-closing': 'off' // 为这些文件禁用 vue/html-self-closing 规则
            }
        },
        {
            files: ['**/*.test.js'], // 包括所有以 .test.js 结尾的文件
            excludedFiles: ['**/integration-tests/**/*.test.js'], // 排除 integration-tests 目录下的 .test.js 文件
            rules: {
                'jest/no-disabled-tests': 'warn', // 为这些文件启用 jest/no-disabled-tests 规则
                'jest/no-focused-tests': 'error'
            }
        }
    ]
};