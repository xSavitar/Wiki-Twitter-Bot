/*!
 * A Twitter bot that can retweet in response to the tweets matching particluar keyword
 * Version 1.0.1
 * Created by Alangi Derick inspired by Debashis Barman
 * License : https://github.com/ch3nkula/Twitter-Bot/blob/master/LICENSE
 */

 require('dotenv').config()

/* Read the file and get the hash-tags */
var fs = require('fs');
 
var contents = fs.readFileSync('hashtag-fs.txt', 'utf8');
console.log(contents);

/* Set Twitter search phrase */
var TWITTER_SEARCH_PHRASE = contents;

var Twit = require('twit');

var Bot = new Twit({
	consumer_key: process.env.TWITTER_CONSUMER_KEY,
	consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
	access_token: process.env.TWITTER_ACCESS_TOKEN, 
	access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

console.log('The bot process has started running...');

/* BotInit() : To initiate the bot */
function BotInit() {
	var id = '843899134537023490';
	Bot.post('statuses/retweet/:id', { id: id }, BotInitiated);
	Bot.post('favorites/create', { id: id}, BotInitiated);
	
	function BotInitiated (error, data, response) {
		if (error) {
			console.log('Bot could not be initiated, : ' + error);
		}
		else {
  			console.log('Bot initiated : 843899134537023490');
		}
	}
	
	BotLike()
	BotRetweet();
}

/* BotRetweet() : To retweet the matching recent tweet */
function BotRetweet() {

	var query = {
		q: TWITTER_SEARCH_PHRASE,
		result_type: "recent"
	}

	Bot.get('search/tweets', query, BotGotLatestTweet);

	function BotGotLatestTweet (error, data, response) {
		if (error) {
			console.log('Bot could not find latest tweet, : ' + error);
		}
		else {
			var id = {
				id : data.statuses[0].id_str
			}

			Bot.post('statuses/retweet/:id', id, BotRetweeted);
			
			function BotRetweeted(error, response) {
				if (error) {
					console.log('Bot could not retweet, : ' + error);
				}
				else {
					console.log('Bot retweeted : ' + id.id);
				}
			}
		}
	}
	
	/* Set an interval of 30 minutes (in microseconds) */
	setInterval(BotRetweet, 30*60*1000);
}

/* BotLike() : To like the matching recent tweet */
function BotLike() {

	var query = {
		q: TWITTER_SEARCH_PHRASE,
		result_type: "recent"
	}

	Bot.get('search/tweets', query, BotGotLatestTweet);

	function BotGotLatestTweet (error, data, response) {
		if (error){
			console.log('Bot cound not find latest tweet, : ' + error);
		}
		else {
			var id = {
				id : data.statuses[0].id_str
			}

			Bot.post('favorites/create', id, BotLiked);

			function BotLiked(error, response) {
				if (error){
					console.log('Bot could not like this tweet, : ' + error);
				}
				else {
					console.log('Bot liked this tweet : ' + id.id);
				}
			}
		}
	}

	/* Set an interval of 30 mins (in microseconds) */
	setInterval(BotLike, 30+60+1000);
}

/* Initiate the Bot */
BotInit();