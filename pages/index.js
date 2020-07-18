// todo:
// buy a license: https://www.flaticon.com/profile/preagreement/getstarted
// then download icons and save licenses

// https://www.flaticon.com/free-icon/startup_1067357?term=ship&page=1&position=10
// https://www.flaticon.com/free-icon/cloud_1163624?term=cloud&page=1&position=6
// https://www.flaticon.com/free-icon/sun_869869?term=sun&page=1&position=3
// https://www.flaticon.com/free-icon/medal_2972196
// https://www.flaticon.com/free-icon/certificate_2912780?term=diploma&page=1&position=7
//https://www.flaticon.com/free-icon/moon_2949009?term=moon&page=1&position=3
// https://www.flaticon.com/free-icon/up-arrow_992703?term=arrow%20up&page=1&position=10

import { debounce } from 'lodash';
import useColorScheme from '../hooks/useColorScheme';
import Container from '../components/container';
import MoreStories from '../components/stories-list';
import Header from '../components/header';
import Layout from '../components/layout';
import { getLatestPostsForHome } from '../lib/api';
import Head from 'next/head';
import { em, percent } from '../styles/units';
import styled from '@emotion/styled';

import {
  useRef,
  useCallback,
  useEffect,
  useState,
  useLayoutEffect,
} from 'react';
import AnimatedPortrait from '../components/animatedPortrait';
import { PillButton } from '../components/button';
import Typist from 'react-typist';
import { UI_COLORS } from '../styles/colors';
import { keyframes } from '@emotion/react';
import { useInViewport } from 'react-in-viewport';

import {
  motion,
  useViewportScroll,
  useElementScroll,
  useTransform,
  useMotionValue,
  useReducedMotion,
} from 'framer-motion';
import AppFooter from '../components/footer';
import Link from 'next/link';
import Router from 'next/router';

const CardList = styled.div`
  max-width: 100%;
  overflow: hidden;
`;

const Card = styled.div(`
  display: grid;
  place-items: center;
  font-size: 2em;
  min-height: 100%;
  text-align: center;
  width: 100%;
  position: relative;
  z-index: 1;
  min-height: 100vh;

  .paypal-link {
    color: #003087;

    @media (prefers-color-scheme: dark) {
      color: #0079C1;
    }
  }
`);

const CardContent = styled.div(`
  width: 100%;
`);

const CardText = styled.div(`
  margin: 0 auto;
  max-width: 700px;
  max-width: 60ch;
  width: 91%;
`);

const Title = styled.h1({
  margin: 0,
  letterSpacing: '-0.06em',
  marginTop: '0.5em',
});

const Navigation = styled.nav({
  margin: 0,
  letterSpacing: '-0.03em',
  listStyle: 'none',
  display: 'flex',
  flexDirection: 'row',
  margin: 0,
  padding: 0,
  textAlign: 'center',
});

const NavItem = styled.a({
  margin: '0 0.45em',
  color: 'inherit',
  textDecoration: 'none',
});

const Introduction = styled.div`
  width: 91%;
  max-width: 70ch;
  margin: 0 auto;
  opacity: 0.85;
`;

function Typewriter({ text }) {
  const shouldReduceMotion = useReducedMotion();
  const parts = text.split(/(?=👉|👈)/gm);

  let backspaceLength = 0;

  if (shouldReduceMotion) {
    return text.replace(/👉.*(?=👈|👉)👈|👉/gm, '');
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <Typist cursor={{ hideWhenDone: true, hideWhenDoneDelay: 0 }}>
        {parts.map((part, index) => {
          let shouldSetBackspaceLength = false;
          let shouldBackspace = false;

          if (part.startsWith('👉') || part.startsWith('👈')) {
            shouldSetBackspaceLength = true;

            if (part.startsWith('👈')) {
              shouldBackspace = true;
            }

            part = part.replace(/^👉|👈/, '');
          }

          const render = [];

          if (shouldBackspace) {
            render.push(
              <Typist.Backspace
                key={'backspace' + index}
                count={backspaceLength}
                delay={200}
              />
            );
          }

          if (shouldSetBackspaceLength) {
            backspaceLength = part.length;
          }

          render.push(<span key={index}>{part}</span>);

          return render;
        })}
      </Typist>
    </div>
  );
}

