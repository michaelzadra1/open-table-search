import {
	UPDATE_SEARCH_QUERY,
	CLOSE_SEARCH_OPTIONS,
	SET_SEARCH_OPTION,
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
	error: ''
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
				options: action.payload,
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
		case SET_SEARCH_OPTION:
			return { ...state, selectedOption: action.payload };
		default:
			return state;
	}
};
