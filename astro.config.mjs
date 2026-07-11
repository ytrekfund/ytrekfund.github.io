// @ts-check
import { defineConfig } from 'astro/config';
import rehypeSidenotes from './src/plugins/rehype-sidenotes.mjs';

// https://astro.build/config
export default defineConfig({
  // 站点实际地址（RSS 的绝对链接依赖它）。
  // 绑定自定义域名后以它为准（与 public/CNAME 保持一致）；
  // 自定义域名部署在根路径，无需 base。
  site: 'https://ytrekfund.com',
  markdown: {
    rehypePlugins: [rehypeSidenotes],
    // 深色代码主题，块内自成一方暗色区域
    shikiConfig: { theme: 'vitesse-dark' },
  },
});
