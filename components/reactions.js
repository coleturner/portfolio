import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { REACTIONS } from 'lib/constants';
import styled from '@emotion/styled';
import useSWR from 'swr';
import { debounce } from 'lodash';

const fetcher = async (url) => {
  const res = await fetch(url);
  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(data.message);
  }
  return data;
};

const ReactionSVGS = {
  LIKE: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      enableBackground="new 0 0 64 64"
    >
      <circle cx="32" cy="32" r="30" fill="#ffdd67"></circle>
      <g fill="#664e27">
        <circle cx="20.5" cy="26.6" r="5"></circle>
        <circle cx="43.5" cy="26.6" r="5"></circle>
        <path d="m44.6 40.3c-8.1 5.7-17.1 5.6-25.2 0-1-.7-1.8.5-1.2 1.6 2.5 4 7.4 7.7 13.8 7.7s11.3-3.6 13.8-7.7c.6-1.1-.2-2.3-1.2-1.6"></path>
      </g>
    </svg>
  ),
  LOVE: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      enableBackground="new 0 0 64 64"
    >
      <path
        d="M62,32c0,16.6-13.4,30-30,30C15.4,62,2,48.6,2,32C2,15.4,15.4,2,32,2C48.6,2,62,15.4,62,32z"
        fill="#ffdd67"
      ></path>
      <g fill="#f46767">
        <path d="m61.8 13.2c-.5-2.7-2-4.9-4.5-5.6-2.7-.7-5.1.3-7.4 2.7-1.3-3.6-3.3-6.3-6.5-7.7-3.2-1.4-6.4-.4-8.4 2.1-2.1 2.6-2.9 6.7-.7 12 2.1 5 11.4 15 11.7 15.3.4-.2 10.8-6.7 13.3-9.9 2.5-3.1 3-6.2 2.5-8.9"></path>
        <path d="m29 4.7c-2-2.5-5.2-3.5-8.4-2.1-3.2 1.4-5.2 4.1-6.5 7.7-2.4-2.3-4.8-3.4-7.5-2.6-2.4.7-4 2.9-4.5 5.6-.5 2.6.1 5.8 2.5 8.9 2.6 3.1 13 9.6 13.4 9.8.3-.3 9.6-10.3 11.7-15.3 2.2-5.3 1.4-9.3-.7-12"></path>
      </g>
      <path
        d="m49 38.1c0-.8-.5-1.8-1.8-2.1-3.5-.7-8.6-1.3-15.2-1.3-6.6 0-11.7.7-15.2 1.3-1.4.3-1.8 1.3-1.8 2.1 0 7.3 5.6 14.6 17 14.6 11.4-.1 17-7.4 17-14.6"
        fill="#664e27"
      ></path>
      <path
        d="m44.7 38.3c-2.2-.4-6.8-1-12.7-1-5.9 0-10.5.6-12.7 1-1.3.2-1.4.7-1.3 1.5.1.4.1 1 .3 1.6.1.6.3.9 1.3.8 1.9-.2 23-.2 24.9 0 1 .1 1.1-.2 1.3-.8.1-.6.2-1.1.3-1.6 0-.8-.1-1.3-1.4-1.5"
        fill="#fff"
      ></path>
    </svg>
  ),
  LOL: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      enableBackground="new 0 0 64 64"
    >
      <circle cx="32" cy="32" r="30" fill="#ffdd67"></circle>
      <g fill="#664e27">
        <path d="m51.7 19.4c.6.3.3 1-.2 1.1-2.7.4-5.5.9-8.3 2.4 4 .7 7.2 2.7 9 4.8.4.5-.1 1.1-.5 1-4.8-1.7-9.7-2.7-15.8-2-.5 0-.9-.2-.8-.7 1.6-7.3 10.9-10 16.6-6.6"></path>
        <path d="m12.3 19.4c-.6.3-.3 1 .2 1.1 2.7.4 5.5.9 8.3 2.4-4 .7-7.2 2.7-9 4.8-.4.5.1 1.1.5 1 4.8-1.7 9.7-2.7 15.8-2 .5 0 .9-.2.8-.7-1.6-7.3-10.9-10-16.6-6.6"></path>
        <path d="m49.7 34.4c-.4-.5-1.1-.4-1.9-.4-15.8 0-15.8 0-31.6 0-.8 0-1.5-.1-1.9.4-3.9 5 .7 19.6 17.7 19.6 17 0 21.6-14.6 17.7-19.6"></path>
      </g>
      <path
        d="m33.8 41.7c-.6 0-1.5.5-1.1 2 .2.7 1.2 1.6 1.2 2.8 0 2.4-3.8 2.4-3.8 0 0-1.2 1-2 1.2-2.8.3-1.4-.6-2-1.1-2-1.6 0-4.1 1.7-4.1 4.6 0 3.2 2.7 5.8 6 5.8s6-2.6 6-5.8c-.1-2.8-2.7-4.5-4.3-4.6"
        fill="#4c3526"
      ></path>
      <path
        d="m24.3 50.7c2.2 1 4.8 1.5 7.7 1.5s5.5-.6 7.7-1.5c-2.1-1.1-4.7-1.7-7.7-1.7s-5.6.6-7.7 1.7"
        fill="#ff717f"
      ></path>
      <path
        d="m47 36c-15 0-15 0-29.9 0-2.1 0-2.1 4-.1 4 10.4 0 19.6 0 30 0 2 0 2-4 0-4"
        fill="#fff"
      ></path>
    </svg>
  ),
  WOW: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      enableBackground="new 0 0 64 64"
    >
      <circle cx="32" cy="32" r="30" fill="#ffdd67"></circle>
      <circle cx="19" cy="29" r="11" fill="#fff"></circle>
      <path
        d="m24 29c0 2.8-2.2 5-5 5-2.8 0-5-2.2-5-5s2.2-5 5-5c2.8 0 5 2.2 5 5"
        fill="#664e27"
      ></path>
      <path
        d="m56 29c0 6.1-4.9 11-11 11-6.1 0-11-4.9-11-11 0-6.1 4.9-11 11-11 6.1 0 11 4.9 11 11"
        fill="#fff"
      ></path>
      <path
        d="m50 29c0 2.8-2.2 5-5 5-2.8 0-5-2.2-5-5s2.2-5 5-5c2.8 0 5 2.2 5 5"
        fill="#664e27"
      ></path>
      <g fill="#917524">
        <path d="m50.2 15.8c-3.2-2.7-7.5-3.9-11.7-3.1-.6.1-1.1-2-.4-2.2 4.8-.9 9.8.5 13.5 3.6.6.5-1 2.1-1.4 1.7"></path>
        <path d="m25.5 12.5c-4.2-.7-8.5.4-11.7 3.1-.4.4-2-1.2-1.4-1.7 3.7-3.2 8.7-4.5 13.5-3.6.7.2.2 2.3-.4 2.2"></path>
      </g>
      <circle cx="32" cy="49" r="9" fill="#664e27"></circle>
      <path
        d="m26 46c1.2-2.4 3.4-4 6-4 2.6 0 4.8 1.6 6 4h-12"
        fill="#fff"
      ></path>
    </svg>
  ),
};

