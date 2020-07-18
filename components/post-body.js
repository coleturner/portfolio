import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import { rem, px, em, percent } from '../styles/units';
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

const Paragraph = styled.p({
  marginBottom: em(1),
});

const Quote = styled.blockquote(({ color }) => ({
  padding: em(1),
  p: {
    borderRadius: em(1),
    fontSize: em(1),
    fontStyle: 'italic',
    padding: em(1, 2),
    marginBottom: em(0.5),
    backgroundColor: color || UI_COLORS.POST_TEXT_QUOTE_COLOR,
    color: getColorContrast(color),
    position: 'relative',

    '&:before, &:after': {
      content: '""',
      position: 'absolute',
      bottom: -2,
      height: 30,
    },

    '&:before': {
      left: -7,
      borderLeft: '20px solid ' + (color || UI_COLORS.POST_TEXT_QUOTE_COLOR),
      borderBottomRightRadius: '16px 14px',
      transform: 'translate(0, -2px)',
    },

    '&:after': {
      left: 4,
      width: 26,
      background: ['white', 'var(--page-background-color)'],
      borderBottomRightRadius: 10,
      transform: 'translate(-30px, -2px)',
    },
  },
}));

const HR = styled.hr({ borderColor: SHADE[0.15], margin: em(3, 0) });
const H1 = styled.h1({ fontSize: em(2), margin: rem(1, 0, 0.5, 0) });
const H2 = styled.h2({ fontSize: em(2), margin: rem(1, 0, 0.5, 0) });
const H3 = styled.h3({ fontSize: em(1.5), margin: rem(1, 0, 0.5, 0) });
const H4 = styled.h4({ fontSize: em(1.25), margin: rem(1, 0, 0.5, 0) });
const H5 = styled.h5({ fontSize: em(1.15), margin: rem(1, 0, 0.5, 0) });
const H6 = styled.div(({ color }) => ({
  fontWeight: 700,
  fontSize: em(1.5),
  margin: em(2, 0, 1, 0),
  color: color || UI_COLORS.POST_TEXT_H6_TEXT,
  lineHeight: 1.3,
}));

const VideoEmbed = styled.video({
  width: percent(100),
});

export default function PostBody({ content, color }) {
  const options = {
    renderNode: {
      [BLOCKS.HR]: () => <HR />,
      [BLOCKS.HEADING_1]: (node, children) => <H1>{children}</H1>,
      [BLOCKS.HEADING_2]: (node, children) => <H2>{children}</H2>,
      [BLOCKS.HEADING_3]: (node, children) => <H3>{children}</H3>,
      [BLOCKS.HEADING_4]: (node, children) => <H4>{children}</H4>,
      [BLOCKS.HEADING_5]: (node, children) => <H5>{children}</H5>,
      [BLOCKS.HEADING_6]: (node, children) => <H6 color={color}>{children}</H6>,
      [BLOCKS.PARAGRAPH]: (node, children) => <Paragraph>{children}</Paragraph>,
      [BLOCKS.QUOTE]: (node, children) => (
        <Quote color={color}>{children}</Quote>
      ),
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
                <p>Your browser doesn't support HTML5 video.</p>
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
        }

        if (isDevelopment()) {
          throw new Error('Unrecognized content type: ' + contentType.sys.id);
        }

        return null;
      },
      [INLINES.ENTRY_HYPERLINK]: (node, children) => {
        const { sys, fields } = node.data.target;
        const { title, slug } = fields;

        return (
          <Link as={`/posts/${slug}`} href="/posts[slug]">
            <a>{children}</a>
          </Link>
        );
      },
    },
  };

  return (
    <PostBodyContainer color={color}>
      {documentToReactComponents(content, options)}
    </PostBodyContainer>
  );
}
