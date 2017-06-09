import React from 'react';

export default class ReclineColorAppearance extends React.Component {
  render() {
    const {
      name,
      onChange,
      value,
      getComponentFor,
      read_only: disabled,
      ...otherProps
    } = this.props;

    const View = getComponentFor('div');
    const Label = getComponentFor('label');
    const Input = getComponentFor('input');


    return (
      <View className="form-group">
        <Label className="form-label">{name}</Label>
        <View className="form-control">
          <Input
            type="color"
            className="form-input"
            value={value}
            onChange={onChange}
            disabled={disabled}
            {...otherProps}
          />
        </View>
      </View>
    );
  }
}
