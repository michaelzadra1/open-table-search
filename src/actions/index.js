import openTableApi from '../apis/openTable';
import {
	UPDATE_SEARCH_QUERY,
	CLOSE_SEARCH_OPTIONS,
	EXECUTE_SEARCH,
	FETCH_OPTIONS,
	FETCH_OPTIONS_SUCCESS,
	FETCH_OPTIONS_FAIL,
	EXECUTE_SEARCH_SUCCESS,
	EXECUTE_SEARCH_FAIL,
	UPDATE_SEARCH_AREA,
	UPDATE_SEARCH_ADDRESS,
	UPDATE_SEARCH_NAME
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
export const executeSearch = ({ city, page = 1 }) => async (dispatch) => {
	dispatch({ type: EXECUTE_SEARCH, payload: { city } });
	try {
		const res = await openTableApi.get('/restaurants', {
			params: {
				city,
				page
			}
		});
		dispatch({ type: EXECUTE_SEARCH_SUCCESS, payload: res.data });
	} catch (err) {
		dispatch({ type: EXECUTE_SEARCH_FAIL });
	}
};

// Refine search
export const updateSearchArea = (value) => {
	return {
		type: UPDATE_SEARCH_AREA,
		payload: value
	};
};
export const updateSearchAddress = (value) => {
	return {
		type: UPDATE_SEARCH_ADDRESS,
		payload: value
	};
};
export const updateSearchName = (value) => {
	return {
		type: UPDATE_SEARCH_NAME,
		payload: value
	};
};