const ReactionsPositionRelative = styled.div`
  position: relative;
`;

const ReactionsPositionSticky = styled.div`
  position: sticky;
  top: 5em;
  right: 0;
`;

const ReactionsContainer = styled.div`
  position: absolute;
  right: 100%;
  padding: 0 1em;
  margin: 1em 0;
  margin-right: 3em;
  border-right: 1px solid var(--page-background-color-invert-15);
`;

const Reaction = styled.div`
  padding: 0 1em;
  border-radius: 1em;
  margin: 0.25em;
  cursor: pointer;
  text-align: center;

  &:hover .grow {
    transform: scale(1.45);
  }
`;

const ReactionIcon = styled.button`
  background: transparent;
  border: 0;

  font-size: 2em;
  transition: transform 150ms;
`;

const ReactionCount = styled.div`
  font-size: 1rem;
  user-select: none;
`;

const ReactionText = styled.div`
  display: none;
`;

const postReactions = debounce(
  (postId, updates, onExecute) => {
    if (!Object.keys(updates).length) {
      return Promise.resolve(null);
    }

    onExecute();

    return fetch(`/api/posts/${postId}/addReaction`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
  },
  1000,
  { trailing: true }
);

export default function Reactions({ postId }) {
  const mutations = useRef({});
  const { data = {}, mutate } = useSWR(
    () => postId && `/api/posts/${postId}/reactions`,
    fetcher
  );

  const addReaction = (event, name) => {
    const animateTarget = event.currentTarget?.querySelector('.rotate');
    if (animateTarget && animateTarget.animate) {
      animateTarget.animate(
        [
          { transform: 'scale(1.45) rotateY(0deg)' },
          { transform: 'scale(1) rotateY(360deg)' },
        ],
        {
          duration: 500,
          iterations: 1,
        }
      );
    }

    mutations.current = {
      ...mutations.current,
      [name]: (mutations.current?.[name] || 0) + 1,
    };

    // Update the client side
    mutate(
      (reactions) => ({ ...reactions, [name]: (reactions?.[name] || 0) + 1 }),
      false
    );

    // Update the server
    postReactions(postId, { ...mutations.current }, () => {
      mutations.current = {};
    });
  };

  return (
    <ReactionsPositionSticky>
      <ReactionsPositionRelative>
        <ReactionsContainer>
          {Object.entries(REACTIONS).map(([name, emoji]) => {
            const count = data[name] || 0;
            return (
              <Reaction key={name} onClick={(e) => addReaction(e, name)}>
                <ReactionIcon className="grow rotate">
                  {ReactionSVGS[name] || emoji}
                </ReactionIcon>
                <ReactionCount className="st-count">
                  {count || ''}
                </ReactionCount>
                <ReactionText>{name}</ReactionText>
              </Reaction>
            );
          })}
        </ReactionsContainer>
      </ReactionsPositionRelative>
    </ReactionsPositionSticky>
  );
}

Reactions.propTypes = {
  postId: PropTypes.string.isRequired,
};
