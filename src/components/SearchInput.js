import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField, Box } from '@material-ui/core';
import Autocomplete, {
	createFilterOptions
} from '@material-ui/lab/Autocomplete';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import styled from 'styled-components';

import { fetchOptions } from '../actions';

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

	onSearchInputChange = (e) => {
		const query = e.target.value;
		console.log(query);
	};

	renderSearchInput = (params) => {
		const { InputProps } = params;

		return (
			<TextField
				{...params}
				label={'Search for a City'}
				placeholder={'Search for a City'}
				onChange={this.onSearchInputChange}
				variant="outlined"
				InputProps={{
					...InputProps,
					startAdornment: (
						<Box mr={1}>
							<LocationCityIcon />
						</Box>
					)
				}}
			/>
		);
	};

	render() {
		const { search } = this.props;

		return (
			<Box display="flex" justifyContent="center" width={'100%'} mt={1.5}>
				<SearchAutocompleteInput
					id="city-search-options"
					onChange={(_, value) => console.log(value)}
					autoHighlight
					forcePopupIcon={false}
					filterOptions={filterOptions}
					options={search.options}
					renderInput={(params) => this.renderSearchInput(params)}
				/>
			</Box>
		);
	}
}

const mapStateToProps = (state) => {
	const { search } = state;

	return { search };
};

export default connect(mapStateToProps, {
	fetchOptions
})(SearchInput);
