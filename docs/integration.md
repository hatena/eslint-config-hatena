# 他ツールとの連携について

## VSCode

VSCode を利用しているプロジェクトでは、`.vscode/settings.json` に以下のような設定を記述し、保存時に自動で format されるよう構成するのがオススメです。

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true // for eslint
  }
}
```

prettier と併用している場合は以下のように記述すると良いです。

```json
{
  "editor.tabSize": 2,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true, // for prettier
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true // for eslint
  }
}
```

適時 `.vscode/extensions.json` に拡張機能を追加しておくと良いでしょう。

```json
{
  "recommendations": ["dbaeumer.vscode-eslint", "esbenp.prettier-vscode"]
}
```

## prettier

eslint-config-hatena では prettier と競合する format に関する rule が off になっています。ESLint だけでは未フォーマットのコードを検知したり、format したりできないので、以下のように npm-scripts を別途用意しておくと良いでしょう。

```json
{
  "scripts": {
    "lint": "run-s lint:*",
    "lint:prettier": "prettier --check .",
    "lint:prettier:fix": "prettier --write .",
    "lint:eslint": "eslint ."
    // ...
  }
}
```

## jest

`test` というディレクトリに jest のテストファイルが格納されているプロジェクトがあると仮定します。

```
├─ src
│ ├─ index.js
├─ test
│ ├─ index.test.js
└─ .eslintrc.js
```

この時、`test/**/*.js` 向けの rule をどこに書くのか、という問題があります。主に 3 つの方法があって、1 つは [configuration cascade](https://eslint.org/docs/user-guide/configuring#configuration-cascading-and-hierarchy) を活用し、 `test` 配下に `.eslintrc.js` を作成する方法です。

```js
// test/.eslintrc.js
module.exports = {
  // false にすると、プロジェクトルートの `.eslintrc.js` の rule がカスケードされる
  root: false,
  plugins: ['jest'],
  env: {
    node: true, // for jest
    jest: true, // for jest
  },
  rules: {
    'jest/no-identical-title': 'error',
  },
};
```

もう 1 つはプロジェクトルートの `.eslintrc.js` にそのまま `test/**/*.js` 向けの rule を書く方法です。

```js
// .eslintrc.js
module.exports = {
  root: true,
  extends: ['@hatena/hatena', '@hatena/hatena/+prettier'],
  plugins: ['jest'],
  env: {
    node: true, // for jest
    jest: true, // for jest
  },
  rules: {
    // `src/**/*.js` 向けの rule
    // ...

    // `test/**/*.js` 向けの rule
    'jest/no-identical-title': 'error',
  },
};
```

最後に 2 つ目を [`overrides`](https://eslint.org/docs/user-guide/configuring#configuration-based-on-glob-patterns) を使って書く方法です。

```js
// .eslintrc.js
module.exports = {
  root: true,
  extends: ['@hatena/hatena', '@hatena/hatena/+prettier'],
  rules: {
    // `src/**/*.js` 向けの rule
    // ...
  },
  overrides: [
    {
      files: ['test/**/*.js'],
      plugins: ['jest'],
      env: {
        node: true, // for jest
        jest: true, // for jest
      },
      rules: {
        // `test/**/*.js` 向けの rule
        'jest/no-identical-title': 'error',
      },
    },
  ],
};
```

基本的には導入が簡単で、かつ config の適用範囲が小さい 3 番がオススメです。2 番でもそうそう困ることは無いと思いますが、`test/**/*.js` の rule が `src/**/*.js` に適用されて lint 結果がおかしくなったら 3 番に移行するのがオススメです。1 番は導入やメンテナンスが面倒で、カスケードの結果も予測しづらいため、特別な理由がない限り採用しないことをお勧めします。
