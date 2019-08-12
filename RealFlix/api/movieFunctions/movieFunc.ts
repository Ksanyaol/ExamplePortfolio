/**
 * pulling in imports for the movie database
 */
const keys = require('../keys/keys')

import rp from 'request-promise'
import * as Express from 'express';
import { insertDB } from '../dbInterface/dbMethods';
/**
 * importing express response object to handle response logic
 *
 */
export function searchMovies(item:string, res:Express.Response){
    /** Getting data about films from source and returning it so our REST endpoint can return the result or pass data to another method */
    if(item === null){
        return {errMessage:'A searchable item has not been entered'}
    }
    else{
        let options:rp.Options = {
            uri:'https://api.themoviedb.org/3/search/movie',
            qs:{
                api_key:keys.tmdb,
                language: 'en-US',
                query:item,
                include_adult:false
            },
            method:'GET'
    }
    rp(options)
    .then((response) => {
        const results: any = []
        var jsonObject = JSON.parse(response)
        Array.from(jsonObject.results).map((item:any) => {
            console.log(item)
            /**
             * Grabbing movie data from response and storing in a final data JSONArray
             */
            results.push({
                title:item.title,
                backdrop:item.backdrop_path,
                poster:item.poster_path,
                release:item.release_date,
                overview:item.overview,
                id:item.id,
            })
        })
        gatherData(results,res)
    })
    .catch((err) => {
        res.send(err)
    })
    }
}

function gatherData(data:Array<any>,res:Express.Response){
        /**
         * Calling database methods inserting initial data to database
         * Trying to reduce lines inside function make things easier to read
         */
        if(insertDB(data) === true){
            res.send("Data successfully added to DB")
        }
        else{
            res.send("Error")
        }
}
