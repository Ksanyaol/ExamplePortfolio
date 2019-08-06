const mysql = require('mysql')

/**
 * Adding SQL builder
 */
var squel = require("squel");

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'googleauthdb'
})

connection.connect()

function insertDB(profile) {
    var insertAccount = squel.insert().into("users")
    .set("id",profile.id)
    .set("displayName",profile.displayName)
    .set("familyName",profile.name.familyName)
    .set("givenName",profile.name.givenName).toString()
    console.log(insertAccount)
    connection.query(insertAccount,(err,results,fields) => {
        if(err){
            console.log(err)
        }
        else{
            return results.affectedRows
        }
    })
}
function SelectUser(user,res){
    const selectQuery = squel.select()
    .from("users")
    .where("id",user.id).toString()

    connection.query(selectQuery,(err,fields,results) => {
        if(err){
             res.redirect('/auth/login');
        }
        else{
             res.redirect('/auth/success/profile');
        }
    })
}
module.exports.insertDB = insertDB
module.exports.select = SelectUser