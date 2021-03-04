
# Week 10 (Further Mongo Relations and Dynamic JavaScript)


:::tip 

**Session Dependencies**

  This week we are continuing with our wine tasting theme. Please ensure you have the latest version of the project
   
  You can clone this version using the following command:
  - `git clone https://github.com/joeappleton18/db-starter-project.git --single-branch  --branch week-9-solutions`

This week we will be working in development mode. As such, set up your `.env` file to point to your local MongoDB setup.

**Note**, you might get an error stating "incompatible node environment". This can be fixed by grabbing your version of node, `node -v` then updating the engines property in the `package.json` file to your version of node. 
:::

Last week](/week-9), in deploying our application, concluded our exploration of the fundamental JavaScript technologies needed to create a data-driven web application. This week I want us to consider, for lack of a better term, how we can make our wine application a little less clunky. As such, we will be exploring the following questions:


### How can I introduce front-end JavaScript into my application to allow for database updates without the need for the browser to reload the page?

### How can I take the idea of MongoDB relations further to allow users to favourite wine tastings (a fun little feature)?

## Our Current Client Server Model

<img src=/images/entire-request.png />

>> The architecture of our web application

## The clunky web-site problem

We have implemented the classic three-tier architecture (client tier, app tier, and database tier). 

Our application, from the prospective of the user is fairly static. A user, via a browser, visits a given URL issuing a HTTP GET request, or issues a POST/GET request via submitting a form.  Our application layer then pattern matches the path requested and deploys a corresponding controller. For instance, when a browser makes a request to our home page,`/`, we serve up our home controller: `app.get("/", homeController.list);`. Our home controller then interfaces with the database, constructs an html page and sends this page, and its associated files (e.g. album.css), back to the browser issuing the request. The reason why our website is currently a little clunky is the only way we can currently update our html views is for the users to issue another request, and each time our browser reloads the page and its associated assets. This is fine, for mostly static content (e.g., the wine tasting home page); however, for things like search, pagination, favoriting wine tastings - things become a little painful. Why should I have to reload the entire page to add a wine tasting to my favorites list!? To solve this problem, we need to allow the browser to communicate with our application layer without needing to refresh.   **The solution is AJAX**

## What is AJAX?

AJAX stands for Asynchronous JavaScript And XML. It is a method of using the the browsers 'XMLHttpRequest object' to construct client-server communication. Crucially, it allows us to complete this process **without** the need to refresh the web-page.
## Constructing an AJAX Request

