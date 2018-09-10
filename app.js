const createError = require('http-errors')
    , express = require('express')
    , hbs = require('hbs')
    , path = require('path')
    , cookieParser = require('cookie-parser')
    , logger = require('morgan')
    , session = require('express-session')
    , i18n = require('i18n-express')

let routes = require('./routes');


let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

hbs.registerPartials(path.join(__dirname, 'views', 'partials'))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));
 
app.use(i18n({
  translationsPath: path.join(__dirname, 'i18n'), // <--- use here. Specify translations files path.
  defaultLang: 'en',
  siteLangs: ["en","zh"],
  textsVarName: 'translation'
}));

app.use('/', routes);

app.use(function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})


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

let port =  2000;


app.listen(port, (err, msg) => {
  if(err) {
    console.log('wtf')
  } else {
    console.log('ok')
  }
})

//export app
module.exports = app;
