var config = require("./keys.js");
var twitter = require("twitter");
var spotify = require('spotify');
var request = require("request");
var fs = require("fs");

// Pass the consumer and access token of our Twitter application to twitter npm
var client = new twitter(config.twitterKeys);
// console.log(client);
var userInput = process.argv[2];
var spotifySearch;
var movieName;
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
        getSpotifySong();
        spotifyThis();
        break;
    case "movie-this":
        getMovieTitle();
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

    client.get('statuses/user_timeline', {
        screen_name: 'bhcwhatwut',
        count: 20
    }, function(error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                console.log((i + 1) + " tweet: " + tweets[i].text);
                console.log((i + 1) + " tweet: " + tweets[i].created_at);
            }
            // console.log(tweets[0].text);
            // console.log(tweets[0].created_at);

        } else {
            throw error;
        }
    });

}

function getSpotifySong() {
    // process.argv[4] is the start of the song
    var songArray = [];
    for (var i = 3; 4 < 20; i++) {
        if (process.argv[i] === undefined) {
            break;
        } else {
            songArray.push(process.argv[i]);
        }

    }
    spotifySearch = songArray.join(" ");
    // console.log("song array: " + songArray);
    // console.log(spotifySearch);
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
    if(spotifySearch === ""){
        giveMeAce();
    }
    else{
        spotify.search({
            type: 'track',
            query: spotifySearch
        }, function(err, data) {
            if (err) {
                console.log('Error occurred: ' + err);
                return;
            }

            // Do something with 'data'
            var start = data.tracks.items[0];
            // if search returns back nothing, output The Sign - Ace of Base
            if (start === undefined) {
                giveMeAce();
            } else {
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
                // console.log(start);
                console.log("Title: " + songName);
                console.log("Artists: " + allArtists);
                console.log("Preview Link: " + previewLink);
                console.log("Album Name: " + albumName);
            }


        });
    }

}
// Get Movie Title
function getMovieTitle() {
    // process.argv[4] is the start of the song
    var movieNameArray = [];
    for (var i = 3; 4 < 20; i++) {
        if (process.argv[i] === undefined) {
            break;
        } else {
            movieNameArray.push(process.argv[i]);
        }

    }
    movieName = movieNameArray.join("+");
    // console.log("song array: " + songArray);
    // console.log(movieName);
}

// movie-this

function movieThis() {
    // console.log("Movie function running");
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
                if(movieInfo.Title === undefined){
                    giveMeNobody();
                }
                else{
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
    fs.readFile("./random.txt", "utf8", function(err, data){
        if(err){
            console.log(err);
        }
        else{
            var test = data.toString();
            console.log(test);
            // console.log(require('child_process').execFileSync(data).toString());
            console.log(require('child_process').execSync(data).toString());
        }
    });
}
