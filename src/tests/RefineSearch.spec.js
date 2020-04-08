import React from 'react';
import mockAxios from 'axios';
import { cleanup, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import RefineSearch from '../components/RefineSearch';
import { renderWithRedux } from './testHelpers';

const restaurants = [
	{
		id: 21307,
		name: 'Beer Restaurant',
		address: '1 Benvenuto Place',
		city: 'Toronto',
		state: 'ON',
		area: 'Toronto / SW Ontario',
		postal_code: 'M4V 2L1',
		country: 'CA',
		phone: '4169618011',
		lat: 43.68207,
		lng: -79.40041,
		price: 4,
		reserve_url: 'http://www.opentable.com/single.aspx?rid=21307',
		mobile_reserve_url: 'http://mobile.opentable.com/opentable/?restId=21307',
		image_url: 'https://www.opentable.com/img/restimages/21307.jpg'
	},
	{
		id: 82957,
		name: "The Sultan's Tent",
		address: '49 Front St E',
		city: 'Toronto',
		state: 'ON',
		area: 'Toronto / SW Ontario',
		postal_code: 'M5E 1B3',
		country: 'CA',
		phone: '4169610601x',
		lat: 43.648033,
		lng: -79.374377,
		price: 4,
		reserve_url: 'http://www.opentable.com/single.aspx?rid=82957',
		mobile_reserve_url: 'http://mobile.opentable.com/opentable/?restId=82957',
		image_url: 'https://www.opentable.com/img/restimages/82957.jpg'
	}
];

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
			data: { restaurants, total_entries: 2, page: 1 }
		});
		expect(mockAxios.get).toHaveBeenCalledWith('/restaurants', {
			params: { city: 'Toronto', address: 'beer', page: 1 }
		});
		// Searches by address
		expect(mockAxios.get).toHaveBeenCalledTimes(2);
		await mockAxios.get.mockResolvedValueOnce({
			data: { restaurants, total_entries: 2, page: 1 }
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
			data: { restaurants, total_entries: 2, page: 1 }
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
			data: { restaurants, total_entries: 2, page: 1 }
		});
	});
});
