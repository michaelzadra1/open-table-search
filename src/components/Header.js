import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@material-ui/core';
import RestaurantIcon from '@material-ui/icons/Restaurant';

const Header = () => {
	return (
		<AppBar position="static">
			<Toolbar>
				<Box display="flex" justifyContent="space-between" width={'100%'}>
					<Typography>OpenTable Search</Typography>
					<RestaurantIcon />
				</Box>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
