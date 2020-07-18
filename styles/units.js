import { flatten } from 'lodash';

export function composeUnit(unit) {
  return function unitFunction(...numbers) {
    const figures = numbers.map((number) =>
      number === 0 ? '0' : `${number}${unit}`
    );
    return flatten(figures).join(' ');
  };
}

export const percent = composeUnit('%');
export const px = composeUnit('px');
export const em = composeUnit('em');
export const rem = composeUnit('rem');
export const vw = composeUnit('vw');
export const vh = composeUnit('vh');
