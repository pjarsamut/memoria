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
})


module.exports = router;
