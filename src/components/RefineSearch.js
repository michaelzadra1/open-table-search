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
import {
	updateSearchArea,
	updateSearchAddress,
	updateSearchName
} from '../actions';

const theme = createMuiTheme();

const RefineSearchContainer = styled(Container)`
	margin-top: ${theme.spacing(3)}px;
	margin-bottom: ${theme.spacing(3)}px;
	min-height: ${theme.spacing(4)}px;
`;

const RefineSearchButton = styled(Button)`
	margin-top: ${theme.spacing(1)}px;
`;

const RefineSearchSubtitle = styled(Typography)`
	font-size: 1rem;
	font-weight: 400;
`;

const RefineSearch = (props) => {
	const noSearchResults = props.totalEntries === 0;

	const renderRefineFilters = () => {
		return (
			<RefineSearchContainer maxWidth="sm">
				<Box
					display="flex"
					justifyContent="center"
					alignItems="center"
					flexDirection={'column'}
					width={'100%'}
					my={3}
				>
					<RefineSearchSubtitle gutterBottom component="h2" variant="h6">
						<em>Refine Restaurant Results</em>
					</RefineSearchSubtitle>
					<Grid container spacing={1} justify="center" direction="row">
						<Grid item xs={12} sm={6} md={4}>
							<TextField
								id="restaurant-name"
								label="Name"
								variant="outlined"
								autoComplete="off"
								onChange={(e) => props.updateSearchName(e.target.value)}
								disabled={noSearchResults}
							/>
						</Grid>
						<Grid item xs={12} sm={6} md={4}>
							<TextField
								id="restaurant-address"
								label="Address"
								variant="outlined"
								autoComplete="off"
								onChange={(e) =>
									props.updateSearchAddress(e.target.value)
								}
								disabled={noSearchResults}
							/>
						</Grid>
						<Grid item xs={12} sm={6} md={4}>
							<TextField
								id="restaurant-area"
								label="Area"
								variant="outlined"
								autoComplete="off"
								onChange={(e) => props.updateSearchArea(e.target.value)}
								disabled={noSearchResults}
							/>
						</Grid>
						<RefineSearchButton
							variant="contained"
							color="primary"
							disabled={noSearchResults}
						>
							Refine Results
						</RefineSearchButton>
					</Grid>
				</Box>
			</RefineSearchContainer>
		);
	};

	return props.searchTouched ? renderRefineFilters() : null;
};

const mapStateToProps = (state) => ({
	refineSearch: state.refineSearch,
	totalEntries: state.restaurants.totalEntries,
	searchTouched: state.search.searchTouched
});

export default connect(mapStateToProps, {
	updateSearchArea,
	updateSearchAddress,
	updateSearchName
})(RefineSearch);
