import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'components/avatar';
import Date from 'components/date';
import CoverImage from 'components/cover-image';
import PostTitle from 'components/post-title';
import styled from '@emotion/styled';
import { UI_COLORS } from 'styles/colors';
import Container from 'components/container';
import Link from 'next/link';
import { css } from 'emotion';

const MainHeader = styled.div`
  background: #000;
  position: relative;
  z-index: 2;

  --cover-image-border-width: 0;
`;

const GradientBorder = styled.div`
  padding: 5px;
  position: absolute;
  z-index: 2;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to right,
    var(--post-color-minus-15) 0%,
    var(--post-color-plus-15) 50%,
    var(--post-color-minus-15) 100%
  );
`;

const PostMainHeader = styled.div`
  padding-top: 20%;
  padding-bottom: 2em;
`;

const PostMetadata = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 2em;
`;

const AvatarName = styled.span`
  font-weight: 700;
  font-size: 1.25em;
`;

const ReadingTime = styled.span`
  &::before {
    content: '·';
    margin: 0 0.75em;
  }
`;

const StickyHeader = styled.div`
  align-items: center;
  background: #000;
  color: var(--post-color-contrast);
  padding: 1em;
  line-height: 1.3;
  position: sticky;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;

  @media screen and (max-width: 700px) {
    .container {
      max-width: 100%;
      width: 97%;
    }
  }

  time {
    font-weight: 600;
    margin-left: 1em;
    padding: 0 1em;
    white-space: nowrap;
    position: relative;
    opacity: 0.85;
    display: none;

    @media screen and (min-width: 600px) {
      display: block;
    }

    &::before {
      display: block;
      content: '';
      border-left: 2px solid rgba(255, 255, 255, 0.85);
      border-left-color: var(--post-color-invert-30);
      opacity: 0.45;
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
    }
  }
`;

const StickyHeaderTitle = styled.div`
  flex: 1;
  display: block;
  align-items: center;
  font-size: 1em;
  font-weight: bold;
  margin: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  background: linear-gradient(
    to bottom,
    var(--post-color-plus-30) 0%,
    var(--post-color-plus-15) 70%,
    var(--post-color) 100%
  );

  @media (prefers-color-scheme: dark) {
    background: linear-gradient(
      to bottom,
      var(--post-color-invert-45) 0%,
      var(--post-color-invert-30) 70%,
      var(--post-color) 100%
    );
  }

  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Spacer = styled.div`
  padding: 1.5em;
`;

export default function PostHeader({
  title,
  coverImage,
  date,
  readingTime,
  author,
}) {
  return (
    <>
      <MainHeader>
        <CoverImage
          title={title}
          url={coverImage?.url}
          style={{ position: 'relative', zIndex: 2, marginBottom: '-4em' }}
          borderRadius={0}
        >
          <PostMainHeader>
            <PostTitle>{title}</PostTitle>
            <PostMetadata>
              <div>
                {author && (
                  <Avatar name={author.name} picture={author.picture} />
                )}
              </div>
              <div>
                {author.name && <AvatarName>{author.name}</AvatarName>}
                <div>
                  <Date dateString={date} />
                  {readingTime && (
                    <ReadingTime>{readingTime} min read</ReadingTime>
                  )}
                </div>
              </div>
            </PostMetadata>
          </PostMainHeader>
        </CoverImage>
        <GradientBorder />
      </MainHeader>
      <StickyHeader>
        <Container flex="row" style={{ alignItems: 'center' }}>
          <Avatar name={author.name} picture={author.picture} pictureSize={2} />
          <StickyHeaderTitle>{title}</StickyHeaderTitle>

          <Link href="/blog">
            <a
              css={css`
                color: #fff;
              `}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                css={css`
                  margin-right: 0.5em;
                `}
              >
                <defs />
                <path
                  fill="currentColor"
                  d="M16 8l-6-5v3C5.5 6 2 7 0 12c3-2.5 6-3 10-2v3l6-5zm0 0"
                />
              </svg>
              Blog
            </a>
          </Link>
        </Container>
      </StickyHeader>
      <Spacer />
    </>
  );
}

PostHeader.propTypes = {
  title: PropTypes.string,
  coverImage: PropTypes.shape({
    url: PropTypes.string,
  }),
  date: PropTypes.string,
  readingTime: PropTypes.number,
  author: PropTypes.shape({
    name: PropTypes.string,
    picture: PropTypes.shape({
      url: PropTypes.string,
    }),
  }),
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      slug: PropTypes.string,
    })
  ),
};
