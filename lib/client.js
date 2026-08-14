// dsh-blue-whale — browser half.
//
// Overlays official DeepSeek Chat brand tokens onto DSH's built-in light
// and dark palettes. Surfaces stay official (white / bluish-950). Brand
// roles switch from black/white (the default "black whale") to #4D6BFE.
// Appearance (light / dark / follow system) is left to the built-in row.
window.__ModuleLoader__.load({
	id: "dsh-blue-whale",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react_jsx_runtime = require("react/jsx-runtime");
		let _runtime_client = require("@deepseek-ai/dsh-client-runtime/client");

		const SETTINGS_NS = "settings.blue-whale";
		const STORAGE_KEY = "dsh-blue-whale:enabled";
		const OVERRIDE_SOURCE = "dsh-blue-whale";
		const STYLE_ID = "dsh-blue-whale-style";

		// Official DeepSeek brand blue (chat.deepseek.com / public brand).
		const BRAND = "#4D6BFE";
		// Official DSH --dsw-static-deepseek-* scale (in-repo palette).
		const DS_50 = "rgb(237, 243, 254)";
		const DS_100 = "rgb(228, 237, 253)";
		const DS_200 = "rgb(211, 226, 255)";
		const DS_400 = "rgb(103, 158, 254)";
		const DS_450 = "rgb(86, 134, 254)";
		const DS_500 = "rgb(65, 118, 230)";
		const DS_800 = "rgb(52, 65, 91)";
		const DS_900 = "rgb(40, 49, 66)";

		const TOKENS = {
			"--dsw-alias-brand-primary": { light: BRAND, dark: BRAND },
			"--dsw-alias-brand-text": { light: "#ffffff", dark: "#ffffff" },
			"--dsw-alias-brand-primary-new-colorprimary-new-color": { light: BRAND, dark: DS_450 },
			"--dsw-alias-button-primary-hover": { light: DS_450, dark: DS_400 },
			"--dsw-alias-button-primary-dimmed": { light: DS_100, dark: DS_900 },
			"--dsw-alias-button-info-fill": { light: BRAND, dark: DS_450 },
			"--dsw-alias-button-info-hover": { light: DS_500, dark: DS_400 },
			"--dsw-alias-state-business-primary": { light: BRAND, dark: DS_450 },
			"--dsw-alias-state-business-tertiary": { light: DS_100, dark: DS_800 },
			"--dsw-alias-interactive-bg-hover": {
				light: "rgba(77, 107, 254, 0.08)",
				dark: "rgba(77, 107, 254, 0.16)"
			},
			"--dsw-alias-interactive-bg-active": {
				light: "rgba(77, 107, 254, 0.14)",
				dark: "rgba(77, 107, 254, 0.24)"
			},
			"--dsw-alias-interactive-bg-hover-accent": {
				light: "rgba(77, 107, 254, 0.16)",
				dark: "rgba(77, 107, 254, 0.28)"
			},
			"--dsw-specific-bubble": { light: DS_50, dark: "rgb(44, 44, 46)" },
			"--dsw-specific-bubble-highlight": { light: DS_200, dark: "rgb(67, 69, 74)" },
			"--dsw-specific-sidebar-nav-item-active-accent": {
				light: DS_100,
				dark: "rgba(77, 107, 254, 0.22)"
			}
		};

		const CSS = [
			"body[data-dsh-blue-whale] ::selection { background: rgba(77, 107, 254, 0.22); }",
			"body[data-dsh-blue-whale][data-ds-dark-theme] ::selection { background: rgba(77, 107, 254, 0.32); }",
			"body[data-dsh-blue-whale] :focus-visible { outline-color: #4D6BFE; }",
			"body[data-dsh-blue-whale] svg:has(#dsh-wordmark-whale-clip) g[clip-path*=\"dsh-wordmark-whale-clip\"] path {",
			"  fill: #4D6BFE !important;",
			"}",
			"body[data-dsh-blue-whale] .pXSMma_fish,",
			"body[data-dsh-blue-whale] .hHd-Xa_railFish,",
			"body[data-dsh-blue-whale] svg[viewBox=\"0 0 23.16 17.04\"] {",
			"  color: #4D6BFE !important;",
			"}",
			"body[data-dsh-blue-whale] svg[viewBox=\"0 0 23.16 17.04\"] path[fill=\"currentColor\"] {",
			"  fill: #4D6BFE !important;",
			"}"
		].join("\n");

		const DEFAULT_FAVICON = "/favicon.svg";
		let faviconGeneration = 0;

		const zh = {
			"title": "蓝鲸",
			"hint": "侧栏鲸标、欢迎页鲸标、浏览器标签页和品牌色一并换成官方蓝 #4D6BFE。亮色 / 深色跟随系统外观。",
			"open": "打开",
			"close": "关闭",
			"statusOn": "已开启"
		};

		const en = {
			"title": "Blue Whale",
			"hint": "Sidebar whale, hero whale, tab favicon, and brand tokens all use official DeepSeek blue #4D6BFE. Light and dark follow the built-in appearance.",
			"open": "Turn on",
			"close": "Turn off",
			"statusOn": "On"
		};

		function readEnabled() {
			try {
				const value = window.localStorage.getItem(STORAGE_KEY);
				if (value === null) return true;
				return value !== "0";
			} catch {
				return true;
			}
		}

		function writeEnabled(enabled) {
			try {
				window.localStorage.setItem(STORAGE_KEY, enabled ? "1" : "0");
			} catch {
				// quota / private mode — stay process-local
			}
		}

		function injectStyle() {
			let style = document.getElementById(STYLE_ID);
			if (style === null) {
				style = document.createElement("style");
				style.id = STYLE_ID;
				document.head.appendChild(style);
			}
			style.textContent = CSS;
		}

		function removeStyle() {
			document.getElementById(STYLE_ID)?.remove();
		}

		function setFaviconHref(href) {
			document.querySelectorAll("link[rel='icon']").forEach((node) => node.remove());
			const link = document.createElement("link");
			link.rel = "icon";
			link.type = "image/svg+xml";
			link.href = href;
			document.head.appendChild(link);
		}

		async function applyFavicon() {
			const generation = ++faviconGeneration;
			try {
				const response = await fetch(DEFAULT_FAVICON);
				const svg = await response.text();
				if (generation !== faviconGeneration) return;
				const blue = svg
					.replace(/fill="#000"/g, `fill="${BRAND}"`)
					.replace(/path \{ fill: #fff; \}/g, `path { fill: ${BRAND}; }`);
				setFaviconHref(`data:image/svg+xml,${encodeURIComponent(blue)}`);
			} catch {
				if (generation !== faviconGeneration) return;
				setFaviconHref(`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><circle cx="8" cy="8" r="7" fill="${BRAND}"/></svg>`)}`);
			}
		}

		function restoreFavicon() {
			faviconGeneration += 1;
			setFaviconHref(DEFAULT_FAVICON);
		}

		const styles = {
			row: {
				borderBottom: "1px solid var(--dsw-alias-border-l2)",
				display: "flex",
				flexDirection: "column",
				gap: "8px",
				padding: "16px 0"
			},
			head: {
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				gap: "12px"
			},
			title: {
				color: "var(--dsw-alias-label-primary)",
				fontSize: "14px",
				lineHeight: "22px"
			},
			hint: {
				color: "var(--dsw-alias-label-tertiary)",
				fontSize: "12px",
				lineHeight: "18px"
			},
			swatch: {
				width: "18px",
				height: "18px",
				borderRadius: "999px",
				background: BRAND,
				flexShrink: 0
			},
			titleGroup: {
				display: "flex",
				alignItems: "center",
				gap: "8px"
			},
			statusDot: {
				width: "7px",
				height: "7px",
				borderRadius: "999px",
				background: "var(--dsw-alias-state-success-primary)",
				flexShrink: 0,
				display: "inline-block"
			},
			button: {
				height: "32px",
				padding: "0 14px",
				borderRadius: "16px",
				border: "1px solid var(--dsw-alias-border-l2)",
				background: "var(--dsw-alias-button-elevated-fill)",
				color: "var(--dsw-alias-label-primary)",
				cursor: "pointer",
				font: "inherit",
				fontSize: "14px",
				lineHeight: "22px"
			}
		};

		function EnabledRow({ t, setEnabled, useStore }) {
			const enabled = useStore((s) => s.enabled);
			return (0, react_jsx_runtime.jsxs)("div", {
				style: styles.row,
				children: [
					(0, react_jsx_runtime.jsxs)("div", {
						style: styles.head,
						children: [
							(0, react_jsx_runtime.jsxs)("div", {
								style: styles.titleGroup,
								children: [
									(0, react_jsx_runtime.jsx)("span", { style: styles.swatch, "aria-hidden": true }),
									(0, react_jsx_runtime.jsx)("div", {
										style: styles.title,
										children: t("title")
									}),
									enabled ? (0, react_jsx_runtime.jsx)("span", {
										style: styles.statusDot,
										title: t("statusOn"),
										"aria-label": t("statusOn")
									}) : null
								]
							}),
							(0, react_jsx_runtime.jsx)("button", {
								type: "button",
								style: styles.button,
								"aria-pressed": enabled,
								onClick: () => setEnabled(!enabled),
								children: enabled ? t("close") : t("open")
							})
						]
					}),
					(0, react_jsx_runtime.jsx)("div", {
						style: styles.hint,
						children: t("hint")
					})
				]
			});
		}

		function createEnabledStore() {
			return (0, _runtime_client.defineStore)({
				init: () => ({
					enabled: true,
					revision: -1
				}),
				actions: {
					sync: (d, enabled, revision) => {
						if (revision <= d.revision) return;
						d.enabled = enabled;
						d.revision = revision;
					}
				}
			});
		}

		const inject = ["slots", "locale", "theme"];

		function apply(ctx) {
			let disposeOverride = null;
			let revision = 0;
			const store = createEnabledStore();
			let bound;

			const applySkin = (enabled) => {
				disposeOverride?.();
				disposeOverride = null;
				if (enabled) {
					document.body.setAttribute("data-dsh-blue-whale", "");
					disposeOverride = ctx.theme.overrideTokens(OVERRIDE_SOURCE, TOKENS);
					injectStyle();
					applyFavicon();
				} else {
					document.body.removeAttribute("data-dsh-blue-whale");
					removeStyle();
					restoreFavicon();
				}
			};

			const sync = (enabled) => {
				revision += 1;
				bound?.sync(enabled, revision);
			};

			applySkin(readEnabled());
			sync(readEnabled());

			ctx.effect(() => () => {
				disposeOverride?.();
				document.body.removeAttribute("data-dsh-blue-whale");
				removeStyle();
				restoreFavicon();
			}, "dsh-blue-whale: teardown");

			ctx.effect(() => ctx.locale.register(SETTINGS_NS, { zh, en }), "dsh-blue-whale: locale");

			ctx.slots.inject("settings.general.item", () => ctx.slots.register({
				name: "settings.general.item",
				id: "blue-whale",
				order: 21,
				store,
				locale: SETTINGS_NS,
				inject: (actions) => {
					bound = actions;
					sync(readEnabled());
					return {
						setEnabled: (enabled) => {
							writeEnabled(enabled);
							applySkin(enabled);
							sync(enabled);
						}
					};
				}
			}, EnabledRow));
		}

		exports.apply = apply;
		exports.inject = inject;
		exports.TOKENS = TOKENS;
		exports.BRAND = BRAND;
		return module.exports;
	}
});
