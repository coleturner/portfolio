import React from 'react';

export default class ReclineRatingAppearance extends React.Component {
  render() {
    const { name, onChange, value, getComponentFor } = this.props;

    const View = getComponentFor('div');
    const Label = getComponentFor('label');
    const Input = getComponentFor('input');

    throw new Error('Implement this');
  }
}
