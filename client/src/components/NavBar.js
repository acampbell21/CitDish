import React from 'react';
import { Segment, Menu, Icon, Button, Image, Divider, Grid } from 'semantic-ui-react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleLogout } from '../actions/auth';
import cdLogo from '../images/cd-logo.png';
import Tutorial from './Tutorial'

const styles = {
  navbar: {
    height: '100vh',
    backgroundColor: '#333335',
    borderRadius: 0,
  },
  logo: {
    paddingTop: '25px',
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
  },
  navIcon: {
    marginRight: '10px',
  },
  supportEmail: {
    color: 'white',
  },
  tutorial: {
    color: 'white',
    fontSize: '16px',
  }
}

const navLinks = (user) => {
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

const NavBar = ({ dispatch, history, user }) => (
  <Segment inverted style={styles.navbar}>
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
    { navLinks(user) }
    <Divider clearing style={styles.divider} />
    <Grid>
      <Grid.Row>
        <Link to='/tutorial' style={styles.tutorial} icon="question">? Tutorial</Link>
      </Grid.Row>
      <Grid.Row>
        <a style={styles.supportEmail} href="mailto:support@citizendish.com">
          support@citizendish.com
        </a>
      </Grid.Row>
    </Grid>
  </Segment>
)

const mapStateToProps = state => {
  return { user: state.user };
};

export default withRouter(connect(mapStateToProps)(NavBar));
