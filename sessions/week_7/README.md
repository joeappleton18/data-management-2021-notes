

# Week 7 (Data Modeling and Relationships)

:::tip
**Session dependencies**

This week we are continuing with our wine tasting theme. Please ensure you have the latest version of the project

You can clone this version using the following command:
  
`git clone https://github.com/joeappleton18/db-starter-project.git --single-branch  --branch week-6-solutions`

:::



This week promises to address, that perhaps nagging,  question: 

** How can we construct relationships when working with non-relational databases?**

You'll learn, that non-relational does not mean no-relations, that would be very sad 😿. We'll also take the opportunity to look at some more advanced MongoDB queries. In doing so, we'll be able to dynamically populate the statistics on our wine tasting home page. 

## Relationships In NoSQL (Theory Focus)

This week I want to focus the reading and discussion on a series of [blog articles  by](https://www.mongodb.com/blog/post/6-rules-of-thumb-for-mongodb-schema-design-part-1)  William Zola, MongoDB's technical support engineer. 

The articles address the common question of, "How do I model a One-to-N relationship?”"

William states that there are many different ways to construct One-to-N relationships in NoSql databases. He goes on to suggest that, in the non-relational world we must think a little differently about the nature of the relationship:

>> When designing a MongoDB schema, you need to start with a question that you’d never consider when using SQL: what is the cardinality of the relationship? Put less formally: you need to characterize your “One-to-N” relationship with a bit more nuance: is it “one-to-few”, “one-to-many”, or “one-to-squillions”? Depending on which one it is, you’d use a different format to model the relationship.

Let's briefly consider each of these relationships, where possible, in the context of our wine tasting application

## One-to-Few

If we have a small number of relations we can just embed these relations directly in the parent document. For instance, a user may have many addresses. 

```js
{
  name: 'Joe Appleton',
  addresses : [
     { street: '123 Sesame St', city: 'Anytown', cc: 'USA', primary: true },
     { street: '123 Avenue Q', city: 'New York', cc: 'USA', primary: false }
  ]
}
```
>> We don't currently have a user table; so I've adapted the example given in the article.

The data modeling design above is simple, and does not require an extra collection. However, it's more complex to query these embedded fields across different documents. For example, queries asking things like, how many users live in the US? - become a little trickier. I tend to use this approach if the embedded data is only going to be used by its parent. In other words, we are not going to need to compare query this data across multiple documents.

## One-to-Many

One wine tasting can have Many Regions. We can achieve this relationship by constructing an array of region object ids.  

```js
{
  ...
  _id: ObjectID('wine123')
  title: 'toro loco'
  regions: [ObjectID('1234'), ObjectID('1234')]
  ...
}
```
>> tasting document

The above approach, which we will implement today, involves creating a separate regions collection. According to the blog post, we could then retrieve all regions for any given wine tasting record by constructing a "application level" join.

```javaScript
tasting = db.tastings.findById("wine123");
// now we have the tasting we can use $in to get all the regions. It's
// similar to a SQL or
tasting  = db.regions.find({_id: { $in : tasting.regions } }) ;
```
>> Constructing a one to many join

The above requires an extra read operation, so it's slightly slower than our One-to-Few relationship. However, since `_id`s are indexed there is very little difference. 


## One-to-Squillions

This approach is only required if you think that your relationship will cause your documents to exceed the 16MB document limit. For instance, consider you wanted to keep a permanent user log - this could grow very large. As such, we could not maintain an array of log messages.

```js
{
  ...
  _id: ObjectID('123')
  user_id: ObjectID('456')
  type: 'info'
  message: 'user visited the module survey form and gave Joe 5 out of 5 😁 '...
}
```
>> A user logger

Above, we associate each log message to a specific user. We could easily obtain the user for each log message by using `populate` provided for us by mongoose:

```js
const logRef = Log.findById('123');
const log = logRef.populate('user_id')
```
>> An example of using mongoose to populate the user associated to our log


### References

Zola, W. (2014). 6 Rules of Thumb for MongoDB Schema Design: Part 1 | MongoDB Blog. [online] MongoDB. Available at: https://www.mongodb.com/blog/post/6-rules-of-thumb-for-mongodb-schema-design-part-1 [Accessed 14 Nov. 2020].





## Practical 

This week we are going to explore how to construct and manage relationships by implementing the functionality to update and create wine tastings.

When creating/updating a wine tasting a few challenges arise. Let's consider some of the properties on the wine tasting document that stand out:

```js
{
  ...
 "designation" : "Mascaria Barricato",
 "variety" : "Red Blend"
 "province" : "Sicily & Sardinia",
 "country" : "Italy",
 "regions" : ["Cerasuolo di Vittoria"],
 ...
}
```
>> Variety, province, country and regions need to be consistent

Variety, province, country and regions are all fields that we would like users to select with a drop down menu. It would not make sense for a user to type in these values. As such, we  need to maintain some collections that allow us to easily reference and update our common repeating fields on our tasters collection. In other words, we need to extend our seeder file, constructing a Varieties, Countries, Provinces , and Regions collection. 

We have two options available to us here:

- We could find further external data sources; for instance, a JSON list of countries would be easy to find.

- We could ask our existing data to provide us with this information.

We are going with the latter option. This presents a future challenge, as we will need to add some functionality that allows users to create, for instance, new regions. However, on the flip-side, we can very quickly generate our initial collections. Moreover, given that we are generating this seed data from 130k records, I am hazarding to guess we will get a fairly complete list (wild speculation). [We can use the MongoDB aggregation pipeline to help us here](https://docs.mongodb.com/manual/aggregation/).

### A Quick Introduction to the Aggregation Pipeline

According to the MongoDB team, ["MongoDB’s aggregation framework is modeled on the concept of data processing pipelines. Documents enter a multi-stage pipeline that transforms the documents into an aggregated result"](https://docs.mongodb.com/manual/aggregation/). Simple right! To understand this idea, let's consider how we might generate a list of provinces and output that list to a new collection called "provinces" - we can do all of this using aggregation:

```js
db.tastings.aggregate([
  {$group: {_id: "$province"}},
  {$project: {name: "$_id", "_id" : 0}},

])
```
>> An aggregation command to group our tastings collection by provinces 

If you run the above command, in a VS code MongoPlayground or through the command line, you will see a list of unique provinces; but, how did we get to this output?

- First, we told MongoDB that we wanted to run an aggregation on our tasting collection `db.tastings.tastings.aggregate([])`. Notice how we pass an array in, this represents our pipeline. We can pass as many aggregation operations as we like into this pipeline. Each operation will be passed the data generated from its immediate predecessor.

- Next, we run our first aggregation operation - [group](https://docs.mongodb.com/manual/reference/operator/aggregation/group/#pipe._S_group). This operation, distinctly groups all of our documents by a given _id. In this case the `_id` is `$province`. Notice how we use the `$` sign to indicate that we want to use a document property. 

- Finally, [we use the project aggregation operator](https://docs.mongodb.com/manual/reference/operator/aggregation/project/). This allows us to further shape the output. In our case we set up a province property `name: "$_id"`, and remove the `$_id` field ` "_id" : 0`. This has the effect of renaming `"_id"` to `"name"`. Again, notice how we use `$` to reference aggregated data.

MongoDB provides us a further aggregation operation called out. This allows us to output to a new collection the results of our aggregation:

```js
db.tastings.aggregate([
  {$group: {_id: "$province"}},
  {$project: {name: "$_id", "_id" : 0}},
  {$out: "provinces"}
])
```
>> Above, we output our aggregated results to a new collection called provinces.

## Task 1 - Constructing further collections

- Within MongoDB's terminal runtime, or in a VS code playground. Use the aggregation techniques explored above to create a: varieties, countries, provinces , and regions collection. **Hint, make sure you are happy with the output before you use the $out step**. Use a name property to hold the value (e.g. county).

- When you are happy with the output, see if you can update `seeder.js` to include these aggregation steps. There is a slight difference in syntax in the `seeder.js` as we are using the node MongoDB package:

```javaScript
await db.collection("tastings").aggregate([
      { $unwind: "$regions" },
      { $group: { _id: "$regions" } },
      { $project: { name: "$_id", "_id": 0 } },
      { $out: "regions" }
    ]).toArray() 
```
>> An example of how to run set up a aggregation pipeline using the node driver. Notice how I've chained `toArray()` to the `aggregate` function. This is needed otherwise the aggregation does not resolve. [A painful few hours were spent finding this out](https://stackoverflow.com/questions/49835278/mongodb-node-js-out-with-aggregation-only-working-if-calling-toarray)

- Create models for each of the collections we created above. You may want to add some validation. Remember, we use the singular name of each collection to define our model:

```javaScript
const { Schema } = mongoose;

const countrySchema = new Schema(
    {
        name: { type: String, required: [true, 'Name is required'] },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Country", countrySchema);

```
>> `models/Country.js` - notice how Mongoose pluralisation works, even if it's not as simple as just appending an `s` to our model name, in order to link the model to a collection.


### This task is vital, if you get stuck - [simply copy my seeder code from here and re-run your seeds](https://github.com/joeappleton18/db-starter-project/blob/week-7-solutions/seeder.js) `npm run seeder`

## Defining relationships

Now we have set up our further collections we can expand `models/Tasting.js` schema to express some further relationships.

```js
const tastingSchema = new Schema(
  {
    ...

    country_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
    },
    province_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Province",
    },
    taster_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Taster",
    },
    regions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Region" }],
  },
  ... 
);

```
>> `models/Tasting.js`  - Setting up relationships. The observant, may notice that this structure won't work for existing documents in our database. However, for demo sake this is fine. Later, you could always update the seeder to set up these relationships. 

Above, notice how we can tell Mongoose that we want to reference a given ID on a third-party document.  Notice how we use the singular collection name - e.g `ref: "Region"`. Finally, can you see how we have set up a One-to-N relationship with regions -  `regions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Region" }]`. 


## Task 2 - Defining Relations

Update the `models/Tasting.js` schema to relate it to your newly created collections.


## Inserting Related Data

In order to create a new Tasting a user may connect that tasting with a country, province, region and a taster. We, of course, don't expect the user to type in an associated ID to form this connection (although I have seen some students do things like this 😉). Rather, we want to allow the user to select from a drop down. Let's focus on countries and consider how we might do this:

Notice how I've already created a `views/create-tasting.ejs`. Let's add a get controller method in `controllers/tasting.js` that will handle this request:

```javaScript
exports.createView = async (req, res) => {
  try {
    res.render("create-tasting", {
      errors: {}
    });

  } catch (e) {

  }
}
```
>> `controllers/tasting.js`  - notice how we've used the name createView this is to differentiate this method from create (you can choose a different naming convention)

Next, ensure that you connect the controller method to the route in `app.js` - `app.get("/create-tasting", tastingController.createView);`

In order to populate a drop down list of countries we need to use our countries model to find all countries, then we can inject this result in to the view. 

```javaScript
const Country = require("../models/Country");

....

exports.createView = async (req, res) => {
  try {
    const countries = await Country.find({});
    res.render("create-tasting", {
      countries: countries,
      errors: {}
    });

  } catch (e) {
    res.status(404).send({
      message: `could not generate create data`,
    });
  }
}

...
```
>> `controllers/tasting.js` - Injecting a list of countries into our view

We can now simply use the passed in countries data to generate a dropdown for the user:

```js
 <div class="form-group">
                <label for="exampleFormControlSelect1">Select Taster</label>
                <select
                  class="form-control"
                  name="country_id"
                  id="exampleFormControlSelect1"
                >
                  <% countries.forEach( country => { %>
                  <option value="<%= country._id %>"><%= country.name %></option>
                  <% }) %>
                </select>
              </div>
            </div>
        </div>
  </div>         
```
>> `controllers/tasting.js` - Creating a drop down of countries 

Above, we create a drop down of countries. Notice how set the value of each drop down option to `country._id`. It is this value that gets associated to `country_id`. However, we display to the user the name of each country. 

## Task 3 - Create a Tasting

Update your wine tasting application so users can create a tasting. For now just allow the user to input three items (this is fine for learning, although not overly realistic):

- `wine title` - free form string 
- `points` - a number **hint, you'll need to convert this to an int using `parseInt` before you can save it. 
- `countries` - a dropdown list of countries

## One-to-Many User Input 

Allowing the user to enter One-to-Many relationships is hard to do in an elegant way - without front-end javaScript. For the sake of this module, we can use an HTML check box to facilitate this process. Let's consider how we might allow the user to select multiple regions. 

First, like we did for our related fields above, we need to get a list of regions and pass it into our view. Next, in our view, we can iterate over regions to generate our check boxes:

```html

 <div class="form-group">
                <% regions.forEach( region => { %>
               <div class="form-check form-check-inline">
                <input
                  name="regions"
                  class="form-check-input"
                  type="checkbox"
                  id="inlineCheckbox2"
                  value= <%= region._id %>
                />
                <label class="form-check-label" for="inlineCheckbox2"><%= region.name %></label>
              </div>
    </div>          

```
`views/create-tasting.ejs` - this generates check boxes for users to select regions. 

The above would embed an array of user selected regions into the HTML post request. We could then save our regions like this:

```js
exports.create = async (req, res) => {
  try {
    const taster = await Taster.findById(req.body.taster_id);
    await Tasting.create({
      title: req.body.title,
      taster_name: taster.name,
      taster_twitter_handle: taster.twitter_handle,
      points: parseInt(req.body.points),
      taster_id: req.body.taster_id,
      regions: req.body.regions
    })

    res.redirect('/tastings/?message=tasting has been created')
  } catch (e) {
    if (e.errors) {
      res.render('create-tasting', { errors: e.errors })
      return;
    }
    return res.status(400).send({
      message: JSON.parse(e),
    });
  }
}
```
>> `controllers/tasting.js` - Saving a tasting 

Recall, last week, we looked at how to populate form for editing. Populating our checkboxes is a little more involved. Requiring some javaScript trickery:

```html
<div class="form-group">
   
                
                <% regions.forEach( region => { %>
               <div class="form-check form-check-inline">
                <input
                  name="regions"
                  class="form-check-input"
                  type="checkbox"
                  <% if (tasting.regions.includes(region._id)) {%>   checked <% } %> 
                  id="inlineCheckbox2"
                  value= "<%= region._id %>"
                />
                <label class="form-check-label" for="inlineCheckbox2"><%= region.name %></label>
              </div>
              <% }) %>


```
>> views/update-tastings.ejs - notice how we optionally render "checked" `<% if (tasting.regions.includes(region._id)) {%>   checked <% } %> `. This checks the checkbox if the given `region_id` exists in our tasting.region array

## Task 4 - Add Regions to Create Tasting

Use the notes above to add regions to `views/create-tasting.ejs`


## Task 5 - Update Tasting

Create a `update-tasting` route and view. The route should allow a `:id` param of the tasting to be passed in e.g. `update-tasting/5faeca10d03f69cbfdb559e5`. Just test your code by manually constructing the url. 

## Mongoose Aggregation

Mongoose exposes MongoDB's aggregation library to us. However, currently we have not  used the idea of aggregation in our application. Our application's home page seems like the perfect candidate. We could use aggregation to gather the following:

- The total number of reviews (although, it's easier to do `Tastings.find({}).count()`)
- The number of different countries 
- The number of different tasters 
- Each taster and their total number of reviews 

Let's create a `controllers/home.js` controller and consider how we might handle some of these operations. 

```javaScript
    const Tasting = require('../models/Tasting'); 

    exports.list = async (req, res) => {

    try {
        const totalCountries = await Tasting.aggregate([
            { $group: { _id: "$country", total: { $sum: 1 } } },
            { $count: "total" }
        ])
      
        const tasterCountSummary = tasterCountSummaryRef.map(t => ({ name: t._id, total: t.total }));
        res.render("index", { 
             totalCountries: totalCountries[0].total });

    } catch (e) {
        res.status(404).send({
            message: `error rendering page`,
        });
    }
}

```
>> `controllers/home.js` - Above, we access MongoDB's aggregation framework to count the total number of countries and inject that information into our view.

## Task 6 - Aggregation Play

Using only our Tasting model (yes, I appreciate this makes things harder),. Can you dynamically generate all of the statistics and summaries on the home page.

