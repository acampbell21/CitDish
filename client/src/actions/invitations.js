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
        const { response: { data: { errors } }, headers } = res;
        dispatch(setHeaders(res.headers));
        dispatch(setFlash(errors, 'red'));
      });
  }
}