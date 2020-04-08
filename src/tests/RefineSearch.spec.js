import React from 'react';
import mockAxios from 'axios';
import { cleanup, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import RefineSearch from '../components/RefineSearch';
import { renderWithRedux } from './testHelpers';
import { shortRestaurantsListMock } from '../__mocks__/mock';

describe('<SearchInput />', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	afterEach(() => {
		cleanup();
	});

	let initialState = {
		refineSearch: {
			refineQuery: ''
		},
		restaurants: {
			page: 1,
			totalEntries: 0
		},
		search: {
			searchTouched: false,
			selectedOption: 'Toronto'
		}
	};

	it('does not render refine search input when search has not been touched', async () => {
		const { container } = renderWithRedux(<RefineSearch />, {
			initialState
		});
		const searchInput = container.querySelector('#refined-search-query');
		expect(searchInput).not.toBeInTheDocument();
	});
	it('renders refine search input when search has been touched', async () => {
		initialState = {
			...initialState,
			search: {
				...initialState.search,
				searchTouched: true
			}
		};
		const { container } = renderWithRedux(<RefineSearch />, {
			initialState
		});
		const searchInput = container.querySelector('#refined-search-query');
		expect(searchInput).toBeInTheDocument();
	});
	it('performs search with refined query on enter press of input', async () => {
		initialState = {
			...initialState,
			search: {
				...initialState.search,
				searchTouched: true
			}
		};
		const { container } = renderWithRedux(<RefineSearch />, {
			initialState
		});
		const searchInput = container.querySelector('#refined-search-query');
		// Search by pressing enters
		userEvent.type(searchInput, 'beer');
		fireEvent.keyPress(searchInput, { key: 'Enter', code: 13, charCode: 13 });
		// Searches by name
		expect(mockAxios.get).toHaveBeenCalledWith('/restaurants', {
			params: { city: 'Toronto', name: 'beer', page: 1 }
		});
		await mockAxios.get.mockResolvedValueOnce({
			data: { shortRestaurantsListMock, total_entries: 2, page: 1 }
		});
		expect(mockAxios.get).toHaveBeenCalledWith('/restaurants', {
			params: { city: 'Toronto', address: 'beer', page: 1 }
		});
		// Searches by address
		expect(mockAxios.get).toHaveBeenCalledTimes(2);
		await mockAxios.get.mockResolvedValueOnce({
			data: { shortRestaurantsListMock, total_entries: 2, page: 1 }
		});
	});
	it('performs search with refined query on click of refine search button', async () => {
		initialState = {
			...initialState,
			search: {
				...initialState.search,
				searchTouched: true
			}
		};
		const { getByTestId, container } = renderWithRedux(<RefineSearch />, {
			initialState
		});
		const searchInput = container.querySelector('#refined-search-query');
		userEvent.type(searchInput, 'beer');
		// Search by clicking button
		userEvent.click(getByTestId('refine-search-button'));
		// Searches by name
		expect(mockAxios.get).toHaveBeenCalledWith('/restaurants', {
			params: { city: 'Toronto', name: 'beer', page: 1 }
		});
		await mockAxios.get.mockResolvedValueOnce({
			data: { shortRestaurantsListMock, total_entries: 2, page: 1 }
		});
	});
	it('performs search with empty refined query param', async () => {
		initialState = {
			...initialState,
			search: {
				...initialState.search,
				searchTouched: true
			}
		};
		const { getByTestId } = renderWithRedux(<RefineSearch />, {
			initialState
		});
		// Search by clicking button
		userEvent.click(getByTestId('refine-search-button'));
		// Searches by name
		expect(mockAxios.get).toHaveBeenCalledWith('/restaurants', {
			params: { city: 'Toronto', page: 1 }
		});
		await mockAxios.get.mockResolvedValueOnce({
			data: { shortRestaurantsListMock, total_entries: 2, page: 1 }
		});
	});
});
