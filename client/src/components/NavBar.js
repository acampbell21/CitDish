import React, { Component } from 'react';
import { Segment, Menu, Icon, Button, Image, Divider, Grid, Sidebar } from 'semantic-ui-react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleLogout } from '../actions/auth';
import cdLogo from '../images/cd-logo.png';
import Tutorial from './Tutorial'

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
  navIcon: {
    marginRight: '10px',
  },
  supportEmail: {
    color: 'white',
  },
  tutorial: {
    color: 'white',
    fontSize: '18px',
  }
}

class NavBar extends Component {
  state = { navVisible: true };

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
    const { dispatch, history, user, children } = this.props;

    return(
      <Sidebar.Pushable as={Segment} basic>
        <Sidebar as={Menu} animation='push' visible={this.state.navVisible} vertical inverted>
          <Menu.Item name='home'>
            <Link to='/'>
              <Image style={styles.logo} src={cdLogo} alt='CitizenDish Logo' fluid />
            </Link>
          </Menu.Item>
          <Divider clearing style={styles.divider} />
          <Menu.Item name='camera'>
            <Grid>
              <Grid.Row>
                <Grid.Column width={8}>
                  <Link to='/account'>
                    <Image
                      src={user.image}
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
          <Divider clearing style={styles.divider} />
          { this.navLinks(user) }
          <Divider clearing style={styles.divider} />
            <Menu.Item>
              <Link to='/tutorial' style={styles.tutorial} icon="question">? Tutorial</Link>
            </Menu.Item>
          <Menu.Item>
            <a style={styles.supportEmail} href="mailto:support@citizendish.com">
              support@citizendish.com
            </a>
          </Menu.Item>
        </Sidebar>
        <Sidebar.Pusher>
          <Segment basic>
            { children }
          </Segment>
          <Button 
            onClick={() => this.setState({ navVisible: !this.state.navVisible})}
            style={{ borderRadius: '999px', marginTop: '10%' }}
            icon={ this.state.navVisible ? 'arrow left' : 'arrow right' }
          />
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.user };
};

export default withRouter(connect(mapStateToProps)(NavBar));
