import Express from 'express'
import { searchMovies } from '../movieFunctions/movieFunc';

import asyncHandler = require('express-async-handler')

const movieHandler = Express.Router()

/**
 * Adding movieSearch Functions
 */
movieHandler.get('/',asyncHandler(async (req,res,next) => {

res.send("API can receive request")

}))

movieHandler.get("/search/:movie",asyncHandler(async(req,res,next) => {
searchMovies(req.params.movie,res)
}))

module.exports = movieHandler