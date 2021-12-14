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

con.connect((error) => {
  if (error) {
    console.log(error)
  } else {
    console.log("MySql Connected...");
  }
});


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/login', function (req, res) {
  res.render('login', { title: 'Express' });
});

router.get('/createAccount', function (req, res) {
  res.render('createAccount', { title: 'Express' });
});
router.get('/relationalElder', function (req, res) {
  res.render('relationalElder', { title: 'Express' });
});
router.get('/infoElder', function (req, res) {
  res.render('infoElder', { title: 'Express' });
});
router.get('/addElder', function (req, res) {
  res.render('addElder', { title: 'Express' });
});
router.get('/trainingSet', function (req, res) {
  res.render('trainingSet', { title: 'Express' });
});
router.get('/hometour01', function (req, res) {
  res.render('hometour01', { title: 'Express' });
});
router.get('/addMemoryExercise', function (req, res) {
  res.render('addMemoryExercise', { title: 'Express' });
});
router.get('/addMedia', function (req, res) {
  res.render('addMedia', { title: 'Express' });
});
router.get('/trainingRecord', function (req, res) {
  var sql = 'SELECT * FROM training_record';
  con.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render('trainingRecord', { title: 'Express', userData: data });
  });
});

router.get('/detailComment', function (req, res) {
  res.render('detailComment', { title: 'Express' });
});
router.get('/editExercise01', function (req, res) {
  res.render('editExercise01', { title: 'Express' });
});
router.get('/editExercise02', function (req, res) {
  res.render('editExercise02', { title: 'Express' });
});
router.get('/personalInformation', function (req, res) {
  var sql = 'SELECT * FROM patient';
  con.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render('personalInformation', { title: 'Express', userData: data });
  });
});

// login
router.get('/login/:uname/:pwd', function (req, res) {              // รับ parameter througn URL path
  var uname = req.params.uname;
  var pwd = req.params.pwd;
  var sql = "select * from caregiver where cUname = '" + uname + "' and cPassword = '" + pwd + "' ";     // insert ทีละ record

  con.query(sql, function (err, result) {
    if (err) throw err;
    if (result.length > 0) {
      res.send({ "result": 1 });                             // 1 is เจอ record -> found record return 1
    } else {
      res.send({ "result": 0 });                             // not found record return 0
    }
    //res.send(JSON.stringify(result));                    
  });
});

// create account
router.post('/createAccount', function (req, res) {
  var fname = req.body.fname;
  var lname = req.body.lname;
  var uname = req.body.uname;
  var email = req.body.email;
  var pwd = req.body.pwd;
  var cfpwd = req.body.cfpwd;
  var ctype = req.body.ctype;
  /*var sql = "Insert into caregiver(cPassword,cConfirmPassword,cFName,cLName,cEmail) ";*/
  var sql = "Insert into caregiver(cFName,cLName,cUName,cEmail,cPassword,cConfirmPassword,cType) ";
  sql += `values('${fname}' , '${lname}' , '${uname}' , '${email}' , '${pwd}' , '${cfpwd}' , '${ctype}')`;
  con.query(sql, function (err, result) {
    if (err) throw err
    res.render('addElder', {
      title: 'Data Saved',
      message: 'Data Saved successfully.'
    })
    //res.send(result);
  });
});

//insert elder image
exports.index = function (req, res) {
  message = '';
  if (req.method == "POST") {
    router.post('/infoElder', function (req, res) {
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
      /*var sql = "Insert into caregiver(cPassword,cConfirmPassword,cFName,cLName,cEmail) ";*/
      var sql = "Insert into patient(pId,pFName,pLName,pBirthDate,pGender,pTelNo,pDisease,pMedicine,pDrugAllergy,pDoctor,pHospital) ";
      sql += `values('${idcard}' , '${fname}' , '${lname}' ,'${birthdate}' , '${gender}' , '${telno}' , '${disease}' , '${medicine}' , '${drugallergy}' , '${doctor}' , '${hospital}')`;
      con.query(sql, function (err, result) {
        if (err) throw err
        res.render('addElder', {
          title: 'Data Saved',
          message: 'Data Saved successfully.'
        })
        //res.send(result);
      });
    });

    if (!req.files)
      return res.status(400).send('No files were uploaded.');
    var file = req.files.uploaded_image;
    var img_name = __dirname + '/somewhere/on/your/server/' + file.name;
    if (file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/gif") {
      file.mv(img_name, function (err) {
        /*file.mv('public/images/upload_images/' + file.name, function (err) {*/
        if (err)
          return res.status(500).send(err);
        var sql = "INSERT INTO `patient`(`pFName`,`pLName`,`pBirthDate`,`pGender`, `pTelNo` ,`imagepDisease` , `pMedicine` , `pDrugAllergy` , `pDoctor` , `pHospital` ) VALUES ('" + fname + "','" + lname + "','" + mob + "','" + name + "','" + pass + "','" + img_name + "')";
        var query = db.query(sql, function (err, result) {
          res.redirect('profile/' + result.insertId);
        });
      });
    } else {
      message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
      res.render('index.ejs', { message: message });
    }
  };
}

