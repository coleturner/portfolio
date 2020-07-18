import Avatar from '../components/avatar';
import Date from '../components/date';
import CoverImage from '../components/cover-image';
import PostTitle from '../components/post-title';
import styled from '@emotion/styled';
import { getColorContrast } from '../styles/colors';
import { em } from '../styles/units';
import {
  UI_COLORS,
  TINT,
  POST_COLORS,
  changeColorBrightness,
} from '../styles/colors';
import Container from './container';
import { generateIndexHash } from '../lib/hash';
import { useMemo } from 'react';

const PostHeaderContainer = styled.div`
  --cover-image-background-position: top center;
`;

const PostMetadata = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: em(2),
});

const Spacer = styled.div({
  padding: em(1, 2),
});

const StickyHeader = styled.div(
  ({ color, textColor, textShadowColor, darkenedColor }) => ({
    alignItems: 'center',

    background: color || UI_COLORS.POST_STICKY_HEADER_BACKGROUND,
    color: textColor || UI_COLORS.POST_STICKY_HEADER_TEXT,
    textShadow: `0 1px 0 ${textShadowColor}`,
    padding: em(1),
    lineHeight: 1,
    borderBottom: '3px solid ' + darkenedColor,

    position: 'sticky',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,

    time: {
      display: 'block',
      fontWeight: 600,
      marginLeft: '1em',
      padding: em(0, 1),
      whiteSpace: 'nowrap',
      position: 'relative',
      opacity: 0.85,

      '&::before': {
        display: 'block',
        content: '""',
        borderLeft: '3px solid currentColor',
        opacity: 0.45,
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
      },
    },
  })
);

const StickyHeaderTitle = styled.h3({
  display: 'block',
  alignItems: 'center',
  fontSize: em(1),
  fontWeight: 'bold',
  margin: 0,
  lineHeight: 'inherit',

  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
});

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
    <PostHeaderContainer>
      <CoverImage
        title={title}
        url={coverImage.url}
        style={{ position: 'relative', zIndex: 2, marginBottom: em(-4) }}
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
    </PostHeaderContainer>
  );
}
