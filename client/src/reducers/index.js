import { combineReducers } from 'redux';
import user from './user';
import flash from './flash';
import projects from './projects';
import contacts from './contacts';

const rootReducer = combineReducers({
  user,
  flash,
  projects,
  contacts,
});

export default rootReducer;
