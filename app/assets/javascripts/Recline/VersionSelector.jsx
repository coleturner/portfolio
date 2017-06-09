import React from 'react';
import { List, ListItem } from '../Components/List';
import Timestamp from '../Components/Timestamp';
import View from '../Components/View';

export default class ReclineVersionSelector extends React.PureComponent {
  static propTypes = {
    onSelectVersion: React.PropTypes.func.isRequired,
    versions: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        id: React.PropTypes.string.isRequired,
        createdAt: React.PropTypes.string.isRequired
      })
    ).isRequired
  }

  render() {
    const { versions } = this.props;

    return (

      <View className="form-group">
        <label className="form-label">
          Revision History
        </label>
        <List className="version-selector form-control">
          {versions.map(version => {
            return (
              <ListItem
                key={version.id}
                onClick={() => this.props.onSelectVersion(version)}
                className="form-label">
                <Timestamp dateTime={version.createdAt} />
              </ListItem>
            );
          })}
        </List>
      </View>
    );
  }
}
