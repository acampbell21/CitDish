import { combineReducers } from 'redux';
import user from './user';
import flash from './flash';
import projects from './projects';
import clients from './clients';

const rootReducer = combineReducers({
  user,
  flash,
  projects,
  clients,
});

export default rootReducer;
