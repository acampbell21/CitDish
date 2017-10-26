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

export const deleteProject = (id) => {
  return (dispatch) => {
    axios.delete(`/api/projects/${id}`)
      .then ( res => {
	      const { data: headers } = res;      
      	dispatch({ type: 'DELETE_PROJECT', id, headers }); 
      })
      .catch( res => {
	      dispatch(setFlash('Error Deleting Project. Try Again,', 'red'));
	      dispatch(setHeaders(res.headers));
    });	
  }
}

export const updateProject = (project, id) => {
  debugger
  return (dispatch) => {
    debugger
    axios.put(`/api/projects/${project}`, { project })
      .then( res => {
        const { data: projects, headers } = res;
        dispatch({ type: 'UPDATE_PROJECT', project, projects, headers });
      })
      .catch( res => {
        dispatch(setFlash('Error Updating Project. Try again,', 'red'));
        dispatch(setHeaders(res.headers));
      })
  }
}