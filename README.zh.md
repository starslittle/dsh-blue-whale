# dsh-blue-whale

[English](README.md) · 中文

[DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) 的 **DeepSeek Chat 官方蓝鲸配色皮肤**，亮色/深色跟随系统外观。

DSH 出厂是黑鲸，chat.deepseek.com 是蓝鲸。这个插件把官方蓝 `#4D6BFE` 还回去：侧栏字标、欢迎页鲸、浏览器标签页图标、主按钮和强调色。亮色 / 深色 / 跟随系统仍走自带的「外观」。

![首页对比](docs/compare-home.png)

![品牌对比](docs/compare-brand.png)

标签页上的小鲸也会换成蓝色，对比图上方有注明。

## 安装

```sh
dsh plugin --profile web add -w github:starslittle/dsh-blue-whale
```

重启 `dsh web`。默认开启。

打开 **设置 → 通用 → 蓝鲸**。标题旁绿点表示已开启。**关闭** 和官方「排队发送」同一颗胶囊；**打开** 是蓝底白字。

## 改了什么

| | 官方 DSH | 本皮肤 |
|---|---|---|
| 侧栏鲸 + `deepseek` 字 | 近黑 / 近白 | `#4D6BFE` |
| 欢迎页鲸 | 同上 | `#4D6BFE` |
| 浏览器标签页图标 | 黑（系统深色下为白） | `#4D6BFE` |
| 品牌色 / 发送键 / 强调 | 黑或白 | `#4D6BFE` |
| 页面底色 | 官方浅色 / 深色 | 不动 |
| 亮暗切换 | 自带外观 | 仍走自带外观 |

辅助色来自 DSH 仓库里的 `--dsw-static-deepseek-*`。

## 桌面版

官方 `dsh web` 可用。套了同一套 Web UI 的桌面壳（同一个 `web` profile）一般也能用。

不会改桌面应用自己的窗口图标或托盘图标。headless / TUI 没有界面，不必装。

## 许可

MIT
