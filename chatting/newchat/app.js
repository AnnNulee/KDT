// const cookieParser = require('cookie-parser');
// const express = require('express');
// const morgan = require('morgan');
// const session  = require('express-session');
// // const path = require('path');
// const nunjucks = require('nunjucks');
// const dotenv = require('dotenv');

// // express 안에 원래 http 서버 하나 띄우는데, ws 서버도 같이 띄울 수 있다. 원래 하나만 가능.

// dotenv.config();
// const webSocket = require('./socket');
// const indexRouter = require('./routes');


// const app = express()
// const port = 8005;

// // 이거 우리한텐 필요없는 임시프론트
//     app.set('view engine', 'html');
//     nunjucks.configure('views',{
//         express:app,
//         watch:true,
//     });


// // 미들웨어

// app.use(morgan('dev'));
// app.use(express.json());
// app.use(express.urlencoded({extended: false}));
// app.use(cookieParser(process.env.COOKIE_SECRET));
// app.use(session({
//     resave : false,
//     saveUninitialized: false,
//     secret : process.env.COOKIE_SECRET,
//     cookie : {
//         httpOnly : true,
//         secure : false,
//     },
// }));



// app.use('/', indexRouter);

// app.use((req, res, next)=> {
//     const error = new Error(`${req.method} ${req.url} 라우터가 없다`);
//     error.status = 404;
//     next(error);
// });

// app.use((err, req, res, next) => {
//     res.locals.message = err.message;
//     res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
//     res.status(err.status || 500);
//     res.render('error')
// })


// const server = app.listen(port, () => console.log(`Example app listening an port ${port}! `))

// webSocket(server); 

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');

dotenv.config();
const webSocket = require('./socket');
const indexRouter = require('./routes');

const app = express();
app.set('port', process.env.PORT || 8005);
app.set('view engine', 'html');
nunjucks.configure('views', {
  express: app,
  watch: true,
});

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));

app.use('/', indexRouter);

app.use((req, res, next) => {
  const error =  new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

const server = app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중');
});

webSocket(server);
