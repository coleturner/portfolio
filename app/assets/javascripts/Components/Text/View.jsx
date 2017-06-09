import React from 'react';
import Embedly from 'react-embedly';

import classNames from 'classnames';

import Hashtag from './Hashtag';
import Span from './Span';

export const URL_SPLIT_REGEX = new RegExp('((?:(?:https?|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?!(?:10|127)(?:\\.\\d{1,3}){3})(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))\\.?)(?::\\d{2,5})?(?:[/?#]\\S*)?)', 'i');

export const URL_REGEX_EXACT = new RegExp('^(?:(?:https?|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?!(?:10|127)(?:\\.\\d{1,3}){3})(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))\\.?)(?::\\d{2,5})?(?:[/?#]\\S*)?$', 'i');

export const TOKEN_REGEX = /(\s|,|\.|\!|\?)/g;
export const HASHTAG_REGEXP = /^#[a-zA-Z\d]+$/i;

export default class Text extends React.PureComponent {
  static propTypes = {
    children: React.PropTypes.node.isRequired,
    className: React.PropTypes.any,
    hashtags: React.PropTypes.bool,
    links: React.PropTypes.bool
  };

  static defaultProps = {
    hashtags: true,
    links: true
  };

  tokenize(str) {
    if (Array.isArray(str)) {
      return str.reduce((previous, value) => {
        const split = this.tokenize(value);
        if (Array.isArray(split)) {
          previous.push(...split);
        } else {
          previous.push(split);
        }

        return previous;
      }, []);
    } else if (typeof str === 'object') {
      return str;
    } else if (typeof str === 'string') {
      if (str.match(URL_REGEX_EXACT)) {
        return [str];
      }

      return str.split(URL_SPLIT_REGEX).reduce((a, b) => {
        if (b.match(URL_REGEX_EXACT)) {
          return a.concat([b]);
        }

        return a.concat(b.split(TOKEN_REGEX));
      }, []);
    }

    throw new `Typeof ${(typeof str)} is not supported for Text component children.`;
  }


  isHashtag(word) {
    return word.match(HASHTAG_REGEXP);
  }

  format(children) {
    const { hashtags, links } = this.props;

    return this.tokenize(children)
      .map((token, index) => {
        if (typeof token === 'string') {
          if (hashtags && this.isHashtag(token)) {
            return <Hashtag key={`hashtag_${token}_${index}`}>{token}</Hashtag>;
          } else if (links && token.match(URL_REGEX_EXACT) && process.env.EMBEDLY_API_KEY !== '') {
            return <Embedly key={`embedly_${token}_${index}`} url={token} apiKey={process.env.EMBEDLY_API_KEY} />;
          }
        }

        return token;
      }).reduce((acc, token) => {
        if (acc.length > 0 && typeof acc[acc.length - 1] === 'string' && typeof token === 'string') {
          acc[acc.length - 1] = acc[acc.length - 1] + token;
        } else {
          acc.push(token);
        }

        return acc;
      }, []);
  }

  render() {
    const { children, className, hashtags, links, ...otherProps } = this.props;

    const formatted = this.format(children);

    return (
      <Span className={classNames('text', className)} {...otherProps}>
        {formatted}
      </Span>
    );
  };
}
