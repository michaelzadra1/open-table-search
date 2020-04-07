import React from 'react';
import styled from 'styled-components';
import { Container, Grid, Typography } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';

import RestaurantCard from './RestaurantCard';

const restaurants = [
	{
		id: 21307,
		name: 'Scaramouche Restaurant',
		address: '1 Benvenuto Place',
		city: 'Toronto',
		state: 'ON',
		area: 'Toronto / SW Ontario',
		postal_code: 'M4V 2L1',
		country: 'CA',
		phone: '4169618011',
		lat: 43.68207,
		lng: -79.40041,
		price: 4,
		reserve_url: 'http://www.opentable.com/single.aspx?rid=21307',
		mobile_reserve_url: 'http://mobile.opentable.com/opentable/?restId=21307',
		image_url: 'https://www.opentable.com/img/restimages/21307.jpg'
	}
];

const theme = createMuiTheme();

const RestaurantListContainer = styled(Container)`
	padding-top: ${theme.spacing(4)}px;
`;

const ResturantGrid = styled(Grid)`
	padding-inline-start: 0;
	list-style: none;
`;

const RestaurantList = () => {
	const renderList = (restaurants) => {
		return (
			<ResturantGrid container spacing={4} component="ul">
				{restaurants.map((restaurant) => (
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
				))}
			</ResturantGrid>
		);
	};

	return (
		<React.Fragment>
			<Typography component="h1" variant="srOnly">
				Restaurant search results
			</Typography>
			<RestaurantListContainer maxWidth="md">
				{renderList(restaurants)}
			</RestaurantListContainer>
		</React.Fragment>
	);
};

export default RestaurantList;
