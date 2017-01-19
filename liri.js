var config = require("./keys.js");
var twitter = require("twitter");
var spotify = require('spotify');
var request = require("request");
var fs = require("fs");

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

// if(spotifySearch === "spotify"){
//   getSpotifySong();
// }
switch (userInput) {
    case "my-tweets":
        myTweets();
        break;
    case "spotify":
        spotifyThis();
        // testSpotify();
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

function logCommand(incomingData){
  // APPEND FILE AUTOMATICALLY CREATES FILE IF IT DOES NOT EXIST

  fs.appendFile('log.txt', "\r\n" + JSON.stringify(incomingData, null, 2), function(err) {
      if (err) return console.log(err);
      console.log('Command Logged > log.txt');
  });
  fs.appendFile('log.txt', "\r\n======================LINE BREAK======================", function(err) {
      if (err) return console.log(err);

  });


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

    client.get('statuses/user_timeline', {
        screen_name: 'bhcwhatwut',
        count: 20
    }, function(error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                console.log((i + 1) + " tweet: " + tweets[i].text);
                console.log((i + 1) + " tweet: " + tweets[i].created_at);
            }
            logCommand(tweets);
            // console.log(tweets[0].text);
            // console.log(tweets[0].created_at);

        } else {
            console.log(error);
        }
    });

}

function giveMeAce() {
    // '0hrBpAOgrt8RXigk83LLNE'
    spotify.lookup({
        type: 'track',
        id: '0hrBpAOgrt8RXigk83LLNE'
    }, function(err, data) {

        var songName = data.name;
        var theArtist = data.artists[0].name;
        var previewLink = data.preview_url;
        var albumName = data.album.name;
        console.log("SORRY WE COULDNT FIND YOUR SONG");
        console.log("Title: " + songName);
        console.log("Artist: " + theArtist);
        console.log("Preview Link: " + previewLink);
        console.log("Album Name: " + albumName);

        logCommand(data);
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }
    });


}
// spotify-this-song
// This will show the following information about the song in your terminal/bash window
// Artist(s), Song Name, Preview link of Song, Album song is from
// if no song is provided then your program will default to "The Sign" by Ace of Base

function spotifyThis() {
    // console.log("Spotify function running");
    var nodeArgs = process.argv;
    var songArray = [];

    //Put the song query together
    for (var i = 3; i < nodeArgs.length; i++) {
        songArray.push(nodeArgs[i]);
    }
    var spotifySearch = songArray.join("+");
    // Test to see what we are querying for
    // console.log(spotifySearch);
    if (spotifySearch === "") {
        giveMeAce();
    } else {
        spotify.search({
            type: 'track',
            query: spotifySearch
        }, function(err, data) {
            if (err) {
                console.log('Error occurred: ' + err);
                return;
            }
            // console.log(JSON.stringify(data, null, 2));
            // I want to look at the entire JSON object in a txt file
            // fs.writeFile('helloworld.txt', JSON.stringify(data, null, 2), function(err) {
            //     if (err) return console.log(err);
            //     console.log('Hello World > helloworld.txt');
            // });

            var start = data.tracks.items[0];
            // if search returns back nothing, output The Sign - Ace of Base
            if (start === undefined) {
                giveMeAce();
            } else {
                logCommand(data);
                for (var j = 0; j < data.tracks.items.length; j++){

                    // CHECK IF MORE THAN 1 ARTIST
                    var tempArtists = [];
                    var allArtists;
                    for (var i = 0; i < data.tracks.items[j].artists.length; i++) {
                        if (data.tracks.items[j].artists[i].name !== undefined) {
                            tempArtists.push(data.tracks.items[j].artists[i].name);

                        }
                    }
                    // console.log(data.tracks.items[j]);
                    // data.tracks.items[j].artists[0].name
                    allArtists = tempArtists.join(" & ");
                    console.log("================RESULT "+(j+1)+"==========================" );
                    console.log("Track Name: " + data.tracks.items[j].name);
                    console.log("Artist Name: " + allArtists);
                    console.log("Preview Link: " + data.tracks.items[j].preview_url);
                    console.log("Album Name " + data.tracks.items[j].album.name);
                    console.log("===================================================" );
                }


                // THE BELOW CODE WAS TO PRINT OUT A SINGLE TRACK
                /*
                var artists = start.artists[3];
                var tempArtists = [];
                var allArtists;
                var songName = start.name;
                var previewLink = start.preview_url;
                var albumName = start.album.name;

                // check if more than 1 artist
                for (var i = 0; i < 5; i++) {
                    if (start.artists[i] === undefined) {
                        allArtists = tempArtists.join(" & ");
                        break;
                    } else {
                        tempArtists.push(start.artists[i].name);
                    }

                }
                console.log(data);
                console.log("Title: " + songName);
                console.log("Artists: " + allArtists);
                console.log("Preview Link: " + previewLink);
                console.log("Album Name: " + albumName);
                */
            }


        });
    }

}

