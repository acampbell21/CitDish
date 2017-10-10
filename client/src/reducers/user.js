const user = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...action.user };
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
