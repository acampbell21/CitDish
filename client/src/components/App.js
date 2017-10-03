import React from 'react';
import { Route } from 'react-router-dom';
import Login from './Login';
import FetchUser from './FetchUser';
import Landing from './Landing';

const App = () => (
  <FetchUser>
    <Route path='/' component={Landing} />
    <Route exact path='/login' component={Login} />
  </FetchUser>
)

export default App;
