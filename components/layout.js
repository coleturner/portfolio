import React from 'react';
import PropTypes from 'prop-types';
import PreviewAlert from '../components/previewAlert';
import Meta from '../components/meta';
import styled from '@emotion/styled';

const Main = styled.main`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export default function Layout({ preview, children }) {
  return (
    <>
      <Meta />
      {preview && <PreviewAlert />}
      <Main>{children}</Main>
    </>
  );
}

Layout.propTypes = {
  preview: PropTypes.bool,
  children: PropTypes.node,
};
