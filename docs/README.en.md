# dsh-font-picker

**A DeepSeek Harness plugin that adds a Japanese font picker to the Web UI.**

Pick a well-known Japanese font — Yu Gothic, Meiryo, Noto Sans JP, BIZ UDGothic and more — from a simple dropdown. One click restores the built-in default stack.

> 日本語ドキュメント: [README.ja.md](README.ja.md)

---

## Why this exists

DeepSeek Harness ships this default font stack:

```
-apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC",
"Hiragino Sans GB", "Microsoft YaHei", ...
```

**`PingFang SC` and `Microsoft YaHei` are Chinese fonts**, and they appear *before* any Japanese font. As a result, Japanese kanji render with Chinese glyph shapes.

This plugin inserts a Japanese font ahead of that stack so Japanese text renders with Japanese glyphs.

## Install

In DSH, open **Plugins → Install** and enter either of:

```
github:<your-name>/dsh-font-picker
```

```
https://github.com/<your-name>/dsh-font-picker
```

Then **restart DSH** (or reload the browser).

## Usage

1. Sidebar → **Plugins** → **Installed** → `dsh-font-picker`
2. Pick a font from the dropdown for text / code / terminal
3. Changes apply immediately

A live preview below the dropdowns shows the result as you choose.

## Available fonts

| Role | Fonts |
|---|---|
| **Text** | Yu Gothic UI / Meiryo / Noto Sans JP / BIZ UDGothic / UD Digital Kyokasho / Hiragino Sans / M PLUS 1p / Zen Kaku Gothic New / MS Gothic / Source Han Sans JP |
| **Code** | Consolas + Yu Gothic / Cascadia Code + BIZ UDGothic / JetBrains Mono + BIZ UDGothic / Source Han Code JP / Noto Sans Mono CJK JP / MS Gothic |
| **Terminal** | Consolas + BIZ UDGothic / Cascadia Code + Yu Gothic / BIZ UDGothic / Noto Sans Mono CJK JP / MS Gothic |

## Restoring defaults

- Per role: choose “既定に戻す（組み込みスタック）” in the dropdown
- All at once: the **「すべて既定に戻す」** button

## Relation to Settings

This plugin has no settings namespace of its own. It writes the standard `ui-theme` fields:

- `textFontFamily`
- `codeFontFamily`
- `terminalFontFamily`

So it stays in sync with **Settings → General → Fonts**. Changing either place is fine.

## Adding a font

Add one line to `PRESETS` in `lib/client.js`:

```js
{ id: "my-font", label: "Label", value: "Font Name, fallback, sans-serif" },
```

## Layout

```
dsh-font-picker/
├── package.json          # dsh.bundle / dsh.client declarations
├── cordis.patch.yml      # what gets inserted into the profile
├── locale/
│   ├── ja.json           # Japanese plugin description
│   └── en.json           # English plugin description
├── docs/
│   ├── README.ja.md      # Japanese documentation
│   └── README.en.md      # this file
├── lib/
│   ├── index.js          # host entry (no behaviour)
│   └── client.js         # the plugin: UI, presets, writes
└── README.md             # entry point
```

## Requirements

| Item | Requirement |
|---|---|
| DSH | `>=0.2.1-rc.2 <0.4.0-0` |
| Platform | Web (`dsh web` / DSH Desktop) |
| Dependency | `@deepseek-ai/dsh-client-ui-theme` (bundled with web-app) |

## License

MIT
