/*!
 * Bot.js : A Twitter bot that can retweet in response to the tweets matching particluar keyword
 * Version 1.0.0
 * Created by Alangi Derick inspired by Debashis Barman
 * License : https://github.com/ch3nkula/Twitter-Bot/blob/master/LICENSE
 */

/* Configure the Twitter API */
var TWITTER_CONSUMER_KEY = 'yFJec6Sw2INUUIii02aM78Svw';
var TWITTER_CONSUMER_SECRET = 'KMHX9diFRaxke7Ucsmg6tYMrnpzhtY3c4PeWDB0fHLxJBfC4pu';
var TWITTER_ACCESS_TOKEN = '984219792-jpDD12fYjYQiazGow90GQ7CIgSaod8iMbNq9EP4d';
var TWITTER_ACCESS_TOKEN_SECRET = 'sFS1ajLURKmR43KIC1IrHswyJrPwejRiHMshy5djlK0NV';

/* Set Twitter search phrase */
var TWITTER_SEARCH_PHRASE = '#wikimedia OR #mediawiki OR @wikimedia OR @mediawiki';

var Twit = require('twit');

var Bot = new Twit({
	consumer_key: TWITTER_CONSUMER_KEY,
	consumer_secret: TWITTER_CONSUMER_SECRET,
	access_token: TWITTER_ACCESS_TOKEN, 
	access_token_secret: TWITTER_ACCESS_TOKEN_SECRET
});

console.log('The bot process has started running...');

/* BotInit() : To initiate the bot */
function BotInit() {
	Bot.post('statuses/retweet/:id', { id: '803640638939885568' }, BotInitiated);
	
	function BotInitiated (error, data, response) {
		if (error) {
			console.log('Bot could not be initiated, : ' + error);
		}
		else {
  			console.log('Bot initiated : 803640638939885568');
		}
	}
	
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
	
	/* Set an interval of 30 minutes (in microsecondes) */
	setInterval(BotRetweet, 30*60*1000);
}

/* Initiate the Bot */
BotInit();