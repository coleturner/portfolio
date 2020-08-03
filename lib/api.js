/* eslint-disable no-use-before-define */
import { createClient } from 'contentful';
import { POST_COLORS } from 'styles/colors';
import { generateIndexHash } from 'lib/hash';
import hexToRgba from 'hex-to-rgba';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';

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

function parseAuthor({ fields } = {}) {
  return {
    name: fields?.name || null,
    picture: fields?.picture.fields.file || null,
  };
}

function getReadingTime(content, wpm = 200) {
  if (!content) {
    return null;
  }

  const contentText = documentToPlainTextString(content);
  if (!contentText) {
    return null;
  }

  const textLength = contentText.split(' ').length;

  return Math.max(1, Math.ceil(textLength / wpm));
}

function parsePost({ sys = {}, fields = {} }) {
  const color = getPostColor(fields) || null;

  return {
    title: fields?.title,
    slug: fields?.slug,
    date: fields?.date || sys?.createdAt || null,
    updatedAt: sys?.updatedAt || null,
    content: fields?.content || null,
    excerpt: fields?.excerpt || null,
    coverImage: fields?.coverImage?.fields.file || null,
    ogImage: fields?.ogImage?.fields.file || null,
    author: parseAuthor(fields?.author) || null,
    readingTime: getReadingTime(fields?.content || null),
    tags: parseTagList(fields?.tags) || [],
    attributes: fields?.attributes || null,
    color,
  };
}

function parseTag({ sys = {}, fields = {} }) {
  return {
    id: sys.id,
    name: fields?.name,
    slug: fields?.slug,
    description: fields?.description || null,
    color: getTagColor(fields),
  };
}

function parseTagList(tags) {
  if (!tags || !tags.length) {
    return [];
  }

  return tags.map((n) => n.fields);
}

function parsePostEntries(entries, cb = parsePost) {
  return entries?.items?.map(cb);
}

function parseTagEntries(entries, cb = parseTag) {
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

export async function getAllTagsForSitemap() {
  const entries = await client.getEntries({
    content_type: 'tag',
    order: 'fields.name',
  });

  return parseTagEntries(entries);
}

export async function getAllPostTags() {
  const entries = await client.getEntries({
    content_type: 'tag',
    order: 'fields.name',
  });

  return parseTagEntries(entries);
}

export async function getTagBySlug(slug) {
  const entries = await client.getEntries({
    content_type: 'tag',
    'fields.slug': slug,
  });

  const entry = entries?.items?.[0];

  return entry && parseTag(entry);
}

export async function getAllPostWithTagId(tagId, preview) {
  const entries = await getClient(preview).getEntries({
    content_type: 'post',
    'fields.tags.sys.id': tagId,
  });

  return parsePostEntries(entries);
}

export async function getAllPostsForHome(preview) {
  const entries = await getClient(preview).getEntries({
    content_type: 'post',
    order: '-fields.date',
  });
  return parsePostEntries(entries);
}

export async function getAllPostsForSitemap(preview) {
  const entries = await getClient(preview).getEntries({
    content_type: 'post',
    order: '-fields.date',
    limit: 1000,
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
    POST_COLORS[
      generateIndexHash(
        post.title || post.slug || Math.random.toString(),
        POST_COLORS.length
      )
    ] || POST_COLORS[0];

  return alpha === 1 ? color : hexToRgba(color, alpha);
}

export function getTagColor(tag, alpha = 1) {
  if (tag?.color) {
    return tag.color;
  }

  const color =
    POST_COLORS[
      generateIndexHash(
        tag.title || tag.slug || Math.random.toString(),
        POST_COLORS.length
      )
    ] || POST_COLORS[0];

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

// https://gist.github.com/codeguy/6684588
export function toSlug(input) {
  let str = input;
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  let from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;';
  let to = 'aaaaeeeeiiiioooouuuunc------';
  for (let i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/^[0-9]+/, '') // remove starting number
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  return str;
}
