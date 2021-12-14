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

router.post('/addMedia', function (req, res) {
  var moid = req.body.moid;
  var filename = req.body.filename;
  console.log('moid',req.files)
  console.log('moid',moid)
  var sql = "Insert into memory_object(moId,moFilename) ";
  sql += `values('${moid}','${filename}')`;

  con.query(sql, function (err, result) {
    if (err) throw err
    res.render('addMemoryExercise', {
      title: 'Data Saved',
      message: 'Data Saved successfully.'
    })
    //res.send(result);
  });
})
module.exports = router;
