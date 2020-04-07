import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField, Box, CircularProgress } from '@material-ui/core';
import Autocomplete, {
	createFilterOptions
} from '@material-ui/lab/Autocomplete';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import styled from 'styled-components';

import {
	updateSearchQuery,
	closeSearchOptions,
	fetchOptions,
	setSearchOption
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
	componentDidMount() {
		this.props.fetchOptions();
	}

	onSearchQueryChange = (e) => {
		const query = e.target.value;
		this.props.updateSearchQuery(query);
	};

	renderSearchInput = (params) => {
		const { InputProps } = params;

		const { search } = this.props;

		return (
			<TextField
				{...params}
				label={'Search for a City'}
				placeholder={'Search for a City'}
				onChange={this.onSearchQueryChange}
				variant="outlined"
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
								<CircularProgress color="inherit" size={20} />
							) : null}
							{InputProps.endAdornment}
						</React.Fragment>
					)
				}}
			/>
		);
	};

	render() {
		const { search, closeSearchOptions, setSearchOption } = this.props;

		return (
			<Box display="flex" justifyContent="center" width={'100%'} mt={1.5}>
				<SearchAutocompleteInput
					id="city-search-options"
					onChange={(_, value) => setSearchOption(value)}
					autoHighlight
					inputValue={search.selectedOption}
					disabled={search.loading}
					open={search.isPopupOpen}
					onClose={closeSearchOptions}
					forcePopupIcon={false}
					filterOptions={filterOptions}
					options={search.options}
					renderInput={(params) => this.renderSearchInput(params)}
				/>
			</Box>
		);
	}
}

const mapStateToProps = (state) => ({ search: state.search });

export default connect(mapStateToProps, {
	updateSearchQuery,
	closeSearchOptions,
	fetchOptions,
	setSearchOption
})(SearchInput);
