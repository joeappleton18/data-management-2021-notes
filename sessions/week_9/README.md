# Week 9 (Deploying to a Serverless Infrastructure)

  
  :::tip
  **Session Dependencies**

  This week we are continuing with our wine tasting theme. Please ensure you have the latest version 
  of the project
   
  You can clone this version using the following command:
  
  - `git clone https://github.com/joeappleton18/db-starter-project.git --single-branch  --branch week-8-solutions`
  - This week we need to be working on a master branch. Run, `git checkout -b master`
  :::
  
  

This week marks the end of our journey in learning the basics of creating database applications. To complete this journey, we need to consider how we might deploy our application.  As such, the primary question for this week is:

### How can I deploy my data-driven web applications to a secure and scalable infrastructure?

Deploying a web application used to be a slow and painful process. You would have to physically provision multiple servers (staging and production) and then use a protocol like FTP or SSH to upload changes and patches to our codebase.  The issue with this approach, due to its cumbersome nature, deployments may happen infrequently. To live up to the agile manifesto of fast iterations and quick deployments we need a more versatile solution, and this solution comes in the form of a serverless infrastructures and cloud hosting.

## Modern Deployment Options 

Both cloud hosting solutions (e.g., Digital Ocean) and serverless infrastructures  (e.g., AWS, Google Cloud and Azure)  circumvent the need for us to maintain any physical hardware, and both can scale along with increased application demand. The key difference between these two solutions is with cloud hosting we need to install and maintain the servers software, with a serverless solution this is handled for us. In summary, both are fine choices. However, the process of installing and patching software takes more human resource. As such, we are going to be exploring a serverless infrastructure for our wine tasting application. 

## What is a serverless infrastructure  

