const contacts = (state = [], action) => {
  switch (action.type) {
    case 'SET_CONTACTS':
      return action.contacts;
    default:
      return state;
  }
};

export default contacts;
