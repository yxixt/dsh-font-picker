# dsh-font-picker

**DeepSeek Harness の Web UI に、日本語フォントの選択機能を追加するプラグインです。**

游ゴシック・メイリオ・Noto Sans JP・BIZ UDGothic など有名どころの日本語フォントを、ドロップダウンから選ぶだけで切り替えられます。ワンクリックで組み込みの既定に戻すこともできます。

> English documentation: [README.en.md](README.en.md)

---

## なぜ必要か

DeepSeek Harness の既定フォントスタックは次の順序です。

```
-apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC",
"Hiragino Sans GB", "Microsoft YaHei", ...
```

**`PingFang SC` / `Microsoft YaHei` は中国語フォント**であり、日本語フォントより前に並んでいます。そのため日本語の漢字が中国語の字形（いわゆる中華フォント）で描画され、違和感のある表示になっていました。

このプラグインは日本語フォントを明示的にスタックの前段へ挿入し、日本語の字形で描画されるようにします。

## インストール

DSH の **プラグイン → インストール** から、次のいずれかを入力してください。

```
github:<your-name>/dsh-font-picker
```

```
https://github.com/<your-name>/dsh-font-picker
```

インストール後、**DSH を再起動**（またはブラウザを再読み込み）してください。

## 使い方

1. サイドバー → **プラグイン** → **インストール済み** → `dsh-font-picker`
2. カードのドロップダウンからフォントを選択
3. 即座に反映されます

カード下部にプレビューが表示されるので、実際の見た目を確認しながら選べます。

## 選べるフォント

| 対象 | フォント |
|---|---|
| **本文** | 游ゴシック (Yu Gothic UI) / メイリオ / Noto Sans JP / BIZ UDGothic / UD デジタル教科書体 / ヒラギノ角ゴ / M PLUS 1p / Zen 角ゴシック New / MS ゴシック / Source Han Sans JP |
| **コード** | Consolas + 游ゴシック / Cascadia Code + BIZ UDGothic / JetBrains Mono + BIZ UDGothic / Source Han Code JP / Noto Sans Mono CJK JP / MS ゴシック |
| **ターミナル** | Consolas + BIZ UDGothic / Cascadia Code + 游ゴシック / BIZ UDGothic / Noto Sans Mono CJK JP / MS ゴシック |

## 既定に戻す

- 各ロールごと: ドロップダウンで「既定に戻す（組み込みスタック）」を選択
- すべてまとめて: **「すべて既定に戻す」** ボタン

## 設定画面との関係

このプラグインは独自の設定領域を持ちません。書き込むのは DSH 標準の `ui-theme` プラグインが持つ以下のフィールドです。

- `textFontFamily`
- `codeFontFamily`
- `terminalFontFamily`

そのため、**設定 → 一般 → フォント** から手動で変更しても、このカードと同期します。どちらから変更しても構いません。

## フォントの追加

`lib/client.js` の `PRESETS` に 1 行追加するだけです。

```js
{ id: "my-font", label: "表示名", value: "フォント名, フォールバック, sans-serif" },
```

## 構成

```
dsh-font-picker/
├── package.json          # dsh.bundle / dsh.client 宣言
├── cordis.patch.yml      # プロファイルへの挿入内容
├── locale/
│   ├── ja.json           # 日本語のプラグイン説明
│   └── en.json           # 英語のプラグイン説明
├── docs/
│   ├── README.ja.md      # このファイル（日本語）
│   └── README.en.md      # 英語版
├── lib/
│   ├── index.js          # ホスト側エントリ（処理なし）
│   └── client.js         # 本体: UI・プリセット・反映処理
└── README.md             # 入口（日本語）
```

## 動作要件

| 項目 | 要件 |
|---|---|
| DSH | `>=0.2.1-rc.2 <0.4.0-0` |
| プラットフォーム | Web (`dsh web` / DSH Desktop) |
| 依存 | `@deepseek-ai/dsh-client-ui-theme`（web-app バンドルに標準同梱） |

## ライセンス

MIT
