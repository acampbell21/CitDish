import React from 'react';
import { Grid } from 'semantic-ui-react';
import AccountIntegrations from './AccountIntegrations';
import AccountDetails from './AccountDetails';
import AccountImages from './AccountImages';

const Account = () => (
  <Grid verticalAlign='middle' columns={12} padded="vertically" style={{ paddingTop: '100px' }}>
    <Grid.Row>
      <AccountImages />
      <AccountDetails />
      <AccountIntegrations />
    </Grid.Row>
  </Grid>
);

export default Account;
