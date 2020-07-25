import React from 'react';
import PropTypes from 'prop-types';
import postPropType from './propTypes/postPropType';
import PostPreview from './post-preview';
import styled from '@emotion/styled';

const Section = styled.section``;
const List = styled.div``;
const ListItem = styled.div``;

const Heading = styled.h2`
  text-align: center;
  font-size: 2em;
  text-decoration: underline;
  text-decoration-color: var(--theme-color-1);
  text-underline-position: under;
`;

export default function StoriesList({ title, posts }) {
  return (
    <Section>
      {title && <Heading>{title}</Heading>}
      <List>
        {posts.map((post) => (
          <ListItem key={post.slug}>
            <PostPreview
              key={post.slug}
              title={post.title}
              coverImage={post.coverImage}
              date={post.date}
              readingTime={post.readingTime}
              author={post.author}
              slug={post.slug}
              excerpt={post.excerpt}
              color={post.color}
              size={70}
            />
          </ListItem>
        ))}
      </List>
    </Section>
  );
}

StoriesList.propTypes = {
  title: PropTypes.string,
  posts: PropTypes.arrayOf(postPropType),
};
