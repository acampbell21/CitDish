import React, { Component } from 'react';
import { Segment, Menu, Icon, Button, Image, Divider, Grid, Sidebar } from 'semantic-ui-react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleLogout } from '../actions/auth';
import cdLogo from '../images/cd-logo.png';
import Flash from './Flash';
import MissingAvatar from '../images/missing-avatar.png';

const styles = {
  logo: {
    paddingBottom: '25px',
  },
  divider: {
    backgroundColor: 'white',
  },
  navStyle: {
    color: 'white',
    fontSize: '18px',
  },
  activeNavStyle: {
    textDecoration: 'underline',
  },
  whiteOutline: {
    outlineColor: 'white',
    outlineStyle: 'solid',
    outlineWidth: '2px',
  },
  navIcon: {
    marginRight: '10px',
  },
  supportEmail: {
    color: 'white',
  },
  tutorial: {
    color: 'white',
    fontSize: '18px',
  },
  tutorialSegment: {
    display: 'flex',
    alignItems: 'baseline',
    position: 'absolute',
    bottom: '40px'
  },
  supportSegment: {
    display: 'flex',
    alignItems: 'baseline',
    position: 'absolute',
    bottom: '0px'
  }
}

class NavBar extends Component {
  navLinks = (user) => {
    const links = [
      {url: '/portfolio', text: 'Portfolio', icon: 'block layout'},
      {url: '/account', text: 'Account', icon: 'user'},
      {url: '/clients', text: 'Manage Clients', icon: 'address book'},
      {url: '/payment', text: 'Payment', icon: 'credit card alternative', admin: true},
      {url: '/team', text: 'Manage Team', icon: 'users', admin: true},
    ]

    return links.map( (link, index) => {
      if(link.admin && user.role !== 'admin')
        return null
      else
        return(
          <Segment basic key={index}>
            <NavLink
              onClick={this.props.setNavVisible}
              activeStyle={styles.activeNavStyle}
              style={styles.navStyle}
              to={link.url}
            >
              <Icon style={styles.navIcon} inverted name={link.icon} />
              {link.text}
            </NavLink>
          </Segment>
        )
    });
  }

  render() {
    const { dispatch, history, user, children, visible, setNavVisible } = this.props;
    const userImage = user.image ? user.image : MissingAvatar;

    return(
      <Sidebar.Pushable as={Segment} basic style={{ margin: 0 }}>
        <Sidebar as={Menu} animation='push' visible={visible} vertical inverted style={{ display: 'flex' }}>
          <Menu.Item style={styles.whiteOutline} name='home'>
            <Link to='/' onClick={setNavVisible}>
              <Image style={styles.logo} src={cdLogo} alt='CitizenDish Logo' fluid />
            </Link>
          </Menu.Item>
          <Menu.Item style={styles.whiteOutline} name='camera'>
            <Grid>
              <Grid.Row>
                <Grid.Column width={8}>
                  <Link onClick={() => setNavVisible(false)} to='/account'>
                    <Image
                      src={userImage}
                      alt='User Profile Image'
                      fluid shape='circular'
                  />
                  </Link>
                </Grid.Column>
                <Grid.Column width={8}>
                  <p>{user.name}</p>
                  <Button
                    compact
                    size='tiny'
                    onClick={() => dispatch(handleLogout(history))}
                  >
                    Logout
                </Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Menu.Item>
          { this.navLinks(user) }
          <Divider style={styles.divider} />
          <Segment basic style={styles.tutorialSegment}>
            <Link
              to='/tutorial'
              style={styles.tutorial}
              icon="question"
              onClick={setNavVisible}
            >
              ? Tutorial
            </Link>
          </Segment>
          <Segment basic style={styles.supportSegment}>
            <a style={styles.supportEmail} href="mailto:support@citizendish.com">
              support@citizendish.com
            </a>
          </Segment>
        </Sidebar>
        <Sidebar.Pusher>
          <Segment basic style={{ padding: 0 }}>
            <Flash />
            { children }
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.user };
};

export default withRouter(connect(mapStateToProps)(NavBar));
