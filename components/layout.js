import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import PreviewAlert from 'components/previewAlert';
import Meta from 'components/meta';
import styled from '@emotion/styled';
import { initGA, logPageView, flushGAQueue } from 'lib/analytics';

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export default function Layout({ preview, children }) {
  useEffect(() => {
    try {
      initGA();
      logPageView();
      flushGAQueue();
    } catch (e) {
      // Don't let this interrupt anything
    }
    return () => {};
  }, []);

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
