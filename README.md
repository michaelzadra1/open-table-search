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

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
