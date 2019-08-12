import mysql from 'mysql'
var SqlString = require('sqlstring');
/**
 * query builder
 */
import squel from 'squel'

function getConnection():mysql.Connection{
    const connection = mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'homedb'
    })
    return connection
}

export function insertDB(data:Array<any>): []{
const results:any = []

        const query = "Insert IGNORE into movies (original_title,backdrop,poster,release_date,overview,movie_id) values ('"+data[i].title+"','"+data[i].backdrop+"','"+data[i].poster+"','"+data[i].release+"','"+data[i].overview+"','"+data[i].id+"')"
        
        getConnection().query(query,(err,result,field) => {
            if(err){
                results.push({message:"Error"})
                console.log(err)
            }
            else{
                results.push({message:"Success"})
                console.log()
            }
        })
    
    return results

}