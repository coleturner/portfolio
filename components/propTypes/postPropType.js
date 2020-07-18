import PropTypes from 'prop-types';

export default PropTypes.shape({
  title: PropTypes.string,
  coverImage: PropTypes.shape({
    url: PropTypes.string,
  }),
  date: PropTypes.string,
  author: PropTypes.shape({
    name: PropTypes.string,
    picture: PropTypes.shape({
      url: PropTypes.string,
    }),
  }),
  slug: PropTypes.string,
  excerpt: PropTypes.string,
  color: PropTypes.string,
});
