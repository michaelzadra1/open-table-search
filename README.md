# Open Table Search Application

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

-  Added react-router into the mix, allowing for browser navigation with pagination and old search queries
-  Added the ability to filter by dollar signs - with a semi-cool UI that highlights each dollar sign as you hover of them, and highlights the preceding dollar signs of your selected price rating
-  Added geolocation detection - the restaurants API provided lng/lat details so you could filter results by distance using a sophisticated formula
-  Added more tests beyond just 100% code coverage, as well as added e2e testing using a JS selenium wrapper
-  Better error handling that inspected status codes rather than just displaying “Unexpected Error”

#### How long did you spend on the coding assignment? What would you add to your solution if you had more time? If you didn't spend much time on the coding test then use this as an opportunity to explain what you would add.

I really love the new `Promise.allSettled()`, method, which returns a promise that resolves after a given list of other Promises have either resolved or rejected. When working on a statistics page at my previous company, there were 3 endpoints to hit to get data merged on the panel only once all fetches were complete (not ideal, but these were out constraints). I’ve simplified the code below since this was for a previous company.

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

In my previous job, the source of most bottlenecks was linked to an abundance of unnecessary DB queries. Specifically on list pages where pagination exceeded 100. 2 solutions greatly improved this bottleneck:

-  Caching entries fetched through network requests automatically using Lodash’s memoize function. Quite often, we’d be fetching lists of items and it was very common for unique entries to appear more than once on the page.
-  Migrating to using batch updates for bulk tasks on list pages. This is MySQL specific, but queries being built through other chained queries proved to be bottlenecks, so creating a giant object of everything to be updated, and then doing 1 batch update improved performance immensely.

#### How would you improve the API that you just used?

-  The easy points - add the ability to fetch restaurants by area! I also feel like an area should be an enum associated with a city
-  Abstract the API out to list cities associated with unique IDs when hitting a city GET endpoint with a country param. This would allow for searching across multiple cities rather than just 1
-  The most important point: Add an ElasticSearch layer so that you can hit the API with an actual search query. Generate a relevancy score accumulated across multiple properties of a restaurant (potentially weighted differently depending on the property), and return sorted by highest relevance. This is a much better approach vs performing an individual network request for each individual

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
