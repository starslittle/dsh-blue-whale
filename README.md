# dsh-blue-whale

The missing **default** DeepSeek skin for [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness).

DSH ships as a black whale: `--dsw-alias-brand-primary` is near-black in light mode and near-white in dark mode. This plugin puts the official Chat blue back on those brand roles, and leaves light / dark / follow-system to the built-in Appearance setting.

> Not `dsh-skin`'s **Ocean**. Ocean is a dark-only deep-sea navy (`#0a101f` + `#4d86f8`). This skin keeps official DSH surfaces and uses public brand `#4D6BFE` in both schemes.

## What it changes

| | Official DSH | This skin |
|---|---|---|
| Brand / primary button | black (light) / white (dark) | `#4D6BFE` |
| Light canvas | official white / bluish neutrals | unchanged |
| Dark canvas | official bluish-950 | unchanged |
| Light / dark switch | built-in Appearance | still built-in Appearance |

Supporting tokens come from DSH's own `--dsw-static-deepseek-*` scale (`50`–`900`).

## Install

```sh
dsh plugin --profile web add -w github:starslittle/dsh-blue-whale
```

Restart `dsh web`. The skin is **on by default**. Settings → General → 蓝鲸 / Blue Whale turns it off.

## Why not Ocean

- Ocean is one card in a 7-skin switcher, dark only.
- This package is a default replacement: install and the black whale becomes the Chat blue whale.
- Dark mode here is official DSH dark + official blue, not a new navy theme.

## License

MIT
