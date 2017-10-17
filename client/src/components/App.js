import React from 'react';
import { Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import FetchUser from './FetchUser';
import Landing from './Landing';
import InviteConfirmation from './InviteConfirmation';
import Flash from './Flash';

const App = () => (
  <FetchUser>
    <Route path='/' component={Landing} />
    <Flash />
    <Route exact path='/login' component={Login} />
    <Route exact path='/invitation/accept' component={InviteConfirmation} />
    <Route exact path='/register' component={Register} />
  </FetchUser>
)

export default App;
