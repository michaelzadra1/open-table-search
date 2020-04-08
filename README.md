# OpenTable Restaurant Search Application

## Site URL

https://open-table-search.herokuapp.com/

## Available Scripts

### `npm run-script start-local`

Runs the app in local development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm t -- --coverage --watchAll=false`

Provides view of full 100% test coverage using Jest

## Technical Questions

#### How long did you spend on the coding assignment? What would you add to your solution if you had more time? If you didn't spend much time on the coding test then use this as an opportunity to explain what you would add.

I spent approximately 15-18 hours on the coding assignment. If I had more time, I would’ve done the following:

-  Added react-router into the mix, allowing for browser back/forward navigation between pagination actions and between search queries
-  Added geolocation detection to filter results by distance - the OpenTable API provided lng/lat details so you could use a sophisticated formula to determine restaurant distance from user
-  Added the ability to filter restaurants by price rating - implementing a clickable input of 4 dollar icons, where onHover/onClick the preceding and currently hovered element are highlighted green
-  Added more tests beyond just 100% code coverage, as well as added e2e testing using a JS selenium wrapper
-  Better error handling that inspected status codes rather than just displaying “Unexpected Error”

#### What was the most useful feature that was added to the latest version of your chosen language? Please include a snippet of code that shows how you've used it.

I really love the new ES2020 feature `Promise.allSettled()`, method, which returns a promise that resolves after a given list of other Promises have either resolved or rejected. When working on a statistics page at my previous company, there were 3 endpoints to hit to get data merged on the panel only once all fetches were complete (not ideal, but these were our constraints). I’ve simplified the code below since this was for a previous company.

```javascript
const somePromiseOne = new Promise((resolve, reject) =>
	setTimeout(resolve, 200)
);
const somePromiseTwo = new Promise((resolve, reject) =>
	setTimeout(resolve, 400)
);
const somePromiseThree = new Promise((resolve, reject) =>
	setTimeout(resolve, 600)
);

Promise.allSettled([
	somePromiseOne,
	somePromiseTwo,
	somePromiseThree
]).then((results) => results.forEach((result) => console.log(result)));
```

#### How would you track down a performance issue in production? Have you ever had to do this?

For front end performance tracking, I'd use the performance tool in chrome to inspect which React elements were rendering too frequently/taking too long to render, and determine ways to prevent such frequent re-renders by considering using Pure Components or the shouldUpdateComponent lifecycle hook.

For back end performance tracking, I'd always check DB queries. This is where I have real experience improving performance for an application in a profressional setting. In my previous job, the source of most bottlenecks was linked to an abundance of unnecessary DB queries. Specifically on list pages where pagination exceeded 100. 2 solutions greatly improved this bottleneck:

-  Caching entries fetched through network requests using Lodash’s memoize function. Quite often, we’d be fetching lists of items and it was very common for unique entries to appear more than once on the page.
-  Migrating to using batch updates for bulk tasks on list pages. This is MySQL specific, but queries being built through other chained queries proved to be bottlenecks, so creating a giant object of everything to be updated, and then doing 1 batch update improved performance immensely.

#### How would you improve the API that you just used?

-  Abstract the API out to GET cities (where each city has a unique ID) by country for more precise client-side filtering. Could also GET restaurants by multiple city search params rather than just 1 city
-  Actually add the ability to fetch restaurants by area since this is currently NOT implemented with the API! Also, areas should be predefined enums associated with a city ID, to prevent confusion
-  Add an ElasticSearch layer so that you can hit the API with an actual "search query" endpoint that searches accross all properties of a restaurant. This could be done by accumulating relevancy scores for the query string and each property of a restaurant (potentially weighted differently depending on the importance of the property), and returning sorted restaurants by highest relevance. This is a much better approach vs performing an individual network request for each individual property you'd like to query, and guessing which request is more accurate according to number of returned entries

#### Please describe yourself using JSON.

```json
{
	"name": {
		"first": "Michael",
		"last": "Zadra",
		"nicknames": ["Big Z", "Mickey Z", "Zadz"]
	},
	"nationalities": ["🇨🇦", "🇮🇹", "🇬🇧", "🇩🇰"],
	"weaknesses": null,
	"favouriteTechnologies": ["JavaScript", "React", "Python", "Angular 2+"],
	"hiddenTalents": ["singing", "guitar", "turning lips white"],
	"education": [
		{
			"type": "Secondary",
			"name": "All Saints High School",
			"major": "Science",
			"graduated": 2012
		},
		{
			"type": "Undergraduate",
			"name": "Queen's University",
			"major": "Computer Engineering",
			"graduated": 2018
		}
	],
	"jobs": [
		{
			"title": "Full Stack Developer",
			"name": "Loopio"
		},
		{
			"type": "Front End Developer",
			"name": "RBC"
		},
		{
			"type": "Full Stack Developer",
			"name": "Scent Trunk"
		}
	]
}
```
