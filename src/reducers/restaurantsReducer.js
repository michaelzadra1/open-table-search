import {
	EXECUTE_SEARCH,
	EXECUTE_SEARCH_SUCCESS,
	EXECUTE_SEARCH_FAIL
} from '../actions/types';

const INITIAL_STATE = {
	restaurants: [],
	totalEntries: 0,
	perPage: 25,
	page: 1,
	loading: false,
	error: ''
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case EXECUTE_SEARCH:
			return { ...state, loading: true, restaurants: [] };
		case EXECUTE_SEARCH_SUCCESS:
			const { restaurants, total_entries, current_page } = action.payload;
			return {
				...state,
				loading: false,
				restaurants,
				totalEntries: total_entries,
				page: current_page
			};
		case EXECUTE_SEARCH_FAIL:
			return {
				...state,
				loading: false,
				error:
					'Unexpected error searching for restaurants. Please try again later.'
			};
		default:
			return state;
	}
};
