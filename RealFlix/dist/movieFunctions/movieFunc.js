"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * pulling in imports for the movie database
 */
var keys = require('../keys/keys');
var request_promise_1 = __importDefault(require("request-promise"));
var dbMethods_1 = require("../dbInterface/dbMethods");
/**
 * importing express response object to handle response logic
 *
 */
function searchMovies(item, res) {
    /** Getting data about films from source and returning it so our REST endpoint can return the result or pass data to another method */
    if (item === null) {
        return { errMessage: 'A searchable item has not been entered' };
    }
    else {
        var options = {
            uri: 'https://api.themoviedb.org/3/search/movie',
            qs: {
                api_key: keys.tmdb,
                language: 'en-US',
                query: item,
                include_adult: false
            },
            method: 'GET'
        };
        request_promise_1.default(options)
            .then(function (response) {
            var results = [];
            var jsonObject = JSON.parse(response);
            Array.from(jsonObject.results).map(function (item) {
                console.log(item);
                /**
                 * Grabbing movie data from response and storing in a final data JSONArray
                 */
                results.push({
                    title: item.title,
                    backdrop: item.backdrop_path,
                    poster: item.poster_path,
                    release: item.release_date,
                    overview: item.overview,
                    id: item.id,
                });
            });
            gatherData(results, res);
        })
            .catch(function (err) {
            res.send(err);
        });
    }
}
exports.searchMovies = searchMovies;
function gatherData(data, res) {
    /**
     * Calling database methods inserting initial data to database
     * Trying to reduce lines inside function make things easier to read
     */
    if (dbMethods_1.insertDB(data) === true) {
        res.send("Data successfully added to DB");
    }
    else {
        res.send("Error");
    }
}
//# sourceMappingURL=movieFunc.js.map