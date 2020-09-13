import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from 'emotion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getColorContrast } from 'styles/colors';
import { panelBoxShadow } from '../styles/global';
import { SHADE } from '../styles/colors';

const TaglistContainer = styled.div`
  background: var(--page-background-color-invert-5);
  box-shadow: ${panelBoxShadow(15, SHADE[0.2])};
  padding: 0.5em 1em;
  text-align: center;
  position: relative;
  z-index: 2;

  white-space: nowrap;
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  overscroll-behavior-x: none;

  &::-webkit-scrollbar {
    display: none;

    @media screen and (min-width: 800px) {
      position: sticky;
      top: 0;
      left: 0;
      right: 0;
      z-index: 2;
    }
  }
`;

const Tag = styled.span(
  ({ color, isActive }) => css`
    display: inline-block;
    margin: 0.25em 0;
    margin-right: 0.5em;
    opacity: 0.85;
    position: relative;
    z-index: 1;
    border-bottom: 3px solid transparent;

    a,
    a:hover {
      display: inline-block;
      padding: 0.15em 0.75em;
      text-decoration: none;
      color: inherit;
    }

    &:hover,
    &:focus {
      opacity: 1;
      border-bottom: 3px solid ${color};
      z-index: 2;
    }

    &:last-child {
      margin: 0;
    }

    ${isActive
      ? css`
          color: ${color};
          font-weight: bold;
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