// movie-this

function movieThis() {
    // console.log("Movie function running");
    var nodeArgs = process.argv;
    var movieArray = [];

    //Put the song query together
    for (var i = 3; i < nodeArgs.length; i++) {
        movieArray.push(nodeArgs[i]);
    }
    var movieName = movieArray.join("+");


    // http://www.omdbapi.com/?t=harry+potter&y=2011&plot=short&r=json
    // CREATE REQUEST LINK
    var queryURL = "https://www.omdbapi.com/?t=" + movieName + "&plot=short&tomatoes=true&r=json";
    // movieName global variable

    if (movieName === "") {
        // console.log("empty movie name");
        giveMeNobody();
    } else {
        request(queryURL, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                // console.log(body);

                var movieInfo = JSON.parse(body);
                if (movieInfo.Title === undefined) {
                    giveMeNobody();
                } else {
                    logCommand(body);
                    var movieTitle = movieInfo.Title;
                    var movieYear = movieInfo.Year;
                    var imdbRating = movieInfo.imdbRating;
                    var country = movieInfo.Country;
                    var language = movieInfo.Language;
                    var plot = movieInfo.Plot;
                    var actors = movieInfo.Actors;
                    var rtRating = movieInfo.tomatoRating;
                    var rtURL = movieInfo.tomatoURL;
                    console.log("Title: " + movieTitle);
                    console.log("Year: " + movieYear);
                    console.log("IMDB Rating: " + imdbRating);
                    console.log("Country(s): " + country);
                    console.log("Language: " + language);
                    console.log("Plot: " + plot);
                    console.log("Actors: " + actors);
                    console.log("Rotten Tomatoes Rating: " + rtRating);
                    console.log("Rotten Tomatoes URL: " + rtURL);
                    // console.log(body);
                }


            } else {
                console.log("ERROR: " + error);
            }
        });
    }

} // end of movie-this

function giveMeNobody() {
    request('http://www.omdbapi.com/?i=tt0485947&plot=short&tomatoes=true&r=json', function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var nobodyInfo = JSON.parse(body);
            logCommand(body);
            console.log("==============================");
            console.log("WE COULD NOT FIND YOUR MOVIE");
            console.log("==============================");

            console.log("Title: " + nobodyInfo.Title);
            console.log("Year: " + nobodyInfo.Year);
            console.log("IMDB Rating: " + nobodyInfo.imdbRating);
            console.log("Country(s): " + nobodyInfo.Country);
            console.log("Language: " + nobodyInfo.Language);
            console.log("Plot: " + nobodyInfo.Plot);
            console.log("Actors: " + nobodyInfo.Actors);
            console.log("Rotten Tomatoes Rating: " + nobodyInfo.tomatoRating);
            console.log("Rotten Tomatoes URL: " + nobodyInfo.tomatoURL);

        }
    });
}

// do-what-it-says
function doThis() {
    // console.log("Do THIS function running");
    /*
    var execFile = require('child_process').execFile;
    execFile('./random.txt', "utf8", function(error, stdout, stderr){
        if(error){
            console.log(error);
        }
        console.log(stdout);
    });
    */

    fs.readFile("./random.txt", "utf8", function(err, data) {
        if (err) {
            console.log(err);
        } else {
            // var test = JSON.stringify(data, null, 2);
            // console.log(data);
            // console.log(test);
            // SYNCHRONOUS SOLUTION
            // console.log(require('child_process').execSync(data).toString());

            // ASYNCHRONOUS SOLUTION - THIS IS BETTER FOR WEB DEVELOPMENT
            var exec = require("child_process").exec;
            exec(data, function(error, stdout){
                if(error){
                    console.error(error);
                    return;
                }
                console.log(stdout);
                // console.log(stderr);
            });
            // console.log(require('child_process').exec(test));
        }
    });


}
