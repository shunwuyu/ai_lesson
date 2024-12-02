module.exports = {
    transform: {
      //  用 `vue-jest` 处理 `*.vue` 文件
      '^.+\\.vue$': 'vue-jest', //vuejest 处理.vue
      '^.+\\.jsx?$': 'babel-jest',  // babel jest处理js or jsx
      '^.+\\.tsx?$': 'ts-jest', // ts-jest 处理.ts .tsx
    },
    testMatch: ['**/?(*.)+(spec).[jt]s?(x)'],
    "collectCoverage": true,
    "coverageReporters": ["json", "html"],
  }