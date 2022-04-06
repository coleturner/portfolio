import React from 'react';
import PropTypes from 'prop-types';
import postPropType from 'components/propTypes/postPropType';
import PostPreview from 'components/post-preview';
import styled from '@emotion/styled';

const Section = styled.section``;
const List = styled.div``;
const ListItem = styled.div``;

const Heading = styled.h2`
  text-align: center;
  font-size: 2em;
  text-decoration: underline;
  text-decoration-color: var(--post-complementary-color);
  text-underline-position: under;
`;

export default function StoriesList({
  title,
  posts,
  usePreviewImage = true,
  usePostColor = false,
}) {
  return (
    <Section>
      {title && <Heading>{title}</Heading>}
      <List>
        {posts.map((post) => (
          <ListItem key={post.slug}>
            <PostPreview
              key={post.slug}
              title={post.title}
              coverImage={usePreviewImage ? post.coverImage : null}
              date={post.date}
              readingTime={post.readingTime}
              author={post.author}
              slug={post.slug}
              excerpt={post.excerpt}
              color={usePostColor ? post.color : null}
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
  usePreviewImage: PropTypes.bool,
  usePostColor: PropTypes.bool,
};