[We use client-side JavaScript to implement an AJAX request, and it used to be painful](https://developer.mozilla.org/en-US/docs/Web/Guide/AJAX). Because of this, people would use libraries such as `jQuery.ajax()` to simply the process. However, in recent times,  HTML-5 has implemented a much more intuitive [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch).  


:::

**key point**

Client-side JavaScript in called client-side because it is executed in the browser as opposed to on our server. As it's run in the browser, it can not access server-side code (e.g., our models and controllers). 

:::


Let's consider a very simple example of how we could use the `Fetch Api` to update an HTML page without the need to refresh:

```javaScript
<!DOCTYPE html>
<html>
  <script>
    const handleGetClick = async () => {
        const userRef = await fetch('https://randomuser.me/api/');
        const user = await userRef.json();
        document.querySelector('#user').innerHTML = JSON.stringify(user);
    };
  </script>
  <body>
    <div id="user"></div> 
    <button onclick="handleGetClick()">Get me a user</button>
  </body>
</html>
```
>> An example of a simple AJAX request using fetch to issue a get request

Above, we set up an event handler on the button - `onclick="handleGetClick()`. This ties the function `handleGetClick()` to a button click event. 

When the button is clicked, we issue a get request to a free random API - `randomuser.me`. Notice how we receive the response and finally update our page with the results -  `document.querySelector('#user').innerHTML = JSON.stringify(user);`. All of this has been achieve without the need of a refresh! This allows us to turn clunky reloads into dynamic features. 

## Text search

Our second clunk issue is there is no real way to search our wine tastings that is natural to a user. For instance, as a discerning wine drinker, I might want to search for a cheap table wine. Currently there is no way to query the database with a natural search term such as, "Table wine". Lucky for us, MongoDB comes with a text search feature that solves our problem. 

We can create a composite text index on Tastings that includes wine title and description and then conduct a search with "Table wine". MongoDB will return a list of all documents that contain the term "Table wine" in the description or title. We even get a similarity score based on how close the match is to our search term. While not an amazingly powerful search solution, we get this functionality out of the box - very nice! 

Let's consider a quick example that you can run from a [MongoDB playground](https://code.visualstudio.com/docs/azure/mongodb):


```JavaScript
use('wine');

db.tastings.createIndex({title: 'text', description: 'text'});
db.tastings.find(
   { $text: { $search: "/Table Wine/" } },
   { score: { $meta: "textScore" } }
).sort( { score: { $meta: "textScore" } } )
```
>> Performing natural text search

Above, we first set up a text index on tastings, `db.tastings.createIndex({title: 'text', description: 'text'});`.  Text indexes can include any field whose value is a string or an array of string elements. You should note that a collection can only have one text index. Next, we search the index, through using the `$text` operator. The two '//' means that we are looking for an exact match, it's a regular expression. On running this query, you'll notices that you'll get a list of matching wine tastings back 

 So,in-order to declunk our web-application, we are going to combine AJAX and text search to create a modern user experience - let's dive in!

## Practical Session 

First, ensure that you have the latest version of our wine tasting app (see session dependencies). On running this project, you'll notice that I've set up a search page for you (visit `/search-tastings`). Surprisingly, this search page does not work. All we are doing is serving the static EJS file, `views/search-tastings.ejs`.  

## Linking JavaScript to Our EJS Templates

Our first step in getting our search to work, is to bind a JavaScript function to the page's button click event. We can do this as follows:

```html
    <button onclick="handleClick()" class="btn btn-outline-secondary" type="button">
                        🍷 Search Wine Tastings 🍷
    </button>
```
>>  `views/search-tastings.ejs`, binding the function `handleClick` to our wine search

If you refresh your search page and click the button you should get the following error in your browsers console (open developer tools to see this), `Uncaught ReferenceError: handleClick is not defined at HTMLButtonElement.onclick`. We get this error as the browser is looking for a `handleClick` function, but we have not defined one yet. However, where should we place our client side JavaScript? - remember we don't want to mix server and client side concerns.  

Recall, we are using the express static middleware in app.js, `app.use(express.static(path.join(__dirname, "public")));`.  This, allows us to server static content to the browser from the `public` directory in the root of our project. This is where all static content should go, including client-side JavaScript. Let's set up a function to handle our click event:

- Create, `public/scripts/search-tasting.js`, and add a handler function:

```javaScript
const handleClick = () => {
    console.log('search button clicked');
}
```
>> `public/scripts/search-tasting.js`

- Finally, we need to link our `search-tasting.js` file to our `search-tastings.ejs` page. 

We can do this is the normal way:

```JavaScript 
...
<head>
    <script src="scripts/search-tasting.js"></script>
</head>
...
```
`views/search-tastings.ejs`


- If all has gone well, when you click the search button you should now see 'search button clicked' in the browser console.

## Task 1 - Linking in JavaScript files

Follow the steps above to link the `search-tasting` JavaScript file into your search page. 

## Setting up a basic API

In order to allow a browser to search our application via an AJAX request we need to do two things:

1. Set up a text index on tastings 
1. Expose an API route to allow the browser to send search terms that will be used to query this index

First, we need to update our Tastings schema so that it instructs MongoDB to create a text index on our tastings collection:

```JavaScript
...
tastingSchema.index({'$**': 'text'});
module.exports = mongoose.model("Tasting", tastingSchema);
...

```
>> `models/Tasting.js`, `tastingSchema.index({'$**': 'text'});` creates a composite text index across all text fields in our tastings collection - a extreme I know. However, I wanted to show off this feature. In the notes above, I demonstrated how we could be a little more selective.

That was simple, we've completed step 1. Now, we just need to create some API routes. We already know how to create routes. We just need to think what API routes paths should look like and where the controllers should live. I like to pre-append my api routes with `api`. As such, `/api/search-tastings` seems like a good choice. Finally, it's a good idea to place our API controllers into a controller sub-folder called api. Let's set all of this up:

- Create the file `controllers/api/tasting.js` it should contain the following code:

```JavaScript

exports.list =  async (req,res) => {
    
    const searchQuery = req.query.search;

    if (!searchQuery) {
        res.json([]);
    }

    try {
        const Result =  await Tasting.find(
            { $text: { $search: searchQuery}},
            { score: { $meta: "textScore" } }
         ).sort( { score: { $meta: "textScore" } } ).limit(50)
        res.json(Result);
        } catch (error) {
        console.log(error);
        res.status(404).send({
            message: `could not perform search`,
        });
    }
}
```
>> `controllers/api/tasting.js`, a simple controller function list

The above code should be fairly familiar. `req.query.search;` will grab the search query string out of the url. Next, we are conducting a text search across out index, you should use the notes above to play around with exact and broad match queries. Finally, notice how we are not rendering any views. Rather, we just return the results in `JSON` format - `res.json(Result);`. 

Next, as usual, we need to link a route to this new controller function. In app.js insert the following code:

```JavaScript
...
    const tastingApiController = require("./controllers/api/tasting");
    ...
    app.get("/api/search-tastings", tastingApiController.list);
...    
```
>> app.js, notice how we use tastingApiController to identify that this controller is for our api

- If all has gone well, you can issue a request to the API by simply visiting 'http://localhost:your port/api/search-tastings?search=Table Wine'. You should see a raw JSON output.

## Task 2 - Set up the search tasting API route

Use the notes above to set up a functional `/api/search-tastings` route.


## Consuming our API

We are nearly there, we just need to link the client side, `public/scripts/search-tasting.js`'s code to our api. This is not a web unit, so I am going to give you a whistle-stop tour of front end development. If you enjoy it, then you can take things further in the assessment. Also, you may want to consider taking my contemporary web application unit next year (it's a great unit 😉). 

