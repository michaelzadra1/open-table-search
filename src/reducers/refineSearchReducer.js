import { UPDATE_REFINE_QUERY } from '../actions/types';

const INITIAL_STATE = {
	refineQuery: ''
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case UPDATE_REFINE_QUERY:
			return { ...state, refineQuery: action.payload };
		default:
			return state;
	}
};
