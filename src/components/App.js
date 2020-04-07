import React from 'react';
import Header from './Header';
import CallToAction from './CallToAction';
import SearchInput from './SearchInput';
import RestaurantList from './RestaurantList';

const App = () => {
	return (
		<React.Fragment>
			<Header />
			<CallToAction />
			<SearchInput />
			<RestaurantList />
		</React.Fragment>
	);
};

export default App;
