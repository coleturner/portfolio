import React from 'react';
import classNames from 'classnames';

import Button from '../Components/Button';
import Flex from '../Components/Flex';
import Divider from '../Components/Divider';
import Dropdown from '../Components/Dropdown';
import Menu from '../Editor/Menu';
import Form from './Form';
import VersionSelector from './VersionSelector';
import Paragraph from '../Components/Paragraph';
import View from '../Components/View';
import Wrapper from '../Editor/Wrapper';

import updateModel from './Mutations/UpdateModelMutation';

const valueTypes = ['boolValue', 'floatValue', 'intValue', 'stringValue'];

export default class ReclineScreen extends React.Component {
  static contextTypes = {
    route: React.PropTypes.object,
    router: React.PropTypes.object
  }

  static propTypes = {
    props: React.PropTypes.object.isRequired,
    model: React.PropTypes.object.isRequired,
    nodeID: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.string
    ]).isRequired,
    updateTimeout: React.PropTypes.number.isRequired
  }

  static defaultProps = {
    updateTimeout: 2000
  }

  constructor(...args) {
    super(...args);

    this.state = {
      dirty: false,
      form: this.props.form,
      isSubmitting: false,
      selectedVersion: null,
      updateQueue: []
    };
  }

  onSubmit = () => {
    if (!this.state.updateQueue.length || this.state.isSubmitting) {
      return;
    }

    this.setState({ isSubmitting: true });

    this.props.relay.environment::updateModel(
      this.props.nodeID,
      this.state.updateQueue.reduce((prev, val) => {
        return { ...prev, [val]: this.state.form[val] };
      }, {})
    ).then(result => {
      this.setState({
        dirty: false,
        isSubmitting: false,
        updateQueue: []
      });
    }).catch(error => {
      this.setState({ isSubmitting: false });
      console.error(error);
    });
  }

  updateTimeout = null

  onFormChange = (form) => {

    const keys = [...new Set(this.state.updateQueue.concat(Object.keys(form)))];

    this.setState({
      dirty: true,
      form: {
        ...this.state.form,
        ...form
      },
      updateQueue: keys
    });
  }

  getTitle() {
    // TODO: add recline_title to metadata

    return this.state.form.title;
  }

  getStatusText() {
    if (this.state.dirty) {
      return 'Pending Changes';
    } else if (this.state.isSubmitting) {
      return 'Saving...';
    }

    return 'Published';
  }

  selectVersion = (selectedVersion) => {
    this.setState({ selectedVersion });
  }

  versionView() {
    const keys = Object.keys(this.state.form);
    const comparison = this.state.selectedVersion.object.reduce((previous, object) => {
      const valueKey = valueTypes.find(key => object[key] !== null);

      return {
        ...previous,
        [object.attribute]: object[valueKey]
      };
    }, {});

    const items = keys.map(key => {
      const attribute = this.props.model.attributes.find(attr => {
        return attr.name === key;
      });

      if (!attribute) {
        console.warn('Attribute', key, 'not found in model');
        return null;
      }

      if (attribute.name === this.props.model.primaryKey) {
        return null;
      }

      const fieldName = attribute.field_name || attribute.name;
      const value = comparison[fieldName];

      if (!!!value) {
        console.warn('Attribute', fieldName, 'not found in version object');
        return null;
      }

      return (
        <Flex key={key} className="compare-attributes">
          <View className="old-version">
            {value}
          </View>
          <View className="current-version">
            {this.state.form[key].toString()}
          </View>
        </Flex>
      );
    }).filter(a => a);

    return (
      <View className="version-screen">
        {items.length
          ? items
          : <Paragraph className="no-fields">There are no fields to compare...</Paragraph>}
      </View>
    );
  }

  editorView() {
    const { model } = this.props;
    const { versions } = model;

    return (
      <Flex className="editor-main-container">
        <View className="content">

          <Form
            model={this.props.model}
            form={this.state.form}
            onChange={this.onFormChange}
          />

        </View>
        <View className="sidebar">
          <View className="form-group">
            <label className="form-label">
              <View
                className={classNames(
                  'status-indicator',
                  this.state.dirty ? 'draft' : 'published'
                )} />
                {this.getStatusText()}
            </label>
            <View className="form-control">
              <Button
                className="success full"
                disabled={!this.state.dirty || this.state.isSubmitting}
                onClick={this.onSubmit}>
                Publish
              </Button>
            </View>
          </View>
          <Divider />

          <VersionSelector
            versions={versions}
            onSelectVersion={this.selectVersion} />

        </View>
      </Flex>
    );
  }

  render() {

    if (typeof document !== 'undefined') {
      document.title = `${this.state.dirty ? '*' : ''} ${this.getTitle()}`;
    }

    const view = this.state.selectedVersion
      ? this.versionView()
      : this.editorView();

    return (
      <Wrapper>
        <Menu title={this.getTitle()}>
          <View className="actions">
            <Dropdown toggle={
              <Button>Actions</Button>
            }>
              <Button className="menu-item">
                New Article
              </Button>
              <Button className="menu-item">
                Duplicate
              </Button>
              <Button className="menu-item">
                Delete
              </Button>
            </Dropdown>

            <Button>Preview</Button>
          </View>
        </Menu>
        <View className="editor-screen">
          {view}
        </View>
      </Wrapper>
    );
  }
}
