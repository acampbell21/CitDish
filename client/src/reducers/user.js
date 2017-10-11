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
    case 'SET_CRM_OAUTH':
      const { integration, oauthResult } = action;
      return { ...state, crm_oauth: { integration, ...oauthResult } };
    default:
      return state;
  }
};

export default user;
