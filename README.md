# eslint-config-hatena

ESLint config for @hatena

## 目的

- ESLint を簡単に導入できるように
  - 複雑な eslintrc を書かずとも、いくつかの config を extends するだけで期待通りの lint ができるように
  - ライブラリ側で難しい部分を吸収することで、ESLint に詳しくない人でもなんとなく正しく使えるように
- 使っているだけで自然とベストプラクティスが取り入れられるように
  - config を共通化することで、沢山のプロジェクトに効率的にベストプラクティスを取り入れられるように
- 一定のコーディングスタイルを強制することで、悩まず素早く開発できるように
  - いちいちどちらの書き方が良いか、と悩んだり議論する時間が勿体ないので、「一旦これで」というコーディング規約を config として提供してしまう

## 目的でないもの

- プロジェクト間でコーディングスタイルを共通化する
  - プロジェクトごとにコーディングスタイルは違うので、プロジェクトに合わせて変えていけば良い
  - 一応コーディングスタイルを強制する rule はあるものの、適時プロジェクトの事情に合わせて off にしてもらう、という運用を想定している

## インストール

パッケージが GitHub Packages 上でホストされている関係で、インストールするには以下のような手順を踏む必要があります。

1. https://github.com/settings/tokens から `read:packages` にチェックの入ったトークンを発行する
2. パッケージのインストール先のリポジトリにある `.npmrc` か `~/.npmrc` を以下のように書き換える

```
//npm.pkg.github.com/:_authToken=<1で発行されたトークンをここに貼る>
@hatena:registry=https://npm.pkg.github.com/
```

`.npmrc` を書き換えたら以下のコマンドでインストールできます。

```bash
npm i -D eslint @hatena/eslint-config-hatena
```

## 使い方

[docs/usage.md](https://github.com/hatena/eslint-config-hatena/blob/main/docs/usage.md)

## 他ツールとの連携について

[docs/integration.md](https://github.com/hatena/eslint-config-hatena/blob/main/docs/integration.md)

## rule や config の追加方法 / リリース方法について

[CONTRIBUTING.md](https://github.com/hatena/eslint-config-hatena/blob/main/CONTRIBUTING.md)

## Special Thanks

このパッケージは [teppeis/eslint-config-teppeis](https://github.com/teppeis/eslint-config-teppeis) を参考に設計されました。
