# Contribution Guide

## rule の有効化/無効化の基準

- `eslint-{config,plugin}-*` の `recommended` を extends する
  - エコシステムのベストプラクティスを取り入れるため
  - ただし強力過ぎる rule や現行のコーディング規約に大きく反していて取り入れにくい rule などは適時 off にする
- バッドプラクティスを防止する rule やベストプラクティスを強制する rule は on にする
  - 書いてはいけないコードは積極的に lint で検出したいため
- スタイルに関する rule は、迷わずコーディングできるようになるのであれば on にする
  - 迷っている時間が勿体ないので、rule を適用することでその時間が失われずに済むなら、そうしてしまうのが良いという発想
  - opinionated であっても上記のような利点が多く享受できるのであれば、適時 on にしていく
- tsserver にとって都合の良い rule は on にする
  - tsserver を使って開発するのが当たり前になっているので、tsserver 側の都合に合わせていくと良いだろう、という発想
  - 一方 tsserver と相性の悪い rule は off にしていく

## error と warning の使い分け

- on にしたい rule の内、厳しすぎるものは warning とする
  - 可能な限り従うのが望ましいが、かえってコードを書きにくくなって、アプリケーションの品質が下がってしまっては元も子もない
  - そのためその時々の事情に合わせて気軽に off にすることを期待して warning とする
- warning 以外で on にしたい rule は error とする

## rule の追加・変更方法

- PR を出してメンテナーにレビュー依頼して下さい
- rule を追加する場合は、コード中にも rule を有効化/無効化する理由をコードコメントで記述して下さい
  - config をざっと眺めて何故 rule が有効化/無効化されているのかをすぐに判断できるようにするためです
- マージされてもすぐにはリリースされません
  - 別途メンテナーがリリース作業をする必要があります
  - すぐにリリースしてほしい場合は PR などでその旨をメンテナーに伝えて下さい

## config の追加

- `@hatena/hatena/+typescript` や `@hatena/hatena/+react` 以外にも追加して欲しい config があれば PR を出して下さい

## リリース方法 (メンテナー向け)

```console
$ git switch main
$ git pull
$ yarn version --no-git-tag-version
$ git commit -am "vX.X.X"

$ git push
$ # push すると CI により自動で publish されます
$ # Breaking Changes がある場合など、必要に応じて GitHub の
$ # Release を作成してリリースノートを書きましょう
```
