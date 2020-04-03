`use strict`

let createError = require('http-errors')
let express = require('express')
let cookieParser = require('cookie-parser')
const bodyParser = require("body-parser")
import config from '../config'
import cors from 'cors'

// router for modules
let usersRouter = require('../src/modules/user/router/users')
let managerRouter = require('../src/modules/manager/router/manager')
let projectRouter = require('../src/modules/project/router/project')

// database connections
require('../src/models/mongoDB/index')
require('../src/models/sqlDB/index')

let app = express()
let port = config.port;
let frontendUrl = config.frontendUrl;
//console.log(config);

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use('/public/', express.static('./public/'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// use cors to allow cross origin resource sharing
app.use(cors({ origin: '*', credentials: false }));
app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Credentials', 'true');
	res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
	res.setHeader('Cache-Control', 'no-cache');
	next();
  });
  

// base routes for modules
app.use('/users', usersRouter)
app.use('/manager', managerRouter)
app.use('/project', projectRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404))
})

// error handler
app.use(function (err, req, res) {
	// set locals, only providing error in development
	res.locals.message = err.message
	res.locals.error = req.app.get('env') === 'development' ? err : {}

	// render the error page
	res.status(err.status || 500)
	res.render('error')
})

app.listen(config.port, () => console.log(`MTaaS application server listening on ${port}`))
module.exports = app
