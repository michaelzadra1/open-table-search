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
	UPDATE_REFINE_QUERY
} from '../actions/types';
import { isEmpty, minBy } from 'lodash';

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
export const executeSearch = ({ city, page = 1, refineQuery = '' }) => async (
	dispatch
) => {
	dispatch({ type: EXECUTE_SEARCH, payload: { city } });
	try {
		let res;
		// We perform a more complex search given a refine search query
		if (!isEmpty(refineQuery)) {
			const resNameSearch = await openTableApi.get('/restaurants', {
				params: {
					city,
					page,
					name: refineQuery
				}
			});
			// NOTE: No API capability of searching by area
			// const resAreaSearch = await openTableApi.get('/restaurants', {
			// 	params: {
			// 		city,
			// 		page,
			// 		area: refineQuery
			// 	}
			// });
			const resAddressSearch = await openTableApi.get('/restaurants', {
				params: {
					city,
					page,
					address: refineQuery
				}
			});
			// Get result with least amount of results - more precise
			res = minBy([resNameSearch, resAddressSearch], (res) => {
				if (res.data.total_entries !== 0) {
					return res.data.total_entries;
				}
			});
			// If all responses are 0, just return name search
			res = res ? res : resNameSearch;
		} else {
			res = await openTableApi.get('/restaurants', {
				params: {
					city,
					page
				}
			});
		}

		dispatch({ type: EXECUTE_SEARCH_SUCCESS, payload: res.data });
	} catch (err) {
		dispatch({ type: EXECUTE_SEARCH_FAIL });
	}
};

// Refine search
export const updateRefineQuery = (value) => {
	return {
		type: UPDATE_REFINE_QUERY,
		payload: value
	};
};
