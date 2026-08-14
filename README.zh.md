# dsh-blue-whale

给 [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) 的 **蓝鲸默认皮**。

DSH 出厂是黑鲸：亮色主色近黑，深色主色近白。这个插件只把品牌位换回 DeepSeek Chat 的官方蓝 `#4D6BFE`，亮色 / 深色 / 跟随系统仍走自带的「外观」设置。

> 不是 `dsh-skin` 里的 **深海蓝（Ocean）**。Ocean 是暗色专用的深海海军蓝（`#0a101f` + `#4d86f8`）。本皮肤底还是官方中性色，主色才是公开品牌蓝。

## 改了什么

| | 官方 DSH | 本皮肤 |
|---|---|---|
| 品牌 / 主按钮 | 亮色近黑 / 深色近白 | `#4D6BFE` |
| 亮色底 | 官方白 / 蓝灰中性 | 不动 |
| 深色底 | 官方 bluish-950 | 不动 |
| 亮暗切换 | 自带外观 | 仍走自带外观 |

辅助色来自 DSH 仓库里的 `--dsw-static-deepseek-*`（50–900）。

## 安装

```sh
dsh plugin --profile web add -w github:starslittle/dsh-blue-whale
```

重启 `dsh web`。默认开启。设置 → 通用 → 蓝鲸 可关掉。

## 和 Ocean 的差别

- Ocean 是 7 套口味里的一张暗色卡。
- 这个包是默认替代：装上，黑鲸变成 Chat 那只蓝鲸。
- 深色是官方深色底 + 官方蓝，不是新的深海主题。

## 许可

MIT