First, take a look at `views/search-tastings.ejs`, notice that we have a empty div:

```JavaScript
         <div id="wineItems"></div>
```
`views/search-tastings.ejs`, an empty div

The above empty div is where we inject our search results - such an approach is common. In fact, many large applications are injected into a div on a single HTML page. Let's consider how we can amend `public/scripts/search-tasting.js` to communicate with the api and inject the search results into  `<div id="wineItems"></div>`:

```JavaScript 
const wineView = (wine) => `

<div class="col-12">
    <div class="card">
        <h5 class="card-header"> ${wine.title} <strong>(search match: ${wine.score})</strong></h5>
        <div class="card-body">
         <p class="card-text">${wine.description}</p>
          <ul class="list-group">
               <li class="list-group-item">Country: ${wine.taster_name}</li>
                <li class="list-group-item">Country: ${wine.country}</li>
                <li class="list-group-item">Designation: ${wine.designation}</li>
                <li class="list-group-item">Points: ${wine.points}</li>
                <li class="list-group-item">Price: ${wine.price}</li>
                <li class="list-group-item">Province: ${wine.province}</li>
          </ul>
        </div>
        <a href="#" class="btn btn-primary">Save</a>
      </div>
 </div>
`;


const handleClick = async () => {
    const searchVal = document.querySelector("#searchInput").value;
    const wineDomRef = document.querySelector('#wineItems');
    try {
       
        const ref = await fetch(`/api/search-tastings/?search=${searchVal}`);
        const searchResults = await ref.json();
        let wineHtml = [];
        searchResults.forEach(wine => {
           wineHtml.push(wineView(wine));
        });
        wineDomRef.innerHTML = wineHtml.join(""); 
    } catch (e) {
        console.log(e);
        console.log('could not search api');
    }
  
}
```
>> `public/scripts/search-tasting.js`,  code to handle searching and displaying wine

Above, we first use the query selector to grab the search value that has been input, `const searchVal = document.querySelector("#searchInput").value;`. The `#` on `#searchInput` means that we are instructing the querySelector to grab an element with the id searchInput (e.g. ` <input  id="searchInput"/>`). Notice how we also use this technique to get access to our empty set of `div`'s where our tastings results will be inserted - ` const wineDomRef = document.querySelector('#wineItems');`.  We then go ahead and send a search request to our API - `const ref = await fetch(`/api/search-tastings/?search=${searchVal}`);`. 

We then loop across each tasting in our result and pass it into a template that we created:

```JavaScript
searchResults.forEach(wine => {
           wineHtml.push(wineView(wine));
});
```
>> `public/scripts/search-tasting.js`, setting up an array of wine tasting results.

 Finally, we inject this array into our `wineDomRef` -   `wineDomRef.innerHTML = wineHtml.join("");`. I am using a little trick here, the `.join("")` removes the commas out of our array - otherwise your page would be peppered with commas.

That's it!!! You should now have a, pretty sweet, text search functionality on your wine tasting application.

## Task 3 - Set up the search tasting API route

Use the notes above to complete your search functionality.

##  Favorite Wine Tastings

Notice how there is a save button on our search results. The idea here is, a logged in user, should be able to click save and their chosen tasting is added to their favourites. Let's consider how we might set this functionality up.

