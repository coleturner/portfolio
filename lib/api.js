/* eslint-disable no-use-before-define */
import { createClient } from 'contentful';
import { POST_COLORS } from '../styles/colors';
import { generateIndexHash } from './hash';
import hexToRgba from 'hex-to-rgba';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  removeUnresolved: true,
});

const previewClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN,
  host: 'preview.contentful.com',
  removeUnresolved: true,
});

const getClient = (preview) => (preview ? previewClient : client);

function parseAuthor({ fields }) {
  return {
    name: fields.name,
    picture: fields.picture.fields.file,
  };
}

function parsePost({ fields }) {
  return {
    title: fields.title,
    slug: fields.slug,
    date: fields.date,
    content: fields.content,
    excerpt: fields.excerpt,
    coverImage: fields.coverImage.fields.file,
    author: parseAuthor(fields.author),
    color: getPostColor(fields),
  };
}

function parsePostEntries(entries, cb = parsePost) {
  return entries?.items?.map(cb);
}

export async function getPreviewPostBySlug(slug) {
  const entries = await getClient(true).getEntries({
    content_type: 'post',
    limit: 1,
    'fields.slug[in]': slug,
  });
  return parsePostEntries(entries)[0];
}

export async function getResumeProjects() {
  const entries = await client.getEntries({
    content_type: 'projects',
    'fields.listed': true,
    order: 'fields.position,-fields.started',
  });

  return parsePostEntries(entries, (post) => post.fields);
}

export async function getAllPostsWithSlug() {
  const entries = await client.getEntries({
    content_type: 'post',
    select: 'fields.slug',
  });
  return parsePostEntries(entries, (post) => post.fields);
}

export async function getAllPostsForHome(preview) {
  const entries = await getClient(preview).getEntries({
    content_type: 'post',
    order: '-fields.date',
  });
  return parsePostEntries(entries);
}

export async function getLatestPostsForHome(preview) {
  const entries = await getClient(preview).getEntries({
    content_type: 'post',
    order: '-fields.date',
    limit: 5,
  });
  return parsePostEntries(entries);
}

export async function getPostAndMorePosts(slug, preview) {
  const entry = await getClient(preview).getEntries({
    content_type: 'post',
    limit: 1,
    'fields.slug[in]': slug,
  });
  const entries = await getClient(preview).getEntries({
    content_type: 'post',
    limit: 2,
    order: '-fields.date',
    'fields.slug[nin]': slug,
  });

  const initialPost = parsePostEntries(entry)[0];
  const post = removeCircularPostContents(initialPost);

  return {
    post,
    morePosts: parsePostEntries(entries),
  };
}

export function getPostColor(post, alpha = 1) {
  if (post?.color) {
    return post.color;
  }

  const color =
    POST_COLORS[generateIndexHash(post.title, POST_COLORS.length)] ||
    POST_COLORS[0];

  return alpha === 1 ? color : hexToRgba(color, alpha);
}

function removeCircularPostContents(
  object,
  objectCache = new WeakSet(),
  path = []
) {
  if (object && Object.is(object)) {
    objectCache.add(object);
  } else {
    return object;
  }

  for (const [key, value] of Object.entries(object)) {
    if (typeof value === 'object' && value !== null) {
      if (objectCache.has(value)) {
        if (value?.nodeType === 'document' && value?.content) {
          object[key] = null;
        }

        continue;
      }

      removeCircularPostContents(value, objectCache, path.concat(key));
    }
  }

  return object;
}
