import React from 'react';
import { Segment, Menu, Icon, Button, Image, Divider, Grid } from 'semantic-ui-react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleLogout } from '../actions/auth';
import cdLogo from '../images/cd-logo.png';

const styles = {
  navbar: {
    height: '100vh',
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
}

const navLinks = () => {
  const links = [
    {url: '/portfolio', text: 'Portfolio', icon: 'block layout'},
    {url: '/account', text: 'Account', icon: 'user'},
    {url: '/payment', text: 'Payment', icon: 'credit card alternative'},
    {url: '/team', text: 'Manage Team', icon: 'users'},
  ]

  return links.map(link => {
    return(
      <Segment basic>
        <NavLink activeStyle={styles.activeNavStyle} style={styles.navStyle} to={link.url}>
          <Icon style={styles.navIcon} inverted name={link.icon} />
          {link.text}
        </NavLink>
      </Segment>
    )
  })
}

const NavBar = ({ dispatch, history, user }) => (
  <Segment inverted style={styles.navbar}>
    <Menu.Item name='home'>
      <Image style={styles.logo} src={cdLogo} alt='CitizenDish Logo' fluid />
    </Menu.Item>
    <Divider clearing style={styles.divider} />
    <Menu.Item name='camera'>
      <Grid>
        <Grid.Row>
          <Grid.Column width={8}>
            <Link to='/account'>
              <Image src={user.image} alt='User Profile Image' fluid shape='circular' />
            </Link>
          </Grid.Column>
          <Grid.Column width={8}>
            <p>{user.name}</p>
            <Button compact size='tiny' onClick={() => dispatch(handleLogout(history))}>Logout</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Menu.Item>
    <Divider clearing style={styles.divider} />
    { navLinks() }
    <Divider clearing style={styles.divider} />
  </Segment>
)

const mapStateToProps = state => {
  return { user: state.user };
};

export default withRouter(connect(mapStateToProps)(NavBar));
