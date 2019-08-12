"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = __importDefault(require("mysql"));
var SqlString = require('sqlstring');
function getConnection() {
    var connection = mysql_1.default.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'homedb'
    });
    return connection;
}
function insertDB(data) {
    var results = [];
    var query = "Insert IGNORE into movies (original_title,backdrop,poster,release_date,overview,movie_id) values ('" + data[i].title + "','" + data[i].backdrop + "','" + data[i].poster + "','" + data[i].release + "','" + data[i].overview + "','" + data[i].id + "')";
    getConnection().query(query, function (err, result, field) {
        if (err) {
            results.push({ message: "Error" });
            console.log(err);
        }
        else {
            results.push({ message: "Success" });
            console.log();
        }
    });
    return results;
}
exports.insertDB = insertDB;
//# sourceMappingURL=dbMethods.js.map