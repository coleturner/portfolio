import React from 'react';
import PropTypes from 'prop-types';
import theme from 'react-syntax-highlighter/dist/cjs/styles/prism/a11y-dark';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import styled from '@emotion/styled';
import { OutlineButton } from 'components/button';
import { useCallback, useState } from 'react';
import { panelBoxShadow } from '../styles/global';

const CodeBlock = styled.div`
  font-size: 1rem;
  position: relative;
  box-shadow: ${panelBoxShadow(30, 'rgba(0,0,0,0.12)')};
`;

const CodeActions = styled.div`
  position: absolute;
  bottom: 1em;
  right: 1em;
  font-size: 0.75em;
`;

export default function SourceCode({ title, code, language }) {
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
        style={theme}
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
