import {} from '../actions/types';

const INITIAL_STATE = {
	name: '',
	address: '',
	area: ''
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		// case FETCH_OPTIONS_FAIL:
		// 	return { ...state };
		default:
			return state;
	}
};
