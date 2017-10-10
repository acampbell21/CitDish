import axios from 'axios';
import { setFlash } from './flash';
import { setHeaders } from './headers';

export const setOauth = (oauthResult) => {
  return(dispatch) => {
    axios.post('/api/oauth', { oauth_result: oauthResult })
      .then( res => {
        dispatch({ type: 'SET_CRM_OAUTH', integration: 'salesforce', oauthResult, headers: res.headers });
      })
      .catch( res => {
        dispatch(setFlash('Error Setting OAuth Data. Try Again.', 'red'));
        dispatch(setHeaders(res.headers));
    });
  }
}

export const setClients = (callback) => {
  return(dispatch) => {
    axios.get('/api/oauth/clients')
      .then(res => {
        const { data: clients, headers } = res;
        dispatch({ type: 'SET_CLIENTS', clients, headers });
      })
      .catch(res => {
        dispatch(setFlash('Error Setting Clients. Try Again!', 'red'));
        dispatch(setHeaders(res.headers));
      })
      .then( () => {
        callback();
    });
  }
}