According to Amazon (AWS, the largest provider of such an infrastructure, ["A serverless architecture is a way to build and run applications and services without having to manage infrastructure. Your application still runs on servers, but all the server management is done by AWS. "](https://aws.amazon.com/lambda/serverless-architectures-learn-more/). They claim that a serverless infrastructure affords us the following benefits:

- No operating systems to choose, secure, patch, or manage.
- No servers to right size, monitor, or scale out.
- No risk to your cost by over-provisioning.
- No risk to your performance by under-provisioning.

The above benefits are all well and good; however, AWS is notoriously complex, and has a steep learning curve. Case in point, consider their infrastructure diagram for a simple todo list application:


<img src="https://joeappleton18.github.io/data-management-2021-notes/images/aws-infrastructure.png" />

>> A, not so simple, serverless todo list. Adapted, from a digram provided by AWS.

Notice, in the above architectural digram, we have lambda functions (denoted by the lambda greek letter). These functions are discreet units of code that are executed through triggers. Lambda functions are an interesting proposition, as we only pay for them when they are invoked. However, such a set up is overkill for our little wine tasting application. As such, we are going to opt for services that offer a simplified abstraction layer over AWS. 

## Our Infrastructure

<img src="https://joeappleton18.github.io/data-management-2021-notes/images/wine-infrastructure.png" />

>> The infrastructure we are setting up this week - utilising Heroku and MongoDB Atlas.

Rather than use AWS directly, we are going to be utilising two services that simplify its infrastructure - [Heroku](https://devcenter.heroku.com/) and [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register). Heroku allows us to quickly deploy  applications to a lightweight, secure, virtualized Unix container - known as a dyno. Heroku allows us to deploy applications by simply pushing our codebase to a dedicated remote branch: `git push heroku master`.  While Heroku will take care of running our node application, we'll use MongoDB Atlas to host our database. MongoDB atlas if a service offered by MongoDB which simplifies the process of provisioning and deploying cloud instances of MongoDB. 

## Practical Session 

We'll start the practical session by, first setting up our cloud database. Next, we'll move on to deploying our Node application to Heroku.

## Setting up our Cloud Database 

Let's dive in and created a MongoDB Atlas account. This is a straight forward process:

<img src="https://joeappleton18.github.io/data-management-2021-notes/images/set-up-a-atlas-account.png" />

>> The first three steps in setting up a free Atlas Account.

- [Register a new account](https://www.mongodb.com/cloud/atlas/register).
- On the next screen, you'll get the opportunity to set up a new project, name it "wine" and select JavaScript as the language choice. 
- Select select a Free, shared, cluster.
- Finally, choose an AWS cloud provider and click "Create Cluster"


<img src="https://joeappleton18.github.io/data-management-2021-notes/images/configuring-your-cluster.png" />

>> Configuring a cluster

- Next, we need to follow through the steps to configure our database cluster

    -   Under database access, set up an admin user and password 
    -   Under network access, allow access from all IPs
    -   Finally clusters, click connect to cluster, click connect using NodeJS and grab the  connection string 
    

## Task 1 - Setting up Atlas db and Seeding the Database 

- Clone the starter project (see above)
- Follow the steps above to set up a new database cluster
- Finally, update seeder, replacing line 11 with your clusters string. You'll need to set the database name to 'wine' and the password to what you set for your earlier user. It may be best just to comment out the previous connection string, you might need it later
- Run the seeder, `node seeder.js`
- From your Atlas dash, click `clusters/collections`, and you should see that your wine database had been created and seeded!

## Setting up a Heroku Dyno

Now we have a database set up, we are ready to deploy our application to Heroku. This is actually a very painless process: 

### Making our Application Deployable

To make our application deployable, we only need to make a few tweaks:

- Ensure you are working on a master branch (see this weeks setup instruction, above)

- Specify the version of node we want in our hosting environment (Currently, supported versions are 10.x, 12.x, 14.x, and 15.x.). I am not sure why they skipped 13. We can do this by adding a scripts engines property in our `package.json` file:

```JavaScript
...
  "engines": {
    "node": "14.x"
  },
...
```
>> package.json -  add the engines property to your package.json object. 14 or 15 should be fine.

- When our application is deployed, Heroku will look in our `package.json` file for a start script. It uses this script to run our app. Let's create a start command:

```JavaScript
...
"scripts": {
    "dev": "nodemon app.js",
    "start": "node app.js"
},
...
```
>> package.json -  a start script instructing heroku how to run our application

- Finally, Heroku automatically binds our applications to port 80. In doing so it sets an environment variable called "PORT". You'll notice, however, that we have our port assigned to the environment variable "WEB_PORT". For simplicity, let's updated our application to use the environment variable "PORT".

    - Updated your `.env` file `WEB_PORT` var to `PORT`
    - Within `app.js`, search and replace `WEB_PORT` to `PORT` 

### Set Up

- [Create a new Heroku account](https://signup.heroku.com/signup/dc)
- [Download and install the Heroku CLI for your operating system](https://devcenter.heroku.com/articles/heroku-cli#download-and-install)
- From within your project directory, in a terminal session run  `heroku login` 
- Next, we need to create a new heroku application. From, within your project directory, in a terminal session run  `heroku create` 
- If all has gone well, running `git remote -v` should reveal that a 'heroku' remote had been configured for you. We can use this remote to deploy, but first, we need set a environment variable. We only need need set an environment variable for `MONGODB_URI`, as `heroku` automatically sets the `PORT` for us.  
- To set an environment variable for our heroku project, we simply need to run `heroku config:set VAR_NAME=VAR_VALUE`. As discussed, you only need to set an environment variable for `MONGODB_URI`. This should be set to the URL connection that you used earlier in your seeder. Set it as follows, `heroku config:set MONGODB_URI=YOUR DB STRING`
- We are now ready to deploy. First ensure you have committed the latest version of your work. Next, run `git push heroku master`. If all has gone well you should be able to access your application using the URL printed on your terminal output.

## Task 2 - Deploying your Web Application

Follow the steps above to deploy your wine tasting application to Heroku.

## Task 3 - Set up a Project for Your Assessment

Configure a new deployable project for your assessmen









