(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{207:function(t,a,e){"use strict";e.r(a);var s=e(0),n=Object(s.a)({},(function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"week-3-mongodb-queries"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#week-3-mongodb-queries","aria-hidden":"true"}},[t._v("#")]),t._v(" Week 3 (MongoDB Queries)")]),t._v(" "),e("div",{staticClass:"tip custom-block"},[e("p",[t._v("Last week we considered how we could use NodeJS and the packages Express and ejs to construct the view layer of a data driven application. This week we will be continuing our journey by moving on to explore, the powers of the MongoDB data model.")]),t._v(" "),e("p",[t._v("To assist us in gaining a better understanding of the powers of MongoDB, we are going to revisit our wine tasting dataset from week one.")]),t._v(" "),e("p",[t._v("Those of you who completed all of the week one tasks would have observed some interesting properties of our wine data-set. First, there are around 20k tastings with no attributed taster. Second, although there are ~130k records, there are only ~20 wine tasters - they've been busy! Observations such as this can be helpful in determining the utility of a data set.")])]),t._v(" "),e("h3",{attrs:{id:"task-0-windows-path-setting"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#task-0-windows-path-setting","aria-hidden":"true"}},[t._v("#")]),t._v(" Task 0 - Windows Path Setting")]),t._v(" "),e("p",[t._v("f you are using windows, now is a good time to add the MongoDB folder as an environment variable. Further to this, you should also install the MongoDB Tools.")]),t._v(" "),e("ul",[e("li",[e("p",[e("a",{attrs:{href:"https://stackoverflow.com/questions/31055637/getting-mongoimport-is-not-recognized-as-an-internal-or-external-command-ope",target:"_blank",rel:"noopener noreferrer"}},[t._v("There is a good stack overflow answer that you can read here"),e("OutboundLink")],1)])]),t._v(" "),e("li",[e("p",[t._v("You will need to download "),e("a",{attrs:{href:"https://www.mongodb.com/try/download/database-tools",target:"_blank",rel:"noopener noreferrer"}},[t._v("MongoDB Tools"),e("OutboundLink")],1)])]),t._v(" "),e("li",[e("p",[t._v("Extract the zip file and move the contents to "),e("code",[t._v("C:\\Program Files\\MongoDB\\Server\\4.4\\bin\\")])])])]),t._v(" "),e("h2",{attrs:{id:"importing-data"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#importing-data","aria-hidden":"true"}},[t._v("#")]),t._v(" Importing Data")]),t._v(" "),e("p",[t._v("We've already looked at importing data into MongoDB programatically using node. However, you can also use the MongoDB importer to populate a collection.")]),t._v(" "),e("p",[t._v("The mongoimport command line tool is distributed with MongoDB and allows us to import data into our local MongoDB instance. The command looks like this:")]),t._v(" "),e("div",{staticClass:"language-js extra-class"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[t._v("mongoimport "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("--")]),t._v("db"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("wine  "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("--")]),t._v("collection"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("tastings "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("--")]),t._v("file"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"wine.json"')]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("--")]),t._v("jsonArray\n")])])]),e("p",[t._v('The above command is fairly self explanatory; however, it is worth noting, if the database, "wine", does not exist it will automatically be created for us. Furthermore, the --jsonArray flag is needed as the the wine.json file contains and array of JSON elements. Finally, notice how we have used a singular name for the database and a plural for the collection - this is a common naming convention.')]),t._v(" "),e("h2",{attrs:{id:"task-1-mongodb-data-importing"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#task-1-mongodb-data-importing","aria-hidden":"true"}},[t._v("#")]),t._v(" Task 1 - MongoDB Data Importing")]),t._v(" "),e("ul",[e("li",[e("p",[e("a",{attrs:{href:"https://github.com/joeappleton18/advanced-databases-starter-project/raw/master/wine.json",target:"_blank",rel:"noopener noreferrer"}},[t._v('Download the wine.json file and insert the data into a collection called "tastings" that lives in a database called "wine". You can grab the data by visiting this link and saving the page on your local computer'),e("OutboundLink")],1)])]),t._v(" "),e("li",[e("p",[t._v('If all has gone well you, should see a message along the lines of " 129971 document(s) imported successfully. 0 document(s) failed to import."')])]),t._v(" "),e("li",[e("p",[t._v("While it is useful to directly import data using MongoDB, some people have had a few issues. "),e("a",{attrs:{href:"https://github.com/joeappleton18/wine-data-importer",target:"_blank",rel:"noopener noreferrer"}},[t._v("If you think the import process has taken too long then you can clone and use a data importer that I have created for you"),e("OutboundLink")],1),t._v(".")])])]),t._v(" "),e("h2",{attrs:{id:"considering-the-current-data-shape"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#considering-the-current-data-shape","aria-hidden":"true"}},[t._v("#")]),t._v(" Considering the Current Data Shape")]),t._v(" "),e("p",[t._v('Currently each document in our "tastings" collection looks, along the lines of, this:')]),t._v(" "),e("div",{staticClass:"language-json extra-class"},[e("pre",{pre:!0,attrs:{class:"language-json"}},[e("code",[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"_id"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" ObjectId("),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"5f88b504513221bee048d3dd"')]),t._v(")"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"points"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"87"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"title"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Nicosia 2013 Vulkà Bianco  (Etna)"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"description"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Aromas include tropical fruit, broom, brimstone and dried herb. The palate isn\'t overly expressive, offering unripened apple, citrus and dried sage alongside brisk acidity."')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"taster_name"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Kerin O’Keefe"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"taster_twitter_handle"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"@kerinokeefe"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"price"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token null keyword"}},[t._v("null")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"designation"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Vulkà Bianco"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"variety"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"White Blend"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"region_1"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Etna"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"region_2"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token null keyword"}},[t._v("null")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"province"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Sicily & Sardinia"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"country"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Italy"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"winery"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Nicosia"')]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),e("blockquote",[e("blockquote",[e("p",[t._v("A single document from the tastings collection. Notice how MongoDB takes care of auto generating an ID for us.")])])]),t._v(" "),e("h2",{attrs:{id:"read"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#read","aria-hidden":"true"}},[t._v("#")]),t._v(" Read")]),t._v(" "),e("p",[t._v("To get you all started, let's explore some basic read operations that we might want to run on our collection. Access the MongoDB command line, and run the following:")]),t._v(" "),e("div",{staticClass:"language-js extra-class"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[t._v("db"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("tastings"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("find")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),e("p",[t._v("Running the above command will return the first 20 records that match the query and a cursor to the remaining records. You'll notice in the command shell it will prompt you to 'type \"it\"' for more records.")]),t._v(" "),e("h3",{attrs:{id:"further-refining-our-query"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#further-refining-our-query","aria-hidden":"true"}},[t._v("#")]),t._v(" Further refining our query")]),t._v(" "),e("p",[t._v("Notice, above, how we passed into find what appears to be an empty object literal - "),e("code",[t._v("{}")]),t._v(". We can add name value pairings to this object to filter our results. Here are some basic examples:")]),t._v(" "),e("ul",[e("li",[e("strong",[e("code",[t._v('db.tastings.find({country: "Italy" })')])]),t._v(" returns all wine tastings from Italy")]),t._v(" "),e("li",[e("strong",[e("code",[t._v('db.tastings.find({country: "Italy", price: {$lt:10}})')])]),t._v(" returns all wine tastings from Italy where the price of the wine is less than 10")])]),t._v(" "),e("p",[t._v("For a full list of operations you should read the "),e("a",{attrs:{href:"https://docs.mongodb.com/manual/reference/operator/query/",target:"_blank",rel:"noopener noreferrer"}},[t._v("documentation"),e("OutboundLink")],1),t._v(". However, here is a slightly more interesting example:")]),t._v(" "),e("p",[e("strong",[e("code",[t._v("db.tastings.find({$or: [{country: 'France'}, {country: 'Italy'}]})")])]),t._v(" returns all wine tastings from Italy "),e("strong",[t._v("or")]),t._v(" France. We can also use the logical operators "),e("strong",[e("code",[t._v("$not, $and, $nor")])]),t._v(".")]),t._v(" "),e("h3",{attrs:{id:"mongo-allows-us-to-append-further-operations-to-a-given-query"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#mongo-allows-us-to-append-further-operations-to-a-given-query","aria-hidden":"true"}},[t._v("#")]),t._v(" Mongo allows us to append further operations to a given query")]),t._v(" "),e("p",[t._v("As mentioned, when we execute a query MongoDb returns a cursor. A cursor has a whole suite of methods that we can run to further refine our data.")]),t._v(" "),e("p",[t._v("Below are some useful methods, for a complete list of, what are know as cursor methods, "),e("a",{attrs:{href:"https://docs.mongodb.com/manual/reference/method/js-cursor/",target:"_blank",rel:"noopener noreferrer"}},[t._v("check the documentation"),e("OutboundLink")],1),t._v(":")]),t._v(" "),e("ul",[e("li",[e("p",[e("strong",[e("code",[t._v("db.tastings.find({}).count()")])]),t._v(" returns the total number of records matching that query")])]),t._v(" "),e("li",[e("p",[e("strong",[e("code",[t._v("db.tastings.find({}).limit(1)")])]),t._v(" limits the amount of records contained in the cursor's result set")])]),t._v(" "),e("li",[e("p",[e("strong",[e("code",[t._v("db.tastings.find({}).pretty()")])]),t._v(" displays the results in an easy to read format")])]),t._v(" "),e("li",[e("p",[e("strong",[e("code",[t._v("db.tastings.find({price: {$ne: null}}).sort({price: 1})")])]),t._v(" Sorts the results in price order. "),e("code",[t._v("price: 1")]),t._v(" tells MongoDB to display the results in ascending (increasing) order by price. "),e("code",[t._v("price: -1")]),t._v(", if you are feeling flush, displays the results in descending price order.")])])]),t._v(" "),e("h2",{attrs:{id:"task-2-reading-data"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#task-2-reading-data","aria-hidden":"true"}},[t._v("#")]),t._v(" Task 2 - Reading Data")]),t._v(" "),e("p",[t._v("Use the notes above, and the "),e("a",{attrs:{href:"https://docs.mongodb.com/",target:"_blank",rel:"noopener noreferrer"}},[t._v("MongoDB documentation"),e("OutboundLink")],1),t._v(" to answer the following questions (you should aim to do so efficiently as possible):")]),t._v(" "),e("ul",[e("li",[e("p",[t._v("How many records, in total, are there in the entire tastings collection?")])]),t._v(" "),e("li",[e("p",[t._v("How many wine records exist that originated from Italy where the price is greater than 80?")]),t._v(" "),e("ul",[e("li",[t._v("List the results in descending order, so you can see the most expensive bottle of wine first.")])])]),t._v(" "),e("li",[e("p",[t._v("How many wine records exist that originated from France or Italy, where the price is greater than 60? Can you use a "),e("code",[t._v("$or")]),t._v(" and a "),e("code",[t._v("$and")]),t._v(" together to achieve this.")])])]),t._v(" "),e("p",[e("strong",[t._v("Did you fly through these tasks! Here are some more advanced, optional, questions")])]),t._v(" "),e("ul",[e("li",[e("p",[t._v("Can you use the "),e("a",{attrs:{href:"https://docs.mongodb.com/manual/reference/operator/aggregation/group/#pipe._S_group",target:"_blank",rel:"noopener noreferrer"}},[t._v("aggregation pipeline"),e("OutboundLink")],1),t._v(" to determine the name of each wine taster and the count of the total tastings they have conducted?")])]),t._v(" "),e("li",[e("p",[t._v("How many different regions are there?")])]),t._v(" "),e("li",[e("p",[t._v('Can you work out the wine which has been tasted the most? I think it is "Gloria Ferrer NV Sonoma Brut Sparkling (Sonoma County)" which has been tasted 11 times.')])])]),t._v(" "),e("h2",{attrs:{id:"updating-and-writing-data"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#updating-and-writing-data","aria-hidden":"true"}},[t._v("#")]),t._v(" Updating and Writing Data")]),t._v(" "),e("p",[t._v("Updating and writing data is very simple. For instance, we can simply run the following operation:")]),t._v(" "),e("div",{staticClass:"language-js extra-class"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[t._v("db"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("tastings"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("insertOne")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  title"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Toro Loco"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  taster_name"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Joe Appleton"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  taster_twitter_handle"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"@joeappleton18"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  price"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("10")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  designation"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Vulkà Bianco"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  variety"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"White Blend"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  region_1"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Etna"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),e("blockquote",[e("blockquote",[e("p",[t._v("FYI, Toro Loco is a very affordable wine from Aldi - I recommend it!")])])]),t._v(" "),e("p",[t._v("Let's assume the price changes on our bottle of Toro Loco to 20. We could update the record using the following command:")]),t._v(" "),e("div",{staticClass:"language-js extra-class"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[t._v("db"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("tastings"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("updateOne")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" title"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Toro Loco"')]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" $"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("set")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" price"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("20")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),e("p",[t._v("The first part of the above command is our query - "),e("code",[t._v('{title: "Toro Loco"}')]),t._v(". The second, is the operations that we want to run on the record that our query returns - "),e("code",[t._v("[{ $set: { price: 20 } }]")])]),t._v(" "),e("p",[t._v("The above command will update the first record it finds! However, what if there are lots of tastings of ToroLoco. This means our data, while usable, is not exactly optimised. Data optimisation is something that we will look at later. For now, you just need to know that you can update multiple records:")]),t._v(" "),e("div",{staticClass:"language-js extra-class"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[t._v("db"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("tastings"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("updateMany")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" title"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Toro Loco"')]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" $"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("set")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" price"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("20")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),e("p",[t._v("We can also unset document properties:")]),t._v(" "),e("div",{staticClass:"language-js extra-class"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[t._v("db"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("tastings"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("updateMany")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" title"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Toro Loco"')]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" $unset"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" price"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('""')]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),e("p",[t._v("The above query removes the price property from our Toro Loco documents.")]),t._v(" "),e("p",[t._v("A further useful operation is constructing new properties using other properties on the existing record:")]),t._v(" "),e("div",{staticClass:"language-js extra-class"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[t._v("db"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("tastings"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("updateMany")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" title"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Toro Loco"')]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" $"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("set")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" oldPrice"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"$price"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" price"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("30")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),e("p",[t._v('The above query sets the value of the current to "oldPrice", then updates the price to 30.')]),t._v(" "),e("h2",{attrs:{id:"task-3-updating-data"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#task-3-updating-data","aria-hidden":"true"}},[t._v("#")]),t._v(" Task 3 - Updating Data")]),t._v(" "),e("p",[t._v("This, final task, starts off by getting you to perform simple update operations and moves on to more complex ones. We can use update operations to clean our data.")]),t._v(" "),e("ul",[e("li",[e("p",[t._v('Can you update the price "Gloria Ferrer NV Sonoma Brut Sparkling (Sonoma County)" to 11?')])]),t._v(" "),e("li",[e("p",[t._v("Can you figure out how to to move regions to an embedded array on each document in the tastings collection. After completion, you records should all look like this:")])])]),t._v(" "),e("div",{staticClass:"language-js extra-class"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    title"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Toro Loco'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    regions"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Etna'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'France'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),e("p",[t._v("** Advanced Tasks **")]),t._v(" "),e("ul",[e("li",[e("p",[t._v("Can you figure out how to use the "),e("a",{attrs:{href:"https://docs.mongodb.com/manual/reference/operator/aggregation/group/#pipe._S_group",target:"_blank",rel:"noopener noreferrer"}},[t._v("aggregation pipeline"),e("OutboundLink")],1),t._v(" to output the details of each wine taster (e.g. name, twitter handle and number of tastings) to a new collection called tasters - this will take a little bit of research.")])]),t._v(" "),e("li",[e("p",[t._v("Finally, continue to explore our data set and run some more advanced queries that will further clean the data")])])])])}),[],!1,null,null,null);a.default=n.exports}}]);