import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'components/avatar';
import Date from 'components/date';
import CoverImage from 'components/cover-image';
import PostTitle from 'components/post-title';
import styled from '@emotion/styled';
import { UI_COLORS } from 'styles/colors';
import Container from 'components/container';

const MainHeader = styled.div`
  background: #000;
  position: relative;
  z-index: 2;
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
  background: ${UI_COLORS.POST_STICKY_HEADER_BACKGROUND};
  background: var(--post-color, ${UI_COLORS.POST_STICKY_HEADER_BACKGROUND});
  color: ${UI_COLORS.POST_STICKY_HEADER_TEXT};
  color: var(--post-color-contrast, ${UI_COLORS.POST_STICKY_HEADER_TEXT});
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.15);
  text-shadow: 0 1px 0
    var(--post-color-contrast-shadow-0_45, rgba(255, 255, 255, 0.15));
  padding: 1em;
  line-height: 1;
  border-bottom: 3px solid rgba(0, 0, 0, 0.3);
  border-bottom: 3px solid var(--post-color-minus-30, rgba(0, 0, 0, 0.3));

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
      border-left: 3px solid currentColor;
      opacity: 0.45;
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
    }
  }
`;

const StickyHeaderTitle = styled.div`
  display: block;
  align-items: center;
  font-size: 1em;
  font-weight: bold;
  margin: 0;
  line-height: inherit;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
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
      </MainHeader>
      <StickyHeader>
        <Container flex="row" style={{ alignItems: 'center' }}>
          <Avatar name={author.name} picture={author.picture} pictureSize={2} />
          <StickyHeaderTitle>{title}</StickyHeaderTitle>
          <Date dateString={date} />
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
