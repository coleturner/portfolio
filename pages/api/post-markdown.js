import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import { getPreviewPostBySlug } from '../../lib/api';
import { BASE_URL } from '../../lib/constants';

const renderMark = {
  [MARKS.BOLD]: (str) => `**${str}**`,
  [MARKS.ITALIC]: (str) => `_${str}_`,
  [MARKS.CODE]: (str) => {
    return (
      '\n> ' +
      // eslint-disable-next-line no-use-before-define
      str.trimEnd().split(/\n/g).join('\n> ') +
      '\n'
    );
  },
};

const renderHyperlink = (node) => {
  return `[${documentToPlainTextString(node)}](${node.data.uri})`;
};

const embeddedEntry = (node) => {
  const { sys, fields } = node.data.target;
  const { contentType } = sys;

  switch (contentType.sys.id) {
    case 'sourceCode': {
      const { title, code, language } = fields;
      return `
**${title}

\`\`\`${language}
${code}
\`\`\`
`;
    }
    case 'imageGallery': {
      const { title, images } = fields;
      const imageMarkdown = images
        .map((n) => {
          const { title: imageTitle, description, file } = n.fields;
          const src = file.url;
          return `\n###### ${imageTitle}\n![${file.description || ''}](${src})`;
        })
        .join('\n\n');

      return `##### ${title}\n ${imageMarkdown} \n\n`;
    }
    case 'youtubeVideo': {
      const { title, url } = fields;
      return `\n\nWatch [${title}](${url}))\n\n`;
    }
    default:
      break;
  }

  return null;
};

const inlineRenderer = {
  renderMark,
  renderNode: {
    [BLOCKS.HEADING_1]: (node, next) => `**${next(node.content)}**`,
    [BLOCKS.HEADING_2]: (node, next) => `**${next(node.content)}**`,
    [BLOCKS.HEADING_3]: (node, next) => `**${next(node.content)}**`,
    [BLOCKS.HEADING_4]: (node, next) => `**${next(node.content)}**`,
    [BLOCKS.HEADING_5]: (node, next) => `**${next(node.content)}**`,
    [BLOCKS.HEADING_6]: (node, next) => `**${next(node.content)}**`,
    [BLOCKS.PARAGRAPH]: (node, next) => `\n${next(node.content)}\n`,
    [BLOCKS.BLOCKQUOTE]: (node, next) => `> ${next(node.content)}`,
    [INLINES.HYPERLINK]: renderHyperlink,
  },
};

export default async function postToMarkdown(req, res) {
  const { secret, slug } = req.query;

  if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET || !slug) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  // Fetch the headless CMS to check if the provided `slug` exists
  const post = await getPreviewPostBySlug(slug);

  // If the slug doesn't exist prevent preview mode from being enabled
  if (!post) {
    return res.status(401).json({ message: 'Invalid slug' });
  }

  const embeddedAsset = (node) => {
    const { title, file } = node.data.target.fields;

    const mimeType = file?.contentType;
    const mimeGroup = mimeType.split('/')[0];

    switch (mimeGroup) {
      case 'video': {
        return `\nWatch [${title}](${BASE_URL}posts/${post.slug}))\n\n`;
      }
      case 'image':
        return `\n![${title}](${file.url})\n\n`;
      case 'application':
        return `\nDownload [${
          title ? title : file.details.fileName
        }](${BASE_URL}posts/${post.slug}))\n\n`;
      default:
        break;
    }
  };

  let text = documentToHtmlString(post.content, {
    renderMark,
    renderNode: {
      [BLOCKS.HR]: () => '\n---\n',
      [BLOCKS.HEADING_1]: (node, next) => `# ${next(node.content)}`,
      [BLOCKS.HEADING_2]: (node, next) => `## ${next(node.content)}`,
      [BLOCKS.HEADING_3]: (node, next) => `### ${next(node.content)}`,
      [BLOCKS.HEADING_4]: (node, next) => `#### ${next(node.content)}`,
      [BLOCKS.HEADING_5]: (node, next) => `##### ${next(node.content)}`,
      [BLOCKS.HEADING_6]: (node, next) =>
        `\n**${next(node.content).replace(/^\*\*/, '').replace(/\*\*$/, '')}**`,
      [BLOCKS.PARAGRAPH]: (node, next) => `\n${next(node.content)}\n`,
      [INLINES.HYPERLINK]: renderHyperlink,
      [BLOCKS.UL_LIST]: (node) => {
        const children = documentToHtmlString(node, {
          renderNode: {
            [BLOCKS.PARAGRAPH]: (p) => documentToPlainTextString(p),
            [BLOCKS.LIST_ITEM]: (li) => {
              return (
                '- ' + documentToHtmlString(li, inlineRenderer).trim() + '\n'
              );
            },
            [INLINES.HYPERLINK]: renderHyperlink,
          },
        });

        return '\n' + children;
      },
      [BLOCKS.OL_LIST]: (node) => {
        const children = documentToHtmlString(node, {
          renderNode: {
            [BLOCKS.PARAGRAPH]: (p) => documentToPlainTextString(p),
            [BLOCKS.LIST_ITEM]: (li) => {
              const number = node.content.indexOf(li) + 1;
              return (
                `${number}. ` +
                documentToHtmlString(li, inlineRenderer).trim() +
                '\n'
              );
            },
            [INLINES.HYPERLINK]: renderHyperlink,
          },
        });

        return '\n' + children;
      },
      [BLOCKS.QUOTE]: (node) => {
        return (
          '\n' +
          documentToHtmlString(node, inlineRenderer)
            .trimEnd()
            .split(/\n/g)
            .join('\n> ') +
          '\n'
        );
      },
      [BLOCKS.EMBEDDED_ENTRY]: embeddedEntry,
      [BLOCKS.EMBEDDED_ASSET]: embeddedAsset,
      [INLINES.EMBEDDED_ENTRY]: embeddedEntry,
      [INLINES.EMBEDDED_ASSET]: embeddedAsset,
    },
  });

  text = `---
title: ${post.title}
published: false
description: ${post.excerpt}
tags: ${post.tags.map((n) => n.name).join(', ')}
cover_image: https:${post.coverImage?.url}
canonical_url: ${BASE_URL}posts/${post.slug}
---
  
  ${text}
  `;

  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.write(text.trim());
  res.end();

  return null;
}
