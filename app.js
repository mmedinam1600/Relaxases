

//----------------------------------------------\\

let express = require('express'); // Framework para la creacion de aplicaciones backend
let session = require('express-session'); //Adminsistra las sesiones de nuestra app para autentificar un usuario
let mysql = require('mysql'); // Modulo para conectarnos a la base de datos y hacer consultas
let MySQLStore = require('express-mysql-session'); //Modulo para almacenar las sesiones en la base de datos en lugar del servidor
let logger = require('morgan'); //Permite crear logs o mensajes de que es lo que las aplicaciones estan pidiendo al servidor
let bcryptjs = require('bcryptjs'); // Modulo para cifrar las contraseñas de los usuarios antes de que se guarde en la base de datos
let passport = require('passport'); // Modulo para autentificar y manejar el proceso de login de un usuario en nuestra aplicacion (Podemos autenficicar con facebook, google etc)
let passport_local = require('passport-local'); // Modulo para autenticar a los usuarios con nuestra propia base de datos
let timeago = require('timeago.js'); // Convierte los timestamps o fechas de la base de datos en un formato de: 2 minutes ago, 2 hours ago, etc
let connect_flash = require('connect-flash'); //Mostrar mensajes de error y exito cuando el usuario realice una operacion
let express_validator = require('express-validator'); // Modulo para validar los datos que el usuario nos envia desde la aplicacion
let expjade = require('express-jade');
let flash = require('connect-flash'); //Para mostrar mensajes entre las vistas
let { database } = require('./keys');

let socketIO = require('socket.io');
let http = require('http');
require("./lib/passport");
//----------------------------------------------\\

//--------------Inicializaciones-----------\\

let app = express(); //Ejecutamos express
const server = http.createServer(app);
let io = socketIO(server);

//--------------------------------------------\\

//------------Sockets------------------\\
require('./socket')(io);


//----------------------------------------\\



//------------Ajustes---------\\
var path = require('path');
app.set('port', process.env.PORT || 8080); //Definimos un puerto. Si existe uno en el sistema tomalo, sino agarra el puerto 4000
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//-----------------------------\\

//------------Middleware---------\\
app.use(session({
  secret: 'ElCapiPrice',
  resave: false,
  saveUninitialized: false,
  store: new MySQLStore(database)
}));
app.use(flash());
app.use(logger('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

//-----------------------------\\

//------------Variables Globales---------\\
app.use( (req, res, next) =>{
  app.locals.success = req.flash('success');
  app.locals.failure = req.flash('failure');
  app.locals.user = req.user;
  next();
});


//----------------------------------------\\


//------------- Conexion con arduino --------\\
//Serial Comunication
const Serialport = require('serialport');
const Readline = Serialport.parsers.Readline;

const port = new Serialport('COM3', {
  baudRate: 9600
});

const parser = port.pipe(new Readline({ delimeter:'\r\n'}));

parser.on('open', function (){
  console.log('connection is openned');
});

parser.on('data', function(data){
  console.log(data);
  io.emit('Grafica:data',{
    value:data
  });
});

port.on('error', function(err){
  console.log(err);
});
//------------------------------------------\\


//--------------Routes------------------\\
app.use(require('./routes/index'));
app.use(require('./routes/authentication'));
app.use(require('./routes/users'));
app.use('/links',require('./routes/links'));

//---------------------------------------\\

//--------------Public------------------\\
// AQUI ME QUEDE
app.use(express.static(path.join(__dirname,'public')));
//---------------------------------------\\


//----------Start Server------------------\\
server.listen(app.get('port'), () => {
  console.log("Servidor en el puerto", app.get('port') );
});

//---------------------------------------\\

/*
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


 */

// catch 404 and forward to error handler

/*

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









 */


/*
console.log("Conectando a la base de datos...");
conexion.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  let createUsers = "CREATE TABLE IF NOT EXISTS `Usuario` (" +
      "`nombre` varchar(20) NOT NULL," +
      "`curp` varchar(20) NOT NULL," +
      "`correo` varchar(30) NOT NULL," +
      "`contrasena` varchar(30) NOT NULL," +
      "`fec_nac` varchar(30) NOT NULL" +
      ") ENGINE=InnoDB DEFAULT CHARSET=utf8;";

  let insertUser = " INSERT INTO `Usuario` (" +
      "`nombre`, " +
      "`curp`, " +
      "`correo`, " +
      "`contrasena`, " +
      "`fec_nac`) " +
      "VALUES\n" +
      "('Maria', '" +
      "MARM950228MDFRMR02', " +
      "'mmartinez@gmail.com', " +
      "'mmartinez1', " +
      "'1999-02-28'),\n" +
      "('Josue', " +
      "'SAMJ990513HDFNNS01', " +
      "'jsanchez@gmail.com', " +
      "'jsanchez1', " +
      "'1999-05-13');";

  //INSERT INTO `adoo`.`Usuario` (`nombre`, `curp`, `correo`, `contrasena`, `fec_nac`) VALUES ('Diego', 'MEMM00419HDFDRGA7', 'diego@hotmail.com', 'diego', '19-02-1997');

  conexion.query(createUsers, function (err, result) {
    if (err) throw err;
    console.log("Table Users Created");
  });

  conexion.query(insertUser, function (err, result) {
    if (err) throw err;
    console.log("Users inserted");
  });

});


 */
