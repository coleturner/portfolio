import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

const ContainerNode = styled.div(
  ({ flex, scale }) =>
    css`
      display: ${flex ? 'flex' : 'block'};
      ${flex && `flex-direction: ${flex === 'column' ? 'column' : 'row'}`};
      max-width: ${scale * 700}px;
      width: 91%;
      margin: 0 auto;
    `
);

export default function Container({ children, flex, scale, style }) {
  return (
    <ContainerNode
      className="container"
      flex={flex}
      style={style}
      scale={scale}
    >
      {children}
    </ContainerNode>
  );
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
  flex: PropTypes.string,
  scale: PropTypes.number,
  style: PropTypes.object,
};

Container.defaultProps = {
  scale: 1,
};
