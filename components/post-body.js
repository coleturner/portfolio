/* eslint-disable react/display-name */
import React from 'react';
import PropTypes from 'prop-types';
import { HOST_NAME, CONTENTFUL_HOST } from 'lib/constants';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';
import styled from '@emotion/styled';
import { UI_COLORS, SHADE } from 'styles/colors';
import Gallery from 'components/gallery';
import Link from 'next/link';
import parse from 'url-parse';
import dynamic from 'next/dynamic';

import { isDevelopment } from 'lib/environment';
import YoutubeVideo from 'components/youtube-video';
import { css } from 'emotion';
import { panelBoxShadow } from 'styles/global';
import { toSlug } from 'lib/api';
import useColorScheme from 'hooks/useColorScheme';
import Head from 'next/head';
import LoadingSpinner from 'components/loadingSpinner';

const SourceCode = dynamic(() => import('components/source-code'));

const Quote = dynamic(() => import('components/post-quote'), {
  loading: () => <LoadingSpinner />,
});

const QuoteBubble = dynamic(() => import('components/post-quote-bubble'), {
  loading: () => <LoadingSpinner />,
});

const TableOfContents = dynamic(
  () => import('components/post-table-of-contents'),
  {
    loading: () => <LoadingSpinner />,
  }
);

const TwitterTweetEmbed = dynamic(() =>
  import('react-twitter-embed').then((mod) => mod.TwitterTweetEmbed)
);

const PostBodyContainer = styled.div`
  line-height: 1.6;
  font-size: 22px;
  font-size: clamp(1rem, 1rem + 0.5vh, 4em);
  max-width: 42rem;
  max-width: 70ch;
  padding: 3em 0;
  color: rgba(0, 0, 0, 0.75);

  @media screen and (prefers-color-scheme: dark) {
    color: rgba(255, 255, 255, 0.75);
  }

  > p:last-child:empty {
    display: none;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.4;
  }

  h1,
  h2,
  h3 {
    color: var(--post-color-minus-15);

    @media screen and (prefers-color-scheme: dark) {
      color: var(--post-color-plus-15);
    }
  }

  h4,
  h5,
  h6 {
    color: var(--post-color-plus-15);
  }

  a {
    color: var(--post-complementary-color);
  }
`;

const PostPicture = styled.picture`
  img {
    display: block;
    margin: 2em auto;
    border-radius: 0.3em;
    box-shadow: ${panelBoxShadow(15, 'rgba(0,0,0,0.15)')};
    max-width: 100%;
  }
`;

const Paragraph = styled.p`
  margin-bottom: 1em;
`;

const ImageGallery = styled.div`
  --cover-image-color: #111;
  --cover-image-color-0_3: #111;
  --cover-image-gradient-overlay-color: transparent;
  --cover-image-border-width: 0;

  position: relative;
  z-index: 0;
`;

const HR = styled.hr`
  border-color: ${SHADE[0.15]};
  margin: 3em 0;
`;

const headingAfterImageStyle = css`
  img + p:empty + & {
    margin-top: 3em;
  }
`;

const H1 = styled.h1`
  font-size: 2em;
  margin: 2em 0 0.5em 0;

  ${headingAfterImageStyle};
`;
const H2 = styled.h2`
  font-size: 2em;
  margin: 2em 0 0.5em 0;

  ${headingAfterImageStyle};
`;
const H3 = styled.h3`
  font-size: 1.5em;
  margin: 2em 0 0.5em 0;

  ${headingAfterImageStyle};
`;
const H4 = styled.h4`
  font-size: 1.25em;
  margin: 2em 0 0.5em 0;

  ${headingAfterImageStyle};
`;
const H5 = styled.h5`
  font-size: 1.15em;
  margin: 2em 0 0.5em 0;

  ${headingAfterImageStyle};
`;

