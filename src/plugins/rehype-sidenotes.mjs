import { visit } from 'unist-util-visit';
import { visitParents } from 'unist-util-visit-parents';

/**
 * 把 GFM 脚注提升为边注（sidenote）：
 * - 脚注引用处留一个「^」占位标记（无编号，占一个全角字宽）；
 * - 脚注内容变成 <span class="sidenote">，挂到引用所在段落的末尾——
 *   宽屏由 CSS 浮到该段右侧的批注栏，窄屏自然显示在段落之后，
 *   不会把句子从插入点截断；
 * - 删除文末自动生成的脚注 section。
 *
 * markdown 源文件保持原生脚注语法，在其他渲染器里仍是合法脚注。
 */
export default function rehypeSidenotes() {
  return (tree) => {
    const defs = new Map();
    let section = null;
    let sectionParent = null;

    visit(tree, 'element', (node, _index, parent) => {
      if (node.tagName === 'section' && node.properties?.dataFootnotes !== undefined) {
        section = node;
        sectionParent = parent;
        const ol = node.children.find((c) => c.tagName === 'ol');
        for (const li of ol?.children ?? []) {
          if (li.tagName !== 'li' || !li.properties?.id) continue;
          const blocks = li.children.filter((c) => c.tagName === 'p');
          const content = [];
          (blocks.length ? blocks : [li]).forEach((block, i) => {
            if (i > 0) content.push({ type: 'element', tagName: 'br', properties: {}, children: [] });
            for (const child of block.children) {
              // 去掉返回原文的 backref 链接
              if (child.type === 'element' && child.properties?.dataFootnoteBackref !== undefined) continue;
              content.push(child);
            }
          });
          while (content.length && content.at(-1).type === 'text' && !content.at(-1).value.trim()) {
            content.pop();
          }
          defs.set(`#${li.properties.id}`, content);
        }
      }
    });

    if (!section) return;
    sectionParent.children.splice(sectionParent.children.indexOf(section), 1);

    // 先收集再改动，避免遍历中修改树
    const jobs = [];
    visitParents(tree, 'element', (node, ancestors) => {
      if (node.tagName !== 'sup') return;
      const ref = node.children.find(
        (c) => c.type === 'element' && c.properties?.dataFootnoteRef !== undefined
      );
      if (!ref) return;
      const content = defs.get(ref.properties.href);
      if (!content) return;
      const parent = ancestors[ancestors.length - 1];
      // 边注挂到最近的块级祖先（通常是 <p>，也可能是 <li>）末尾
      const block =
        [...ancestors].reverse().find((a) => ['p', 'li', 'blockquote'].includes(a.tagName)) ??
        parent;
      jobs.push({ parent, sup: node, block, content });
    });

    for (const { parent, sup, block, content } of jobs) {
      // 占位标记「^」：普通行内元素（不用 sup，不影响行高），
      // CSS 令其占一个全角字宽；悬停配对高亮由页面脚本按段内顺序绑定
      const marker = {
        type: 'element',
        tagName: 'span',
        properties: { className: ['sidenote-mark'] },
        children: [{ type: 'text', value: '^' }],
      };
      // 等长替换，不影响其余 job 的索引
      parent.children.splice(parent.children.indexOf(sup), 1, marker);
      block.children.push({
        type: 'element',
        tagName: 'span',
        properties: { className: ['sidenote'], role: 'note' },
        children: structuredClone(content),
      });
    }
  };
}
