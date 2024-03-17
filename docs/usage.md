# 使い方

## `.eslintrc` を使う場合

- このライブラリでは `@hatena/hatena/+typescript` や `@hatena/hatena/+react` など複数の config を提供しています
  - ツール/ライブラリの単位で小分けになっています
  - プロジェクトで利用しているツールやライブラリに合わせて対応する config を extends してください
- `@hatena/hatena` のみが必須で、それ以外の extends は全て任意です
- 後方の config で前方の config で定義した rule を上書きする、という戦略で実装されています
  - そのため extends には順序があります
  - 必ず以下の順序で extends して下さい
    1. `@hatena/hatena`
    2. `@hatena/hatena/+typescript`
    3. `@hatena/hatena/+react`
    4. `@hatena/hatena/+prettier`

<!-- prettier-ignore-start -->

```javascript
module.exports = {
  root: true,
  extends: [
    '@hatena/hatena',
    '@hatena/hatena/+typescript',
    '@hatena/hatena/+react',
    '@hatena/hatena/+prettier',
  ],
  env: {
    node: true, // for jest
    jest: true, // for jest
  },
  rules: {
    // `*.js` 向けのプロジェクト固有のルールをここに書く
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        // `*.ts` / `*.tsx` 向けのプロジェクト固有のルールをここに書く
      },
    },
  ],
};
```

<!-- prettier-ignore-end -->

### `@hatena/hatena`

![required YES](https://img.shields.io/badge/required-YES-red) [![see source](https://img.shields.io/badge/see-source-yellow)](https://github.com/hatena/eslint-config-hatena/blob/main/index.js)

純粋な ECMAScript を lint するための rule をまとめた config です。[ESLint の `env`](https://eslint.org/docs/user-guide/configuring#specifying-environments) により、ソースコードが ES2020 に準拠しているものとして lint するよう構成されています。プロジェクトでターゲットとしている ECMAScript のバージョンが ES2020 より低い場合は、適時 `parserOptions.ecmaVersion` と `env` で設定を上書きして下さい。

```javascript
module.exports = {
  root: true,
  extends: ['@hatena/hatena'],
  parserOptions: {
    ecmaVersion: 2019,
  },
  env: {
    es2019: true,
    es2020: false,
  },
  rules: {
    // プロジェクト固有のルールをここに書く
  },
};
```

### `@hatena/hatena/+typescript`

![required no](https://img.shields.io/badge/required-no-inactive) [![see source](https://img.shields.io/badge/see-source-yellow)](https://github.com/hatena/eslint-config-hatena/blob/main/+typescript.js)

TypeScript を利用しているプロジェクト向けの config です。この config を利用するにはプロジェクトで使用している `tsconfig.json` を `parserOptions.project` に記述する必要があります (省略すると `./tsconfig.json` が使われます)。

```javascript
module.exports = {
  root: true,
  extends: ['@hatena/hatena', '@hatena/hatena/+typescript'],
  rules: {
    // `*.js` 向けのプロジェクト固有のルールをここに書く
  },
  // MEMO: TypeScript 向けの設定が `*.js` などに影響しないよう、TypeScript 向けの設定を
  // 書く場合は `overrides` で囲うのがオススメです
  // ref: https://eslint.org/docs/user-guide/configuring#configuration-based-on-glob-patterns
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: './frontend/tsconfig.json',
        // tsconfig.json が複数ある場合は配列で次のように指定して下さい
        // project: [
        //   './frontend/tsconfig.json',
        //   './backend/tsconfig.json',
        //   './test/tsconfig.json',
        // ],
      },
      rules: {
        // `*.ts` / `*.tsx` 向けのプロジェクト固有のルールをここに書く
      },
    },
  ],
};
```

### `@hatena/hatena/+react`

![required no](https://img.shields.io/badge/required-no-inactive) [![see source](https://img.shields.io/badge/see-source-yellow)](https://github.com/hatena/eslint-config-hatena/blob/main/+react.js)

React を利用しているプロジェクト向けの config です。

### `@hatena/hatena/+prettier`

![required no](https://img.shields.io/badge/required-no-inactive) [![see source](https://img.shields.io/badge/see-source-yellow)](https://github.com/hatena/eslint-config-hatena/blob/main/+prettier.js)

prettier を利用しているプロジェクト向けの config です。

## `eslint.config.js` (Flat Config) を使う場合

Flat Config に対しては `@hatena/eslint-config-hatena/flat` から設定を作成するためのビルダー関数を提供しています。

最も簡単な利用方法は以下のようになります。

```javascript
import config from '@hatena/eslint-config-hatena/flat';

export default config();
```

これは `.eslintrc` での以下の設定に相当します。

```javascript
module.exports = {
  root: true,
  extends: ['@hatena/hatena', '@hatena/hatena/+typescript', '@hatena/hatena/+prettier'],
};
```

### TypeScript

TypeScript に関連した設定はデフォルトで有効になっているため、特別に設定を追加する必要はありません。

TypeScript の設定ファイルはデフォルトでは `./tsconfig.json` が使われます。このファイルを変更する場合は `tsProject` オプションを使用してください。

```javascript
export default config({
  tsProject: './tsconfig.lint.json',
});
```

### React

React に関連した設定やルールを有効化するには、`react` オプションを有効化してください。

```javascript
export default config({
  react: true,
});
```

### Prettier

デフォルトでは Prettier を併用することを想定して、Prettier と衝突するフォーマットに関するルールを全て無効化するようになっています。

Prettier を使用せず、ESLint を使ってフォーマットを行いたい場合は、`prettier` オプションを無効化した上でフォーマットに関するルールを有効化してください。

```javascript
export default config({
  prettier: false,
});
```

### カスタム設定

ビルダー関数の第二引数には、カスタム設定の配列を与えることができます。プロジェクト固有の設定はここに追加するのがおすすめです。

```javascript
export default config({}, [
  {
    files: ['src/**/*.js'],
    rules: {
      'no-console': 0,
    },
  },
]);
```
