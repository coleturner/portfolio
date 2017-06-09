import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

export default class ReclineDropdownAppearance extends React.Component {
  render() {
    const { name, onChange, value, getComponentFor } = this.props;

    const View = getComponentFor('div');
    const Label = getComponentFor('label');
    const Input = getComponentFor('input');

    return (
      <View className="form-dropdown-field">

      </View>
    );
  }
}
