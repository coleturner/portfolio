import React from 'react';
import { Link, withRouter } from 'found';

import { H3 } from '../../Components/Heading';
import Flex from '../../Components/Flex';
import Hyperlink from '../../Components/Hyperlink';
import Icon from '../../Components/Icon';
import Text from '../../Components/Text';
import Timestamp from '../../Components/Timestamp';
import View from '../../Components/View';

export class ArticlePreviewContent extends React.PureComponent {
  render() {
    const { title, slug, summary, created } = this.props;

    return (
      <View className="article-preview-content">
        <Flex className="attributes">
          <H3><Link to={`/${slug}`}>{title}</Link></H3>
          <Flex className="anchor">
            <Timestamp className="timestamp" dateTime={created} />
            <View className="read-more">
              <Link to={`/${slug}`}>
                <Icon id={Icon.LIST.READ_MORE} />
              </Link>
            </View>
          </Flex>
        </Flex>
        {summary ? <Text className="summary">{summary}</Text> : null}

      </View>
    );
  }
}

export default withRouter(ArticlePreviewContent);
