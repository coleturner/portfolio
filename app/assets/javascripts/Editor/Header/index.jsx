import React from 'react';

import Categories from './Categories';
import Credit from './Credit';
import Engagement from './Engagement';
import Flex from '../../Components/Flex';
import { H1 } from '../../Components/Heading';
import Header from '../../Components/Header';
import Paragraph from '../../Components/Paragraph';

export const ArticleHeader = (props) => {
  const { author, byline, created, tags, title, engagements } = props;

  return (
    <Header>
      <H1>{title}</H1>
      {byline ? (<Paragraph className="byline">{byline}</Paragraph>) : null}
      <Categories tags={tags} />
      <Flex className="meta">
        <Credit author={author} created={created} />
        <Engagement
          objects={engagements}
        />
      </Flex>
    </Header>
  );
};

export default ArticleHeader;
