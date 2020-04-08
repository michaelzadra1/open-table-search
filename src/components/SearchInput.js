import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
	TextField,
	Box,
	CircularProgress,
	FormControl,
	FormHelperText,
	Typography
} from '@material-ui/core';
import Autocomplete, {
	createFilterOptions
} from '@material-ui/lab/Autocomplete';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import styled from 'styled-components';
import { isEmpty } from 'lodash';

import {
	updateSearchQuery,
	closeSearchOptions,
	fetchOptions,
	executeSearch,
	updateRefineQuery
} from '../actions';

const SearchAutocompleteInput = styled(Autocomplete)`
	width: 300px;
`;

// TODO: consider adding your own version of this
const filterOptions = createFilterOptions({
	matchFrom: 'start',
	startAfter: 1,
	ignoreCase: true,
	ignoreAccents: true
});

class SearchInput extends Component {
	static propTypes = {
		fetchOptions: PropTypes.func.isRequired,
		updateSearchQuery: PropTypes.func.isRequired,
		closeSearchOptions: PropTypes.func.isRequired,
		executeSearch: PropTypes.func.isRequired,
		search: PropTypes.shape({
			options: PropTypes.arrayOf(PropTypes.string).isRequired,
			loading: PropTypes.bool.isRequired,
			isPopupOpen: PropTypes.bool.isRequired,
			query: PropTypes.string.isRequired,
			selectedOption: PropTypes.string,
			error: PropTypes.string.isRequired
		})
	};

	componentDidMount() {
		this.props.fetchOptions();
	}

	onSearchQueryChange = (e) => {
		const query = e.target.value;
		this.props.updateSearchQuery(query);
	};

	onSearchOptionChange = (_, value) => {
		const {
			updateSearchQuery,
			updateRefineQuery,
			executeSearch
		} = this.props;

		updateSearchQuery(value);
		updateRefineQuery('');
		executeSearch({ city: value, refineQuery: '' });
	};

	renderSearchInput = (params) => {
		const { InputProps } = params;

		const { search } = this.props;

		return (
			<TextField
				{...params}
				label="Search for a City"
				variant="outlined"
				value={search.query}
				onChange={this.onSearchQueryChange}
				error={!isEmpty(search.error)}
				InputProps={{
					...InputProps,
					startAdornment: (
						<Box mr={1}>
							<LocationCityIcon />
						</Box>
					),
					endAdornment: (
						<React.Fragment>
							{search.loading ? (
								<CircularProgress
									color="inherit"
									size={20}
									data-testid="loading-options"
								/>
							) : null}
							{InputProps.endAdornment}
						</React.Fragment>
					)
				}}
			/>
		);
	};

	render() {
		const { search, closeSearchOptions } = this.props;

		return (
			<React.Fragment>
				<Typography component="h2" variant="srOnly">
					Start search by typing and selecting a city in the input below
				</Typography>
				<Box display="flex" justifyContent="center" width={'100%'} my={3}>
					<FormControl error={!isEmpty(search.error)}>
						<SearchAutocompleteInput
							id="search-options"
							onChange={this.onSearchOptionChange}
							autoHighlight
							disableClearable
							inputValue={search.selectedOption}
							disabled={search.loading || !isEmpty(search.error)}
							open={search.isPopupOpen}
							onClose={closeSearchOptions}
							forcePopupIcon={false}
							filterOptions={filterOptions}
							options={search.options}
							renderInput={(params) => this.renderSearchInput(params)}
						/>
						{!isEmpty(search.error) ? (
							<FormHelperText role="error">
								{search.error}
							</FormHelperText>
						) : null}
					</FormControl>
				</Box>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => ({ search: state.search });

export default connect(mapStateToProps, {
	updateSearchQuery,
	closeSearchOptions,
	fetchOptions,
	executeSearch,
	updateRefineQuery
})(SearchInput);
