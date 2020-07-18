import PostPreview from './post-preview';
import { em, px } from '../styles/units';
import styled from '@emotion/styled';

const Section = styled.section({});

const List = styled.div(
  ({ row }) =>
    row && {
      display: 'grid',
      gridGap: em(0.5),
      gridTemplateColumns: `repeat(auto-fill, minmax(${px(300)}, 81%))`,
      justifyContent: 'center',

      '@media screen and (min-width: 640px)': {
        gridTemplateColumns: `repeat(auto-fill, minmax(${px(300)}, 46%))`,
      },

      '@media screen and (min-width: 860px)': {
        gridTemplateColumns: `repeat(auto-fill, minmax(${px(300)}, 31%))`,
      },

      '@media screen and (min-width: 1280px)': {
        gridTemplateColumns: `repeat(auto-fill, minmax(${px(300)}, 24%))`,
      },
    }
);

const ListItem = styled.div({});

export default function StoriesList({ title, posts, row = false }) {
  return (
    <Section>
      {title && <h2>{title}</h2>}
      <List row={row}>
        {posts.map((post) => (
          <ListItem key={post.slug}>
            <PostPreview
              key={post.slug}
              title={post.title}
              coverImage={post.coverImage}
              date={post.date}
              author={post.author}
              slug={post.slug}
              excerpt={post.excerpt}
              color={post.color}
              size={row ? 80 : 70}
            />
          </ListItem>
        ))}
      </List>
    </Section>
  );
}
