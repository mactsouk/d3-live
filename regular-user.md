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


### How to login

The following JavaScript code is used for logging in Lenses in order to get the data.


### How to get data from Lenses

The following JavaScript code is used for getting the data from Lenses.



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


## Next steps

Now that you know how to visualize live data from Kafka topics through Lenses
and D3.js, you should begin visualizing data from your own Kafka topics.

## Useful links

- [Lenses](https://lenses.io/)
- [D3.js](https://d3js.org/)
- [Lenses API](https://api.lenses.io/)
- [Lenses Box 5 min tour](https://lenses.io/box/)
