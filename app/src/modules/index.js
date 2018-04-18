import { combineReducers } from 'redux';

import user from './user/reducers';
import answerSort from './answerSort/reducers';

export default combineReducers({
  user,
  answerSort
});
