var config = require("./keys.js");
var twitter = require("twitter");

// Pass the consumer and access token of our Twitter application to twitter npm
var client = new twitter(config.twitterKeys);
// console.log(client);
var userInput = process.argv[2];
// console.log(userInput);
// for (var prop in twitter.twitterKeys){
//   console.log(prop);
//   console.log(twitter.twitterKeys[prop]);
//
// }
switch (userInput) {
    case "my-tweets":
        myTweets();
        break;
    case "spotify-this-song":
        spotifyThis();
        break;
    case "movie-this":
        movieThis();
        break;
    case "do-what-it-says":
        doThis();
        break;
    default:
        console.log("Sorry");
}


// my-tweets
// This will show your last 20 tweets and when they were created at in your terminal/bash window.
function myTweets() {
    // console.log("Tweet function running");
    // client.get('favorites/list', function(error, tweets, response) {
    //     if (error) throw error;
    //     console.log(tweets); // The favorites.
    //     console.log(response); // Raw response object.
    // });

    // client.post('statuses/update', {
    //     status: 'i am a tweet'
    // }, function(error, tweet, response) {
    //     if (!error) {
    //         console.log(tweet);
    //     }
    //
    // }); // end of update status

    client.get('statuses/user_timeline', { screen_name: 'bhcwhatwut', count: 20 }, function(error, tweets, response) {
    if (!error) {      
      for(var i = 0; i < tweets.length; i++){
        console.log((i+1)+ " tweet: " + tweets[i].text);
        console.log((i+1)+ " tweet: " + tweets[i].created_at);
      }
      // console.log(tweets[0].text);
      // console.log(tweets[0].created_at);

    }
    else {
      throw error;
    }
  });

}


// spotify-this-song
// This will show the following information about the song in your terminal/bash window
// Artist(s), Song Name, Preview link of Song, Album song is from
// if no song is provided then your program will default to "The Sign" by Ace of Base

function spotifyThis() {
    console.log("Spotify function running");
}

// movie-this

function movieThis() {
    console.log("Movie function running");
}

// do-what-it-says
function doThis() {
    console.log("Do THIS function running");
}
