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
      border: 2px solid var(--page-background-color-invert-15);
      border-radius: ${size}em;
      width: ${size}em;
      height: ${size}em;
      margin-right: 1em;
      object-fit: cover;
      object-position: center center;
    `
);

export default function Avatar({
  name,
  picture,
  pictureSize = 4,
  imageSize = 80,
}) {
  return (
    <AvatarContainer>
      {picture && (
        <AvatarImage
          src={picture.url + '?w=' + imageSize}
          alt={name}
          size={pictureSize}
        />
      )}
    </AvatarContainer>
  );
}

Avatar.propTypes = {
  name: PropTypes.string,
  picture: PropTypes.shape({
    url: PropTypes.string,
  }),
  pictureSize: PropTypes.number,
  imageSize: PropTypes.number,
};
