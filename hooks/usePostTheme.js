import { useMemo } from 'react';
import {
  invertColor,
  rgbToYIQ,
  hexToRgb,
  changeColorBrightness,
} from '../styles/colors';

export default function usePostTheme(color, intensity = 0) {
  const invertedColor = useMemo(() => {
    return invertColor(color);
  }, [color]);
  const invertedColorYIQ = useMemo(() => {
    return rgbToYIQ(hexToRgb(invertedColor));
  }, [invertedColor]);

  const complementaryColorLight = useMemo(() => {
    const threshold = 128 - intensity;
    return changeColorBrightness(
      invertedColor,
      Math.min(invertedColorYIQ, threshold) -
        Math.max(invertedColorYIQ, threshold)
    );
  }, [invertedColor, invertedColorYIQ]);

  const complementaryColorDark = useMemo(() => {
    const threshold = 128 + intensity;
    return changeColorBrightness(
      invertedColor,
      Math.max(invertedColorYIQ, threshold) -
        Math.min(invertedColorYIQ, threshold)
    );
  }, [invertedColor, invertedColorYIQ]);

  return { color, complementaryColorDark, complementaryColorLight };
}
