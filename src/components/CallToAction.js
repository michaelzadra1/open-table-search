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
					component="h2"
					variant="h5"
					align="center"
					color="textSecondary"
					paragraph
				>
					<span>
						Search for <em>over 21,000</em> restaurants across
						<em> 2,700</em> cities
					</span>
				</Typography>
			</Box>
		</Container>
	);
};

export default CallToAction;
