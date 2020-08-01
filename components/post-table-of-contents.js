import React from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';
import styled from '@emotion/styled';
import { UI_COLORS } from '../styles/colors';
import { getAnchorID, getAnchorText } from './post-body';
const TableOfContentsContainer = styled.div`
  padding: 1em;
  border-top: 6px solid ${UI_COLORS.POST_TEXT_QUOTE_COLOR};
  border-top-color: var(
    --post-complementary-color,
    ${UI_COLORS.POST_TEXT_QUOTE_COLOR}
  );
  border-bottom: 6px solid ${UI_COLORS.POST_TEXT_QUOTE_COLOR};
  border-bottom-color: var(
    --post-complementary-color,
    ${UI_COLORS.POST_TEXT_QUOTE_COLOR}
  );

  h2 {
    margin-top: 0;
  }

  li {
    margin-bottom: 0.5em;
    line-height: 1.4;

    a:not(:hover) {
      text-decoration: none;
    }
  }
`;
// I would like to use ol/li instead, but
// that's such a hard thing to generate, I've tried.
export default function TableOfContents({ content }) {
  const anchorRenderer = (indent) => (node, children) => {
    if (
      !children ||
      (Array.isArray(children) && !children.filter(Boolean).length)
    ) {
      return null;
    }

    const anchorID = getAnchorID(children);

    if (!anchorID) {
      return null;
    }

    const anchorText = getAnchorText(
      children,
      (grandchildren) => grandchildren
    );

    if (!anchorText) {
      return null;
    }

    let element = (
      <li>
        <a href={'#' + anchorID}>{anchorText}</a>
      </li>
    );

    for (let i = 0; i < indent; i++) {
      element = <ol>{element}</ol>;
    }

    return element;
  };

  const options = {
    renderMark: {
      [MARKS.CODE]: (text) => null,
    },
    renderNode: {
      [BLOCKS.HR]: () => null,
      [BLOCKS.HEADING_1]: anchorRenderer(0),
      [BLOCKS.HEADING_2]: anchorRenderer(0),
      [BLOCKS.HEADING_3]: anchorRenderer(1),
      [BLOCKS.HEADING_4]: anchorRenderer(2),
      [BLOCKS.HEADING_5]: anchorRenderer(3),
      [BLOCKS.HEADING_6]: () => null,
      [BLOCKS.PARAGRAPH]: () => null,
      [BLOCKS.QUOTE]: () => null,
      [BLOCKS.LIST_ITEM]: () => null,
      [BLOCKS.OL_LIST]: () => null,
      [BLOCKS.UL_LIST]: () => null,
      [BLOCKS.EMBEDDED_ASSET]: () => null,
      [BLOCKS.EMBEDDED_ENTRY]: () => null,
      [INLINES.EMBEDDED_ENTRY]: () => null,
      [INLINES.ENTRY_HYPERLINK]: () => null,
      [INLINES.HYPERLINK]: () => null,
    },
  };

  let children = documentToReactComponents(content, options).filter(Boolean);
  const filterChildren = (arr) => {
    return arr.reduce((carry, value) => {
      if (typeof value === 'string') {
        return carry.concat(value);
      }

      const lastValue = carry[carry.length - 1];

      if (lastValue && lastValue.type === value.type) {
        return carry.slice(0, -1).concat(
          React.cloneElement(lastValue, {
            ...lastValue.props,
            children: [
              ...React.Children.toArray(lastValue.props.children),
              ...React.Children.toArray(value.props.children),
            ],
          })
        );
      }

      return carry.concat(value);
    }, []);
  };

  children = filterChildren(children);
  const childrenArray = React.Children.toArray(children);

  if (childrenArray.length === 1 && children[0].type === 'ol') {
    children = children[0].props.children;
  }

  return (
    <TableOfContentsContainer>
      <ol>{children}</ol>
    </TableOfContentsContainer>
  );
}
