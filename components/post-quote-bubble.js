import styled from '@emotion/styled';
import { UI_COLORS, getColorContrast } from 'styles/colors';
import { css } from 'emotion';

const QuoteBubble = styled.blockquote(({ color }) => {
  const bubbleColor = color || UI_COLORS.POST_TEXT_QUOTE_COLOR;

  return css`
    margin: 1em 0;
    border-radius: 1em;
    font-size: 1em;
    font-style: italic;
    padding: 1em 2em;
    margin-bottom: 0.5em;
    background-color: ${UI_COLORS.POST_TEXT_QUOTE_COLOR};
    background-color: var(--post-color, ${UI_COLORS.POST_TEXT_QUOTE_COLOR});
    color: ${getColorContrast(bubbleColor)};
    color: var(--post-color-contrast, ${getColorContrast(bubbleColor)});
    position: relative;

    @media screen and (min-width: 700px) {
      margin: 1em 3em;
    }

    &::before,
    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      height: 30px;
    }

    &::before {
      left: -7px;
      border-left: 20px solid ${UI_COLORS.POST_TEXT_QUOTE_COLOR};
      border-color: var(--post-color, ${UI_COLORS.POST_TEXT_QUOTE_COLOR});
      border-bottom-right-radius: 16px 14px;
      transform: translate(0, -2px);
    }

    &::after {
      left: 4px;
      width: 26px;
      background: white;
      background: var(--page-background-color);

      border-bottom-right-radius: 10px;
      transform: translate(-30px, -2px);
    }
  `;
});

QuoteBubble.shouldBreakP = true;

export default QuoteBubble;
