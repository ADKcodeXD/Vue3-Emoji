module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'prettier'],
  rules: {
    'no-undef': 'off',
    'no-console': 'off',
    'no-debugger': 'warn',
    '@typescript-eslint/no-explicit-any': 'off',
    'no-mutating-props': 'off',
    '@typescript-eslint/ban-types': 'off',
    'prettier/prettier': [
      'error',
      {
        printWidth: 140, //代码单行长度
        tabWidth: 2, //tab键缩进为2空格
        useTabs: true, //使用空格缩进
        singleQuote: true, //js单引号
        semi: false, //去分号
        trailingComma: 'none', //无尾逗号
        arrowParens: 'avoid', //箭头函数尽可能省略括号
        endOfLine: 'auto'
      }
    ]
  }
};
