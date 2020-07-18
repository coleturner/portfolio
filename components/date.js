import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

export default function DateTime({ dateString }) {
  return (
    <time dateTime={dateString}>
      {format(new Date(dateString), 'LLLL	d, yyyy')}
    </time>
  );
}

DateTime.propTypes = {
  dateString: PropTypes.string,
};
