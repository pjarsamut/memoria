var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fileUpload = require('express-fileupload');

var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
//var sdetailRouter = require('./routes/sdetail');
var loginRouter = require('./routes/login');
var createAccountRouter = require('./routes/createAccount');
var relationalElderRouter = require('./routes/relationalElder');
var infoElderRouter = require('./routes/infoElders');
var addElderRouter = require('./routes/addElder');
var trainingSetRouter = require('./routes/trainingSet');
var hometour01Router = require('./routes/hometour01');
var addMemoryExerciseRouter = require('./routes/addMemoryExercise');
var addMediaRouter = require('./routes/addMedia');
var trainingRecordRouter = require('./routes/trainingRecord');
var detailCommentRouter = require('./routes/detailComment');
var editExercise01Router = require('./routes/editExercise01');
var editExercise02Router = require('./routes/editExercise02');
var personalInformationRouter = require('./routes/personalInformation');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());

app.use('/', indexRouter);
//app.use('/users', usersRouter);
//app.use('/sdetail', sdetailRouter);
app.use('/login', loginRouter);
app.use('/createAccount', createAccountRouter);
app.use('/relationalElder', relationalElderRouter);
app.use('/infoElders', infoElderRouter);
app.use('/addElder', addElderRouter);
app.use('/trainingSet', trainingSetRouter);
app.use('/hometour01', hometour01Router);
app.use('/addMemoryExercise', addMemoryExerciseRouter);
app.use('/addMedia', addMediaRouter);
app.use('/trainingRecord', trainingRecordRouter);
app.use('/detailComment', detailCommentRouter);
app.use('/editExercise01', editExercise01Router);
app.use('/editExercise02', editExercise02Router);
app.use('/personalInformation', personalInformationRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