//insert media image
exports.index = function (req, res) {
  message = '';
  if (req.method == "POST") {
    router.post('/addMedia', function (req, res) {
      var moid = req.body.moid;
      var filename = req.body.filename;
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
    });

    if (!req.files)
      return res.status(400).send('No files were uploaded.');
    var file = req.files.filename;
    var img_name = __dirname + '/somewhere/on/your/server/' + file.name;
    if (file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/gif") {
      file.mv(img_name, function (err) {
        /*file.mv('public/images/upload_images/' + file.name, function (err) {*/
        if (err)
          return res.status(500).send(err);
        var sql = "INSERT INTO `memory_object`(`moId` ) VALUES ('" + moid + "','" + img_name + "')";
        var query = db.query(sql, function (err, result) {
          res.redirect('profile/' + result.insertId);
        });
      });
    } else {
      message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
      res.render('index.ejs', { message: message });
    }
  };
}

//insert memory exercise image
exports.index = function (req, res) {
  message = '';
  if (req.method == "POST") {
    router.post('/addMemoryExercise', function (req, res) {
      var meid = req.body.meid;
      var uploaded_image = req.body.uploaded_image;
      var title = req.body.title;
      var beacon = req.body.beacon;

      /*var sql = "Insert into caregiver(cPassword,cConfirmPassword,cFName,cLName,cEmail) ";*/
      var sql = "Insert into memory_exercise(meId,meImage,meTitle,meBeacon) ";
      sql += `values('${meid}' , '${uploaded_image}' , '${title}' , '${beacon}')`;
      con.query(sql, function (err, result) {
        if (err) throw err
        res.render('addMemoryExercise', {
          title: 'Data Saved',
          message: 'Data Saved successfully.'
        })
        //res.send(result);
      });
    });

    if (!req.files)
      return res.status(400).send('No files were uploaded.');
    var file = req.files.uploaded_image;
    var img_name = __dirname + '/somewhere/on/your/server/' + file.name;
    if (file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/gif") {
      file.mv(img_name, function (err) {
        /*file.mv('public/images/upload_images/' + file.name, function (err) {*/
        if (err)
          return res.status(500).send(err);
        var sql = "INSERT INTO `memory_exercise`(`meId`,`meTitle`,`meBeaconId` ) VALUES ('" + meid + "','" + title + "','" + beacon + "','" + img_name + "')";
        var query = db.query(sql, function (err, result) {
          res.redirect('profile/' + result.insertId);
        });
      });
    } else {
      message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
      res.render('index.ejs', { message: message });
    }
  };
}


/*router.post('/createAccount', function(req, res) {       // insert ข้อมูลด้วย get method
 
  // รับผ่าน body ของ http message -> ต้อง install module body parser ที่ app.js ก่อน
  var fname = req.body.fname;
  var lname = req.body.lname;
  var pwd = req.body.pwd;
  var CFpwd = req.body.CFpwd;
  var email = req.body.email;
  sql = "insert into caregiver(cPassword, cConfirmPassword, cFName, cLName, cEmail) ";   // เว้นวรรค ข้างหลัง ) ด้วย
  sql += `values('${pwd}' , '${CFpwd}' , '${fname}' , '${lname}' , '${email}')`;     
  // เอาบรรทัดสองต่อกับบรรทัดแรก หรือ จะต่อบรรทัดแรกกับบรรทัดสองเป็นยาวๆเลยก็ได้
  con.query(sql,function(err,result){
    if(err) throw err;
    res.send(result);                   // ส่งผลลัพธ์ กลับไปที่ Client
  });
 
// Test at Chrome
//http://localhost:3000/student?sid=11111&fname=test&lname=test&major=CS&year=1 
});*/

module.exports = router;