const BOUNCE_DOWN = keyframes`
   0%, 100% {
     opacity: 0.5;
      transform: translateY(0);
   }

   50% {
      opacity: 1;
      transform: translateY(10%);
   }
}`;

const ScrollDownContainer = styled.div`
  font-size: 1rem;
  color: ${UI_COLORS.ScrollDown};
  cursor: pointer;
  position: relative;
  width: 100%;

  a {
    display: none;
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    text-decoration: none;

    &:hover {
      font-weight: bold;
    }
  }

  &:hover a {
    display: block;
  }

  .page-down {
    background: transparent;
    border: 0;
    padding: 0;
    margin: 0;
    color: inherit;
    font-size: 3em;
    animation: ${BOUNCE_DOWN} 1s infinite;
    cursor: pointer;

    @media (prefers-reduced-motion: reduce) {
      animation: none;

      &::before {
        content: 'Scroll Down';
        font-size: 1rem;
      }
    }
  }
`;

function ScrollDown(props) {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useViewportScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  const scrollPastThis = useCallback((e) => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    const rect = e.currentTarget.getBoundingClientRect();
    const top = Math.round(scrollTop + rect.top + rect.height);

    window.scroll({
      top,
      left: 0,
      behavior: shouldReduceMotion ? 'auto' : 'smooth',
    });
  }, []);

  const skipIntro = () => {};

  return (
    <ScrollDownContainer>
      <motion.div
        style={{
          opacity,
        }}
      >
        <button
          className="page-down"
          title="Jump to main content"
          onClick={scrollPastThis}
          onKeyDown={scrollPastThis}
        >
          <svg viewBox="0 0 1792 1792" {...props}>
            <path d="M1408 704q0 26-19 45l-448 448q-19 19-45 19t-45-19L403 749q-19-19-19-45t19-45 45-19h896q26 0 45 19t19 45z" />
          </svg>
        </button>
      </motion.div>
    </ScrollDownContainer>
  );
}

const WAVE_ROCK = keyframes`
  0%, 100% {
    transform: translateX(0%) translateY(0%) scaleY(0.2);
  }

  25% {
    transform: translateX(10%) translateY(-0.25em) scaleY(0.3); 
  }

  75% {
    transform: translateX(-10%) translateY(0%) scaleY(0.3);
  }

`;

const WavesContainer = styled.div`
  position: absolute;
  width: 100%;
  overflow: hidden;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  .wave {
    position: absolute;
    left: -20%;
    right: -20%;
    bottom: 2em;
    width: 140%;

    svg {
      width: 100%;
      max-width: none;
      display: block;
      height: auto;
      transform-origin: bottom center;
      transform: translateX(0%) translateY(0%) scaleY(0.2);
      animation: ${WAVE_ROCK} 10s infinite linear;
      animation-fill-mode: backwards;

      @media (prefers-reduced-motion: reduce) {
        animation: 30s;
      }
    }

    &:nth-child(2) svg {
      animation-delay: -2.5s;
    }

    &:nth-child(3) svg {
      animation-delay: -5s;
    }

    @media (prefers-color-scheme: dark) {
      &:nth-child(1) svg path {
        fill: #02144d;
      }

      &:nth-child(2) svg path {
        fill: #01081f;
      }

      &:nth-child(3) svg path {
        fill: #030f36;
      }
    }
  }
`;

