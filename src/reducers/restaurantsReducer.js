import {
	EXECUTE_SEARCH,
	EXECUTE_SEARCH_SUCCESS,
	EXECUTE_SEARCH_FAIL
} from '../actions/types';

const INITIAL_STATE = {
	restaurants: [],
	totalEntries: 0,
	per_page: 25,
	current_page: 1,
	loading: false,
	error: ''
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case EXECUTE_SEARCH:
			return { ...state, loading: true, restaurants: [], totalEntries: 0 };
		case EXECUTE_SEARCH_SUCCESS:
			const { restaurants, total_entries } = action.payload;
			return {
				...state,
				loading: false,
				restaurants,
				totalEntries: total_entries
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
