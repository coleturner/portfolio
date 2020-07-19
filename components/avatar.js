import React from 'react';
import PropTypes from 'prop-types';

import styled from '@emotion/styled';
import { css } from '@emotion/react';

const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
`;

const AvatarImage = styled.img(
  ({ size }) =>
    css`
      border-radius: ${size}em;
      width: ${size}em;
      height: ${size}em;
      margin-right: 1em;
      object-fit: cover;
      object-position: center center;
    `
);

const AvatarName = styled.span`
  font-weight: 700;
`;

export default function Avatar({ name, picture, pictureSize = 3 }) {
  return (
    <AvatarContainer>
      {picture && (
        <AvatarImage src={picture.url} alt={name} size={pictureSize} />
      )}
      {name && <AvatarName>{name}</AvatarName>}
    </AvatarContainer>
  );
}

Avatar.propTypes = {
  name: PropTypes.string,
  picture: PropTypes.shape({
    url: PropTypes.string,
  }),
  pictureSize: PropTypes.number,
};