function Waves(props) {
  const ref = useRef();
  const { inViewport } = useInViewport(ref, undefined, undefined, props);

  const animationPlayState = inViewport ? 'running' : 'paused';

  return (
    <WavesContainer ref={ref}>
      <div className="wave">
        <svg viewBox="0 0 1440 285" style={{ animationPlayState }}>
          <path
            fill="#a2d9ff"
            d="M0 29l48 10.7C96 50 192 72 288 98.3c96 26.7 192 58.7 288 37.4C672 114 768 40 864 13s192-5 288 16 192 43 240 53.3l48 10.7v192H0V29z"
          />
        </svg>
      </div>

      <div className="wave">
        <svg viewBox="0 0 1440 272" style={{ animationPlayState }}>
          <path
            fill="#66bfff"
            d="M0 160l48 5.3c48 5.7 144 15.7 240-16C384 117 480 43 576 53.3 672 64 768 160 864 170.7 960 181 1056 107 1152 64s192-53 240-58.7l48-5.3v288H0V160z"
          />
        </svg>
      </div>

      <div className="wave">
        <svg viewBox="0 0 1440 132" style={{ animationPlayState }}>
          <path
            fill="#09F"
            d="M0 32l48 5.3C96 43 192 53 288 42.7 384 32 480 0 576 0s192 32 288 53.3c96 21.7 192 31.7 288 32 96-.3 192-10.3 240-16l48-5.3v128H0V32z"
          />
        </svg>
      </div>
    </WavesContainer>
  );
}

const ROCKET_MOVEMENT = keyframes`
   0% {
      transform: translateX(0vw);
      opacity: 0;
   }

   5% {
     opacity: 0.2;
   }

   10% {
     transform: translate(10vw, -20vh) rotate(-20deg);
     opacity: 1;
   }

   40% {
    opacity: 0.5;
   }

    50% {
      transform: translate(100vw, -80vh);
      opacity: 0;
    }

    100% {
      transform: translate(100vw, -80vh);
      opacity: 0;
    }
}`;

const ROCKET_TRAIL = keyframes`
   0% {
      transform: translate(10%, -10%);
      opacity: 1;
   }

   100% {
    transform: translate(-20%, 20%);
    opacity: 0;
   }
}`;

const RocketShipContainer = styled.div`
  font-size: 3em;
  position: absolute;
  z-index: -1;
  right: 100%;
  bottom: 0%;
  animation: ${ROCKET_MOVEMENT} 15s infinite ease-in;
  overflow: hidden;

  .trail {
    animation: ${ROCKET_TRAIL} 300ms infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transform: translate(75vw, -75vh);
    opacity: 0.65;

    .trail {
      animation: none;
    }
  }

  @media (prefers-color-scheme: dark) {
    svg {
      opacity: 0.35;
    }
    .frame {
      fill: transparent;
    }
  }
`;

