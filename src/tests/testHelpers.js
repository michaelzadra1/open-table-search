import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import { render } from '@testing-library/react';

import reducers from '../reducers';

export const renderWithRedux = (
	component,
	{
		initialState,
		store = createStore(
			reducers,
			initialState,
			compose(applyMiddleware(reduxThunk))
		)
	}
) => {
	return {
		...render(<Provider store={store}>{component}</Provider>)
	};
};
