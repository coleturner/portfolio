import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Date from './date';
import CoverImage from './cover-image';
import styled from '@emotion/styled';
import { panelBoxShadow } from '../styles/global';
import { UI_COLORS, TINT } from '../styles/colors';

const PostPreviewSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  border-radius: 1em;
  box-shadow: ${panelBoxShadow(30)};
  cursor: pointer;
  margin-bottom: 2em;
  transition: all 150ms ease-in;
  position: relative;
  will-change: box-shadow, transform;
  text-align: left;

  &:hover {
    transform: scale(1.015);
  }

  &:active,
  &:focus,
  &:focus-within {
    transitionduration: 30ms;
    outline: none;
    transform: scale(1.035);
    padding: 0.3em;
    boxshadow: ${panelBoxShadow(
      30,
      `var(--post-preview-shadow-color, ${TINT[0.15]})`
    )};
  }
`;

const PostCoverImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
`;

const PostHighlight = styled.div`
  padding: 1.5em 2em;
  padding-top: 50%;
  position: relative;
  z-index: 3;
  color: ${UI_COLORS.POST_PREVIEW_HIGHLIGHT_TEXT};

  time {
    opacity: 0.75;
  }
`;

const PostTitle = styled.h3`
  font-size: 1.5em;
  margin: 0 0 0.5em 0;

  a {
    color: inherit;
    text-decoration: none;
    outline: none;
  }

  a:hover {
    color: inherit;
  }
`;

const PostExcerpt = styled.p`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  opacity: 0.75;
  lineheight: 1.6;
  lineclamp: 3;
  -webkit-line-clamp: 3;
  text-verflow: ellipsis;
  overflow: hidden;
`;

export default function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  slug,
  size = 80,
  color,
}) {
  return (
    <Link as={`/posts/${slug}`} href="/posts/[slug]">
      <PostPreviewSection color={color}>
        <PostCoverImage>
          <CoverImage
            titleText={title}
            slug={slug}
            url={coverImage.url}
            size={size}
            color={color}
          />
        </PostCoverImage>
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

PostPreview.propTypes = {
  title: PropTypes.string,
  coverImage: PropTypes.shape({ url: PropTypes.string }),
  date: PropTypes.string,
  excerpt: PropTypes.string,
  slug: PropTypes.string,
  size: PropTypes.number,
  color: PropTypes.string,
};
