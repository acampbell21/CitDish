import axios from 'axios';
import { setFlash } from './flash';
import { setHeaders } from './headers';

// export const ADD_STUDEN = 'ADD_STUDENT';

// export const sendInvitation = (user) => {
//   return(dispatch) => {
//     axios.post('/api/invitation/send', { user })
//       .then( res => {
//         const { data, headers } = res;
//         dispatch({ type: ADD_STUDENT, student: data, headers });
//       })
//       .catch( err => {
//         const { first_name, last_name } = user;
//         dispatch(setHeaders(err.headers));
//         dispatch(setFlash(`Failed to invite ${first_name} ${last_name}`, 'red'));
//       })
//   }
// }

export const acceptInvitation = (invite, history) => {
  return(dispatch) => {
    axios.post('/invitation/accept', { invite })
      .then( res => {
        dispatch({ type: res.headers });
        dispatch(setFlash('Welcome to Citizen Dish please log in', 'info'))
        history.push('/login');
      })
      .catch( err => {
        const message = err.response.data.errors;
        dispatch(setHeaders(err.headers));
        dispatch(setFlash(message, 'red'));
      });
  }
}