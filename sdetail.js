var express = require('express');
var router = express.Router();

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  port: "3306",
  database: "admin"
});


/* GET users listing. */
router.get('/', function(req, res) {
  res.render('sdetail', { title: 'sdetail' });
});

router.get('/students', function(req, res) {          // ตั้งชื่อตาม Database ที่ต้องการไปดึงข้อมูล เป็นคำนาม (nouns) แบบ Plural -> /students 
  var sql = "select * from student";                  // ดึงข้อมูลทั้งหมดจาก students
  con.query(sql, function(err, result, fields){       // con มาจาก createConnection ข้างบน
    if(err) throw err;

    var json_arr = [];                                // กรณี ต้องการจัด Data Format เอง
    for(i=0; i<result.length; i++){                           // record is row
      row = result[i];                                        // ดึงทีละ record -> result[0] is a first record | result[1] is a second record
      var json_obj = {"std_id":row.std_id, "std_fname":row.std_fname, "std_lname":row.std_lname};     // ดึง only fields that you want
      json_arr.push(json_obj);                                // push is insert data ต่อท้ายไปเรื่อยๆ
    }
    
    res.send(JSON.stringify(json_arr));               // กรณีไม่ต้องการจัด Data Format 
    //res.send(JSON.stringify(result));                  
  });
}); 
// Run at Chrome -> http://localhost:3000/sdetail/students

router.get('/students/:sid', function(req, res) {             // รับ parameter -> sid
  var sql = "select * from student where std_id = '"+ req.params.sid +"' ";                  // ดึงข้อมูลทั้งหมดจาก students
  con.query(sql, function(err, result, fields){               // con มาจาก createConnection ข้างบน
    if(err) throw err;
    res.send(JSON.stringify(result));                         // ไม่ต้องการจัด Data Format                      
  });
}); 
// Run at Chrome -> http://localhost:3000/sdetail/students/5509900001

router.get('/courses/:sid', function(req, res) {             // รับ request เป็น get method | รับ parameter -> sid
  //var sql = "SELECT * FROM register r, course c WHERE r.course_id = c.course_id AND r.std_id = ''";                  // ดึงข้อมูลจาก Database
  var sql = "select c.course_id, c.course_name from register r, course c ";
  sql += "where r.course_id = c.course_id and r.std_id = '" + req.params.sid + "'";
  con.query(sql, function(err, result, fields){               // con มาจาก createConnection ข้างบน
    if(err) throw err;
    res.send(JSON.stringify(result));                         // ไม่ต้องการจัด Data Format                      
  });
}); 
// Run at Chrome -> http://localhost:3000/sdetail/courses/5509900001
// Run at Chrome -> http://localhost:3000/sdetail/courses/5509900002

module.exports = router;

