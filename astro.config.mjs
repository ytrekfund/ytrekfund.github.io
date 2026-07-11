// @ts-check
import { defineConfig } from 'astro/config';
import rehypeSidenotes from './src/plugins/rehype-sidenotes.mjs';

// https://astro.build/config
export default defineConfig({
  // 站点实际地址（RSS 的绝对链接依赖它）。
  // 用户主页仓库（<user>.github.io）部署在根路径，无需 base；
  // 若日后迁到项目页（https://<user>.github.io/<repo>），需加 base: '/<repo>'。
  site: 'https://ytrekfund.github.io',
  markdown: {
    rehypePlugins: [rehypeSidenotes],
    // 深色代码主题，块内自成一方暗色区域
    shikiConfig: { theme: 'vitesse-dark' },
  },
});
