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

router.get('/', function(req, res,next){
  res.render('index',{title: 'Express'});
});

router.get('/addElder', function(req, res){
  var sql = "select pFName, pLName , pUpImage ";
  con.query(sql,function(err,result,field){
     if(err)throw err;
     res.send(JSON.stringify(result));
  });
});


module.exports = router;
