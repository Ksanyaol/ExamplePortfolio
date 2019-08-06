const Express = require('express')

const passport = require('passport')

/**
 * Pulling in dbConfig
 */
const db = require('../dbConfig/dbConfig')

const auth = Express.Router()
/**
 * Creating Student Registration Routes
 */
auth.get('/token/redirect',passport.authenticate('google',{scope:['profile'],failureRedirect:'/login'}),(req,res) => {
    if(req.user.id === null){
    res.send("Darn user does not exist please try a different account")
    }
    else{
        db.select(req.user,res)
    }
})
auth.get('/success/profile',(req,res) => {
 res.send("We have logged in ");
})

module.exports = auth;
