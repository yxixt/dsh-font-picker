# dsh-font-picker

DeepSeek Harness の Web UI に、日本語フォントの選択機能を追加するプラグインです。

A DeepSeek Harness plugin that adds a Japanese font picker to the Web UI.

---

## ドキュメント / Documentation

| 言語 / Language | ドキュメント |
|---|---|
| **日本語** | [docs/README.ja.md](docs/README.ja.md) |
| **English** | [docs/README.en.md](docs/README.en.md) |

DeepSeek Harness の表示言語に合わせて、プラグインページの説明文も自動的に切り替わります（`locale/ja.json` / `locale/en.json`）。
The plugin page description follows the DSH display language automatically.

---

## 概要 / Summary

既定のフォントスタックは中国語フォント（`PingFang SC` / `Microsoft YaHei`）を日本語フォントより前に並べているため、日本語の漢字が中国語の字形で描画されます。このプラグインは日本語フォントを前段へ挿入します。

The default font stack places Chinese fonts before any Japanese font, so Japanese kanji render with Chinese glyphs. This plugin inserts a Japanese font ahead of that stack.

### 選べるフォント / Available fonts

| 対象 / Role | 例 / Examples |
|---|---|
| 本文 / Text | 游ゴシック, メイリオ, Noto Sans JP, BIZ UDGothic, ヒラギノ角ゴ, M PLUS 1p, Zen 角ゴシック |
| コード / Code | Consolas + BIZ UDGothic, Cascadia Code + BIZ UDGothic, Source Han Code JP |
| ターミナル / Terminal | Consolas + BIZ UDGothic, Noto Sans Mono CJK JP, MS ゴシック |

### インストール / Install

```
github:yxixt/dsh-font-picker
```

インストール後に DSH を再起動、またはブラウザを再読み込みしてください。
Restart DSH or reload the browser after installing.

---

## 構成 / Layout

```
dsh-font-picker/
├── package.json          # dsh.bundle / dsh.client 宣言
├── cordis.patch.yml      # プロファイルへの挿入内容
├── locale/
│   ├── ja.json           # 日本語のプラグイン説明
│   └── en.json           # 英語のプラグイン説明
├── docs/
│   ├── README.ja.md      # 日本語ドキュメント
│   └── README.en.md      # English documentation
├── lib/
│   ├── index.js          # ホスト側エントリ（処理なし）
│   └── client.js         # 本体: UI・プリセット・反映処理
└── README.md             # このファイル（言語切り替えの入口）
```

## 動作要件 / Requirements

| 項目 / Item | 要件 / Requirement |
|---|---|
| DSH | `>=0.2.1-rc.2 <0.4.0-0` |
| プラットフォーム / Platform | Web (`dsh web` / DSH Desktop) |
| 依存 / Dependency | `@deepseek-ai/dsh-client-ui-theme`（web-app バンドルに同梱） |

## ライセンス / License

MIT