const Emphasis = styled.em`
  display: block;
  text-align: center;
  font-weight: 100;
  font-size: 1.5em;
  margin: 2em 0;
  color: ${UI_COLORS.POST_TEXT_H6_TEXT};
  color: var(--post-complementary-color, ${UI_COLORS.POST_TEXT_H6_TEXT});
  line-height: 1.3;
  font-style: normal;

  &:last-child {
    margin-bottom: 0;
  }

  img + p + & {
    margin-top: 3em;
  }
`;

const VideoEmbed = styled.video`
  width: 100%;
`;

const TwitterEmbedContainer = styled.div`
  .twitter-tweet {
    margin: 1em auto;
  }
`;

const renderHyperlink = (node, children) => {
  try {
    const url = new URL(node.data.uri);
    if (url.hostname !== HOST_NAME) {
      return (
        <a rel="nofollow noreferrer" target="_blank" href={node.data.uri}>
          {children}
        </a>
      );
    }
  } catch (e) {
    console.error(e);
    // do nothing
  }

  return <a href={node.data.uri}>{children}</a>;
};

const AnchorLinkContainer = styled.div`
  position: relative;

  a {
    text-decoration: none;

    &,
    &:hover {
      color: inherit !important;
      text-decoration-color: inherit;
    }
  }

  .anchor {
    position: absolute;
    top: -5.2rem;
  }

  .icon-anchor {
    display: none;
    margin-right: 0.5em;
    position: absolute;
    right: 100%;
    top: 50%;
    transform: translateY(-50%);
    will-change: display;
    opacity: 0.85;
    font-size: 0.85em;
  }

  &:hover {
    text-decoration: underline;

    .icon-anchor {
      display: inline-block;
    }
  }
`;

function getStringForElement(element) {
  if (!element || typeof element === 'string') {
    return element;
  }

  if (React.isValidElement(element)) {
    return getStringForElement(element.props.children);
  }

  return null;
}

export function getAnchorID(children) {
  const anchorChildren = React.Children.map(
    children,
    getStringForElement
  ).filter(Boolean);

  if (!anchorChildren.length) {
    return children;
  }

  return toSlug(anchorChildren.join('-').replace(/^-+/, '').replace(/-+$/, ''));
}

export function getAnchorText(
  children,
  factory,
  cloneElements = ['b', 'i', 'u', 'em', 'strong']
) {
  return React.Children.map(children, (child) => {
    if (typeof child === 'string') {
      return factory(child);
    }

    if (React.isValidElement(child) && child.props.children) {
      if (cloneElements.includes(child.type)) {
        return React.cloneElement(child, {
          ...child.props,
          children: factory(child.props.children),
        });
      }

      return getAnchorText(child.props.children, factory, cloneElements);
    }

    return null;
  });
}

function Anchor({ children }) {
  if (!children) {
    return null;
  }

  const anchorID = getAnchorID(children);

  if (!anchorID) {
    return children;
  }

  const childrenWithLinks = getAnchorText(children, (grandchildren) => {
    return <a href={'#' + anchorID}>{grandchildren}</a>;
  });

  return (
    <AnchorLinkContainer>
      <span className="anchor" id={anchorID}></span>
      {childrenWithLinks}

      <a href={'#' + anchorID}>
        <svg className="icon-anchor" viewBox="0 0 477.389 477.389">
          <path d="M451.209 68.647a89.462 89.462 0 00-63.312-26.226 88.987 88.987 0 00-63.266 26.197L209.056 184.194a89.615 89.615 0 00-22.869 87.518c2.559 9.072 11.988 14.352 21.06 11.793 9.072-2.559 14.352-11.988 11.793-21.06a55.481 55.481 0 0114.148-54.118L348.763 92.768c21.608-21.613 56.646-21.617 78.259-.008 21.613 21.608 21.617 56.646.009 78.259L311.456 286.594a55.16 55.16 0 01-27.682 15.002c-9.228 1.921-15.151 10.959-13.23 20.187a17.067 17.067 0 0016.762 13.588 16.88 16.88 0 003.55-.375 89.205 89.205 0 0044.732-24.269l115.576-115.558c34.95-34.926 34.97-91.571.045-126.522z" />
          <path d="M290.702 206.142c-2.559-9.072-11.988-14.352-21.06-11.793s-14.352 11.988-11.793 21.06a55.481 55.481 0 01-14.148 54.118L128.125 385.103c-21.608 21.613-56.646 21.617-78.259.008-21.613-21.608-21.617-56.646-.009-78.259l115.576-115.593a55.083 55.083 0 0127.648-15.002c9.243-1.849 15.237-10.84 13.388-20.082s-10.84-15.237-20.082-13.388a89.342 89.342 0 00-45.086 24.34L25.725 282.703c-34.676 35.211-34.242 91.865.969 126.541 34.827 34.297 90.731 34.301 125.563.008l115.575-115.593a89.612 89.612 0 0022.87-87.517z" />
        </svg>
      </a>
    </AnchorLinkContainer>
  );
}

