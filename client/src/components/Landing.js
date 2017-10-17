import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Segment, Icon } from 'semantic-ui-react';
import NavBar from './NavBar';
import ProtectedRoute from './ProtectedRoute';
import NoMatch from './NoMatch';
import Portfolio from './Portfolio';
import Account from './Account';
import Payment from './Payment';
import Clients from './Clients';
import Tutorial from './Tutorial';
import Team from './Team';
import TopBar from './TopBar';
import OAuth from './OAuth';
import bgPattern from '../images/bg-pattern.jpg'
import Recorder from './Recorder';
import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0% {
    transform: scale(.9);
  }
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 50px rgba(#5a99d4, 0);
  }
  100% {
    transform: scale(.9);
    box-shadow: 0 0 0 0 rgba(#5a99d4, 0);
  }
`

const PulseButton = styled.span`
  position: fixed;
  display: block;
  width: 50px;
  height: 50px;
  font-size: 1.3em;
  text-align: center;
  top: 0;
  right: 0;
  z-index: 9999;
  line-height: 50px;
  letter-spacing: -1px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 0 0 0 rgba(#5a99d4, .5);
  animation: ${pulse} 1.5s infinite;
`

class Landing extends Component {
  noTopBarPaths = [ '/', '/portfolio' ];
  state = { navVisible: this.noTopBarPaths.includes(this.props.location.pathname) ? true : false };

  setNavVisible = (e, visible = false) => {
    this.setState({ navVisible: visible });
  }

  render() {
    const { user, history: { location: { pathname } } } = this.props;
    const { navVisible } = this.state;
    const showTopBar = !this.noTopBarPaths.includes(pathname);
    const menuStyle = showTopBar ? { background: 'white', color: 'rgb(0, 145, 210)' } : { background: 'rgb(0, 145, 210)', color: 'white' };

    if(user.id) {
      return(
        <Segment basic style={styles.mainCanvas}>
          <PulseButton
            style={menuStyle}
            onClick={ () => this.setState({ navVisible: !navVisible })}
          >
            <Icon name='align justify' />
          </PulseButton>
          <NavBar visible={navVisible} setNavVisible={this.setNavVisible}>
            { !this.noTopBarPaths.includes(pathname) && <TopBar path={pathname} /> }
            <Switch>
              <ProtectedRoute exact path='/' component={Portfolio} />
              <ProtectedRoute exact path='/portfolio' component={Portfolio} />
              <ProtectedRoute exact path='/projects/:id/record' component={Recorder} />
              <ProtectedRoute exact path='/account' component={Account} />
              <ProtectedRoute exact path='/payment' component={Payment} />
              <ProtectedRoute exact path='/team' component={Team} />
              <ProtectedRoute exact path='/clients' component={Clients} />
              <ProtectedRoute exact path='/tutorial' component={Tutorial} />
              <ProtectedRoute exact path='/oauth' component={OAuth} />

              {/* No Route Below This!! */}
              <Route component={NoMatch} />
            </Switch>
          </NavBar>
        </Segment>
      )
    } else {
      if(this.props.location.pathname === '/register')
        return(<Redirect to='/register' />)
      else
        return(<Redirect to='/login' />)
    }
  }
}

const styles = {
  mainCanvas: {
    background: `url(${bgPattern}) no-repeat center center fixed`,
    backgroundSize: 'cover',
    padding: 0,
    height: '100vh'
  },
}

const mapStateToProps = (state) => {
  return { user: state.user };
}

export default connect(mapStateToProps)(Landing);
