import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;
export type Column = CollectionEntry<'columns'>;

/** 已发布文章，按日期倒序；生产构建时过滤 draft */
export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getCollection('posts', ({ data }) => !(import.meta.env.PROD && data.draft));
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export async function getColumns(): Promise<Column[]> {
  return getCollection('columns');
}

export interface ColumnContext {
  column: Column;
  prev?: Post;
  next?: Post;
  index: number;
  total: number;
}

/** 文章所属的专栏及连载中的上一篇/下一篇（draft 文章不参与） */
export async function getColumnContext(postId: string): Promise<ColumnContext | null> {
  const [columns, published] = await Promise.all([getColumns(), getPublishedPosts()]);
  const byId = new Map(published.map((p) => [p.id, p]));
  for (const column of columns) {
    const ids = column.data.posts.map((ref) => ref.id).filter((id) => byId.has(id));
    const index = ids.indexOf(postId);
    if (index === -1) continue;
    return {
      column,
      prev: index > 0 ? byId.get(ids[index - 1]) : undefined,
      next: index < ids.length - 1 ? byId.get(ids[index + 1]) : undefined,
      index,
      total: ids.length,
    };
  }
  return null;
}

/** 全站统一日期格式：YYYY-MM-DD */
export function formatDate(d: Date): string {
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${mm}-${dd}`;
}
