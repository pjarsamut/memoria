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

router.post('/addMemoryExercise', function (req, res) {
    var meid = req.body.meid;
    var uploaded_image = req.body.uploaded_image;
    var title = req.body.title;
    var beacon = req.body.beacon;
    console.log('meid',req.files)
    console.log('meid',meid)
    var sql = "Insert into memory_exercise(meId,meImage,meTitle,meBeaconId) ";
    sql += `values('${meid}' , '${uploaded_image}' , '${title}' ,'${beacon}')`;
    //sampleFile = req.files.sampleFile;
    //uploadPath = __dirname + '/somewhere/on/your/server/' + sampleFile.name;

    // sampleFile.mv(uploadPath, function(err) {

   // }
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
