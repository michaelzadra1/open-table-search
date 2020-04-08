import React from 'react';
import mockAxios from 'axios';
import { cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import RestaurantList from '../components/RestaurantList';
import { renderWithRedux } from './testHelpers';
import {
	longRestaurantsListMock,
	shortRestaurantsListMock
} from '../__mocks__/mock';

describe('<RestaurantList />', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	afterEach(() => {
		cleanup();
	});

	let initialState = {
		search: { selectedOption: 'Toronto', searchTouched: true },
		restaurants: {
			restaurants: [],
			loading: true,
			page: 1,
			perPage: 25,
			error: '',
			totalEntries: 0
		}
	};
	it('renders progress circle when loading restaurants', async () => {
		const { queryByTestId } = renderWithRedux(<RestaurantList />, {
			initialState
		});
		expect(queryByTestId('loading-restaurants'));
	});
	it('renders error messaging when loading restaurants failed', async () => {
		initialState = {
			...initialState,
			restaurants: {
				...initialState.restaurants,
				error: 'Error Loading',
				loading: false
			}
		};
		const { getByText } = renderWithRedux(<RestaurantList />, {
			initialState
		});
		expect(getByText('Error Loading'));
	});
	it('renders empty results messaging if serch is touched and returns no results', async () => {
		initialState = {
			...initialState,
			restaurants: {
				...initialState.restaurants,
				error: '',
				restaurants: [],
				loading: false
			}
		};
		const { getByText, debug } = renderWithRedux(<RestaurantList />, {
			initialState
		});
		expect(getByText('Empty search results. Try again with a new query.'));
	});
	it('does NOT render empty results messaging if serch is touched and returns no results', async () => {
		initialState = {
			...initialState,
			search: {
				...initialState.search,
				searchTouched: false
			},
			restaurants: {
				...initialState.restaurants,
				error: '',
				restaurants: [],
				loading: false
			}
		};
		const { queryByText } = renderWithRedux(<RestaurantList />, {
			initialState
		});
		expect(
			queryByText('Empty search results. Try again with a new query.')
		).not.toBeInTheDocument();
	});
	it('renders list and fetches new restaurants on pagination click', async () => {
		initialState = {
			...initialState,
			search: {
				...initialState.search,
				searchTouched: true
			},
			restaurants: {
				...initialState.restaurants,
				error: '',
				restaurants: longRestaurantsListMock,
				loading: false,
				totalEntries: 26
			}
		};
		const { debug, getByText, container } = renderWithRedux(
			<RestaurantList />,
			{
				initialState
			}
		);
		expect(getByText('Scaramouche Restaurant'));
		const nextPage = container.querySelector(
			'[aria-label="Go to next page"]'
		);
		userEvent.click(nextPage);
		expect(mockAxios.get).toHaveBeenCalledWith('/restaurants', {
			params: { city: 'Toronto', page: 2 }
		});
		await mockAxios.get.mockResolvedValueOnce({
			data: { shortRestaurantsListMock, total_entries: 2, page: 2 }
		});
		expect(mockAxios.get).toHaveBeenCalledTimes(1);
	});
});
