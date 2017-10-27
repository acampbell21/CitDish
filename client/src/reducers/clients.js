const clients = (state = [], action) => {
  switch(action.type) {
    case 'SET_CLIENTS':
      return action.clients;
    case 'SINGLE_CLIENT':
      return [action.clients, ...state];
    default:
      return state;
  }
}

export default clients;
