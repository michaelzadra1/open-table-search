import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import {
	Container,
	Grid,
	Typography,
	CircularProgress,
	Box,
	FormHelperText
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { createMuiTheme } from '@material-ui/core/styles';
import RestaurantCard from './RestaurantCard';
import { executeSearch } from '../actions';

const theme = createMuiTheme();

const RestaurantListContainer = styled(Container)`
	margin-top: ${theme.spacing(3)}px;
	margin-bottom: ${theme.spacing(3)}px;
	min-height: ${theme.spacing(4)}px;
`;

const ResturantGrid = styled(Grid)`
	padding-inline-start: 0;
	list-style: none;
	justify-content: center;
`;

const RestaurantList = (props) => {
	const renderLoadingCircle = () => (
		<CircularProgress color="inherit" data-testid="loading-restaurants" />
	);

	const renderEmptyResults = () => (
		<Typography component="h2" variant="h6" color="textSecondary">
			Empty search results. Try again with a new query.
		</Typography>
	);

	const renderError = () => (
		<FormHelperText role="error" error={true}>
			{props.restaurants.error}
		</FormHelperText>
	);

	const renderPagination = () => {
		const { totalEntries, perPage, page } = props.restaurants;

		return (
			<Box width={'100%'} display="flex" justifyContent="center" my={3}>
				<Pagination
					count={Math.ceil(totalEntries / perPage)}
					page={page}
					onChange={handlePageChange}
					color="primary"
					size="large"
				/>
			</Box>
		);
	};

	const renderList = () => {
		const { totalEntries, restaurants } = props.restaurants;
		const { searchTouched } = props.search;

		return (
			<ResturantGrid container spacing={4} component="ul">
				{totalEntries > 0
					? restaurants.map((restaurant) => (
							<Grid
								item
								key={restaurant.id}
								component="li"
								xs={12}
								sm={6}
								md={4}
							>
								<RestaurantCard {...restaurant}></RestaurantCard>
							</Grid>
					  ))
					: searchTouched && renderEmptyResults()}
			</ResturantGrid>
		);
	};

	const handlePageChange = (_, page) => {
		props.executeSearch({
			page,
			city: props.search.selectedOption,
			refineQuery: props.refineSearch.refineQuery
		});
	};

	const { loading, error, totalEntries } = props.restaurants;

	return (
		<React.Fragment>
			<Typography component="h1" variant="srOnly">
				Restaurant search results
			</Typography>
			{totalEntries > 10 ? renderPagination() : null}
			<RestaurantListContainer maxWidth="md">
				<Box width={'100%'} display="flex" justifyContent="center">
					{loading
						? renderLoadingCircle()
						: isEmpty(error)
						? renderList()
						: renderError()}
				</Box>
			</RestaurantListContainer>
			{totalEntries > 10 ? renderPagination() : null}
		</React.Fragment>
	);
};

RestaurantList.propTypes = {
	restaurants: PropTypes.shape({
		restaurants: PropTypes.array,
		totalEntries: PropTypes.number,
		perPage: PropTypes.number,
		page: PropTypes.number,
		loading: PropTypes.bool,
		error: PropTypes.string
	}).isRequired,
	search: PropTypes.shape({
		searchTouched: PropTypes.bool,
		selectedOption: PropTypes.string
	}).isRequired,
	refineSearch: PropTypes.shape({
		refineQuery: PropTypes.string
	}).isRequired,
	executeSearch: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	restaurants: state.restaurants,
	search: {
		selectedOption: state.search.selectedOption,
		searchTouched: state.search.searchTouched
	},
	refineSearch: {
		refineQuery: state.refineSearch.refineQuery
	}
});

export default connect(mapStateToProps, { executeSearch })(RestaurantList);
