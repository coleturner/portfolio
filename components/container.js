import styled from '@emotion/styled';
import { percent } from '../styles/units';

const ContainerNode = styled.div(({ flex, scale }) => ({
  display: flex ? 'flex' : 'block',
  flexDirection: flex === 'column' ? 'column' : 'row',
  maxWidth: 700 * scale,
  width: percent(91),
  margin: '0 auto',
}));

export default function Container({ children, flex, scale, style }) {
  return (
    <ContainerNode flex={flex} style={style} scale={scale}>
      {children}
    </ContainerNode>
  );
}

Container.defaultProps = {
  scale: 1,
};
