/*
Calling express framework web framework
*/
import Express from 'express'

const app  = Express()

/**
 * Adding Movie Routes and setting express to use movie routes
 */
const movieController = require('../routes/movies')

app.use("/movies",movieController)
/**
 * Sets express framework port
 */
app.listen(8000, () => {
    console.log(`Server started on port`);
});
