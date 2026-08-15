# dsh-blue-whale

English · [中文](README.zh.md)

The official DeepSeek Chat **blue-whale color** skin for [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness). Light and dark follow the built-in appearance.

DSH ships as a black whale. Chat.deepseek.com is a blue one. This plugin puts official DeepSeek blue `#4D6BFE` back on the brand — wordmark, hero fish, tab favicon, and primary actions — and leaves light / dark / follow-system to the built-in Appearance setting.

![Home before / after](docs/compare-home.png)

![Brand mark before / after](docs/compare-brand.png)

The browser tab icon is recolored too (see the note on the images).

## Install

```sh
dsh plugin --profile web add -w github:starslittle/dsh-blue-whale
```

Restart `dsh web`. The skin is **on by default**.

Open **Settings → General → Blue Whale**. A green dot means it is on. **Close** matches the official capsule control; **Open** is the blue fill.

## What it changes

| | Official DSH | This skin |
|---|---|---|
| Sidebar whale + `deepseek` | near-black / near-white | `#4D6BFE` |
| Hero whale | same | `#4D6BFE` |
| Browser tab icon | black (white in OS dark) | `#4D6BFE` |
| Brand / send / accents | black or white | `#4D6BFE` |
| Page background | official light / dark | unchanged |
| Light / dark switch | built-in Appearance | still built-in |

Supporting colors come from DSH's own `--dsw-static-deepseek-*` scale.

## Desktop

Works on official `dsh web`, and on desktop shells that embed that same Web UI (same `web` profile).

It does **not** change the desktop app's window or tray icon. Headless and TUI profiles have nothing to paint.

## License

MIT
