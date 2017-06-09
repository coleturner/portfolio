import React from 'react';
import { Link, withRouter } from 'found';
import classNames from 'classnames';

import Button from '../../../Components/Button';
import Flex from '../../../Components/Flex';
import Icon from '../../../Components/Icon';

export class ReferenceList extends React.PureComponent {

  static propTypes = {
    getComponentFor: React.PropTypes.func.isRequired,
    references: React.PropTypes.array.isRequired
  }

  render() {
    const { references, getComponentFor } = this.props;
    const View = getComponentFor('div');

    return (
      <View className="content-entry-container">
        <View className="content-entry-list">
          {references.map((block, index) => {
            return (
              <Flex
                className="entry-link"
                key={'id' in block ? block.id : index}>
                <View className="draggable"></View>
                <View className="entry-status">
                  <View className={classNames('status-indicator', block.status.toLowerCase())} />
                </View>
                <View className="entry-title">
                  <Link to={{ pathname: `/editor/${block.id}` }}>
                    {block.title}
                  </Link>
                </View>
                <View className="entry-actions">
                  <Link to={{ pathname: `/editor/${block.id}` }}>
                    <Icon id={Icon.LIST.EDIT} />
                  </Link>
                  <Button className="transparent">
                    <Icon id={Icon.LIST.UNLINK} />
                  </Button>
                </View>
              </Flex>
            );
          })}
        </View>
        <Flex className="form-actions button-options">
          <Button>Create Entry</Button>
          <Button>Link Existing Entries</Button>
        </Flex>
      </View>
    );
  }
}

export default withRouter(ReferenceList);
