'use strict';

/** @type {import('eslint').Linter.RulesRecord} */
const rules = {
  // # eslint
  // == / != の暗黙の型変換の挙動はしばしば意図せぬ問題を引き起こすので, 常に === / !== を使うべき
  'eqeqeq': [2, 'always'],
  // コーディングスタイル統一のため、`const fn = function() { ... }` 形式の関数定義を禁止する。
  // 代わりに `function fn() { ... }` か `const fn = () => { ... }` 形式の関数定義を推奨する。
  'func-style': [2, 'declaration', { allowArrowFunctions: true }],
  // console.log などの消し忘れに気づけるようにする。
  'no-console': 2,
  // - `const { unusedProp, ...usedRestProps } = obj;` のようなコードはJSではよく書かれるので、
  //   `unusedProp` が未使用であると警告しないように
  // - `_` 始まりの変数は未使用変数を表す、という文化に沿って `_` 始まりの変数は未使用であっても警告しないように
  // - エラーを無視しないよう、catch 節のエラーオブジェクトが未使用の場合は警告する
  'no-unused-vars': [
    2,
    {
      ignoreRestSiblings: true,
      argsIgnorePattern: '^_',
      caughtErrors: 'all',
    },
  ],
  // 常に let / const を使うべき
  'no-var': 2,
  // 可読性のため、`let` でなくて良い場面では `const` を使うよう強制する
  'prefer-const': 2,
  // parseInt の第二引数を必須にする
  'radix': 2,
  // ASI による複雑怪奇な挙動に付き合わなくて済むよう、セミコロンを必須とする
  'semi': [2, 'always'],
  // 生の *.js では `'use strict';` を必須とする
  'strict': [2, 'global'],

  // # import
  // default export は tsserver と相性が悪いので禁止する。
  // `React.lazy` を使いたいなど、どうしても default export したい場合は適時 disable してもらうことを想定。
  // ref: https://typescript-jp.gitbook.io/deep-dive/main-1/defaultisbad
  'import/no-default-export': 2,
  // import 文の並びについて思考するのに時間を費やすのは勿体ないので、一律でソートしてしまう
  'import/order': [2, { alphabetize: { order: 'asc' } }],
};

module.exports = rules;
