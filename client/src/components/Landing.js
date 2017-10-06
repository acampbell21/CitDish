import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import { clearFlash } from '../actions/flash';
import NavBar from './NavBar';
import ProtectedRoute from './ProtectedRoute';
import Flash from './Flash';
import NoMatch from './NoMatch';
import Portfolio from './Portfolio';
import Account from './Account';
import Payment from './Payment';
import Clients from './Clients';
import Team from './Team';
import TopBar from './TopBar';
import OAuth from './OAuth';
import bgPattern from '../images/bg-pattern.jpg'

class Landing extends Component {
  render() {
    const { dispatch, user, history: { location: { pathname } } } = this.props;
    const noTopBarPaths = [ '/', '/portfolio' ];

    if(user.id) {
      dispatch(clearFlash());
      return(
        <Grid>
          <Grid.Row>
            <Grid.Column width={3} style={styles.navBar}>
              <NavBar />
            </Grid.Column>
            <Grid.Column width={13} style={styles.mainCanvas}>
              <Flash />
              { !noTopBarPaths.includes(pathname) && <TopBar path={pathname} /> }
              <Switch>
                <ProtectedRoute exact path='/' component={Portfolio} />
                <ProtectedRoute exact path='/portfolio' component={Portfolio} />
                <ProtectedRoute exact path='/account' component={Account} />
                <ProtectedRoute exact path='/payment' component={Payment} />
                <ProtectedRoute exact path='/team' component={Team} />
                <ProtectedRoute exact path='/clients' component={Clients} />
                <ProtectedRoute exact path='/oauth' component={OAuth} />

                {/* No Route Below This!! */}
                <Route component={NoMatch} />
              </Switch>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      )
    } else {
      return(<Redirect to='/login' />)
    }
  }
}

const styles = {
  navBar: {
    padding: 0,
  },
  mainCanvas: {
    background: `url(${bgPattern}) no-repeat center center fixed`,
    backgroundSize: 'cover',
    padding: 0,
  },
}

const mapStateToProps = (state) => {
  return { user: state.user };
}

export default connect(mapStateToProps)(Landing);
