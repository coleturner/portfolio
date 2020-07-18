import React from 'react';
import PropTypes from 'prop-types';
import {
  solarizedlight,
  xonokai,
} from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import styled from '@emotion/styled';
import { OutlineButton } from './button';
import { useCallback, useState } from 'react';
import useColorScheme from '../hooks/useColorScheme';

const CodeBlock = styled.div`
  font-size: 1rem;
  position: relative;
`;

const CodeActions = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  font-size: 0.75em;
`;

export default function SourceCode({ title, code, language }) {
  const colorScheme = useColorScheme();

  const [copyStatus, setCopyStatus] = useState(null);

  const copy = useCallback(() => {
    const textSnippet = `// Cole Turner (cole.codes)\n// ${window.location.href}\n// ${title}\n\n${code}`;
    navigator.permissions.query({ name: 'clipboard-write' }).then((result) => {
      if (result.state === 'granted' || result.state === 'prompt') {
        navigator.clipboard.writeText(textSnippet).then(
          () => {
            setCopyStatus('Copied!');
          },
          () => {
            setCopyStatus('Failed to copy!');
          }
        );
      }
    });
  }, [code]);

  return (
    <CodeBlock>
      <SyntaxHighlighter
        language={language}
        style={colorScheme === 'dark' ? xonokai : solarizedlight}
        customStyle={{
          borderRadius: '0.5em',
          padding: '2em',
        }}
        useInlineStyles={true}
      >
        {code}
      </SyntaxHighlighter>
      <CodeActions>
        <OutlineButton onClick={copy}>{copyStatus || 'Copy'}</OutlineButton>
      </CodeActions>
    </CodeBlock>
  );
}

SourceCode.propTypes = {
  title: PropTypes.string,
  code: PropTypes.string,
  language: PropTypes.string,
};
