import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import AccountSocialMedia from './AccountSocialMedia';
import AccountDetails from './AccountDetails';
import AccountImages from './AccountImages';

class Account extends Component {

  render() {
    return (
      <Grid verticalAlign='middle' columns={12} padded="vertically" style={{ paddingTop: '100px' }}>
        <Grid.Row>
          <AccountImages />
          <AccountDetails />
          <AccountSocialMedia />
        </Grid.Row>
      </Grid>
    )
  }
}

export default Account