Recall, a few weeks back, [when we talked about relationships](week-7#relationships-in-nosql-theory-focus). This, in my book, calls for a one-to-few relationship:

```JavaScript
"email": "foo@barr.com",
 ...
"saved_tastings": [
    "5faec0143e8ca3790295c50d",
    "5faeb03d94fdc3790ca4c570",
    "5faeb03d94fdc3790ca51c4e"
  ]
```
>> tasting document, a user can have many tastings. The id's in our array reference tasting documents

Above is the relationship we intend to create. You could denormalise the data here and place things like wine title, along with the tasting id, in the array. However, I wanted to show a slightly different method.  

To achieve the above:

- First, we need to tweak our user model to include a "saved_tastings" attribute:

```JavaScript

...
const userSchema = new Schema(
    {
        email: { type: String, required: [true, 'email is required'], unique: true },
        password: { type: String, required: [true, 'password is required'] },
        saved_tastings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tasting" }], 
    },
    { timestamps: true }
);
...
```
>> `models/User.js` - Setting up a 1 to few relationship with Tasting

- Next, we'll set up an API route to allow the client side to dynamically save tastings. 

- Create the controller - `controllers/api/savedTasting.js` and add the following code:

```JavaScript
const User = require("../../models/User");

exports.create = async (req, res) => {
      const tastingId = req.body.id;
      console.log(tastingId);
      if (  !tastingId || req.session.userID) {
        res.json({result: 'error'});
      }
      try {
        await User.update({"_id": req.session.userID}, {$push:{saved_tastings: tastingId}})
      } catch (e) {
        res.json({result: 'error could not create a favourite'}); 
      }
  }


```
>> `controllers/api/savedTasting.js`, a function to favourite a tasting - attributing that favourite to the logged in user.

Above should mostly be familiar to you. However, notice how we use the the MongoDB `$push` operation to push the tasting id to our "saved_tastings" on our user document. 

- Let's extend our `public/scripts/search-tasting.js` script to allow a user to dynamically save a tasting.


```JavaScript 
const handleSave = async (id) => {
  await fetch('/api/saved-tasting', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id: id})
  })
};


const wineView = (wine) => `

        ...
        <a href="#" class="btn btn-primary" onclick="handleSave('${wine._id}')">Save</a>
       ... 
`;
```
>> `public/scripts/search-tasting.js`, added functionality to save our wine tastings

Notice above, we use a little trick where we dynamically pass the id of the tasting into our handler function `onclick="handleSave('${wine._id}')"`. When a user clicks a button, the browser will now pass the associated tasting ID in for us - I like this little trick. Finally, notice how we used a post request to save our favourite. It's common practice to use a post when saving and get when searching. 

We are nearly there. A logged in use should be able to save a tasting. However, we need to allow the user to view their favourites. This does not need to be dynamic functionality as it's a fairly static operation. Let's finish things off and do this: 

Create the controller, `controllers/savedTasting.js` and add the following code:

```JavaScript

exports.list = async (req, res) => {
    try {
      const userRef = await User.findOne({"_id": user.id}).populate('saved_tastings');
      res.render('saved-tastings', {tastings: userRef.saved_tastings});
    } catch (e) {
      console.log(e);
      res.json({result: 'could not find user faves'}); 
    }
}
```
>> `controllers/savedTasting.js`, a one to few join

Above, notice how we are using populate to populate our `saved_tastings` array containing id's with their actual tasting record. In other words, we get an array of tasting records, opposed to just their IDs. As I have already create the view '/views/saved-tastings.ejs', all we need to do now is set up a `/saved-tastings` route. 

```JavaScript
...
const savedTastingApiController = require("./controllers/api/savedTasting");
...
app.get("/saved-tastings", savedTastingController.list);
...
```
>> `app.js`, setting up a saved-tastings route

That's it! We are done, you can now allow logged-in users to save wine tastings.

## Task 4 - Set up Save Tastings

Using the notes above, extend your application so users can save tastings

## Task 5 - Remove Saved Tastings

Can you add a delete button to each saved tastings. The user should be able to click the delete button, and without the browser refreshing, the tasting should be removed from their favourites.  You'll need to extend `controllers/api/savedTasting.js`, adding a delete method.

## Task 6 - Is Authenticated API

Can you create a user API route that the front-end could use to determine if a user is authenticated (e.g., `controllers/api/user.js`). Next, use this information to hide the save button if the user is not logged-in.