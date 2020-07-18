import { solarizedlight } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { rem, em } from '../styles/units';
import styled from '@emotion/styled';
import { OutlineButton } from './button';
import { useCallback, useState } from 'react';

const CodeBlock = styled.div({
  fontSize: rem(1),
  position: 'relative',
});

const CodeActions = styled.div({
  position: 'absolute',
  bottom: em(1),
  right: em(1),
  fontSize: em(0.75),
});

export default function YoutubeVideo({ title, url }) {
  const youtubeURL = new URL(url);
  const videoID = youtubeURL?.searchParams?.get('v');

  if (!videoID) {
    return (
      <a href={url} target="_blank">
        Watch video: {title}
      </a>
    );
  }

  return (
    <iframe
      width="100%"
      height="500"
      src={`https://www.youtube.com/embed/${videoID}`}
      frameBorder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  );
}
