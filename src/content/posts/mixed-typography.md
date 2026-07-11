---
title: 中英混排测试：Typography in the Wild
date: 2026-07-07
brief: 中英文混合排版的自查页：破折号、省略号、数字、单位、专有名词。
tags: [博客]
draft: true
---

这篇也是自查页（draft），专门看中英文混排的效果。

## 专有名词与行内英文

这个站构建在 Astro 之上，中文正文用系统黑体，拉丁字符用 Inter——注意刚才这个破折号，两条横线应该连成一条，中间不能有缝隙。省略号也一样……六个点应该均匀连续。

日常写作里常见的混排：用 GitHub Actions 做 CI，把产物发到 Cloudflare Pages；在 VS Code 里写 Markdown；一段话里夹着 API、HTTP/2、URL 这类缩写，还有 iPhone、macOS 这种驼峰品牌名。观察英文与汉字之间的呼吸感[^1]。

## 数字与单位

正文一行约 42 个汉字，字号 17px，行高 1.7 倍；页面在 2025 年 11 月 20 日之后的构建耗时约 0.9s，产物体积 1.2MB。百分比如 99.9%，温度如 25°C，金额如 $1,234.56 或 ¥88。

## 标点混用

中文句子里引用英文短语 "less is more" 时的引号；括号有全角（像这样）也有半角 (like this)；冒号、分号在中英之间切换：for example, this sentence；再回到中文。

行尾折行处的英文长词像 internationalization 或 supercalifragilisticexpialidocious 的换行表现[^2]，值得盯一眼。

## 标题里的 English Words 效果

看这一节的标题——英文和正文同用 Inter，靠字重与字号区分层级，中文保持黑体。

> 引文里的混排：The quick brown fox jumps over the lazy dog，与中文并置时的基线是否稳定。

行内代码混排：执行 `npm run build` 之后检查 `dist/` 目录，配置在 `astro.config.mjs` 里。

[^1]: 批注里同样有混排：Inter 的小写字母 x-height 偏大，和黑体并排时视觉高度接近。
[^2]: 正文是左对齐：纯中文行按固定字格排布，上下行对齐如稿纸；英文单词是变宽的，出现之后该行的字格会顺延错开。