function RocketShip(props) {
  const ref = useRef();
  const { inViewport } = useInViewport(ref, undefined, undefined, props);

  const animationPlayState = inViewport ? 'running' : 'paused';

  return (
    <RocketShipContainer ref={ref} style={{ animationPlayState }}>
      <svg viewBox="0 0 512.001 512.001" {...props}>
        <path
          style={{
            fill: '#FF5249',
          }}
          d="M501.752,10.001c0,0-1.93,53.83-24.3,117.12l-92.82-92.82 C447.922,11.931,501.752,10.001,501.752,10.001z"
        />
        <path
          style={{
            fill: '#FFFFFF',
          }}
          d="M384.632,34.301l92.82,92.82c-14.54,41.18-37.75,86.36-74.69,123.3 c-34.041,34.041-74.993,61.29-117.81,80.18l-103.8-103.8c12.64-28.65,30.28-59.22,53.59-88.17c8.16-10.13,17.01-20.06,26.59-29.64 C298.272,72.051,343.452,48.841,384.632,34.301z"
        />
        <path
          style={{
            fill: '#7BD8E8',
          }}
          d="M388.612,123.141c15.62,15.62,15.62,40.95,0,56.57s-40.94,15.62-56.57,0 c-15.62-15.63-15.62-40.95,0-56.57S372.992,107.521,388.612,123.141z"
        />
        <g>
          <path
            style={{
              fill: '#FF5249',
            }}
            d="M374.472,278.701c51.54,77.31-44.94,127.28-98.99,127.28c28.28-28.28,20.02-64.83,20.02-64.83 l-10.55-10.55c28.65-12.64,59.22-30.28,88.17-53.59L374.472,278.701z"
          />
          <path
            style={{
              fill: '#FF5249',
            }}
            d="M169.532,300.041l-1.62-1.62c-4.78-4.79-7.13-11.73-5.45-18.29c4.17-16.24,10.33-34.36,18.69-53.33 l103.8,103.8c-18.97,8.36-37.09,14.52-53.33,18.69c-6.56,1.68-13.5-0.67-18.29-5.45l-1.62-1.62L169.532,300.041z"
          />
          <path
            style={{
              fill: '#FF5249',
            }}
            d="M233.052,137.281l1.69,1.35c-23.31,28.95-40.95,59.52-53.59,88.17l-10.55-10.55 c0,0-36.55-8.26-64.83,20.02C105.772,182.221,155.742,85.741,233.052,137.281z"
          />
        </g>
        <path
          style={{
            fill: '#FFDD78',
          }}
          d="M169.532,300.041l42.18,42.18c-3.03,11.99-10.22,24.61-21.09,35.48 c-23.43,23.43-84.85,28.28-84.85,28.28s4.85-61.42,28.28-84.85C144.922,310.261,157.542,303.071,169.532,300.041z"
        />
        <path d="M268.662,257.491c3.9-3.91,3.9-10.24,0-14.14c-3.91-3.91-10.24-3.91-14.15,0c-3.9,3.9-3.9,10.23,0,14.14 C258.422,261.391,264.752,261.391,268.662,257.491z" />
        <path d="M395.933,186.782c19.538-19.538,19.542-51.171,0-70.712c-19.54-19.539-51.172-19.54-70.713,0 c-19.489,19.489-19.49,51.209,0.003,70.714C344.719,206.268,376.439,206.276,395.933,186.782z M339.363,130.212 c11.723-11.723,30.703-11.725,42.428,0c11.723,11.722,11.725,30.703,0,42.427c-11.693,11.694-30.727,11.694-42.426,0.002 C327.67,160.939,327.669,141.905,339.363,130.212z" />
        <path
          className="frame"
          d="M102.194,245.509c1.237,0.513,2.537,0.762,3.825,0.762c2.603,0,5.16-1.017,7.073-2.929 c20.083-20.083,44.854-18.827,52.946-17.763l3.502,3.502c-6.892,16.4-12.444,32.708-16.516,48.569 c-1.47,5.74-0.974,11.814,1.211,17.37c-9.628,4.437-18.917,10.952-27.005,19.04c-25.741,25.742-30.968,88.476-31.178,91.134 c-0.23,2.917,0.828,5.789,2.897,7.858c1.883,1.882,4.43,2.929,7.07,2.929c0.262,0,0.525-0.01,0.788-0.031 c2.658-0.209,65.394-5.436,91.135-31.177c8.085-8.085,14.599-17.373,19.036-26.999c5.882,2.313,11.936,2.598,17.38,1.203 c15.854-4.071,32.16-9.621,48.562-16.514l3.502,3.502c1.063,8.093,2.319,32.864-17.763,52.945c-2.859,2.86-3.715,7.161-2.167,10.897 c1.547,3.737,5.193,6.173,9.238,6.173c39.58,0,94.915-23.571,115.295-61.652c8.851-16.537,14.877-42.699-4.341-75.348 c8.147-6.886,15.994-14.086,23.396-21.488c33.02-33.02,58.942-75.763,77.048-127.039c22.62-63.998,24.783-117.834,24.864-120.094 c0.1-2.775-0.959-5.466-2.922-7.43c-1.964-1.963-4.644-3.027-7.43-2.922c-2.261,0.081-56.096,2.245-120.091,24.864 c-51.28,18.106-94.023,44.029-127.042,77.049c-7.399,7.399-14.599,15.245-21.488,23.396c-32.648-19.218-58.81-13.192-75.349-4.341 c-38.081,20.38-61.652,75.716-61.652,115.296C96.021,240.315,98.458,243.962,102.194,245.509z M183.8,370.63 c-13.75,13.75-46.005,21.002-66.392,23.963c2.962-20.388,10.215-52.642,23.964-66.391c7.7-7.7,16.628-13.538,25.602-16.826 l33.652,33.652C197.338,354.002,191.501,362.93,183.8,370.63z M229.39,339.603c-2.894,0.741-6.246-0.347-8.738-2.835 c-48.541-48.54,13.77,13.771-45.412-45.412c-2.494-2.499-3.582-5.85-2.843-8.739c3.203-12.474,7.392-25.272,12.486-38.193 l82.695,82.695C254.655,332.214,241.859,336.402,229.39,339.603z M373.394,344.891c-13.102,24.479-46.09,42.523-76.152,48.734 c9.585-18.037,11.698-40.998,8.196-54.921c-0.813-3.234-2.923-4.86-3.041-5.051c24.233-11.737,47.182-25.818,68.486-42.015 C381.29,310.652,382.147,328.535,373.394,344.891z M473.311,108.587l-69.896-69.896c38.081-11.828,71.21-16.257,87.746-17.849 C489.568,37.381,485.138,70.51,473.311,108.587z M268.653,116.062c29.625-29.626,67.859-53.204,113.671-70.176l83.792,83.792 c-16.97,45.811-40.548,84.045-70.176,113.672c-9.011,9.01-18.714,17.715-28.84,25.872c-24.342,19.6-51.134,36.202-79.718,49.418 l-94.02-94.018c13.216-28.586,29.818-55.378,49.416-79.717C250.942,134.772,259.646,125.068,268.653,116.062z M167.111,138.608 c16.359-8.754,34.24-7.896,53.252,2.511c-16.197,21.302-30.278,44.252-42.015,68.487c-0.149-0.092-1.949-2.355-5.293-3.109 c-1.375-0.311-27.834-6.002-54.679,8.265C124.588,184.699,142.631,151.71,167.111,138.608z"
        />
        <path d="M296.943,229.202l14.14-14.14c3.905-3.905,3.905-10.237,0-14.143c-3.906-3.905-10.236-3.905-14.143,0l-14.14,14.14 c-3.905,3.905-3.905,10.237,0,14.143C286.706,233.107,293.037,233.107,296.943,229.202z" />

        <path
          className="trail"
          style={{ animationDelay: '100ms', animationPlayState }}
          d="M212.093,455.481l28.28-28.29c3.904-3.906,3.903-10.238-0.002-14.142c-3.907-3.905-10.239-3.903-14.143,0.002l-28.28,28.29 c-3.904,3.906-3.903,10.238,0.002,14.142C201.857,459.387,208.189,459.387,212.093,455.481z"
        />
        <path
          className="trail"
          style={{ animationDelay: '100ms', animationPlayState }}
          d="M70.661,314.053l28.29-28.28c3.906-3.904,3.907-10.236,0.003-14.142s-10.235-3.906-14.142-0.002l-28.29,28.28 c-3.906,3.904-3.907,10.236-0.003,14.142C60.422,317.955,66.753,317.959,70.661,314.053z"
        />
        <path
          className="trail"
          style={{ animationDelay: '50ms', animationPlayState }}
          d="M155.521,427.199l-67.74,67.73c-3.906,3.905-3.906,10.237-0.001,14.142c3.903,3.905,10.236,3.907,14.142,0.001l67.74-67.73 c3.906-3.905,3.906-10.237,0.001-14.142C165.76,423.295,159.427,423.295,155.521,427.199z"
        />
        <path
          className="trail"
          d="M75.521,427.199l-67.74,67.73c-3.906,3.905-3.906,10.237-0.001,14.142c3.903,3.905,10.236,3.907,14.142,0.001l67.74-67.73 c3.906-3.905,3.906-10.237,0.001-14.142C85.759,423.295,79.426,423.295,75.521,427.199z"
        />
        <path
          className="trail"
          style={{ animationDelay: '50ms', animationPlayState }}
          d="M17.073,424.221l67.73-67.74c3.905-3.906,3.905-10.237-0.001-14.143c-3.904-3.904-10.237-3.904-14.142,0.001l-67.73,67.74 c-3.905,3.906-3.905,10.237,0.001,14.143C6.836,428.127,13.168,428.127,17.073,424.221z"
        />
      </svg>
    </RocketShipContainer>
  );
}

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
  right; 0;
  font-size: 2em;

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

          opacity: Math.max(1, Math.min(0.75, Math.random() + 0.35)),
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

function Clouds(props) {
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

/*
  Takes an optional component ref (or returns a new one)
  and returns the ref, the scroll `start` and `end` percentages
  that are relative to the total document progress.
*/
function useRefScrollProgress(inputRef) {
  const ref = inputRef || useRef();

  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);

  useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }

    const rect = ref.current.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const offsetTop = rect.top + scrollTop;

    setStart(offsetTop / document.body.clientHeight);
    setEnd((offsetTop + rect.height) / document.body.clientHeight);
  });

  return { ref, start, end };
}

function SunOrMoon(props) {
  const mode = useColorScheme();

  return <Moon {...props} />;

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

  const { scrollY, scrollYProgress } = useViewportScroll();
  const elementScroll = useElementScroll(ref);

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

  const { scrollY, scrollYProgress } = useViewportScroll();
  const elementScroll = useElementScroll(ref);

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

const LastCardContainer = styled.div`
  --primary-wave-color: #09f;
  --primary-wave-color-end: #04a;

  background: #09f;
  background: var(--primary-wave-color);
  background: #09f linear-gradient(to bottom, #09f 0%, #04a 100%);
  background: var(--primary-wave-color)
    linear-gradient(
      to bottom,
      var(--primary-wave-color) 0%,
      var(--primary-wave-color-end) 100%
    );
  position: relative;
  z-index: 1;

  @media (prefers-color-scheme: dark) {
    --primary-wave-color: #030f36;
    --primary-wave-color-end: #10131c;
  }

  &::before {
    position: absolute;
    bottom: 100%;
    left: 0;
    right: 0;
    background: #09f;
    background: var(--primary-wave-color);
    height: 4.5em;
    content: ' ';
  }
`;

export default function Index({ preview, latestPosts }) {
  return (
    <Layout preview={preview}>
      <Head>
        <title>Cole Turner</title>
      </Head>

      <CardList>
        <Card>
          <CardContent>
            <div style={{ marginTop: '1em' }}>
              <AnimatedPortrait interactable={true} />
            </div>

            <Title>Cole Turner</Title>
            <Introduction>
              <Typewriter text="I enjoy developing 👉good👈great ideas for the web." />
            </Introduction>
          </CardContent>
          <ScrollDown />
        </Card>
        <Card>
          <SunOrMoon />
          <Waves />
          <Clouds />
          <RocketShip />

          <CardContent>
            <CardText style={{ paddingBottom: '1em' }}>
              <h2>
                I ship code at{' '}
                <strong>
                  <a
                    target="_blank"
                    rel="nofollow"
                    href="https://www.netflix.com/"
                    style={{ color: '#E50914' }}
                  >
                    Netflix
                  </a>
                </strong>
                .
              </h2>
              <p>
                Previously, I worked at{' '}
                <strong>
                  <a
                    target="_blank"
                    rel="nofollow"
                    href="https://www.paypal.com/"
                    className="paypal-link"
                  >
                    PayPal
                  </a>
                </strong>
                <br />
                and co-founded{' '}
                <strong>
                  <a
                    target="_blank"
                    rel="nofollow"
                    href="https://www.tinychat.com/"
                    style={{ color: '#41b7ef' }}
                  >
                    Tinychat
                  </a>
                </strong>
                .
              </p>
            </CardText>
          </CardContent>
        </Card>
        <LastCardContainer>
          <Card
            style={{
              color: '#fff',
              placeItems: 'flex-start',
            }}
          >
            <CardContent>
              <CardText>
                <h2>Recent posts</h2>

                <div
                  style={{ maxWidth: 600, margin: '0 auto', fontSize: '1rem' }}
                >
                  {latestPosts.length > 0 && (
                    <MoreStories posts={latestPosts} />
                  )}
                  <Link href="/blog" passHref>
                    <PillButton as="a" colorScheme="dark">
                      See more posts
                    </PillButton>
                  </Link>
                </div>
              </CardText>
            </CardContent>
          </Card>
          <AppFooter blendColor="rgba(0,0,0,0.55)" />
        </LastCardContainer>
      </CardList>
    </Layout>
  );
}

export async function getStaticProps({ preview = false }) {
  const latestPosts = await getLatestPostsForHome(preview);
  return {
    props: { preview, latestPosts },
  };
}
