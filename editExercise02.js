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

router.post('/editExercise02', function (req, res) {
    var uploaded_image = req.body.uploaded_image;
    //console.log('uploaded_image',req.files)
    console.log('uploaded_image',uploaded_image)
    var sql = "Insert into exercise_people(epImage) ";
    sql += `values('${uploaded_image}')`;
    //sampleFile = req.files.sampleFile;
    //uploadPath = __dirname + '/somewhere/on/your/server/' + sampleFile.name;
   // sampleFile.mv(uploadPath, function(err) {

   // }
    con.query(sql, function (err, result) {
      if (err) throw err
      res.render('hometour01', {
        title: 'Data Saved',
        message: 'Data Saved successfully.'
      })
      //res.send(result);
    });
  })
                              

module.exports = router;