const GoogleFormContainer = styled.div`
  width: 100%;

  iframe {
    border: 0;
  }
`;

function GoogleForm({ formId }) {
  return (
    <GoogleFormContainer>
      <iframe
        src={`https://docs.google.com/forms/d/e/${formId}/viewform?embedded=true`}
        width="100%"
        height={1000}
      />
    </GoogleFormContainer>
  );
}

function ParagraphBreaker({ children }) {
  return children;
}

const embeddedEntryFactory = (content, colorScheme = 'light') => (node) => {
  const { sys, fields } = node.data.target;
  const { contentType } = sys;

  switch (contentType.sys.id) {
    case 'sourceCode': {
      const { title, code, language } = fields;
      return <SourceCode title={title} code={code} language={language} />;
    }
    case 'imageGallery': {
      const { title, images, fit } = fields;
      return (
        <ImageGallery>
          <Gallery
            fit={fit}
            images={images.map((n) => {
              const { title: imageTitle, file } = n.fields;
              const src = file.url;

              const { width, height } = file.details.image;
              return { src, width, height, title: imageTitle };
            })}
          />
          <h6 style={{ textAlign: 'center' }}>{title}</h6>
        </ImageGallery>
      );
    }
    case 'youtubeVideo': {
      const { title, url } = fields;
      return <YoutubeVideo title={title} url={url} />;
    }
    case 'googleForm': {
      const { formId } = fields;
      return <GoogleForm formId={formId} />;
    }
    case 'tweetEmbed': {
      const { tweetId, conversation } = fields;
      return (
        <TwitterEmbedContainer>
          <TwitterTweetEmbed
            tweetId={tweetId}
            options={{
              conversation: conversation || 'none',
              theme: colorScheme,
            }}
          />
        </TwitterEmbedContainer>
      );
    }
    case 'tableOfContents': {
      const index = content.content.indexOf(node);

      return (
        <TableOfContents
          content={{
            ...content,
            content: content.content.slice(index),
          }}
        />
      );
    }
    default:
      break;
  }

  if (isDevelopment()) {
    throw new Error('Unrecognized content type: ' + contentType.sys.id);
  }

  return null;
};

