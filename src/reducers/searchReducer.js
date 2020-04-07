import {
	UPDATE_SEARCH_QUERY,
	CLOSE_SEARCH_OPTIONS,
	EXECUTE_SEARCH,
	EXECUTE_SEARCH_SUCCESS,
	FETCH_OPTIONS,
	FETCH_OPTIONS_SUCCESS,
	FETCH_OPTIONS_FAIL
} from '../actions/types';

const INITIAL_STATE = {
	options: [],
	loading: true,
	query: '',
	isPopupOpen: false,
	selectedOption: null,
	error: '',
	searchTouched: false
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case FETCH_OPTIONS:
			return { ...state, options: [], loading: true };
		case FETCH_OPTIONS_SUCCESS:
			return { ...state, options: action.payload, loading: false };
		case FETCH_OPTIONS_FAIL:
			return {
				...state,
				loading: false,
				error: 'Unexpected Error - Check Connection'
			};
		case UPDATE_SEARCH_QUERY:
			const query = action.payload;
			return {
				...state,
				query,
				isPopupOpen: query.length > 1
			};
		case CLOSE_SEARCH_OPTIONS:
			return { ...state, isPopupOpen: false };
		case EXECUTE_SEARCH:
			return {
				...state,
				query: action.payload.city,
				selectedOption: action.payload.city
			};
		case EXECUTE_SEARCH_SUCCESS:
			return {
				...state,
				searchTouched: true
			};
		default:
			return state;
	}
};
