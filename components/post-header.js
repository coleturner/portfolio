import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '../components/avatar';
import Date from '../components/date';
import CoverImage from '../components/cover-image';
import PostTitle from '../components/post-title';
import styled from '@emotion/styled';
import { UI_COLORS, changeColorBrightness } from '../styles/colors';
import Container from './container';
import { useMemo } from 'react';
import { css } from '@emotion/react';

const PostMetadata = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 2em;
`;

const Spacer = styled.div`
  padding: 1em 2em;
`;

const StickyHeader = styled.div(
  ({ color, textColor, textShadowColor, darkenedColor }) =>
    css`
      align-items: center;
      background: ${color || UI_COLORS.POST_STICKY_HEADER_BACKGROUND};
      color: ${textColor || UI_COLORS.POST_STICKY_HEADER_TEXT};
      text-shadow: 0 1px 0 ${textShadowColor};
      padding: 1em;
      line-height: 1;
      border-bottom: 3px solid ${darkenedColor};

      position: sticky;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 1;

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
    `
);

const StickyHeaderTitle = styled.h3`
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

export default function PostHeader({ title, coverImage, date, author, color }) {
  const textColor = useMemo(() => changeColorBrightness(color, -70), [color]);
  const textShadowColor = useMemo(() => changeColorBrightness(color, 15), [
    color,
  ]);

  const darkenedColor = useMemo(
    () => color && changeColorBrightness(color, -30),
    [color]
  );

  return (
    <>
      <CoverImage
        title={title}
        url={coverImage.url}
        style={{ position: 'relative', zIndex: 2, marginBottom: '-4em' }}
        borderRadius={0}
        color={color}
      >
        <PostTitle color={color}>{title}</PostTitle>
        <PostMetadata>
          {author && <Avatar name={author.name} picture={author.picture} />}
          <Spacer />
          <Date dateString={date} />
        </PostMetadata>
      </CoverImage>
      <StickyHeader
        color={color}
        textColor={textColor}
        textShadowColor={textShadowColor}
        darkenedColor={darkenedColor}
      >
        <Container flex="row" style={{ alignItems: 'center' }}>
          <Avatar picture={author.picture} pictureSize={2} />
          <StickyHeaderTitle>{title}</StickyHeaderTitle>
          <Date dateString={date} />
        </Container>
      </StickyHeader>
    </>
  );
}

PostHeader.propTypes = {
  title: PropTypes.string,
  coverImage: PropTypes.shape({
    url: PropTypes.string,
  }),
  date: PropTypes.string,
  author: PropTypes.shape({
    name: PropTypes.string,
    picture: PropTypes.shape({
      url: PropTypes.string,
    }),
  }),
  color: PropTypes.string,
};
