import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from 'emotion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getColorContrast } from '../styles/colors';

const TaglistContainer = styled.div`
  background: var(--page-background-color);
  box-shadow: inset 0 100px 100px 100px rgba(0, 0, 0, 0.3);
  border-bottom: 3px solid rgba(0, 0, 0, 0.3);
  padding: 0.5em 0;
  text-align: center;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
`;

const Tag = styled.span(
  ({ color, isActive }) => css`
    display: inline-block;
    background: rgba(255, 255, 255, 0.15);
    border-bottom: 3px solid ${color};
    border-radius: 0.2em;
    margin-right: 0.5em;
    opacity: 0.85;
    position: relative;
    z-index: 1;

    a,
    a:hover {
      display: inline-block;
      padding: 0.5em 1em;
      text-decoration: none;
      color: inherit;
    }

    &,
    &:hover {
      color: var(--page-text-color);
    }

    &:hover,
    &:focus {
      opacity: 1;
      transform: scale(1.1);
      z-index: 2;
    }

    &:last-child {
      margin: 0;
    }

    ${isActive
      ? css`
          background: ${color};

          &,
          &:hover {
            color: ${getColorContrast(color)};
          }
        `
      : ''};
  `
);

export default function Taglist({ tags }) {
  const { query } = useRouter();
  const { slug } = query;

  if (!tags || !tags.length) {
    return null;
  }

  return (
    <TaglistContainer>
      {tags.map((tag) => (
        <Tag key={tag.slug} color={tag.color} isActive={slug === tag.slug}>
          <Link as={`/blog/${tag.slug}`} href="/blog/[slug]">
            <a>{tag.name}</a>
          </Link>
        </Tag>
      ))}
    </TaglistContainer>
  );
}

Taglist.propTypes = {
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      slug: PropTypes.string,
    })
  ),
};
