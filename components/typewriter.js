import React from 'react';
import PropTypes from 'prop-types';
import { useReducedMotion } from 'framer-motion';
import Typist from 'react-typist';

export default function Typewriter({ text }) {
  const shouldReduceMotion = useReducedMotion();
  const parts = text.split(/(?=👉|👈)/gm);

  let backspaceLength = 0;

  if (shouldReduceMotion) {
    return text.replace(/👉.*(?=👈|👉)👈|👉/gm, '');
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <Typist cursor={{ hideWhenDone: true, hideWhenDoneDelay: 0 }}>
        {parts.map((partInput, index) => {
          let part = partInput;
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

Typewriter.propTypes = {
  text: PropTypes.string.isRequired,
};
