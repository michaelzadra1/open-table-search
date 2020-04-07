import {
	FETCH_OPTIONS,
	FETCH_OPTIONS_SUCCESS,
	FETCH_OPTIONS_FAIL
} from '../actions/types';

const INITIAL_STATE = {
	options: [],
	loading: true
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
				loading: false
			};
		default:
			return state;
	}
};
