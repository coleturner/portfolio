import React from 'react';
import View from '../../Components/View';

export const ContentButton = (props) => {
  const {
    className = 'button',
    url: href,
    contents
  } = props;

  return (
    <View className="button-entry-controls">
      <View className="form-group">
        <label htmlFor={props.id + '-url'}>
          URL
        </label>
        <View className="input-container">
          <input className="form-input" type="url" id={props.id + '-url'} value={href} />
        </View>
      </View>
      <View className="form-group">
        <label htmlFor={props.id + '-text'}>
          Text
        </label>
        <View className="input-container">
          <input className="form-input" type="url" id={props.id + '-text'} value={contents} />
        </View>
      </View>
    </View>
  );
};

export default ContentButton;
