# 长湖

一个为安静读字而做的 Astro 博客主题：整页如一张纸，正文黑体、康奈尔式双栏——主栏是文章，右栏是从 Markdown 原生脚注提升出来的批注。

## 特点

- **只写 Markdown**：文章放进 `src/content/posts/`，frontmatter 仅 `title`、`date` 必填（可选 `brief`、`tags`、`draft`）
- **批注即脚注**：正文里写 `[^1]` 脚注，构建时提升为右栏边注（`^` 占位标记，悬停双向高亮）；源文件在任何渲染器里仍是合法脚注
- **专栏（连载）**：`src/content/columns/` 每栏一个文件，frontmatter 按序列出文章 id，自动生成目录与上一篇/下一篇
- 标签、归档、RSS、代码块一键复制、draft 本地预览
- 中文排版细节：数值行高（加粗不撑行）、全角标点占位（`text-spacing-trim`）、稿纸式字格对齐、平台原生黑体栈 + Inter

## 命令

| 命令              | 作用                       |
| :---------------- | :------------------------- |
| `npm install`     | 安装依赖                   |
| `npm run dev`     | 本地开发 `localhost:4321`  |
| `npm run build`   | 构建到 `./dist/`           |
| `npm run preview` | 本地预览构建产物           |

## 部署

推送到 `main` 后由 [.github/workflows/deploy.yml](.github/workflows/deploy.yml) 自动构建并发布到 GitHub Pages（仓库 Settings → Pages → Source 选 "GitHub Actions"）。部署前在 [astro.config.mjs](astro.config.mjs) 里改 `site`；绑定自定义域名时把域名写进 [public/CNAME](public/CNAME)。

站名与简介在 [src/consts.ts](src/consts.ts)；视觉参数集中在 [src/styles/global.css](src/styles/global.css) 顶部的 `:root` 变量。

改动边注插件（`src/plugins/rehype-sidenotes.mjs`）后若不生效，删除 `.astro/data-store.json` 再重启 dev server（content layer 会缓存渲染结果）。
