const Express = require('express')

const app = Express();

const authController = require('../routes/authController')

/**
 * Create google client for student OAuth2 using passportjs to manage
 */
const passport = require('passport')

/**
 * initializing passport with express and sessions
 */
app.use(passport.initialize())

app.use(passport.session())

const GoogleStrategy = require('passport-google-oauth20').Strategy

const keys = require('../keys/keys')

const db = require('../dbConfig/dbConfig')


const googClientID = keys.googleStrategy.clientID

const googleClientSecret = keys.googleStrategy.secret
/*
Setting google client Auth variable using passport to manage security
*/
const googleAuth = new GoogleStrategy({
    clientID: keys.googleStrategy.clientID,
    clientSecret: keys.googleStrategy.secret,
    callbackURL: keys.googleStrategy.url
},(token,refreshToken,profile,done) => {
    if(db.insertDB(profile) === 0){
        done(null,profile)
    }
    else{
        done(null,profile)
    }
})
passport.use(googleAuth)

passport.serializeUser(function(user, done) {
    done(null, user);
})
passport.deserializeUser(function(user, done) {
    done(null, user);
});
/**
 * Using Auth Router
 */
app.use("/auth",authController)
/**
 * Sets API port
 * 
 */
app.listen(8000,() => {
    console.log("API is running")
})