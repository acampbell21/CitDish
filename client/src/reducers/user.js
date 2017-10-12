const user = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.user;
    case 'SET_IMAGE':
      return {...state, image: action.image}
    case 'SET_COMPANY_IMAGE':
      return {...state, company_image: action.company_image}
    case 'LOGOUT':
      return {};
    default:
      return state;
  }
};

export default user;
