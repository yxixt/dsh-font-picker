window.__ModuleLoader__.load({
  id: "dsh-font-picker",
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;

    let react = require("react");

    const h = react.createElement;

    /**
     * フォントロール。`@deepseek-ai/dsh-client-ui-theme` の FONT_ROLES と同じ並び。
     */
    const ROLES = [
      { id: "text", label: "本文", desc: "会話・UI テキスト全般" },
      { id: "code", label: "コード", desc: "コードブロック・インラインコード・ツール出力" },
      { id: "terminal", label: "ターミナル", desc: "サイドバーのターミナル" },
    ];

    /**
     * プリセット。`value` はそのまま `theme.setFontFamily()` に渡す
     * カンマ区切りのフォント名リストで、空文字は「組み込みスタックに戻す」。
     *
     * 日本語フォントを先頭に置くのが要点: 組み込みスタックは
     * "PingFang SC" / "Microsoft YaHei"（中国語フォント）が日本語フォントより
     * 前にあるため、漢字が中国語の字形で描画される。ここで日本語フォントを
     * 明示すると、その前段に挿入されて日本語の字形が優先される。
     */
    const PRESETS = {
      text: [
        { id: "default", label: "既定に戻す（組み込みスタック）", value: "" },
        {
          id: "yu-gothic",
          label: "游ゴシック / Yu Gothic UI（Windows 標準）",
          value: "Yu Gothic UI, Yu Gothic, Meiryo, Noto Sans JP, sans-serif",
        },
        {
          id: "meiryo",
          label: "メイリオ / Meiryo",
          value: "Meiryo, Yu Gothic UI, Noto Sans JP, sans-serif",
        },
        {
          id: "noto-sans-jp",
          label: "Noto Sans JP（Google）",
          value: "Noto Sans JP, Yu Gothic UI, Meiryo, sans-serif",
        },
        {
          id: "biz-ud",
          label: "BIZ UDGothic（UD フォント）",
          value: "BIZ UDGothic, Yu Gothic UI, Meiryo, Noto Sans JP, sans-serif",
        },
        {
          id: "ud-digi",
          label: "UD デジタル 教科書体",
          value: "UD Digi Kyokasho NK-R, UD Digi Kyokasho N-R, Yu Gothic UI, sans-serif",
        },
        {
          id: "hiragino",
          label: "ヒラギノ角ゴ / Hiragino Sans（macOS）",
          value: "Hiragino Sans, Hiragino Kaku Gothic ProN, Noto Sans JP, sans-serif",
        },
        {
          id: "mplus",
          label: "M PLUS 1p（Google）",
          value: "M PLUS 1p, Noto Sans JP, sans-serif",
        },
        {
          id: "zen-kaku",
          label: "Zen 角ゴシック New（Google）",
          value: "Zen Kaku Gothic New, Noto Sans JP, sans-serif",
        },
        {
          id: "ms-gothic",
          label: "MS ゴシック（クラシック）",
          value: "MS Gothic, MS PGothic, sans-serif",
        },
        {
          id: "source-han",
          label: "Source Han Sans JP / Noto Sans CJK JP",
          value: "Source Han Sans JP, Noto Sans CJK JP, Noto Sans JP, sans-serif",
        },
      ],
      code: [
        { id: "default", label: "既定に戻す（組み込みスタック）", value: "" },
        {
          id: "consolas-jp",
          label: "Consolas + 游ゴシック",
          value: "Consolas, Cascadia Code, Yu Gothic UI, Meiryo, Noto Sans Mono CJK JP, monospace",
        },
        {
          id: "cascadia",
          label: "Cascadia Code + BIZ UDGothic",
          value: "Cascadia Code, Consolas, BIZ UDGothic, monospace",
        },
        {
          id: "jetbrains",
          label: "JetBrains Mono + BIZ UDGothic",
          value: "JetBrains Mono, Consolas, BIZ UDGothic, monospace",
        },
        {
          id: "source-han-code",
          label: "Source Han Code JP（等幅・日本語）",
          value: "Source Han Code JP, Noto Sans Mono CJK JP, Consolas, monospace",
        },
        {
          id: "noto-mono-cjk",
          label: "Noto Sans Mono CJK JP + Consolas",
          value: "Noto Sans Mono CJK JP, Consolas, monospace",
        },
        {
          id: "biz-ud-code",
          label: "BIZ UDGothic + Consolas",
          value: "BIZ UDGothic, Consolas, monospace",
        },
        {
          id: "ms-gothic-code",
          label: "MS ゴシック + Consolas",
          value: "MS Gothic, Consolas, monospace",
        },
      ],
      terminal: [
        { id: "default", label: "既定に戻す（組み込みスタック）", value: "" },
        {
          id: "consolas-jp",
          label: "Consolas + BIZ UDGothic",
          value: "Consolas, BIZ UDGothic, monospace",
        },
        {
          id: "cascadia",
          label: "Cascadia Code + 游ゴシック",
          value: "Cascadia Code, Yu Gothic UI, Meiryo, monospace",
        },
        {
          id: "biz-ud",
          label: "BIZ UDGothic（等幅）",
          value: "BIZ UDGothic, Consolas, monospace",
        },
        {
          id: "noto-mono-cjk",
          label: "Noto Sans Mono CJK JP",
          value: "Noto Sans Mono CJK JP, Consolas, monospace",
        },
        {
          id: "ms-gothic",
          label: "MS ゴシック",
          value: "MS Gothic, Consolas, monospace",
        },
      ],
    };

    /** 既定値を引くための組み込みフォールバック（ロール別）。 */
    const BUILTIN_HINT = {
      text: '既定: -apple-system, "Segoe UI", "PingFang SC", "Microsoft YaHei", …',
      code: '既定: "SF Mono", "JetBrains Mono", Consolas, …',
      terminal: '既定: "SF Mono", "JetBrains Mono", Consolas, …',
    };

    /** ブラウザで実際に解決される先頭フォントを推定して表示する。 */
    function effectiveFamily(list, fallback) {
      const first = String(list || "")
        .split(",")
        .map((s) => s.trim().replace(/^["']|["']$/g, ""))
        .find((s) => s !== "");
      return first || fallback;
    }

    /** ロール別の theme サービス取り出し。 */
    function themeOf(ctx) {
      return typeof ctx.get === "function" ? ctx.get("theme") : ctx.theme;
    }

    /** 行ヘッダー（折りたたみ時の 1 行表示）用のサマリー文字列。 */
    function summaryText(ctx) {
      const theme = themeOf(ctx);
      if (!theme) return "日本語フォント: テーマサービス未接続";
      try {
        const families = theme.getTheme().fontFamilies;
        const parts = ROLES.filter((r) => families[r.id]).map(
          (r) => `${r.label} ${effectiveFamily(families[r.id], "既定")}`
        );
        return parts.length === 0
          ? "日本語フォント: 既定（組み込みスタック）"
          : `日本語フォント: ${parts.join(" / ")}`;
      } catch {
        return "日本語フォント";
      }
    }

    const styles = {
      root: {
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        padding: "4px 0 8px",
        fontFamily: "inherit",
        color: "var(--dsw-alias-label-primary, #0f1115)",
      },
      intro: {
        fontSize: "12px",
        lineHeight: "1.7",
        color: "var(--dsw-alias-label-secondary, #5b6270)",
        margin: 0,
      },
      row: {
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "10px",
        padding: "10px 12px",
        border: "0.5px solid var(--dsw-alias-border-l2, #d8dbe2)",
        borderRadius: "10px",
        background: "var(--dsw-alias-bg-layer-1, #fff)",
      },
      rowMain: { flex: "1 1 240px", minWidth: 0 },
      title: { fontSize: "13px", fontWeight: 600, lineHeight: "1.6" },
      desc: {
        fontSize: "11px",
        lineHeight: "1.6",
        color: "var(--dsw-alias-label-secondary, #5b6270)",
      },
      select: {
        flex: "0 1 320px",
        minWidth: "200px",
        maxWidth: "100%",
        padding: "6px 8px",
        fontSize: "12px",
        lineHeight: "1.5",
        color: "var(--dsw-alias-label-primary, #0f1115)",
        background: "var(--dsw-alias-bg-base, #fff)",
        border: "0.5px solid var(--dsw-alias-border-l2, #d8dbe2)",
        borderRadius: "8px",
        cursor: "pointer",
      },
      current: {
        flex: "1 1 100%",
        fontSize: "11px",
        lineHeight: "1.6",
        color: "var(--dsw-alias-label-secondary, #5b6270)",
        fontFamily:
          'var(--ds-font-family-code, "SF Mono", Consolas, monospace)',
        wordBreak: "break-word",
      },
      actions: {
        display: "flex",
        gap: "8px",
        alignItems: "center",
        flexWrap: "wrap",
      },
      button: {
        padding: "6px 12px",
        fontSize: "12px",
        lineHeight: "1.5",
        color: "var(--dsw-alias-label-primary, #0f1115)",
        background: "var(--dsw-alias-bg-base, #fff)",
        border: "0.5px solid var(--dsw-alias-border-l2, #d8dbe2)",
        borderRadius: "8px",
        cursor: "pointer",
      },
      // リセットボタン: テーマの brand 色はライトテーマで明るく解決され、
      // 白文字だと背景に埋もれて読めなくなる。文字は必ずラベル色（既定は黒系）、
      // 背景はサーフェス色にして、どのテーマでもコントラストを保つ。
      buttonPrimary: {
        padding: "6px 12px",
        fontSize: "12px",
        lineHeight: "1.5",
        fontWeight: 500,
        color: "var(--dsw-alias-label-primary, #0f1115)",
        background: "var(--dsw-alias-bg-layer-1, #f4f5f7)",
        border: "0.5px solid var(--dsw-alias-border-l2, #d8dbe2)",
        borderRadius: "8px",
        cursor: "pointer",
      },
      status: {
        fontSize: "11px",
        color: "var(--dsw-alias-label-secondary, #5b6270)",
      },
      preview: {
        marginTop: "2px",
        padding: "10px 12px",
        border: "0.5px dashed var(--dsw-alias-border-l2, #d8dbe2)",
        borderRadius: "10px",
        fontSize: "14px",
        lineHeight: "1.8",
      },
    };

    /**
     * フォント選択カード。
     * @param props - スロットから渡される props。`ctx` はスロット登録時に閉じ込める。
     */
    function FontPickerView(props) {
      const ctx = props.ctx;
      const [, bump] = react.useState(0);
      const [status, setStatus] = react.useState("");

      react.useEffect(() => {
        const theme = themeOf(ctx);
        if (!theme || typeof ctx.on !== "function") return undefined;
        const off = ctx.on("theme/change", () => bump((n) => n + 1));
        return typeof off === "function" ? off : undefined;
      }, [ctx]);

      const theme = themeOf(ctx);

      if (!theme) {
        return h(
          "div",
          { style: styles.root },
          h(
            "p",
            { style: styles.intro },
            "テーマサービス (ui-theme) が見つかりません。設定 → 一般 の外観設定が有効か確認してください。"
          )
        );
      }

      const families = theme.getTheme().fontFamilies;

      const apply = (role, value) => {
        try {
          theme.setFontFamily(role, value);
          setStatus("");
        } catch (error) {
          setStatus(`変更に失敗しました: ${error && error.message ? error.message : error}`);
        }
      };

      const resetAll = () => {
        try {
          for (const role of ROLES) theme.setFontFamily(role.id, "");
          setStatus("すべて既定に戻しました。");
        } catch (error) {
          setStatus(`リセットに失敗しました: ${error && error.message ? error.message : error}`);
        }
      };

      const rows = ROLES.map((role) => {
        const current = families[role.id] || "";
        const options = PRESETS[role.id] || [];
        const known = options.some((o) => o.value === current);
        const value = known ? current : "__custom__";
        return h(
          "div",
          { key: role.id, style: styles.row },
          h(
            "div",
            { style: styles.rowMain },
            h("div", { style: styles.title }, role.label),
            h("div", { style: styles.desc }, role.desc)
          ),
          h(
            "select",
            {
              style: styles.select,
              value: value,
              "aria-label": `${role.label}のフォント`,
              onChange: (event) => {
                const next = event.currentTarget.value;
                if (next === "__custom__") return;
                apply(role.id, next);
              },
            },
            !known
              ? h("option", { value: "__custom__" }, "— 手動設定（設定画面で変更済み）—")
              : null,
            options.map((option) =>
              h("option", { key: option.id, value: option.value }, option.label)
            )
          ),
          h(
            "div",
            { style: styles.current },
            current
              ? `適用中: ${current}`
              : `適用中: 組み込み既定（${BUILTIN_HINT[role.id]}）`
          )
        );
      });

      const previewFamily = families.text || "";
      const preview = h(
        "div",
        {
          style: {
            ...styles.preview,
            fontFamily: previewFamily
              ? `${previewFamily}, sans-serif`
              : undefined,
          },
        },
        "日本語プレビュー: あいうえお 漢字 カタカナ 一二三 ＡＢＣ abc 0123 ありがとう",
        h("br"),
        "コード: const 日本語 = \"ソース\"; // → ← ≤ ≥ ℃ ① ㍉",
      );

      return h(
        "div",
        { style: styles.root },
        h(
          "p",
          { style: styles.intro },
          "有名どころの日本語フォントから選ぶだけで切り替えられます。選ぶとすぐ反映され、設定 → 一般 の「フォント」欄にも同じ値が入ります。"
        ),
        ...rows,
        h(
          "div",
          { style: styles.actions },
          h(
            "button",
            {
              type: "button",
              style: styles.buttonPrimary,
              onClick: resetAll,
            },
            "すべて既定に戻す"
          ),
          status ? h("span", { style: styles.status }, status) : null
        ),
        preview
      );
    }

    /**
     * このクライアントプラグインが待つサービス。
     *
     * `theme` は `@deepseek-ai/dsh-client-ui-theme` が provide するサービスで、
     * フォント変更の唯一の正規入口 (`setFontFamily`) を持つ。ui-theme は
     * web-app バンドルの常時行 (include:ui-theme) なので必ず存在する。
     */
    const inject = ["slots", "theme"];

    /**
     * プラグイン本体。
     * @param ctx - クライアント cordis コンテキスト。
     */
    function apply(ctx) {
      // プラグインページ（サイドバー → プラグイン → インストール済み →
      // このバンドル → 行）に設定カードを出す。key は ui-plugin-manager の
      // rowConfigKey 規則 `<パッケージ名>#<patch で宣言した行 id>`。
      ctx.slots.inject("plugins.row.config", () =>
        ctx.slots.register(
          { name: "plugins.row.config", key: "dsh-font-picker#font-picker" },
          (slotProps) =>
            slotProps && slotProps.view === "summary"
              ? summaryText(ctx)
              : h(FontPickerView, { ctx, page: true })
        )
      );
    }

    exports.apply = apply;
    exports.inject = inject;
    return module.exports;
  },
});
