import React from 'react';
import PropTypes from 'prop-types';

export default function YoutubeVideo({ title, url }) {
  const youtubeURL = new URL(url);
  const videoID = youtubeURL?.searchParams?.get('v');

  if (!videoID) {
    return (
      <a href={url} target="_blank" rel="nofollow noreferrer">
        Watch video: {title}
      </a>
    );
  }

  return (
    <iframe
      width="100%"
      height="500"
      src={`https://www.youtube.com/embed/${videoID}`}
      frameBorder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  );
}

YoutubeVideo.propTypes = {
  title: PropTypes.string,
  url: PropTypes.string,
};
