import React from 'react';
import styled from 'styled-components';
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
import { createMuiTheme } from '@material-ui/core/styles';
import RestaurantCard from './RestaurantCard';

const theme = createMuiTheme();

const RestaurantListContainer = styled(Container)`
	padding-top: ${theme.spacing(4)}px;
`;

const ResturantGrid = styled(Grid)`
	padding-inline-start: 0;
	list-style: none;
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

	return (
		<React.Fragment>
			<Typography component="h1" variant="srOnly">
				Restaurant search results
			</Typography>
			<RestaurantListContainer maxWidth="md">
				<Box width={'100%'} display="flex" justifyContent="center">
					{props.restaurants.loading
						? renderLoadingCircle()
						: isEmpty(props.restaurants.error)
						? renderList()
						: renderError()}
				</Box>
			</RestaurantListContainer>
		</React.Fragment>
	);
};

const mapStateToProps = (state) => ({
	restaurants: state.restaurants,
	search: state.search
});

export default connect(mapStateToProps)(RestaurantList);
