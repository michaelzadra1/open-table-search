import {
	UPDATE_SEARCH_AREA,
	UPDATE_SEARCH_ADDRESS,
	UPDATE_SEARCH_NAME
} from '../actions/types';

const INITIAL_STATE = {
	name: '',
	address: '',
	area: ''
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case UPDATE_SEARCH_AREA:
			return { ...state, area: action.payload };
		case UPDATE_SEARCH_ADDRESS:
			return { ...state, address: action.payload };
		case UPDATE_SEARCH_NAME:
			return { ...state, name: action.payload };
		default:
			return state;
	}
};
