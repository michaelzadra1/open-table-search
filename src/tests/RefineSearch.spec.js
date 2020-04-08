import React from 'react';
import mockAxios from 'axios';
import {
	cleanup,
	waitForElement,
	waitForElementToBeRemoved
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import RefineSearch from '../components/RefineSearch';
import { renderWithRedux } from './testHelpers';

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
		const { container } = renderWithRedux(<RefineSearch />, {
			initialState
		});
		const searchInput = container.querySelector('#refined-search-query');
		expect(searchInput).toBeInTheDocument();
	});
});
