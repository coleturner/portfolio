import {
  solarizedlight,
  xonokai,
} from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { rem, em } from '../styles/units';
import styled from '@emotion/styled';
import { OutlineButton } from './button';
import { useCallback, useState } from 'react';
import useColorScheme from '../hooks/useColorScheme';

const CodeBlock = styled.div({
  fontSize: rem(1),
  position: 'relative',
});

const CodeActions = styled.div({
  position: 'absolute',
  bottom: em(1),
  right: em(1),
  fontSize: em(0.75),
});

export default function SourceCode({ title, code, language }) {
  const colorScheme = useColorScheme();

  const [copyStatus, setCopyStatus] = useState(null);

  const copy = useCallback(() => {
    const textSnippet = `// Cole Turner (cole.codes)\n// ${window.location.href}\n\n${code}`;
    navigator.permissions.query({ name: 'clipboard-write' }).then((result) => {
      if (result.state == 'granted' || result.state == 'prompt') {
        navigator.clipboard.writeText(textSnippet).then(
          function () {
            setCopyStatus('Copied!');
          },
          function () {
            setCopyStatus('Failed to copy!');
          }
        );
      }
    });
  }, [code]);

  return (
    <CodeBlock>
      <SyntaxHighlighter
        language={'jsx'}
        style={colorScheme === 'dark' ? xonokai : solarizedlight}
        customStyle={{
          borderRadius: em(0.5),
          padding: em(2),
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
