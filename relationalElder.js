var express = require('express');
var router = express.Router();

/* GET home page. */ 
 
router.get('/relationalElder', function(req, res) {
    res.render('relationalElder', { title: 'Express' });
  }); 

router.get('/infoElder', function(req, res) {
  res.render('infoElder', { title: 'Express' });
});
module.exports = router;
