import axios from 'axios';
import { setFlash } from '../flash';

const setProjects = (projects) => {
  return { type: 'SET_PROJECTS', projects }
}

export const fetchProjects = () => {
  return(dispatch) => {
    axios.get('/api/projects')
      .then( res => {
        dispatch(setProjects(res.data));
      })
      .catch( res => {
        setFlash('Error Loading Projects', 'error');
      })
  }
}
