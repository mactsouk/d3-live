This blog post is about getting live data from Lenses and visualizing it using
JavaScript and the [D3.js](https://d3js.org/) library.

If you want to visualize static data, you have look at an older blog post named
[Using D3 to visualize data](https://lenses.io/blog/2019/11/visualize-spatial-data-from-apache-kafka-with-d3/).

## Pre-requisites

In order to be able to follow the steps of this tutorial, you will need the following:

- Lenses up and running. You can use our free [Lenses Box](https://lenses.io/box/) instance if necessary.
- An Internet connection that will help you get D3.js and create the sample project.

## The scenario

We are going to read live data from a Kafka topic using Lenses API and visualize
it using D3.js The name of the Kafka topic is `...`.

Please have in mind that that the purpose of this tutorial is not presenting
the capabilities of the powerful D3.js library, but illustrating how you can
use JavaScript to login and query data stored in Lenses.

## The implementation

This section will present the steps needed for implementing the described
scenario beginning from Lenses.

### About Lenses


The data found in the 

The query that is going to be executed in the JavaScript code is the following:


Last, we are going to use a regular Lenses account to get the data. In another
blog post we are going to illustrate the use of a service account for getting
your data from Lenses.

### How to create the JavaScript project

In order to create the JavaScript project, you will need to follow the next
steps:

- Execute `git clone https://github.com/wbkd/webpack-starter.git` inside the directory of your project.

You will then need to make changes to the following files:

- `package.json`
- `./src/index.html`
- `./src/scripts/index.js`

The contents of `package.json` should be the following:

	{
	  "name": "d3-live",
	  "version": "0.0.1",
	  "repository": "https://github.com/mactsouk/d3-live.git",
	  "description": "A D3 Representation of an SQL Processor when Authenticated and using the Lenses API",
	  "scripts": {
	    "build": "cross-env NODE_ENV=production webpack --config webpack/webpack.config.prod.js --colors",
	    "start": "webpack-dev-server --open --config webpack/webpack.config.dev.js"
	  },
	  "author": "Lenses.io",
	  "license": "MIT",
	  "devDependencies": {
	    "@babel/core": "^7.9.0",
	    "@babel/plugin-proposal-class-properties": "^7.8.3",
	    "@babel/plugin-syntax-dynamic-import": "^7.8.3",
	    "@babel/preset-env": "^7.9.0",
	    "babel-loader": "^8.1.0",
	    "clean-webpack-plugin": "^3.0.0",
	    "copy-webpack-plugin": "^5.1.1",
	    "cross-env": "^7.0.2",
	    "eslint": "^6.8.0",
	    "eslint-loader": "^3.0.3",
	    "file-loader": "^5.1.0",
	    "html-webpack-plugin": "^4.0.0-beta.11",
	    "mini-css-extract-plugin": "^0.9.0",
	    "webpack": "^4.42.1",
	    "webpack-cli": "^3.3.11",
	    "webpack-dev-server": "^3.10.3",
	    "webpack-merge": "^4.2.2"
	  },
	  "dependencies": {
	    "@babel/polyfill": "^7.8.7",
	    "axios": "^0.19.2",
	    "core-js": "^3.6.4",
	    "rxjs": "^6.5.5",
	    "ws": "^7.2.3"
	  }
	}

Now you should execute

- Execute `npm install` if you are using `npm`.
- Execute `yarn` if you are using `yarn`.

If you decide to use our GitHub repository, you will need to execute the following
command only:

- `git clone git@github.com:mactsouk/d3-live.git`


### How to login

The following JavaScript code is used for logging in Lenses in order to get the data.


In order to login you are using Lenses **REST API**.


### How to get data from Lenses

The following JavaScript code is used for getting the data from Lenses.


In order to get data from Lenses, you will need to create a **WebSocket**
connection.


### The data format

In this section you will learn more about the format of the JSON records read
from Lenses using JavaScript.


Once you know the format of the data, you can easily choose the fields that
interest you and are going to be included in the visualization process.


### Visualizing Data

This section will show the JavaScript code used for visualizing the data. As
mentioned before, we are going to use the *D3.js* library for visualizing the
data.



Note that a visualization tells you information about the data you put to it.
Therefore if you do not like the generated output, you should rethink the
value of your data as well as the visualization type you used.


### The final output

In this section we are going to see the generated visualization. Note that each
time you load the HTML file, you will get a different output as we are working
with dynamic data, that is data that changes over time.


## Presenting the files


### The `./src/index.html` file


### The `./src/scripts/index.js` file



## Next steps

Now that you know how to visualize live data from Kafka topics through Lenses
and D3.js, you should begin visualizing data from your own Kafka topics.

## Useful links

- [Lenses](https://lenses.io/)
- [D3.js](https://d3js.org/)
- [Lenses API](https://api.lenses.io/)
- [Lenses Box 5 min tour](https://lenses.io/box/)
