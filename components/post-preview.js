import Link from 'next/link';
import Avatar from './avatar';
import Date from './date';
import CoverImage from './cover-image';
import styled from '@emotion/styled';
import { em } from '../styles/units';
import { panelBoxShadow } from '../styles/global';
import { SHADE, UI_COLORS, POST_COLORS, TINT } from '../styles/colors';
import { keyframes } from '@emotion/react';
import { generateIndexHash } from '../lib/hash';
import hexToRgba from 'hex-to-rgba';

const PostPreviewSection = styled.section(({ color }) => {
  const shadowColor = color && hexToRgba(color, 0.5);
  return {
    display: 'block',
    borderRadius: em(1),
    boxShadow: panelBoxShadow(30),
    cursor: 'pointer',
    marginBottom: em(2),
    transition: 'all 150ms ease-in',
    position: 'relative',
    willChange: 'box-shadow, transform',
    textAlign: 'left',

    '&:hover': {
      transform: 'scale(1.015)',
    },

    '&:active, &:focus, &:focus-within': {
      transitionDuration: '30ms',
      outline: 'none',
      transform: 'scale(1.035)',
      padding: em(0.3),
      boxShadow: panelBoxShadow(
        30,
        `var(--post-preview-shadow-color, ${TINT[0.15]})`
      ),
    },
  };
});

const PostHighlight = styled.div({
  padding: em(1.5, 2),

  position: 'absolute',
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 3,

  color: UI_COLORS.POST_PREVIEW_HIGHLIGHT_TEXT,

  time: {
    opacity: 0.75,
  },
});

const PostTitle = styled.h3({
  fontSize: em(1.5),
  margin: em(0, 0, 0.5, 0),

  a: {
    color: 'inherit',
    textDecoration: 'none',
    outline: 'none',
  },

  'a:hover': {
    color: 'inherit',
  },
});

const PostExcerpt = styled.p({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  opacity: 0.75,
  lineHeight: 1.6,
  lineClamp: 3,
  WebkitLineClamp: 3,
  textOverflow: 'ellipsis',
  overflow: 'hidden',
});

export default function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
  size = 80,
  color,
}) {
  return (
    <Link as={`/posts/${slug}`} href="/posts/[slug]">
      <PostPreviewSection color={color}>
        <CoverImage
          titleText={title}
          slug={slug}
          url={coverImage.url}
          size={size}
          color={color}
        />
        <PostHighlight>
          {date && <Date dateString={date} />}
          <PostTitle>
            <Link as={`/posts/${slug}`} href="/posts/[slug]">
              <a>{title}</a>
            </Link>
          </PostTitle>

          <PostExcerpt>{excerpt}</PostExcerpt>
        </PostHighlight>
      </PostPreviewSection>
    </Link>
  );
}
