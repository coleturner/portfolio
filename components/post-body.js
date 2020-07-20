/* eslint-disable react/display-name */
import React from 'react';
import PropTypes from 'prop-types';
import hexToRGBA from 'hex-to-rgba';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';
import styled from '@emotion/styled';
import {
  UI_COLORS,
  SHADE,
  changeColorBrightness,
  getColorContrast,
} from '../styles/colors';
import SourceCode from './source-code';
import PostPreview from './post-preview';
import Link from 'next/link';
import { isDevelopment } from '../lib/environment';
import YoutubeVideo from './youtube-video';
import { css } from 'emotion';

const PostBodyContainer = styled.div(
  ({ color }) => css`
    line-height: 1.6;
    font-size: 22px;
    max-width: 42rem;
    max-width: 70ch;
    padding: 3em 0;
    color: rgba(0, 0, 0, 0.65);

    img {
      max-width: 100%;
    }

    @media screen and (prefers-color-scheme: dark) {
      color: rgba(255, 255, 255, 0.85);

      h1,
      h2,
      h3 {
        color: ${changeColorBrightness(color, 15)};
      }

      h4,
      h5,
      h6 {
        color: ${changeColorBrightness(color, 15)};
      }

      a {
        color: ${color};
      }
    }
  `
);

const Paragraph = styled.p`
  margin-bottom: 1em;
`;

const QuoteBubble = styled.blockquote(({ color }) => {
  const bubbleColor = color || UI_COLORS.POST_TEXT_QUOTE_COLOR;

  return css`
    margin: 1em 0;

    @media screen and (min-width: 700px) {
      margin: 1em 3em;
    }

    border-radius: 1em;
    font-size: 1em;
    font-style: italic;
    padding: 1em 2em;
    margin-bottom: 0.5em;
    background-color: ${bubbleColor};
    color: ${getColorContrast(bubbleColor)};
    position: relative;

    &::before,
    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      height: 30px;
    }

    &::before {
      left: -7px;
      border-left: 20px solid ${bubbleColor};
      border-bottom-right-radius: 16px 14px;
      transform: translate(0, -2px);
    }

    &::after {
      left: 4px;
      width: 26px;
      background: white;
      background: var(--page-background-color);

      border-bottom-right-radius: 10px;
      transform: translate(-30px, -2px);
    }
  `;
});

const Quote = styled.blockquote(({ color }) => {
  return css`
    background: linear-gradient(
      to right,
      ${hexToRGBA(color, 0.3)} 0%,
      ${hexToRGBA(color, 0.15)} 25%,
      ${hexToRGBA(color, 0.0)} 100%
    );
    border-left: 6px solid ${color || UI_COLORS.POST_TEXT_QUOTE_COLOR};
    padding: 1em 0;
    margin: 0;
    position: relative;

    @media screen and (min-width: 700px) {
      padding: 1em 3em;
    }

    p {
      font-size: 1em;
      font-style: normal;
      white-space: pre-line;
    }

    a {
      color: ${color};
    }
  `;
});

const HR = styled.hr`
  border-color: ${SHADE[0.15]};
  margin: 3em 0;
`;

const H1 = styled.h1`
  font-size: 2;
  margin: 2em 0 0.5em 0;
`;
const H2 = styled.h2`
  font-size: 2;
  margin: 2em 0 0.5em 0;
`;
const H3 = styled.h3`
  font-size: 1.5;
  margin: 2em 0 0.5em 0;
`;
const H4 = styled.h4`
  font-size: 1.25;
  margin: 2em 0 0.5em 0;
`;
const H5 = styled.h5`
  font-size: 1.15;
  margin: 2em 0 0.5em 0;
`;

const H6 = styled.div(
  ({ color }) =>
    css`
      font-weight: 100;
      font-size: 1.5em;
      margin: 2em 0;
      color: ${color || UI_COLORS.POST_TEXT_H6_TEXT};
      line-height: 1.4;
    `
);

const VideoEmbed = styled.video`
  width: 100%;
`;

export default function PostBody({ content, color, complimentaryColor }) {
  const options = {
    renderMark: {
      [MARKS.CODE]: (text) => (
        <QuoteBubble color={complimentaryColor}>{text}</QuoteBubble>
      ),
    },
    renderNode: {
      [BLOCKS.HR]: () => <HR />,
      [BLOCKS.HEADING_1]: (node, children) => <H1>{children}</H1>,
      [BLOCKS.HEADING_2]: (node, children) => <H2>{children}</H2>,
      [BLOCKS.HEADING_3]: (node, children) => <H3>{children}</H3>,
      [BLOCKS.HEADING_4]: (node, children) => <H4>{children}</H4>,
      [BLOCKS.HEADING_5]: (node, children) => <H5>{children}</H5>,
      [BLOCKS.HEADING_6]: (node, children) => (
        <H6 color={complimentaryColor}>{children}</H6>
      ),
      [BLOCKS.PARAGRAPH]: (node, children) => <Paragraph>{children}</Paragraph>,
      [BLOCKS.QUOTE]: (node, children) => {
        return <Quote color={complimentaryColor}>{children}</Quote>;
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
          case 'image':
            return <img title={title} alt={description} src={file.url} />;
          case 'application':
            return (
              <a alt={description} href={file.url}>
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
      [BLOCKS.EMBEDDED_ENTRY]: (node) => {
        const { sys, fields } = node.data.target;
        const { contentType } = sys;

        switch (contentType.sys.id) {
          case 'sourceCode': {
            const { title, code, language } = fields;
            return <SourceCode title={title} code={code} language={language} />;
          }
          case 'youtubeVideo': {
            const { title, url } = fields;
            return <YoutubeVideo title={title} url={url} />;
          }
          default:
            break;
        }

        if (isDevelopment()) {
          throw new Error('Unrecognized content type: ' + contentType.sys.id);
        }

        return null;
      },
      [INLINES.EMBEDDED_ENTRY]: (node) => {
        const { sys, fields } = node.data.target;
        const { contentType } = sys;

        switch (contentType.sys.id) {
          case 'sourceCode': {
            const { title, code, language } = fields;
            return <SourceCode title={title} code={code} language={language} />;
          }
          case 'post':
            return (
              <PostPreview
                key={fields.slug}
                title={fields.title}
                coverImage={fields.coverImage}
                date={fields.date}
                author={fields.author}
                slug={fields.slug}
                excerpt={fields.excerpt}
                color={fields.color}
                size={40}
              />
            );

          default:
            break;
        }

        if (isDevelopment()) {
          throw new Error('Unrecognized content type: ' + contentType.sys.id);
        }

        return null;
      },
      [INLINES.ENTRY_HYPERLINK]: (node, children) => {
        const { fields } = node.data.target;
        const { slug } = fields;

        return (
          <Link as={`/posts/${slug}`} href="/posts[slug]">
            <a>{children}</a>
          </Link>
        );
      },
    },
  };

  return (
    <PostBodyContainer color={color} complimentaryColor={complimentaryColor}>
      {documentToReactComponents(content, options)}
    </PostBodyContainer>
  );
}

PostBody.propTypes = {
  color: PropTypes.string,
  complimentaryColor: PropTypes.string,
  content: PropTypes.object,
};
