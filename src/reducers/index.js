/* istanbul ignore file */
import { combineReducers } from 'redux';
import searchReducer from './searchReducer';
import restaurantsReducer from './restaurantsReducer';
import refineSearchReducer from './refineSearchReducer';

export default combineReducers({
	search: searchReducer,
	restaurants: restaurantsReducer,
	refineSearch: refineSearchReducer
});
