import React from 'react';
import { Link, withRouter } from 'found';
import classNames from 'classnames';

import Logo from '../Logo';
import View from '../../Components/View';

import ifDocument from '../../ifDocument';

export class HeaderView extends React.PureComponent {

  constructor(...args) {
    super(...args);
    this.onClickListener = ::this.onClick;
  }

  static propTypes = {
    features: React.PropTypes.object.isRequired,
    user: React.PropTypes.object
  }

  static defaultProps = {
    features: [],
    user: null
  }

  state = { contentBarVisible: false, featureIndex: 0, searchFormOpen: false, userMenuOpen: false }

  logo() {
    if (1 == 2) {
      return (
        <View className="brand">
          <Logo />
        </View>
      );
    }

    return (
      <h1 className="brand">
        <Logo />
      </h1>
    );
  }

  navigation() {
    return (
      <View className="navigation-main">
        <a className="combo" href="https://forum.everydaycarry.com/">Forum</a>
        <a className="combo" href="/submissions/create">Submit</a>
        <a onClick={(e) => { e.preventDefault(); this.setState({ searchFormOpen: true }); }} className="combo" href="/search"><i className="fa fa-search"></i></a>

        <View id="more-menu" className="dropdown" style={{ display: 'none' }}>
          <a className="toggle" href="#more"><i className="fa fa-bars"></i> <span className="caret"></span></a>
          <ul className="menu">
          </ul>
        </View>
      </View>
    );
  }

  searchForm() {
    // <script src="//cdn.jsdelivr.net/algoliasearch/3/algoliasearch.jquery.min.js"></script>
    return (
      <form id="search-form" className="form-inline" action="/search" method="GET">
        <View className="input-group"><input autoComplete="off" className="pure-input" type="text" name="q" /></View>
      </form>
    );
  }

  userlinks() {
    return (
      <View id="userlinks">
        {this.props.user ? this.loggedInMenu() : this.loggedOutMenu()}
      </View>
    );
  }

  loggedInMenu() {
    if (this.props.user.disabled === '1') {
      return (
        <View className="userlink with-avatar">
          <a href="/profile">
            <img src={this.props.user.avatar} alt="" className="avatar" />
            <span className="username hide">{this.props.user.name}</span>
          </a>
        </View>
      );
    }

    return (
      <View className="userlink with-menu with-avatar">
        <a onClick={::this.toggleUserMenu} href="/profile">
          <img src={this.props.user.avatar} alt="" className="avatar" />
          <span className="username hide">{this.props.user.name}</span>
          <span className="caret"></span>
        </a>
        {this.state.userMenuOpen ? this.loggedInUserMenu() : null}
      </View>
    );
  }

  loggedOutMenu() {
    return (
      <View className="userlink"><a href="/login">Login</a></View>
    );
  }

  loggedInUserMenu() {
    return (
      <nav>
        {this.props.user.role === 'super' ? <a href="/admin">Administration</a> : null}
        <a href="/notifications">Notifications</a>
        <a href="/profile">Profile</a>
        <a href="/friends">Friends</a>
        <a href="/settings">Settings</a>
        <a href="/submissions">My Submissions</a>
        <a href="/items">My Items</a>
        <a href="/favorites">Favorites</a>
        <a href="/login/clear">Sign Out</a>
      </nav>
    );
  }

  contentBar() {
    return (

      <View
        className="content-bar"
        onMouseOver={::this.showContentBar}
        onMouseOut={::this.hideContentBar}>

        <View className="container">
          {this.props.features.map((feature, index) => {
            if (this.state.featureIndex !== index) {
              return null;
            }

            return (
              <View key={'feature-' + feature.tag} className="content-set">
                {feature.posts.map((post, postIndex) => {
                  console.log("post", post);
                  return (
                    <a href={post.url} key={'post-' + postIndex} className="post">
                      <View className="image" style={{ backgroundImage: 'url(' + post.image + ')' }}></View>
                      <View className="feature-title">{post.title}</View>
                    </a>
                  );
                })}
              </View>
            );
          })}
        </View>
        <View className="controls container">
          {this.props.features.map((feature, index) => {
            return (
              <a
                key={index}
                className={classNames(this.state.featureIndex === index ? 'focus' : null)}
                href={'/articles/' + feature.tag}
                onMouseOver={() => this.setState({ featureIndex: index })}
                onMouseOut={() => this.setState({ featureIndex: 0 })}>
                  {feature.name}
              </a>
            );
          })}
        </View>
      </View>
    );
  }

  hideContentBarTimeout = null
  showContentBar() {
    clearTimeout(this.hideContentBarTimeout);
    this.setState({ contentBarVisible: true });
  }

  hideContentBar() {
    this.hideContentBarTimeout = setTimeout(() => {
      this.setState({ contentBarVisible: false });
    }, 300);
  }

  categoryBar() {
    return (
			<View id="category-bar">
				<View className="container">
          <Link to="/products">Trending Gear</Link>
					<Link activeClassName="active" to="/knives">Knives</Link>
					<Link activeClassName="active" to="/gadgets">Gadgets</Link>
					<Link activeClassName="active" to="/keychains">Keychains</Link>
					<Link activeClassName="active" to="/bags-pouches">Bags</Link>
					<Link activeClassName="active" to="/watches">Watches</Link>
					<Link activeClassName="active" to="/pens">Pens</Link>
					<Link activeClassName="active" to="/notebooks">Notebooks</Link>
					<Link activeClassName="active" to="/flashlights">Flashlights</Link>
					<Link activeClassName="active" to="/wallets">Wallets</Link>
					<Link activeClassName="active" to="/multi-tools">Multitools</Link>
				</View>
			</View>
    );
  }

  toggleUserMenu(e) {
    e.preventDefault();
    this.setState({ userMenuOpen: !this.state.userMenuOpen });
  }

  onClickListener = null;
  onClick() {
    if (this.state.userMenuOpen) {
      this.setState({ userMenuOpen: false });
    }
  }

  componentWillMount() {
    ifDocument(() => {
      document.addEventListener('click', this.onClickListener);
    });
  }

  componentWillUnmount() {
    ifDocument(() => {
      document.removeEventListener('click', this.onClickListener);
    });
  }

  render() {
    return (
      <header id="app-header">
        <View id="brand-header">
          <View className="container flex">
            {this.logo()}
            <nav id="navigation">
              {!this.state.searchFormOpen ? this.navigation() : null}
              {this.state.searchFormOpen ? this.searchForm() : null}
            </nav>
            {this.userlinks()}
          </View>
        </View>
        {this.state.contentBarVisible ? this.contentBar() : null}
        {this.categoryBar()}
      </header>
    );
  }
}

export default withRouter(HeaderView);
