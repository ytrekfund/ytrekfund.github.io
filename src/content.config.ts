import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
  loader: glob({ base: './src/content/posts', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    brief: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    /** 文章页装饰条带图，路径相对站点根（放 public/banners/）；缺省为空白（纸面本色） */
    banner: z.string().optional(),
    /** 单篇协议声明，覆盖默认的 CC BY-NC-SA 4.0；填 none 则不显示声明 */
    license: z.string().default('CC BY-NC-SA 4.0'),
  }),
});

const columns = defineCollection({
  loader: glob({ base: './src/content/columns', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    // 按连载顺序排列的文章 id（即文章文件名，不含扩展名）
    posts: z.array(reference('posts')),
  }),
});

export const collections = { posts, columns };
