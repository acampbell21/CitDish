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
import Team from './Team';

class Landing extends Component {
  render() {
    if(this.props.user.id) {
      this.props.dispatch(clearFlash());
      
      return(
        <Grid>
          <Grid.Row>
            <Grid.Column width={3}>
              <NavBar />
            </Grid.Column>
            <Grid.Column width={13}>
              <Flash />
              <Switch>
                <ProtectedRoute exact path='/' component={Portfolio} />
                <ProtectedRoute exact path='/portfolio' component={Portfolio} />
                <ProtectedRoute exact path='/account' component={Account} />
                <ProtectedRoute exact path='/payment' component={Payment} />
                <ProtectedRoute exact path='/team' component={Team} />

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

const mapStateToProps = (state) => {
  return { user: state.user };
}

export default connect(mapStateToProps)(Landing);
