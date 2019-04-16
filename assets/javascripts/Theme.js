import { css, keyframes, injectGlobal } from 'react-emotion';

export const COLORS = {
  BODY: '#222',
  PRIMARY: '#4488b4',
  PRIMARY_ALT: '#105a93',
  SUCCESS: 'rgb(87, 173, 85)'
};

export const FONTS = {
  PRIMARY: '"Roboto",Helvetica,Arial,sans-serif'
};

injectGlobal`
  html {
    height: 100%;
  }

  body {
    min-height: 100%;
    background: #fff;
    color: ${COLORS.BODY};
    font-size: 13px;
    font-family: ${FONTS.PRIMARY};
    line-height: 1.6;
    display: flex;
    flex-direction: column;

    > header,
    > #content,
    > footer {
      width: 100%;
    }

    @media screen and (prefers-color-scheme: dark) {
      background: #000;
      color: #fff;
      color: rgba(255,255,255,0.85);
    }
  }

  a {
    color: ${COLORS.PRIMARY};
    transition: all 0.15s ease-out;
    text-decoration: none;

    transition-property: color, height, width, background-color, font-size,
      opacity;
    &:hover {
      color: shade($primary-color, 30);
      text-decoration: underline;
    }

    /* IE10  */
    touch-action: manipulation;
  }

  img {
    vertical-align: middle;
    max-width: 100%;
    height: auto;
  }

  h1, h2, h3, h4, h5, h6 {
    -webkit-font-smoothing: auto;
    letter-spacing: -0.005em;
    margin-bottom: 1rem;
    font-family: ${FONTS.PRIMARY}
  }

  h1 {
    font-size: 3em;
    font-weight: 800;
  }

  h2 {
    font-size: 2.5em;
    font-weight: 300;
  }
  
  h3 {
    font-size: 2em;
    font-weight: 500;
  }

  h4 {
    font-size: 1.5em;
    font-weight: 400;
  }

  h5 {
    font-size: 1.25em;
    font-weight: 300;
    margin-bottom: 0.5em;
  }

  h6 {
    font-size: 1em;
    font-weight: 300;
    margin-bottom: 0.5em;
  }

  svg,
  time {
    display: inline-block;
    vertical-align: middle;
  }

  .react-component {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  p {
    margin-bottom: 0.65em;
  }

  hr {
    opacity: 0.15;
    margin: 1em auto;
  }

  .markdown {
    white-space: pre-line;
  }
`;

export const ANIMATIONS = {
  FILL: keyframes`
    from {
      max-width: 0%;
    }
  
    to {
      max-width: 100%;
    }
  `,

  TILT: keyframes`
    from {
      transform: translate(-50%, -50%) rotate(30deg);
    }
  
    to {
      transform: translate(-50%, -50%) rotate(0deg);
    }
  `,

  SLIDE_DOWN: keyframes`
    from {
      top: -100%;
    }
    to {
      top: 0;
    }
  `,

  FADE_IN: keyframes`
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  `
};

export default {
  FONTS,
  COLORS,
  ANIMATIONS
};
