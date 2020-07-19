import styled from '@emotion/styled';
import { SHADE, UI_COLORS, TINT } from '../styles/colors';
import { css } from 'emotion';

const BUTTON_STYLE_TRANSPARENT = {
  border: 0,
  background: 'transparent',
  padding: 0,
  margin: 0,
  fontWeight: 600,
  color: SHADE[0.5],
  cursor: 'pointer',
};

export const TransparentButton = styled.button(BUTTON_STYLE_TRANSPARENT);

export const OutlineButton = styled.button`
  border: 0;
  background: transparent;
  padding: 0;
  margin: 0;
  font-weight: 600;
  color: ${SHADE[0.5]};
  cursor: pointer;
  background-color: ${UI_COLORS.OutlineButton};
  padding: 0.5em 1em;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 1em;
  outline: none;

  &:hover {
    background-color: ${UI_COLORS.OutlineButtonHover};
    color: inherit;
  }

  &:focus {
    box-shadow: 0 0 5px ${UI_COLORS.OutlineButtonFocus};
    border-color: ${UI_COLORS.OutlineButtonFocus};
    color: ${UI_COLORS.OutlineButtonFocus};
  }

  @media screen and (prefers-color-scheme: dark) {
    color: ${TINT[0.5]};
    border-color: rgba(255, 255, 255, 0.2);
  }
`;

export const PillButton = styled.button(
  ({ colorScheme = 'light' }) => css`
    --light-background: ${UI_COLORS.PillButtonLightBackground};
    --light-color: ${UI_COLORS.PillButtonLightColor};
    --light-hover-background: ${UI_COLORS.PillButtonLightHoverBackground};
    --dark-background: ${UI_COLORS.PillButtonDarkBackground};
    --dark-color: ${UI_COLORS.PillButtonDarkColor};
    --dark-hover-background: ${UI_COLORS.PillButtonDarkHoverBackground};
    border: 0;
    background: transparent;
    padding: 0;
    margin: 0;
    font-weight: 600;
    cursor: pointer;
    padding: 0.5em 1em;
    border-radius: 1em;
    border: 0;
    text-decoration: none;
    background-color: ${UI_COLORS.PillButtonLightBackground};
    color: ${UI_COLORS.PillButtonLightColor};
    background-color: var(--${colorScheme}-background);
    color: var(--${colorScheme}-color);

    &:hover {
      background-color: ${UI_COLORS.PillButtonLightHoverBackground};
      background-color: var(--${colorScheme}-hover-background);
      color: initial;
    }

    svg {
      margin-right: 0.5em;
    }

    @media screen and (prefers-color-scheme: dark) {
      background-color: var(--dark-background);
      color: var(--dark-color);

      &:hover {
        background-color: var(--dark-hover-background);
      }
    }
  `
);