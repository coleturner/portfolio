import { em, px } from '../styles/units';
import styled from '@emotion/styled';

const AvatarContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
});

const AvatarImage = styled.img(({ size }) => ({
  borderRadius: em(size),
  width: em(size),
  height: em(size),
  marginRight: em(1),
  objectFit: 'cover',
  objectPosition: 'center center',
}));

const AvatarName = styled.span({
  fontWeight: 700,
});

export default function Avatar({ name, picture, pictureSize = 3 }) {
  return (
    <AvatarContainer>
      <AvatarImage src={picture.url} alt={name} size={pictureSize} />
      {name && <AvatarName>{name}</AvatarName>}
    </AvatarContainer>
  );
}
