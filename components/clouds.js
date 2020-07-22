import React from 'react';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { keyframes } from '@emotion/react';
import { useReducedMotion } from 'framer-motion';
const CLOUD_MOVE = keyframes`
   0% {
      transform: translateX(-100%);
      transform: translateX(-100%) scale(var(--transformScaleX), var(--transformScaleY)) translateY(var(--transformTranslateY));
   }

   100% {
      transform: translateX(120vw);
      transform: translateX(120vw) scale(var(--transformScaleX), var(--transformScaleY)) translateY(var(--transformTranslateY));
      opacity: 0;
   }
}`;
const CloudsContainer = styled.div`
  position: absolute;
  z-index: -1;
  top: 50%;
  left: 0;
  right: 0;
  font-size: 2em;
  user-select: none;
  pointer-events: none;

  svg {
    position: absolute;
    left: 0%;
    animation: ${CLOUD_MOVE} 30s infinite ease-in;
  }
`;
const getRandomFlip = () => {
  return Math.random() > 0.5 ? -1 : 1;
};
const getRandomAnimationDelay = (scale = 15) => {
  return Math.floor(Math.random() * scale) + 1;
};
const getRandomAnimationDuration = () => {
  return Math.floor(Math.random() * 15) + 15;
};
const getRandomScale = () => {
  return Math.floor(Math.random() * 3) + Math.random();
};
const getRandomTranslateY = () => {
  return (
    100 * (Math.floor(Math.random() * 2) + 1) * (Math.random() > 0.5 ? -1 : 1)
  );
};
function RandomCloud(props) {
  const shouldReduceMotion = useReducedMotion();

  const [tick, setTick] = useState(0);
  const [flip, setFlip] = useState(() => getRandomFlip());

  const [animationDelay, setAnimationDelay] = useState(() =>
    getRandomAnimationDelay(5)
  );

  const [animationDuration, setAnimationDuration] = useState(() =>
    getRandomAnimationDuration()
  );

  const [scale, setScale] = useState(() => getRandomScale());

  const [translateY, setTranslateY] = useState(() => getRandomTranslateY());

  const randomize = () => {
    setTick(tick + 1);
    setFlip(getRandomFlip());
    setAnimationDelay(getRandomAnimationDelay());
    setAnimationDuration(getRandomAnimationDuration());
    setScale(getRandomScale());
    setTranslateY(getRandomTranslateY());
  };

  const path = (
    <path
      fill="#a3d4f7"
      d="m375.835938 112.957031c-5.851563 0-11.691407.582031-17.425782 1.742188-4.324218-21.582031-18.304687-39.992188-37.933594-49.957031-19.625-9.964844-42.738281-10.382813-62.714843-1.136719-18.078125-49.796875-73.101563-75.507813-122.898438-57.429688s-75.507812 73.105469-57.429687 122.898438c-43.621094 1.378906-78.078125 37.484375-77.4257815 81.121093.6562495 43.640626 36.1835935 78.691407 79.8281255 78.761719h296c48.597656 0 88-39.398437 88-88 0-48.601562-39.402344-88-88-88zm0 0"
    />
  );

  if (shouldReduceMotion) {
    return (
      <svg
        viewBox="0 -87 463.834 463"
        {...props}
        style={{
          transform: `translateX(${
            Math.floor(Math.random() * 100) + 1
          }vw) translateY(${translateY}%) scaleX(${
            scale * flip
          }) scaleY(${scale})`,
          animation: 'none',

          opacity: Math.max(0.5, Math.random() + 0.15),
          filter: `grayscale(${Math.random()})`,
        }}
      >
        {path}
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 -87 463.834 463"
      {...props}
      style={{
        '--transformScaleX': scale * flip,
        '--transformScaleY': scale,
        '--transformTranslateY': translateY + '%',
        transform: 'translateX(-100%)',
        animationDelay: `${tick === 0 ? animationDelay * -1 : animationDelay}s`,
        animationDuration: `${animationDuration}s`,

        opacity: Math.min(0.45, Math.random()),
        filter: `grayscale(${Math.random()})`,
      }}
      onAnimationEnd={() => randomize()}
    >
      {path}
    </svg>
  );
}
export function Clouds() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  });

  // useReducedMotion is not happy with SSR
  if (!isClient) {
    return null;
  }

  return (
    <CloudsContainer>
      <RandomCloud />
      <RandomCloud />
      <RandomCloud />
      <RandomCloud />
      <RandomCloud />
      <RandomCloud />
      <RandomCloud />
      <RandomCloud />
      <RandomCloud />
      <RandomCloud />
      <RandomCloud />
      <RandomCloud />
    </CloudsContainer>
  );
}
