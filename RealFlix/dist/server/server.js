"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
Calling express framework web framework
*/
var express_1 = __importDefault(require("express"));
var app = express_1.default();
/**
 * Adding Movie Routes and setting express to use movie routes
 */
var movieController = require('../routes/movies');
app.use("/movies", movieController);
/**
 * Sets express framework port
 */
app.listen(8000, function () {
    console.log("Server started on port");
});
//# sourceMappingURL=server.js.map