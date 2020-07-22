import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import { css, keyframes } from '@emotion/react';
import { useReducedMotion } from 'framer-motion';
import { useInViewport } from 'react-in-viewport';

const Border = styled.div`
  background: #000;
  border-radius: inherit;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  z-index: 1;
`;

const GRADIENT_FLASH = keyframes`
  0% {
    background-position: 0%;
  }

  100% {
    background-position: 200%;
  }
`;

const borderStyle = css`
  &::before {
    background: repeating-linear-gradient(
      to right,
      var(--theme-color-1) 0%,
      var(--theme-color-2) 25%,
      var(--theme-color-3) 50%,
      var(--theme-color-2) 75%,
      var(--theme-color-1) 100%
    );
    background-size: 200%;
    border-radius: 100em;
    animation: ${GRADIENT_FLASH} 5s infinite linear;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    padding: 0.15em;
    transform: translate(-50%, -50%) rotate(45deg);
    content: ' ';

    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  }
`;

const Container = styled.div(
  ({ border, showTriggers }) => css`
    ${border && borderStyle};

    width: 10em;
    height: 10em;
    width: var(--portrait-size, 10em);
    height: var(--portrait-size, 10em);
    max-width: 70vw;
    max-height: 70vw;
    border-radius: 10em;
    position: relative;
    margin: auto;

    img {
      margin: auto;
      max-width: 100%;
    }

    video {
      background: #000;
      border-radius: inherit;
      overflow: hidden;
      pointer-events: none;
      -webkit-transform-style: preserve-3d;
      -webkit-backface-visibility: hidden;
      transform: translate3d(0, 0, 0);
      will-change: transform;
    }

    .trigger {
      position: absolute;
      content: ' ';
      cursor: crosshair;
      transform: translate(-50%, -50%);
    }

    .hair {
      background: ${showTriggers ? 'yellow' : 'transparent'};
      top: 20%;
      left: 50%;
      width: 5em;
      height: 3em;
    }

    .left-eyebrow {
      background: ${showTriggers ? 'purple' : 'transparent'};
      top: 45%;
      left: 40%;
      width: 1.5em;
      height: 1em;
    }

    .right-eyebrow {
      background: ${showTriggers ? 'teal' : 'transparent'};
      top: 45%;
      left: 60%;
      width: 1.5em;
      height: 1em;
    }

    .left-eye {
      background: ${showTriggers ? 'blue' : 'transparent'};
      top: 55%;
      left: 40%;
      width: 1.5em;
      height: 1em;
    }

    .right-eye {
      background: ${showTriggers ? 'green' : 'transparent'};
      top: 55%;
      left: 60%;
      width: 1.5em;
      height: 1em;
    }

    .left-ear {
      background: ${showTriggers ? 'orange' : 'transparent'};
      top: 60%;
      left: 25%;
      width: 0.75em;
      height: 1.75em;
    }

    .right-ear {
      background: ${showTriggers ? 'orange' : 'transparent'};
      top: 60%;
      left: 75%;
      width: 0.75em;
      height: 1.75em;
    }

    .nose {
      background: ${showTriggers ? 'red' : 'transparent'};
      top: 65%;
      left: 50%;
      width: 1.5em;
      height: 1em;
    }

    .mouth {
      background: ${showTriggers ? 'pink' : 'transparent'};
      top: 75%;
      left: 50%;
      width: 2em;
      height: 0.75em;
    }
  `
);

export default function AnimatedPortrait({
  border = true,
  interactable = false,
}) {
  const ref = useRef();
  const boopRef = useRef();
  const shouldReduceMotion = useReducedMotion();

  const { inViewport } = useInViewport(ref, undefined, undefined, {});

  useEffect(() => {
    if (ref.current) {
      if (inViewport && ref.current.paused) {
        ref.current.play();
      } else if (!inViewport && !ref.current.paused) {
        ref.current.pause();
      }
    }
  }, [inViewport]);

  const playBoopSound = () => {
    if (!boopRef.current) {
      return;
    }

    try {
      boopRef.current.play();
    } catch (e) {
      // do nothing
    }
  };

  const videos = ['subtle', 'happy'];
  const videoPick = videos[Math.floor(Math.random() * videos.length)];

  const triggers = [
    'swoopHair',
    'pokeLeftEyebrow',
    'pokeRightEyebrow',
    'pokeLeftEye',
    'pokeRightEye',
    'pokeLeftEar',
    'pokeRightEar',
    'sneeze',
    'kiss',
  ];

  const [source, setSource] = useState(videoPick);

  if (shouldReduceMotion) {
    return (
      <Container border={border}>
        <Border>
          <img src="/memoji.png" alt="Character portrait of myself." />
        </Border>
      </Container>
    );
  }

  const playTrigger = (pick) => {
    // You asked for this, now wait...
    if (triggers.includes(source)) {
      return;
    }

    playBoopSound();
    setSource(pick);
  };

  const loop = () => {
    if (!ref.current) {
      return;
    }

    if (triggers.includes(source)) {
      setSource(videoPick);
    } else {
      // Don't restart triggers
      ref.current.play();
    }
  };

  const preventDefault = (callback) => (event) => {
    event.preventDefault();
    callback();
  };

  const swoopHair = preventDefault(() => playTrigger('swoopHair'));
  const pokeLeftEyeBrow = preventDefault(() => playTrigger('pokeLeftEyebrow'));
  const pokeRightEyeBrow = preventDefault(() =>
    playTrigger('pokeRightEyebrow')
  );
  const pokeLeftEye = preventDefault(() => playTrigger('pokeLeftEye'));
  const pokeRightEye = preventDefault(() => playTrigger('pokeRightEye'));
  const pokeLeftEar = preventDefault(() => playTrigger('pokeLeftEar'));
  const pokeRightEar = preventDefault(() => playTrigger('pokeRightEar'));
  const pokeNose = preventDefault(() => playTrigger('sneeze'));
  const nowKiss = preventDefault(() => playTrigger('kiss'));

  const showTriggers = false;

  return (
    <Container border={border} showTriggers={showTriggers}>
      <Border>
        <AnimatePresence exitBeforeEnter={true}>
          <motion.video
            key={source}
            ref={ref}
            autoPlay={true}
            playsInline={true}
            loop={false}
            controls={false}
            muted={true}
            width="100%"
            height="100%"
            onEnded={loop}
            exit={{ opacity: 0 }}
            poster="/memoji.png"
          >
            <source src={'/animoji/' + source + '.mp4'} type="video/mp4" />
          </motion.video>
        </AnimatePresence>
        {interactable && (
          <>
            <div className="trigger hair" onClick={swoopHair} />
            <div className="trigger left-eyebrow" onClick={pokeLeftEyeBrow} />
            <div className="trigger right-eyebrow" onClick={pokeRightEyeBrow} />
            <div className="trigger left-eye" onClick={pokeLeftEye} />
            <div className="trigger right-eye" onClick={pokeRightEye} />
            <div className="trigger left-ear" onClick={pokeLeftEar} />
            <div className="trigger right-ear" onClick={pokeRightEar} />
            <div className="trigger nose" onClick={pokeNose} />
            <div className="trigger mouth" onClick={nowKiss} />
          </>
        )}
        <audio ref={boopRef} src="/boop.mp3" autostart="false" />
      </Border>
    </Container>
  );
}

AnimatedPortrait.propTypes = {
  border: PropTypes.bool,
  interactable: PropTypes.bool,
};
