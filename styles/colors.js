/* eslint-disable no-nested-ternary */
import hexToRGBA from 'hex-to-rgba';

export function changeColorBrightness(color, percent) {
  const num = parseInt(color.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const B = ((num >> 8) & 0x00ff) + amt;
  const G = (num & 0x0000ff) + amt;

  return `#${(
    0x1000000 +
    (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
    (B < 255 ? (B < 1 ? 0 : B) : 255) * 0x100 +
    (G < 255 ? (G < 1 ? 0 : G) : 255)
  )
    .toString(16)
    .slice(1)}`;
}

function rgbToYIQ({ r, g, b }) {
  return (r * 299 + g * 587 + b * 114) / 1000;
}
function hexToRgb(hex) {
  if (!hex || hex === undefined || hex === '') {
    return undefined;
  }

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  return result
    ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    }
    : undefined;
}

export function getColorContrast(colorHex, threshold = 128) {
  if (colorHex === undefined) {
    return '#000';
  }

  const rgb = hexToRgb(colorHex);

  if (rgb === undefined) {
    return '#000';
  }

  return rgbToYIQ(rgb) >= threshold ? '#000' : '#fff';
}

const ABSOLUTE_COLORS = {
  TRANSPARENT: 'rgba(255,255,255,0)',
  BLACK: '#000000',
  BLACK333: '#333',
  WHITE: '#FFFFFF',
  EGGSHELL_WHITE: '#edeae4',
  // red color
  ALICE_BLUE: '#D6EFFF',
  // light brown
  CHAMPAGNE: '#F0CEA0',
  // dark brown
  CAFE_NOIR: '#513C2C',
  CHARCOAL_BLUE: '#294c60',
  OXFORD_BLUE: '#001B2E',
  LIGHTER_GREY: '#eeeeee',
  LIGHT_GREY: '#cccccc',
  MEDIUM_GREY: '#999999',
  CAROLINA_BLUE: '#5199D5',
  ERROR_RED: '#cf563a',
  CERULEAN_CRAYOLA: '#06AED5',
  BLUE_SAPPHIRE: '#086788',
  JONQUIL: '#F0C808',
  MAXIMUM_RED: '#DD1C1A',
  PURPLE: '#7c18ab',
  PRINCETON_ORANGE: '#EA7317',
  PANTONE_GREEN: '#4DAA57',
};

export const TINT = {};
for (let i = 0; i < 100; i += 1) {
  TINT[i / 100] = hexToRGBA(ABSOLUTE_COLORS.WHITE, i / 100);
  TINT[i / 1000] = hexToRGBA(ABSOLUTE_COLORS.WHITE, i / 1000);
}

export const SHADE = {};
for (let i = 0; i < 100; i += 1) {
  SHADE[i / 100] = hexToRGBA(ABSOLUTE_COLORS.BLACK, i / 100);
  SHADE[i / 1000] = hexToRGBA(ABSOLUTE_COLORS.BLACK, i / 1000);
}

export const POST_COLORS = [
  ABSOLUTE_COLORS.CAROLINA_BLUE,
  ABSOLUTE_COLORS.CERULEAN_CRAYOLA,
  ABSOLUTE_COLORS.JONQUIL,
  ABSOLUTE_COLORS.MAXIMUM_RED,
  ABSOLUTE_COLORS.PRINCETON_ORANGE,
  ABSOLUTE_COLORS.PANTONE_GREEN,
];

export const UI_COLORS = {
  Link: ABSOLUTE_COLORS.CAROLINA_BLUE,
  LinkHover: changeColorBrightness(ABSOLUTE_COLORS.CAROLINA_BLUE, 10),
  LinkVisited: ABSOLUTE_COLORS.PURPLE,

  OutlineButton: ABSOLUTE_COLORS.TRANSPARENT,
  OutlineButtonHover: TINT[0.35],
  OutlineButtonFocus: ABSOLUTE_COLORS.CAROLINA_BLUE,

  PillButtonLightBackground: ABSOLUTE_COLORS.BLACK333,
  PillButtonLightColor: TINT[0.85],
  PillButtonLightHoverBackground: changeColorBrightness(
    ABSOLUTE_COLORS.BLACK333,
    -10
  ),

  PillButtonDarkBackground: ABSOLUTE_COLORS.LIGHTER_GREY,
  PillButtonDarkColor: SHADE[0.85],
  PillButtonDarkHoverBackground: changeColorBrightness(
    ABSOLUTE_COLORS.LIGHTER_GREY,
    -10
  ),

  ScrollDown: ABSOLUTE_COLORS.CERULEAN_CRAYOLA,

  COVER_IMAGE_BACKGROUND: ABSOLUTE_COLORS.BLACK,
  POST_STICKY_HEADER_BACKGROUND: ABSOLUTE_COLORS.BLACK,
  POST_STICKY_HEADER_TEXT: ABSOLUTE_COLORS.WHITE,
  POST_TEXT_QUOTE_COLOR: ABSOLUTE_COLORS.CAROLINA_BLUE,
  POST_STICKY_HEADER_DATE: ABSOLUTE_COLORS.CAROLINA_BLUE,
  POST_TEXT_H6_TEXT: ABSOLUTE_COLORS.CAROLINA_BLUE,
  POST_PREVIEW_FOCUS_SHADOW: hexToRGBA(ABSOLUTE_COLORS.CAROLINA_BLUE, 0.35),
  POST_PREVIEW_HIGHLIGHT_TEXT: ABSOLUTE_COLORS.WHITE,
  POST_BODY_TEXT: ABSOLUTE_COLORS.BLACK333,
};
