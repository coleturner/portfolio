import styled, { css } from 'react-emotion';

const singlePageStyle = css`
  padding: 3em 0;
  font-size: 2em;
  color: #666;

  h1 {
    color: #aaa;
  }
`;

export default styled.div`
  margin: 0 auto;
  width: 81%;
  max-width: 900px;
  position: relative;

  ${({ isSinglePage }) => isSinglePage && singlePageStyle}
`;
