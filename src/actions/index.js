import openTableApi from '../apis/openTable';
import {
	UPDATE_SEARCH_QUERY,
	CLOSE_SEARCH_OPTIONS,
	EXECUTE_SEARCH,
	FETCH_OPTIONS,
	FETCH_OPTIONS_SUCCESS,
	FETCH_OPTIONS_FAIL,
	EXECUTE_SEARCH_SUCCESS,
	EXECUTE_SEARCH_FAIL
} from '../actions/types';

export const fetchOptions = () => async (dispatch) => {
	dispatch({ type: FETCH_OPTIONS });
	try {
		const res = await openTableApi.get('/cities');
		dispatch({ type: FETCH_OPTIONS_SUCCESS, payload: res.data.cities });
	} catch (err) {
		dispatch({ type: FETCH_OPTIONS_FAIL });
	}
};

export const updateSearchQuery = (query) => {
	return {
		type: UPDATE_SEARCH_QUERY,
		payload: query
	};
};

export const closeSearchOptions = () => {
	return {
		type: CLOSE_SEARCH_OPTIONS
	};
};

// Restaurants
export const executeSearch = (option) => async (dispatch) => {
	dispatch({ type: EXECUTE_SEARCH, payload: option });
	try {
		const res = await openTableApi.get('/restaurants', {
			params: {
				city: option
			}
		});
		dispatch({ type: EXECUTE_SEARCH_SUCCESS, payload: res.data });
	} catch (err) {
		dispatch({ type: EXECUTE_SEARCH_FAIL });
	}
};
