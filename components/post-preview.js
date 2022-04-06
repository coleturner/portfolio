import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Date from 'components/date';
import CoverImage from 'components/cover-image';
import styled from '@emotion/styled';
import { panelBoxShadow } from 'styles/global';
import { UI_COLORS, TINT, SHADE } from 'styles/colors';
import PostTheme from 'components/post-theme';
import usePostTheme from 'hooks/usePostTheme';
import { PillButtonStyle } from './button';
import { css } from 'emotion';

const BREAKPOINT = 'min-width: 600px';

const PostPreviewSection = styled.section`
  --cover-image-border-width: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid var(--page-background-color-invert-5);
  cursor: pointer;
  transition: all 150ms ease-in;
  position: relative;
  will-change: box-shadow, transform;
  text-align: left;
  padding: 2em 0;
  margin: 0;
  width: 100%;

  &:last-child {
    border: 0;
  }

  @media screen and (${BREAKPOINT}) {
    flex-direction: row;
  }
`;

const PostCoverImage = styled.div`
  display: block;
  flex: 0 0 auto;
  width: 100%;
  width: calc(100% - 2em);
  height: 15em;
  margin-bottom: 1.25em;

  @media screen and (${BREAKPOINT}) {
    margin: 0;
    width: 10em;
    height: 10em;
  }
`;

const PostHighlight = styled.div`
  flex: 1 1 auto;
  padding: 0 2em;
  position: relative;
  z-index: 3;

  time {
    opacity: 0.75;
  }
`;

const PostTitle = styled.h3`
  font-size: 1.1em;
  margin: 0 0 0.1em 0;
  color: var(--post-preview-title-color, var(--post-color-invert-30));

  a {
    color: inherit;
    text-decoration: none;
    outline: none;
  }

  a:hover {
    color: var(--post-preview-title-color, var(--post-color-invert-30));
  }
`;

const PostMetadata = styled.div`
  opacity: 0.75;
`;

const ReadingTime = styled.span`
  opacity: 0.75;

  &::before {
    content: '·';
    margin: 0 0.75em;
  }
`;

const PostExcerpt = styled.p`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  opacity: 0.8;
  lineheight: 1.6;
  margin-bottom: 0;
`;

export default function PostPreview({
  title,
  coverImage,
  date,
  readingTime,
  excerpt,
  slug,
  color,
}) {
  const Theme = color ? PostTheme : ({ children }) => <div>{children}</div>;

  return (
    <Link href={`/posts/${slug}`}>
      <Theme color={color}>
        <PostPreviewSection>
          {coverImage && (
            <PostCoverImage>
              <CoverImage
                titleText={title}
                slug={slug}
                url={coverImage?.url}
                shadow={false}
              />
            </PostCoverImage>
          )}

          <PostHighlight>
            <PostTitle>
              <Link href={`/posts/${slug}`}>
                <a>{title}</a>
              </Link>
            </PostTitle>
            <PostMetadata>
              {date && <Date dateString={date} />}
              {readingTime && <ReadingTime>{readingTime} min read</ReadingTime>}
            </PostMetadata>

            <PostExcerpt>{excerpt}</PostExcerpt>
          </PostHighlight>
        </PostPreviewSection>
      </Theme>
    </Link>
  );
}

PostPreview.propTypes = {
  title: PropTypes.string,
  coverImage: PropTypes.shape({ url: PropTypes.string }),
  date: PropTypes.string,
  readingTime: PropTypes.number,
  excerpt: PropTypes.string,
  slug: PropTypes.string,
  color: PropTypes.string,
};
