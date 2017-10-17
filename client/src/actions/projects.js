import axios from 'axios';
import { setFlash } from './flash';
import { setHeaders } from './headers';

export const fetchProjects = () => {
  return(dispatch) => {
    axios.get('/api/projects.json')
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

export const addProject = (clients, title, files, history) => {
  return(dispatch) => {
    axios.post('/api/projects.json', { project: { clients, title, files } })
      .then(res => {
        const { data: project, headers } = res;
        history.push(`/projects/${project.id}/record`);
        dispatch({ type: 'ADD_PROJECT', project, headers });
      })
      .catch(res => {
        dispatch(setHeaders(res.headers));
        dispatch(setFlash('Error Creating Project. Try Again.', 'red'));
    });
  }
}
