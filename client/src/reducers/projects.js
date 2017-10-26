const projects = (state = [], action) => {
  switch(action.type) {
    case 'SET_PROJECTS':
      return action.projects;
    case 'UPDATE_PROJECT':
    debugger
      return state.map( p => {
        if (p.id === action.project.id)
          return action.project
        return p
      })
    case 'DELETE_PROJECT':
      return state.filter( project => { 
        if(project.id !== action.id) 
          return [...state]
      })
    default:
      return state;
  }
}

export default projects;
