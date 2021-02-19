# Week 3 (MongoDB Queries)

:::tip 

Last week we considered how we could use NodeJS and the packages Express and ejs to construct the view layer of a data driven application. This week we will be continuing our journey by moving on to explore, the powers of the MongoDB data model.

To assist us in gaining a better understanding of the powers of MongoDB, we are going to revisit our wine tasting dataset from week one.

Those of you who completed all of the week one tasks would have observed some interesting properties of our wine data-set. First, there are around 20k tastings with no attributed taster. Second, although there are ~130k records, there are only ~20 wine tasters - they've been busy! Observations such as this can be helpful in determining the utility of a data set.
:::

### Task 0 - Windows Path Setting

f you are using windows, now is a good time to add the MongoDB folder as an environment variable. Further to this, you should also install the MongoDB Tools.

- [There is a good stack overflow answer that you can read here](https://stackoverflow.com/questions/31055637/getting-mongoimport-is-not-recognized-as-an-internal-or-external-command-ope)

-  You will need to download [MongoDB Tools](https://www.mongodb.com/try/download/database-tools)
  -   Extract the zip file and move the contents to `C:\Program Files\MongoDB\Server\4.4\bin\`

Once you've completed the above, you should be able to run the Mongo command-line tools (e.g. mongoimport) without the need to append the absolute path to the command.

## Task 1 - MongoDB Data Importing

- [Download the wine.json file and insert the data into a collection called "tastings" that lives in a database called "wine". You can grab the data by visiting this link and saving the page on your local computer](https://github.com/joeappleton18/advanced-databases-starter-project/raw/master/wine.json)

- If all has gone well you, should see a message along the lines of " 129971 document(s) imported successfully. 0 document(s) failed to import."

- While it is useful to directly import data using MongoDB, some people have had a few issues. [If you think the import process has taken too long then you can clone and use a data importer that I have created for you](https://github.com/joeappleton18/wine-data-importer). 

## Considering the Current Data Shape

Currently each document in our "tastings" collection looks, along the lines of, this:

```json
{
  "_id": ObjectId("5f88b504513221bee048d3dd"),
  "points": "87",
  "title": "Nicosia 2013 Vulkà Bianco  (Etna)",
  "description": "Aromas include tropical fruit, broom, brimstone and dried herb. The palate isn't overly expressive, offering unripened apple, citrus and dried sage alongside brisk acidity.",
  "taster_name": "Kerin O’Keefe",
  "taster_twitter_handle": "@kerinokeefe",
  "price": null,
  "designation": "Vulkà Bianco",
  "variety": "White Blend",
  "region_1": "Etna",
  "region_2": null,
  "province": "Sicily & Sardinia",
  "country": "Italy",
  "winery": "Nicosia"
}
```

> > A single document from the tastings collection. Notice how MongoDB takes care of auto generating an ID for us.

## Read

To get you all started, let's explore some basic read operations that we might want to run on our collection. Access the MongoDB command line, and run the following:

```js
db.tastings.find({});
```

Running the above command will return the first 20 records that match the query and a cursor to the remaining records. You'll notice in the command shell it will prompt you to 'type "it"' for more records.

### Further refining our query

Notice, above, how we passed into find what appears to be an empty object literal - `{}`. We can add name value pairings to this object to filter our results. Here are some basic examples:

- **`db.tastings.find({country: "Italy" })`** returns all wine tastings from Italy
- **`db.tastings.find({country: "Italy", price: {$lt:10}})`** returns all wine tastings from Italy where the price of the wine is less than 10

For a full list of operations you should read the [documentation](https://docs.mongodb.com/manual/reference/operator/query/). However, here is a slightly more interesting example:

**`db.tastings.find({$or: [{country: 'France'}, {country: 'Italy'}]})`** returns all wine tastings from Italy **or** France. We can also use the logical operators **`$not, $and, $nor`**.

### Mongo allows us to append further operations to a given query

As mentioned, when we execute a query MongoDb returns a cursor. A cursor has a whole suite of methods that we can run to further refine our data.

Below are some useful methods, for a complete list of, what are know as cursor methods, [check the documentation](https://docs.mongodb.com/manual/reference/method/js-cursor/):

- **`db.tastings.find({}).count()`** returns the total number of records matching that query

- **`db.tastings.find({}).limit(1)`** limits the amount of records contained in the cursor's result set

- **`db.tastings.find({}).pretty()`** displays the results in an easy to read format

- **`db.tastings.find({price: {$ne: null}}).sort({price: 1})`** Sorts the results in price order. `price: 1` tells MongoDB to display the results in ascending (increasing) order by price. `price: -1`, if you are feeling flush, displays the results in descending price order.

## Task 2 - Reading Data

Use the notes above, and the [MongoDB documentation](https://docs.mongodb.com/) to answer the following questions (you should aim to do so efficiently as possible):

- How many records, in total, are there in the entire tastings collection?

- How many wine records exist that originated from Italy where the price is greater than 80?

  - List the results in descending order, so you can see the most expensive bottle of wine first.

- How many wine records exist that originated from France or Italy, where the price is greater than 60? Can you use a `$or` and a `$and` together to achieve this.

**Did you fly through these tasks! Here are some more advanced, optional, questions**

- Can you use the [aggregation pipeline](https://docs.mongodb.com/manual/reference/operator/aggregation/group/#pipe._S_group) to determine the name of each wine taster and the count of the total tastings they have conducted?

- How many different regions are there?

- Can you work out the wine which has been tasted the most? I think it is "Gloria Ferrer NV Sonoma Brut Sparkling (Sonoma County)" which has been tasted 11 times.

## Updating and Writing Data

Updating and writing data is very simple. For instance, we can simply run the following operation:

```js
db.tastings.insertOne({
  title: "Toro Loco",
  taster_name: "Joe Appleton",
  taster_twitter_handle: "@joeappleton18",
  price: 10,
  designation: "Vulkà Bianco",
  variety: "White Blend",
  region_1: "Etna",
});
```

> > FYI, Toro Loco is a very affordable wine from Aldi - I recommend it!

Let's assume the price changes on our bottle of Toro Loco to 20. We could update the record using the following command:

```js
db.tastings.updateOne({ title: "Toro Loco" }, [{ $set: { price: 20 } }]);
```

The first part of the above command is our query - `{title: "Toro Loco"}`. The second, is the operations that we want to run on the record that our query returns - `[{ $set: { price: 20 } }]`

The above command will update the first record it finds! However, what if there are lots of tastings of ToroLoco. This means our data, while usable, is not exactly optimised. Data optimisation is something that we will look at later. For now, you just need to know that you can update multiple records:

```js
db.tastings.updateMany({ title: "Toro Loco" }, [{ $set: { price: 20 } }]);
```

We can also unset document properties:

```js
db.tastings.updateMany({ title: "Toro Loco" }, { $unset: { price: "" } });
```

The above query removes the price property from our Toro Loco documents.

A further useful operation is constructing new properties using other properties on the existing record:

```js
db.tastings.updateMany({ title: "Toro Loco" }, [
  { $set: { oldPrice: "$price", price: 30 } },
]);
```

The above query sets the value of the current to "oldPrice", then updates the price to 30.

## Task 3 - Updating Data

This, final task, starts off by getting you to perform simple update operations and moves on to more complex ones. We can use update operations to clean our data.

- Can you update the price "Gloria Ferrer NV Sonoma Brut Sparkling (Sonoma County)" to 11?

- Can you figure out how to to move regions to an embedded array on each document in the tastings collection. After completion, you records should all look like this:

```js
{
    title: 'Toro Loco',
    regions: ['Etna', 'France']
}
```

** Advanced Tasks **

- Can you figure out how to use the [aggregation pipeline](https://docs.mongodb.com/manual/reference/operator/aggregation/group/#pipe._S_group) to output the details of each wine taster (e.g. name, twitter handle and number of tastings) to a new collection called tasters - this will take a little bit of research.

- Finally, continue to explore our data set and run some more advanced queries that will further clean the data

