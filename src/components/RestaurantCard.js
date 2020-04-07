import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import {
	Card,
	CardMedia,
	CardContent,
	Typography,
	CardActions,
	Button,
	Box
} from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { LocationOn, AttachMoney } from '@material-ui/icons';

const theme = createMuiTheme();

const RestaurantCardContainer = styled(Card)`
	height: 100%;
	display: flex;
	flex-direction: column;
`;

const RestaurantCardMedia = styled(CardMedia)`
	padding-top: 50%;
`;

const RestaurantCardContent = styled(CardContent)`
	flex-grow: 1;
`;

const RestaurantInformation = styled(Box)`
	display: flex;

	padding-bottom: ${theme.spacing(1)}px;

	svg {
		margin-right: ${theme.spacing(1)}px;
	}
`;

const RestaurantCard = (props) => {
	const {
		image_url,
		name,
		price,
		address,
		area,
		postal_code,
		reserve_url
	} = props;

	return (
		<RestaurantCardContainer>
			<RestaurantCardMedia image={image_url} title={name} />
			<RestaurantCardContent>
				<Typography gutterBottom variant="h6" component="h3">
					{name}
				</Typography>
				<Typography
					color="textSecondary"
					gutterBottom
					component="span"
					aria-label={`${price} out of 5 dollar signs`}
					role="img"
				>
					{[...Array(price)].map((_, i) => (
						<AttachMoney key={i} />
					))}
				</Typography>
				<RestaurantInformation>
					<LocationOn />
					<div>
						<Typography
							color="textSecondary"
							gutterBottom
							aria-label="Location details"
						>
							{address}
							<br />
							{area}
							<br />
							{postal_code}
						</Typography>
					</div>
				</RestaurantInformation>
			</RestaurantCardContent>
			<CardActions>
				<Button
					color="primary"
					href={reserve_url}
					target="_blank"
					aria-label="Make Reservation on OpenTable"
					role="link"
				>
					Make Reservation
				</Button>
			</CardActions>
		</RestaurantCardContainer>
	);
};

RestaurantCard.propTypes = {
	image_url: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	price: PropTypes.number.isRequired,
	address: PropTypes.string.isRequired,
	area: PropTypes.string.isRequired,
	postal_code: PropTypes.string.isRequired,
	reserve_url: PropTypes.string.isRequired
};

export default RestaurantCard;
