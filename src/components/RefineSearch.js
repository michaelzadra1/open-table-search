import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
	TextField,
	Grid,
	Box,
	Typography,
	Container,
	Button
} from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { updateRefineQuery, executeSearch } from '../actions';
const theme = createMuiTheme();

const RefineSearchContainer = styled(Container)`
	margin-top: ${theme.spacing(3)}px;
	margin-bottom: ${theme.spacing(3)}px;
	min-height: ${theme.spacing(4)}px;
`;

const RefineSearchButton = styled(Button)`
	margin-top: ${theme.spacing(1)}px;
	margin-left: ${theme.spacing(2)}px;
`;

const RefineSearchTextInput = styled(TextField)`
	width: 300px;
`;

const RefineSearch = (props) => {
	const {
		refineSearch,
		restaurants,
		search,
		updateRefineQuery,
		executeSearch
	} = props;

	const handleRefineSearchSubmit = (target) => {
		if (target.charCode == 13) {
			executeSearch({
				city: search.selectedOption,
				page: restaurants.page,
				refineQuery: refineSearch.refineQuery
			});
		}
	};

	const renderRefineFilters = () => {
		return (
			<React.Fragment>
				<Typography component="h1" variant="srOnly">
					Refine restaurant search results by name, address, or area
				</Typography>
				<RefineSearchContainer maxWidth="sm">
					<Box
						display="flex"
						justifyContent="center"
						alignItems="center"
						flexDirection={'column'}
						width={'100%'}
						my={3}
					>
						<Box
							display="flex"
							justifyContent="center"
							alignItems="center"
							flexWrap="wrap"
						>
							<RefineSearchTextInput
								id="refined-search-query"
								label="Search by Address, Name, or Area"
								variant="outlined"
								autoComplete="off"
								onBlur={(e) => updateRefineQuery(e.target.value)}
								onKeyPress={handleRefineSearchSubmit}
								disabled={!search.searchTouched}
							/>
							<RefineSearchButton
								variant="contained"
								color="primary"
								disabled={!search.searchTouched}
								onClick={() =>
									executeSearch({
										city: search.selectedOption,
										page: restaurants.page,
										refineQuery: refineSearch.refineQuery
									})
								}
							>
								Refine Results
							</RefineSearchButton>
						</Box>
					</Box>
				</RefineSearchContainer>
			</React.Fragment>
		);
	};

	return search.searchTouched ? renderRefineFilters() : null;
};

const mapStateToProps = (state) => {
	const { refineSearch, restaurants, search } = state;
	return {
		refineSearch: refineSearch,
		restaurants: {
			totalEntries: restaurants.totalEntries,
			page: restaurants.page
		},
		search: {
			searchTouched: search.searchTouched,
			selectedOption: search.selectedOption
		}
	};
};

RefineSearch.propTypes = {
	refineSearch: PropTypes.shape({
		refineQuery: PropTypes.string.isRequired
	}),
	restaurants: PropTypes.shape({
		totalEntries: PropTypes.number.isRequired,
		page: PropTypes.number.isRequired
	}),
	search: PropTypes.shape({
		searchTouched: PropTypes.bool.isRequired,
		selectedOption: PropTypes.string
	})
};

export default connect(mapStateToProps, {
	updateRefineQuery,
	executeSearch
})(RefineSearch);
