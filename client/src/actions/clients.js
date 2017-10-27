import axios from 'axios';
import { setFlash } from './flash';
import { setHeaders } from './headers';

export const fetchClients = () => {
  return(dispatch) => {
    axios.get('/api/clients')
      .then(res => {
        const { data: clients, headers } = res;
        dispatch({ type: 'SET_CLIENTS', clients, headers });
      })
      .catch( res => {
        dispatch(setFlash('Error Getting Clients. Try Again!', 'red'));
        dispatch(setHeaders(res.headers));
    });
  }
}

export const singleClient = (id, history) => {
  return(dispatch) => {
    axios.get(`/api/clients/${id}`)
      .then( res => {
        dispatch({ type: 'SINGLE_CLIENT', clients: res.data})
        history.push(`/clients/${id}`)
      })
      .catch( res => {

      })
  }
}
