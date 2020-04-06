import React from 'react';
import { Container, Typography, Box } from '@material-ui/core';

const CallToAction = () => {
	return (
		<Container maxWidth="sm">
			<Box py={4}>
				<Typography
					component="h1"
					variant="h2"
					align="center"
					color="textPrimary"
					gutterBottom
				>
					OpenTable Search
				</Typography>
				<Typography
					variant="h5"
					align="center"
					color="textSecondary"
					paragraph
				>
					Search for <em>over 21,000</em> restaurants across <em>2,700</em>{' '}
					cities
				</Typography>
			</Box>
		</Container>
	);
};

export default CallToAction;
