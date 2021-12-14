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

router.post('/infoElders', function (req, res) {
  var idcard = req.body.idcard;
  var fname = req.body.fname;
  var lname = req.body.lname;
  var birthdate = req.body.birthdate;
  var gender = req.body.gender;
  var telno = req.body.telno;
  var disease = req.body.disease;
  var medicine = req.body.medicine;
  var drugallergy = req.body.drugallergy;
  var doctor = req.body.doctor;
  var hospital = req.body.hospital;
  var uploaded_image = req.body.uploaded_image;
  console.log('idcard', req.files)
  console.log('idcard', idcard)
  /*var sql = "Insert into caregiver(cPassword,cConfirmPassword,cFName,cLName,cEmail) ";*/
  var sql = "Insert into patient(pId,pFName,pLName,pBirthDate,pGender,pTelNo,pDisease,pMedicine,pDrugAllergy,pDoctor,pHospital,pUpImage) ";
  sql += `values('${idcard}' , '${fname}' , '${lname}' ,'${birthdate}' , '${gender}' , '${telno}' , '${disease}' , '${medicine}' , '${drugallergy}' , '${doctor}' , '${hospital}' , '${uploaded_image}')`;
  /*sampleFile = req.files.sampleFile;
  uploadPath = __dirname + '/somewhere/on/your/server/' + sampleFile.name;
  sampleFile.mv(uploadPath, function (err) {
  }*/

    con.query(sql, function (err, result) {
    if (err) throw err
    res.render('addElder', {
      title: 'Data Saved',
      message: 'Data Saved successfully.'
    })
    //res.send(result);
  });
})


module.exports = router;
