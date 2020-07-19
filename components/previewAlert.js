import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const PreviewAlertContainer = styled.div`
  background: var(--theme-color-1);
  color: black;
  padding: 1em;
  text-align: center;

  a,
  a:hover {
    color: inherit;
  }
`;

export default function PreviewAlert({ preview }) {
  return (
    <PreviewAlertContainer>
      This is page is a preview.{' '}
      <a
        href="/api/exit-preview"
        className="underline hover:text-cyan duration-200 transition-colors"
      >
        Click here
      </a>{' '}
      to exit preview mode.
    </PreviewAlertContainer>
  );
}

PreviewAlert.propTypes = {
  preview: PropTypes.bool,
};
