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

// another routes also appear here
// this script to fetch data from MySQL databse table
/*router.get('/trainingRecord', function (req, res) {
  var sql = 'SELECT * FROM training_record';
  con.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render('trainingRecord', { title: 'Express', userData: data });
  });
});*/

module.exports = router;





