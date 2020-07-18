import React from 'react';
import useColorScheme from '../hooks/useColorScheme';
import styled from '@emotion/styled';
import {
  motion,
  useViewportScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { useRefScrollProgress } from '../hooks/useRefScrollProgress';
const SunContainer = styled.div`
  font-size: 5em;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
`;
const MoonContainer = styled.div`
  font-size: 5em;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  filter: grayscale(50%);
`;
export function SunOrMoon(props) {
  const mode = useColorScheme();

  if (mode === 'unset') {
    return null;
  } else if (mode === 'dark') {
    return <Moon {...props} />;
  }

  return <Sun {...props} />;
}
function Moon(props) {
  const shouldReduceMotion = useReducedMotion();

  const {
    ref,
    start: scrollPercentageStart,
    end: scrollPercentageEnd,
  } = useRefScrollProgress();

  const { scrollYProgress } = useViewportScroll();

  const scale = useTransform(
    scrollYProgress,
    [
      0,
      scrollPercentageStart,
      scrollPercentageEnd,
      scrollPercentageEnd + (scrollPercentageEnd - scrollPercentageStart),
      1,
    ],
    [0, 0.5, 2, 2, 0]
  );

  const y = useTransform(
    scrollYProgress,
    [0, scrollPercentageStart, scrollPercentageEnd],
    ['0%', '0%', '50%']
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, scrollPercentageEnd],
    [1, 0.3]
  );

  if (!scrollPercentageEnd) {
    return <MoonContainer ref={ref} />;
  }

  return (
    <MoonContainer ref={ref}>
      <motion.div
        style={{
          scale: shouldReduceMotion ? 5 : scale,
          y: shouldReduceMotion ? '120%' : y,
          opacity: shouldReduceMotion ? 0.35 : opacity,
        }}
      >
        <svg viewBox="0 0 495.14 495.14" {...props}>
          <circle cx={247.57} cy={247.57} fill="#fef0ae" r={247.57} />
          <path
            d="M148.37 247.57c0-110.884 72.914-204.738 173.399-236.259C298.348 3.964 273.416 0 247.57 0 110.84 0 0 110.84 0 247.57s110.84 247.57 247.57 247.57c25.846 0 50.785-3.966 74.207-11.314C221.292 452.306 148.37 358.454 148.37 247.57zM495.09 251.71h.01c-.58 35.83-8.78 69.81-23.04 100.39l-.02-.01c-19.11-7.74-32.59-26.46-32.59-48.35 0-28.8 23.35-52.15 52.15-52.15 1.17 0 2.33.05 3.49.12z"
            fill="#fee97d"
          />
          <path
            d="M247.57 456.33c21.57 0 39.7 14.77 44.8 34.76-14.53 2.66-29.5 4.05-44.8 4.05s-30.27-1.39-44.8-4.05c5.1-19.99 23.23-34.76 44.8-34.76z"
            fill="#fedf30"
          />
          <g fill="#fee97d">
            <path d="M307.32 345.89c16.67 0 30.19 13.52 30.19 30.19 0 16.68-13.52 30.19-30.19 30.19-16.68 0-30.2-13.51-30.2-30.19 0-16.67 13.52-30.19 30.2-30.19z" />
            <circle cx={362.06} cy={296.73} r={21.35} />
            <circle cx={316.08} cy={182.46} r={57.45} />
          </g>
          <circle cx={148.37} cy={296.27} fill="#fee45a" r={33.07} />
          <path
            d="M148.37 329.34a32.95 32.95 0 0012.923-2.623c-6.789-20.134-11.059-41.427-12.435-63.505-.163-.002-.324-.012-.488-.012-18.27 0-33.07 14.81-33.07 33.07s14.8 33.07 33.07 33.07zM86.99 191.57c11.15 0 20.19 9.04 20.19 20.18 0 11.15-9.04 20.19-20.19 20.19s-20.18-9.04-20.18-20.19c0-11.14 9.03-20.18 20.18-20.18zM173.32 11.34a99.138 99.138 0 013.45 25.95c0 54.63-44.29 98.92-98.93 98.92-16.4 0-31.87-4-45.49-11.06h-.01C62.99 71.37 113.22 30.2 173.32 11.33z"
            fill="#fedf30"
          />
        </svg>
      </motion.div>
    </MoonContainer>
  );
}
function Sun(props) {
  const shouldReduceMotion = useReducedMotion();

  const {
    ref,
    start: scrollPercentageStart,
    end: scrollPercentageEnd,
  } = useRefScrollProgress();

  const { scrollYProgress } = useViewportScroll();

  const scale = useTransform(
    scrollYProgress,
    [
      0,
      scrollPercentageStart,
      scrollPercentageEnd,
      scrollPercentageEnd + (scrollPercentageEnd - scrollPercentageStart),
      1,
    ],
    [0, 0.5, 15, 15, 0]
  );

  const y = useTransform(
    scrollYProgress,
    [0, scrollPercentageStart, scrollPercentageEnd],
    ['0%', '0%', '300%']
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, scrollPercentageEnd],
    [1, 0.35]
  );

  if (!scrollPercentageEnd) {
    return <SunContainer ref={ref} />;
  }

  return (
    <SunContainer ref={ref}>
      <motion.div
        style={{
          scale: shouldReduceMotion ? 5 : scale,
          y: shouldReduceMotion ? '120%' : y,
          opacity: shouldReduceMotion ? 0.35 : opacity,
        }}
      >
        <svg viewBox="0 0 512 512" {...props}>
          <circle cx={255.997} cy={255.997} r={144.824} fill="#ffd347" />
          <path
            fill="#ffd347"
            d="M256 56.849c-4.273 0-7.737-3.463-7.737-7.737V7.737C248.263 3.463 251.727 0 256 0s7.737 3.463 7.737 7.737v41.376C263.737 53.386 260.273 56.849 256 56.849zM152.563 84.568c-2.674 0-5.274-1.387-6.707-3.869l-20.687-35.832c-2.136-3.7-.869-8.432 2.832-10.569 3.701-2.134 8.432-.87 10.569 2.832l20.687 35.832c2.136 3.7.869 8.432-2.832 10.569C155.206 84.234 153.876 84.568 152.563 84.568zM76.823 160.294c-1.312 0-2.643-.334-3.861-1.038L37.13 138.569c-3.7-2.136-4.968-6.868-2.832-10.569 2.136-3.701 6.868-4.967 10.569-2.832l35.832 20.687c3.7 2.136 4.968 6.868 2.832 10.569C82.097 158.907 79.497 160.294 76.823 160.294zM49.112 263.737H7.737C3.464 263.737 0 260.274 0 256s3.464-7.737 7.737-7.737h41.376c4.273 0 7.737 3.463 7.737 7.737S53.385 263.737 49.112 263.737zM41.005 387.869c-2.674 0-5.274-1.387-6.707-3.869-2.136-3.7-.869-8.432 2.832-10.569l35.832-20.687c3.7-2.134 8.432-.87 10.569 2.832 2.136 3.7.869 8.432-2.832 10.569l-35.832 20.687C43.648 387.535 42.317 387.869 41.005 387.869zM131.862 478.74c-1.312 0-2.643-.334-3.861-1.038-3.7-2.136-4.968-6.868-2.832-10.569l20.687-35.832c2.136-3.701 6.868-4.967 10.569-2.832 3.7 2.136 4.968 6.868 2.832 10.569l-20.687 35.832C137.136 477.352 134.536 478.74 131.862 478.74zM256 512c-4.273 0-7.737-3.463-7.737-7.737v-41.376c0-4.274 3.464-7.737 7.737-7.737s7.737 3.463 7.737 7.737v41.376C263.737 508.537 260.273 512 256 512zM380.138 478.74c-2.674 0-5.274-1.387-6.707-3.869l-20.687-35.832c-2.136-3.7-.869-8.432 2.832-10.569 3.7-2.134 8.432-.87 10.569 2.832l20.687 35.832c2.136 3.7.869 8.432-2.832 10.569C382.781 478.406 381.451 478.74 380.138 478.74zM470.995 387.869c-1.312 0-2.643-.334-3.861-1.038l-35.832-20.687c-3.7-2.136-4.968-6.868-2.832-10.569 2.136-3.701 6.868-4.967 10.569-2.832l35.832 20.687c3.7 2.136 4.968 6.868 2.832 10.569C476.269 386.481 473.669 387.869 470.995 387.869zM504.263 263.737h-41.376c-4.273 0-7.737-3.463-7.737-7.737s3.464-7.737 7.737-7.737h41.376c4.273 0 7.737 3.463 7.737 7.737S508.536 263.737 504.263 263.737zM435.177 160.294c-2.674 0-5.274-1.387-6.707-3.869-2.136-3.7-.869-8.432 2.832-10.569l35.832-20.687c3.7-2.134 8.432-.87 10.569 2.832 2.136 3.7.869 8.432-2.832 10.569l-35.832 20.687C437.82 159.96 436.489 160.294 435.177 160.294zM359.437 84.568c-1.312 0-2.643-.334-3.861-1.038-3.7-2.136-4.968-6.868-2.832-10.569l20.687-35.832c2.136-3.701 6.868-4.967 10.569-2.832 3.7 2.136 4.968 6.868 2.832 10.569l-20.687 35.832C364.711 83.181 362.11 84.568 359.437 84.568z"
          />
          <path
            fill="#ffbe31"
            d="M256,111.18c-5.242,0-10.418,0.286-15.516,0.828c72.685,7.743,129.303,69.252,129.303,143.991 s-56.619,136.249-129.303,143.992c5.098,0.544,10.273,0.828,15.516,0.828c79.982,0,144.82-64.838,144.82-144.82 S335.983,111.18,256,111.18z"
          />
        </svg>
      </motion.div>
    </SunContainer>
  );
}
