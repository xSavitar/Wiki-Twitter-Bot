# Wiki-Retweet-Bot
A bot that sends a search query to Twitter API, returns a result that matches the search; likes and retweets the most recent tweet returned. The keyword(s) used in the bot so far are: `#wikimedia`, `#mediawiki`, etc...


## How to try out the bot

1. Clone project:
  ```shell
  git clone https://github.com/ch3nkula/Wiki-Retweet-Bot.git
  ```

2. Install Need Package Manager/Management (NPM) on Mac OS X:
  ```shell
  brew install npm
  ```

3. Change directory to the project and install dependencies for the project:

  ```shell
  npm install
  ```

4. [Get credentials for your bot](https://dev.twitter.com/) and complete the `.env`

* When logged-in on the Twitter's developer site, check the link on the top menu `My apps` (and it will take you to this site: https://apps.twitter.com/) or go straight away to type: https://apps.twitter.com/ on your browser.

* On the top-right, there is a button saying `Create New App`, click on it and follow the steps to fill in the form fields.

* Click the `Create your Twitter Application` button when you finish the immediate above step.

* Once the application is created, under the `Details` section, you will find the credentials to fill into your `.env` file and additionally, under the `Keys and Access tokens`, you will find all the keys and access tokens needed in the `.env` file.

* When all these configs are done, your app can then connect to Twitter successfully and perform its various functions.

5. Run the bot using:

  ```shell
  npm start
  ```
  or 
  ```shell
  node server.js
  ```

6. You are almost done, deploy the app to run as a web service and there you go :+1:
