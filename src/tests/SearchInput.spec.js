import React from 'react';
import mockAxios from 'axios';
import {
	cleanup,
	waitForElement,
	waitForElementToBeRemoved
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SearchInput from '../components/SearchInput';
import { renderWithRedux } from './testHelpers';

describe('<SearchInput />', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	afterEach(() => {
		cleanup();
	});

	let initialState = {
		search: {
			options: [],
			loading: true,
			query: '',
			isPopupOpen: false,
			selectedOption: null,
			error: ''
		}
	};
	it('shows progress circle when fetching search options and hides progress circle once results succesfully fetched', async () => {
		mockAxios.get.mockResolvedValueOnce({
			data: { cities: ['Toronto', 'Ottawa'] }
		});
		const { queryByTestId } = renderWithRedux(<SearchInput />, {
			initialState
		});
		// See loading progression while fetching options
		const loadingCircle = queryByTestId('loading-options');
		expect(loadingCircle).toBeInTheDocument();
		// Should see loading progression dissapear on succesful fetch
		await waitForElementToBeRemoved(() => queryByTestId('loading-options'));
		expect(mockAxios.get).toHaveBeenCalledTimes(1);
		expect(mockAxios.get).toHaveBeenCalledWith('/cities');
	});
	it('shows progress circle when fetching search options and displays error if fetch failed', async () => {
		mockAxios.get.mockRejectedValue(new Error('Error'));
		const { queryByTestId, getByText } = renderWithRedux(<SearchInput />, {
			initialState
		});
		// See loading progression while fetching options
		const loadingCircle = queryByTestId('loading-options');
		expect(loadingCircle).toBeInTheDocument();
		// Should see error message on failed fetch
		await waitForElement(() =>
			getByText('Unexpected Error - Check Connection')
		);
		expect(mockAxios.get).toHaveBeenCalledTimes(1);
		expect(mockAxios.get).toHaveBeenCalledWith('/cities');
	});

	it('selects a search option when clicking on one of the popup options', async () => {
		mockAxios.get.mockResolvedValueOnce({
			data: { cities: ['Toronto', 'Ottawa'] }
		});
		const {
			queryByTestId,
			queryByText,
			container,
			getByText
		} = renderWithRedux(<SearchInput />, {
			initialState
		});
		await waitForElementToBeRemoved(() => queryByTestId('loading-options'));
		const searchInput = container.querySelector('#search-options');
		// Should not see popup options if only typed 1 letter
		userEvent.type(searchInput, 'T');
		expect(queryByText('Toronto')).not.toBeInTheDocument();
		// Should see popup options if typed more than 1 letters
		userEvent.type(searchInput, 'Tor');
		userEvent.click(getByText('Toronto'));
		// Search nput should change to Toronto
		expect(searchInput.value).toBe('Toronto');
	});
});
