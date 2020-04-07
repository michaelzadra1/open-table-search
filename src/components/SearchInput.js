import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
	TextField,
	Box,
	CircularProgress,
	FormControl,
	FormHelperText
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
	static propTypes = {
		fetchOptions: PropTypes.func.isRequired,
		updateSearchQuery: PropTypes.func.isRequired,
		closeSearchOptions: PropTypes.func.isRequired,
		setSearchOption: PropTypes.func.isRequired,
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

	renderSearchInput = (params) => {
		const { InputProps } = params;

		const { search } = this.props;

		return (
			<TextField
				{...params}
				label="Search for a City"
				placeholder="Search for a City"
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
				<FormControl error={!isEmpty(search.error)}>
					<SearchAutocompleteInput
						id="city-search-options"
						onChange={(_, value) => setSearchOption(value)}
						autoHighlight
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
						<FormHelperText>{search.error}</FormHelperText>
					) : null}
				</FormControl>
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
