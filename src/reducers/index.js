import { combineReducers } from 'redux';
import searchReducer from './searchReducer';
import restaurantsReducer from './restaurantsReducer';

export default combineReducers({
	search: searchReducer,
	restaurants: restaurantsReducer
});