function getPostImageURL(url, { w, fm = 'jpg' }) {
  if (!url) {
    return null;
  }

  const params = {};

  if (url.includes(CONTENTFUL_HOST)) {
    params.fm = fm;
  }

  if (w) {
    // Add some padding to it, for quality
    params.w = Math.round(w);
  }

  const urlObj = parse(url, true);
  urlObj.query = { ...url.query, ...params };

  return urlObj.toString();
}
export default function PostBody({ content }) {
  const colorScheme = useColorScheme();
  const options = {
    renderMark: {
      [MARKS.CODE]: (text) => {
        if (!text || text.trim() === '') {
          return null;
        }

        return (
          <ParagraphBreaker>
            <QuoteBubble shouldBreakP={true}>{text}</QuoteBubble>
          </ParagraphBreaker>
        );
      },
    },
    renderNode: {
      [BLOCKS.HR]: () => <HR />,
      [BLOCKS.HEADING_1]: (node, children) => (
        <H1>
          <Anchor>{children}</Anchor>
        </H1>
      ),
      [BLOCKS.HEADING_2]: (node, children) => (
        <H2>
          <Anchor>{children}</Anchor>
        </H2>
      ),
      [BLOCKS.HEADING_3]: (node, children) => (
        <H3>
          <Anchor>{children}</Anchor>
        </H3>
      ),
      [BLOCKS.HEADING_4]: (node, children) => (
        <H4>
          <Anchor>{children}</Anchor>
        </H4>
      ),
      [BLOCKS.HEADING_5]: (node, children) => (
        <H5>
          <Anchor>{children}</Anchor>
        </H5>
      ),
      [BLOCKS.HEADING_6]: (node, children) => <Emphasis>{children}</Emphasis>,
      [BLOCKS.PARAGRAPH]: (node, children) => {
        const hasParagraphBreaker = Boolean(
          React.Children.toArray(children)
            .map((n) => n.type === ParagraphBreaker)
            .filter(Boolean).length
        );

        if (hasParagraphBreaker) {
          return children;
        }

        return <Paragraph>{children}</Paragraph>;
      },
      [BLOCKS.QUOTE]: (node, children) => {
        return (
          <ParagraphBreaker>
            <Quote shouldBreakP={true}>{children}</Quote>
          </ParagraphBreaker>
        );
      },
      [BLOCKS.LIST_ITEM]: (node) => {
        const children = documentToReactComponents(node, {
          renderNode: {
            [BLOCKS.PARAGRAPH]: (_, paragraphChild) => paragraphChild,
            [BLOCKS.LIST_ITEM]: (_, listItemChild) => listItemChild,
            [INLINES.HYPERLINK]: renderHyperlink,
          },
        });

        return <li>{children}</li>;
      },
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const { title, description, file } = node.data.target.fields;

        const mimeType = file?.contentType;
        const mimeGroup = mimeType.split('/')[0];

        switch (mimeGroup) {
          case 'video': {
            return (
              <VideoEmbed
                controls={true}
                autoPictureInPicture={true}
                loop={true}
              >
                <source src={file.url} type="video/mp4" />
                <p>Your browser doesn&apos;t support HTML5 video.</p>
              </VideoEmbed>
            );
          }
          case 'image': {
            const w = '700';
            const preconnectURL = parse(file.url);
            Object.assign(preconnectURL, { query: '', pathname: '' });

            return (
              <>
                <Head>
                  <link
                    rel="preconnect"
                    href={preconnectURL.toString()}
                    key={'preconnect-' + preconnectURL.toString()}
                  />
                </Head>
                <PostPicture loading="lazy">
                  <source
                    srcSet={getPostImageURL(file.url, { w, fm: 'webp' })}
                    type="image/webp"
                  />
                  <img
                    src={getPostImageURL(file.url, { w, fm: 'jpg' })}
                    alt={description}
                  />
                </PostPicture>
              </>
            );
          }
          case 'application':
            return (
              <a download={file.details.fileName} href={file.url}>
                {title ? title : file.details.fileName}
              </a>
            );
          default:
            if (isDevelopment()) {
              throw new Error('Unrecognized mime type: ' + mimeType);
            }
        }

        return null;
      },
      [BLOCKS.EMBEDDED_ENTRY]: embeddedEntryFactory(content, colorScheme),
      [INLINES.EMBEDDED_ENTRY]: embeddedEntryFactory(content, colorScheme),
      [INLINES.ENTRY_HYPERLINK]: (node, children) => {
        const { fields } = node.data.target;
        const { slug } = fields;

        return (
          <Link as={`/posts/${slug}`} href="/posts/[slug]">
            <a>{children}</a>
          </Link>
        );
      },
      [INLINES.HYPERLINK]: renderHyperlink,
    },
  };

  return (
    <PostBodyContainer>
      {documentToReactComponents(content, options)}
    </PostBodyContainer>
  );
}

PostBody.propTypes = {
  content: PropTypes.object,
};
