https://time.geekbang.org/column/article/446747
- npm i eslint -D
- npx eslint --init
- { rules: { "semi": [ "warn", "never" ]}}
- npx eslint src     main.ts  加;

前面我们已经统一了代码规范，并且在提交代码时进行强约束来保证仓库代码的质量。多人协作的项目中，在提交代码这个环节，也存在一种情况：不能保证每个人对提交信息的准确描述，因此会出现提交信息紊乱、风格不一致的情况。

git 提交
"lint": "npx eslint src",
"start": "vite",
"dev": "npm-run-all lint start",

分号   引号   console  