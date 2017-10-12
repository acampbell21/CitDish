import axios from 'axios';
import { setFlash } from './flash';
import { setHeaders } from './headers';

const login = (user, headers) => (
  { type: 'LOGIN', user, headers }
) 

export const setOauth = (oauthResult, getCrmClients = false) => {
  return(dispatch) => {
    axios.post('/api/oauth', { oauth_result: oauthResult })
      .then( res => {
        const { data: user, headers } = res;
        dispatch(login(user, headers));
        dispatch(setFlash('Connected To Your Account Successfully!', 'green'));
        if(getCrmClients)
          dispatch(setClients());
      })
      .catch( res => {
        dispatch(setFlash('Error Connecting To Your Account. Try Again.', 'red'));
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
        if(callback)
          callback();
    });
  }
}

export const disconnectSocialOAuth = () => {
  return(dispatch) => {
    axios.put('/api/oauth/disconnect_social')
      .then( res => {
        const { data: user, headers } = res;
        dispatch(login(user, headers))
      })
      .catch( res => {
        dispatch(setFlash('Error Disconnecting Social. Try Again.', 'red'));
        dispatch(setHeaders(res.headers));
    });
  }
}

export const disconnectCrmOAuth = () => {
  return(dispatch) => {
    axios.put('/api/oauth/disconnect_crm')
      .then( res => {
        const { data: user, headers } = res;
        dispatch(login(user, headers))
      })
      .catch( res => {
        dispatch(setFlash('Error Disconnecting CRM. Try Again.', 'red'));
        dispatch(setHeaders(res.headers));
      })
  };
}

export const setLinkedInProfilePic = () => {
  return(dispatch) => {
    axios.put('/api/oauth/set_linkedin_profile_pic')
      .then( res => {
        const { data: user, headers } = res;
        dispatch(login(user, headers));
        dispatch(setFlash('Now Using LinkedIn Profile Pic!', 'green'));
      })
      .catch(res => {
        dispatch(setFlash('Error Using LinkedIn Profile Pic. Try Again.', 'red'));
        dispatch(setHeaders(res.headers));
      })
  }
}