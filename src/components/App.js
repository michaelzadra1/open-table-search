/* istanbul ignore file */
import React from 'react';
import Header from './Header';
import CallToAction from './CallToAction';
import SearchInput from './SearchInput';
import RestaurantList from './RestaurantList';
import RefineSearch from './RefineSearch';

const App = () => {
	return (
		<React.Fragment>
			<Header />
			<CallToAction />
			<SearchInput />
			<RefineSearch />
			<RestaurantList />
		</React.Fragment>
	);
};

export default App;
