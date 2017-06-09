import React from 'react';
import Field from './Field';

export default class ReclineForm extends React.Component {
  static propTypes = {
    form: React.PropTypes.object.isRequired,
    model: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired
  }

  constructor(...args) {
    super(...args);
    this.boundGetComponentFor = (element) => this.getComponentFor(element);
  }

  componentWillMount() {
    this.setFormBinders(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.setFormBinders(nextProps);
  }

  getComponentFor(element) {
    return element;
  }

  setFormBinders(props) {
    const formKeys = props.model.attributes.map(attr => attr.name);

    this.boundOnChangeInput = formKeys.reduce((previous, key) => {
      return {
        ...previous,
        [key]: (e) => {
          this.props.onChange({ [key]: e.target.value });
        }
      };
    }, {});
  }

  state = { form: {} }

  render() {
    const { form, model } = this.props;
    const { attributes } = model;

    const formKeys = Object.keys(form);

    return (
      <fieldset className="form-fields">
        {attributes
          .filter(attr => formKeys.includes(attr.name))
          .map(attribute => {
            const { name } = attribute;
            return (
              <Field
                key={attribute.name}
                {...attribute}
                value={this.props.form[name]}
                onChange={this.boundOnChangeInput[name]}
                getComponentFor={this.props.getComponentFor || this.boundGetComponentFor}
              />
            )
          })}
      </fieldset>
    );
  }
}
