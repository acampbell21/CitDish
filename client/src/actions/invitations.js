import axios from 'axios';
import { setFlash } from './flash';
import { setHeaders } from './headers';


export const acceptInvitation = (invite, history) => {
  return(dispatch) => {
    axios.post('/invitation/accept', { invite })
      .then( res => {
        dispatch(setHeaders(res.headers));
        dispatch(setFlash('Welcome to Citizen Dish please log in', 'green'))
        history.push('/login');
      })
      .catch( res => {
        const message = res.response.data.errors;
        dispatch(setHeaders(res.headers));
        dispatch(setFlash(message, 'red'));
      });
  }
}