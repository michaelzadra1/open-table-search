import openTableApi from '../apis/openTable';
import {
	UPDATE_SEARCH_QUERY,
	CLOSE_SEARCH_OPTIONS,
	SET_SEARCH_OPTION,
	FETCH_OPTIONS,
	FETCH_OPTIONS_SUCCESS,
	FETCH_OPTIONS_FAIL
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

export const setSearchOption = (option) => {
	return {
		type: SET_SEARCH_OPTION,
		payload: option
	};
};
