import axios from 'axios';
import { setFlash } from './flash';
import { setHeaders } from './headers';

export const fetchProjects = () => {
  return(dispatch) => {
    axios.get('/api/projects')
      .then( res => {
        const { data: projects, headers } = res;
        dispatch({ type: 'SET_PROJECTS', projects, headers });
      })
      .catch( res => {
        setFlash('Error Loading Projects', 'red');
        dispatch(setHeaders(res.headers));
    });
  }
}
