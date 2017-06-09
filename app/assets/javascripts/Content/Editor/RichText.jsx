import React from 'react';
import classNames from 'classnames';
import ReactMarkdown from 'react-markdown';
import Textarea from 'react-textarea-autosize';


import HeadingPreview from '../Render/Heading';
import LinkPreview from '../Render/Link';
import View from '../../Components/View';

const EDITOR = Symbol();
const PREVIEW = Symbol();

const setModeForState = (mode) => {
  return (state) => {
    return {
      ...state,
      mode
    };
  };
};

export default class RichTextEditor extends React.PureComponent {
  static childContextTypes = {
    contentProps: React.PropTypes.object
  }

  constructor(...args) {
    super(...args);

    this.showEditor = () => this.setState(setModeForState(EDITOR));
    this.showPreview = () => this.setState(setModeForState(PREVIEW));
  }

  state = { mode: EDITOR }

  getChildContext() {
    return {
      contentProps: this.props
    };
  }

  content(source) {
    if (this.state.mode === EDITOR) {
      return (
        <Textarea
          className="form-input"
          minRows={4}
          defaultValue={source} />
      );
    }

    return (
      <ReactMarkdown
        className="markdown"
        renderers={{
          'Heading': HeadingPreview,
          'Link': LinkPreview
        }}
        source={source} />
    )
  }

  render() {
    const { source } = this.props;

    return (
      <View className="markdown-editor">
        <View className="tab-menu">
          <View className={classNames('tab', this.state.mode === EDITOR ? 'active' : null)} onClick={this.showEditor}>Editor</View>
          <View className={classNames('tab', this.state.mode === PREVIEW ? 'active' : null)} onClick={this.showPreview}>Preview</View>
        </View>
        {this.content(source)}
      </View>
    );
  }
}
