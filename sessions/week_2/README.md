
# Week 2 (Exploring Node, Express and Templates)

:::tip
This module is not about taking an in-depth exploration into developing web applications. Rather, I want to show you the basics to allow you to expose an interface for users to be able to interact with your database.
::::






This week we are going to somewhat depart, at least temporarily, from looking specifically at databases and consider how we can serve web HTML pages from a Node application. I appreciate this may seem a little odd. After all, this is a database unit.

My rationale for taking the approach is a common technique in  NoSql  application development; that is to allow the intended user interactions with our application to guide the data model. In other words, we structure our data such that it is convenient for our future users. As such, this week we are going to laying out a sample application and consider how our users will interact with it.

## Simplifying HTTP requests

Recall, last week, we used Node's inbuilt HTTP module to create a basic web server and respond to HTTP requests. This week, we are going to be exploring how we can simplify the process of managing HTTP requests through the use of the node package express.

According to the the [express documentation](http://expressjs.com/), "express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications". In other words, it provides a lightweight framework to assist in the development of web applications.

## An example using express

```js
const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
```

The above example uses the express package to create a new web-server that listens on port 3000 (l.9). We can then set up listeners to respond to any given HTTP request. Above, we listen for a get request to the base URL of our server (l.5).

## Task 1 Using Express

- Create a new folder called `week_2`
- Open VSCode pointing to the location of your `week_2` folder
- Within `week_2`, create a file called `index.js`
- Run the command `npm init -y`
- We can now install express, `npm install express --save`
- To make our lives a little easier, we are also going to install nodemon. Run `npm install nodemon --save-dev`. Nodedemon is a useful tool that recompiles our applications in realtime. This means we don't need to keep running `node 'our application name'` to reflect our latest changes.
- To use nodedemon add the following the scripts section of your `package.json` file:

```JSON
 "scripts": {
    "dev": "nodemon index.js"
  }
```

- Next, type in the sample application into `index,js`
- To run the application execute the following terminal command `npm run dev`.

## Serving HTML files

Express makes serving static files easy. For instance, let's assume that we are making simple website. When we receive an HTTP get request to the root path of our website we would want to return an `index.html` file (see sample 2 below)

### Sample 2

```
const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

```

Above, we return an `index.html` file when a request is received to the root of our website (l.12).

## Task 2 Resolving Static Assets

- Within your week 2 folder create 2 or 3 html pages. Place an `h1` in each page that identifies the page, e.g. `<h1>Contact </h1>`. Work out how serve these pages. For instance, when we visit `http://locahost:3000/contact` contact.html should be rendered.
- Can you work out what the `path.resolve(__dirname, "index.html")` outputs? See if you can log to the console its output.

## Serving Static assets

Currently we cannot serve static assets such as CSS and images in our HTML pages. In oder to configure this functionality we need to use some middleware. Middleware can be considered functionality that runs between an HTTP request being received and a response being sent. Below, we instruct express to serve assets from a folder in our root directory called `public` (l.4).

```js
const express = require("express");
const path = require("path");
const app = express();
app.use(express.static(path.join(__dirname, "public")));
```

Above, express looks up the files relative to the static directory, so the name of the static directory is not part of the URL. For instance, if we place the image foo.jpeg in the `public` folder we would reference it in `index.html` like this, `<img src="foo.jpeg" />`.

## Task 3 Static Assets

Can you find and insert a picture of Rick Ashley into one of your HTML pages.

## EJS Templates

While serving plain HTML files provides us with a means to present a website, we do not have much in the way of flexibility and sophistication. For instance, how do we inject data into our html pages. Furthermore, how can we sections of our html pages (e.g. the header and the footer). This is where templating languages can help us. We are going to explore one such language, [https://ejs.co/#about], in this class.

EJS is simple to use. First, we need to install it - `npm install ejs`. We can now tell express to render our html pages using ejs. Below is a full example.

```js
const express = require("express");
const path = require("path");
const app = express();
const port = 20000;
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
```

The express will assume that we have an `index.ejs` file in a `views` folder which lives in the root directory of your project.

EJS, is a superset of HTML. This means, to get the above example to work, we can simply rename our index.html file to index.ejs and move it to a views folder.

Using EJS, we now have some dynamic capabilities within our HTML views. The first thing you might want to do is extract your header into a shared folder such as `views/common/header.ejs` we could then share it amongst our pages as follows:

```html
<!-- views/index.ejs -->
...
<body>
  <%- include('common/header'); %>
  <h1>Home Page</h1>
  <img src="images/test.jpeg" alt="wtf" />
</body>
...
```

```html
<!-- views/common/header.ejs -->
<ul>
  <li><a href="home">Home</a></li>
  <li><a href="about"></a>About</li>
  <li><a href="contact">Contact</a></li>
</ul>
```

## Task 4 Developing The Pages For An Application

We've reached the main task for this week. Over the next several weeks we are going to be making a wine tasting application. You will be familiar with the wine [tasting data set from last week](https://www.kaggle.com/zynicide/wine-reviews). It contains 130k tastings; however, interestingly there are only around 25 wine tasters.

Your main task for this week is to further explore the dataset and mock up a 4 page website using ejs templates that could be used to present the wine data in a meaningful way. **Note**, at this point we are not processing any data. Rather, we are mocking up what the data could look like. [You can use my example site as a starting point](https://ssu-my.sharepoint.com/:u:/g/personal/joe_appleton_solent_ac_uk/EZL8OjP32PlArSd4JWv2bNQBYZh9uaV1wbGABTGn3rjrQQ?e=afqOKI). Notice how I am using Twitter Bootstrap to quickly generate a site. This is something you are more than welcome to do for your assessment. [You can read more about Bootstrap on the official site](https://getbootstrap.com/).

To begin with you can start to break your application down as below:

```js
<%- include('header'); -%>
<h1>
  Title
</h1>
<p>
  My page
</p>
<%- include('footer'); -%>

```
