import styled from '@emotion/styled';
import { UI_COLORS } from 'styles/colors';
const Quote = styled.blockquote`
  background: linear-gradient(
    to right,
    var(--post-color-0_3) 0%,
    var(--post-color-0_15) 25%,
    var(--post-color-0_0) 100%
  );
  border-left: 6px solid ${UI_COLORS.POST_TEXT_QUOTE_COLOR};
  border-left-color: var(--post-color, ${UI_COLORS.POST_TEXT_QUOTE_COLOR});
  padding: 1em;
  margin: 2em 0;
  position: relative;

  @media screen and (min-width: 700px) {
    padding: 1em 2em;
  }

  p {
    font-size: 1em;
    font-style: normal;
    white-space: pre-line;

    &:first-child {
      margin-top: 0;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  a {
    color: var(--post-color);
  }
`;

export default Quote;
