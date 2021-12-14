var express = require('express');
var router = express.Router();
var mysql = require('mysql');
/* GET home page. */
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    port: "3306",
    database: "memoria"
});

module.exports = router;
