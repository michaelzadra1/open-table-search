import openTableApi from '../apis/openTable';
import {
	FETCH_OPTIONS,
	FETCH_OPTIONS_SUCCESS,
	FETCH_OPTIONS_FAIL
} from './types';

export const fetchOptions = () => async (dispatch) => {
	dispatch({ type: FETCH_OPTIONS });
	try {
		const res = await openTableApi.get('/cities');
		dispatch({ type: FETCH_OPTIONS_SUCCESS, payload: res.data.cities });
	} catch (err) {
		dispatch({ type: FETCH_OPTIONS_FAIL });
	}
};
