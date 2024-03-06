// @ts-check

/** @type import('eslint').Linter.ConfigOverride */
const configOverrideForTS = {
  // *.js などではこれらのルールが適用されないようにする
  files: ['*.ts', '*.tsx'],
  plugins: ['@typescript-eslint'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    // import
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    // tsconfig.json の場所はプロジェクトによって異なるため、本来はプロジェクトに合わせて
    // 上書きするべきするべき設定だが、いちいち上書きするのも面倒なので、ひとまず
    // プロジェクトルートにある tsconfig.json を `parserOptions.project` にセットしてある。
    // プロジェクトに応じて適時上書きしてもらうことを想定している。
    project: './tsconfig.json',
  },
  rules: {
    // eslint
    'strict': 0,

    // import
    // eslint ではモジュールの解決に失敗することがあるので, TypeScriptに任せる
    // ref: https://github.com/benmosher/eslint-plugin-import/issues/1341
    'import/named': 0,

    // @typescript-eslint (Basic Rules)
    // コーディングスタイル統一のため、`Array<T>` 形式を禁止して `T[]` の使用を推奨する
    '@typescript-eslint/array-type': 2,
    // opinionated
    // コーディングスタイル統一のため、`<T> expr` 形式の型アサーションを禁止して `expr as T` の使用を推奨する
    '@typescript-eslint/consistent-type-assertions': 2,
    // 強力すぎるため off に
    '@typescript-eslint/explicit-module-boundary-types': 0,
    // コーディングスタイル統一のため、命名規則を設ける
    '@typescript-eslint/naming-convention': [
      1,
      {
        selector: ['variable', 'default'],
        // `const CounterComponent = () => { ... }` や `const CONSTANT = 1;` のような変数が記述できるよう、
        // PascalCase や UPPER_CASE も許可する
        format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        // 末尾のアンダースコアは基本的に使われないのでデフォルトで禁止しておく。
        // 必要に応じて allow に上書きすることを想定している。
        leadingUnderscore: 'allow',
        trailingUnderscore: 'forbid',
      },
      {
        selector: 'function',
        // React Component の宣言のために PascalCase も許可する
        format: ['camelCase', 'PascalCase'],
        leadingUnderscore: 'allow',
        trailingUnderscore: 'forbid',
      },
      {
        selector: 'parameter',
        format: ['camelCase'],
        leadingUnderscore: 'allow',
        trailingUnderscore: 'forbid',
      },
      {
        selector: 'memberLike',
        format: ['camelCase'],
        leadingUnderscore: 'allow',
        trailingUnderscore: 'forbid',
      },
      {
        selector: 'typeLike',
        format: ['PascalCase'],
        leadingUnderscore: 'allow',
        trailingUnderscore: 'forbid',
      },
      {
        selector: 'property',
        // オブジェクトのプロパティには様々な命名規則の識別子が書かれるので、緩めにしておく
        format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        leadingUnderscore: 'allow',
        trailingUnderscore: 'forbid',
      },
      {
        selector: 'method',
        format: ['camelCase'],
        leadingUnderscore: 'allow',
        trailingUnderscore: 'forbid',
      },
    ],
    // 厳密な型検査ができなくなってしまうため、any の利用を警告する。
    // ただし意図的に利用したいことも多々あるので warning とする。
    '@typescript-eslint/no-explicit-any': 1,
    // ハンドリングされていない promise は基本コーディングミスであるため警告する。
    // ただし意図的にハンドリングしないことも多々あるので warning とする。
    // require type information
    '@typescript-eslint/no-floating-promises': 1,
    // nullable の無視は実行時エラーを引き起こす可能性があるため警告する。
    // ただし意図的に無視したいことも多々あるので warning とする。
    // 強力すぎるため warn に
    '@typescript-eslint/no-non-null-assertion': 1,
    // `require` は静的解析と相性が悪いため禁止する。
    // 代わりに ES Modules の使用を推奨する。
    '@typescript-eslint/no-require-imports': 2,
    // 可読性及びコードリーディングスタイルの統一のため、promise を返す関数では async を付けることを強制する
    // require type information
    '@typescript-eslint/promise-function-async': 2,
    // `Array#sort` はデフォルトで辞書順にソートされたりといくつか罠があるため、明示的に比較関数を渡すよう強制する
    // require type information
    '@typescript-eslint/require-array-sort-compare': 2,

    // @typescript-eslint (Extension Rules)
    // 型安全のため、`Array` コンストラクタを使って配列を生成する時は必ず型パラメーターを渡すよう強制する
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-array-constructor.md
    '@typescript-eslint/no-array-constructor': 2,
    // eval 及び eval 相当の API はセキュリティとパフォーマンスのリスクがあるので使用を禁止する
    // require type information
    '@typescript-eslint/no-implied-eval': 2,
    // - `const { unusedProp, ...usedRestProps } = obj;` のようなコードはJSではよく書かれるので、
    //   `unusedProp` が未使用であると警告しないように
    // - `_` 始まりの変数は未使用変数を表す、という文化に沿って `_` 始まりの変数は未使用であっても警告しないように
    // - エラーを無視しないよう、catch 節のエラーオブジェクトが未使用の場合は警告する
    'no-unused-vars': 0,
    '@typescript-eslint/no-unused-vars': [
      2,
      {
        ignoreRestSiblings: true,
        argsIgnorePattern: '^_',
        caughtErrors: 'all',
      },
    ],
    // @typescript-eslint/no-explicit-any さえあれば十分なので off にしておく。
    '@typescript-eslint/no-unsafe-assignment': 0,
    // @typescript-eslint/no-explicit-any さえあれば十分なので off にしておく。
    '@typescript-eslint/no-unsafe-call': 0,
    // @typescript-eslint/no-explicit-any さえあれば十分なので off にしておく。
    '@typescript-eslint/no-unsafe-member-access': 0,
  },
};

/** @type import('eslint').Linter.BaseConfig */
module.exports = {
  overrides: [configOverrideForTS],
};
