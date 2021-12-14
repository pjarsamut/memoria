var express = require('express');
var router = express.Router();
var mysql = require('mysql');           // import module

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  port: "3306",
  database: "memoria"
});

module.exports = router;





