const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');
const helpers = require('../lib/helpers');

passport.use('local.login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const rows = await pool.query('SELECT * FROM Usuarios WHERE email = ?', [email]);
    if (rows.length > 0) {
        const user = rows[0];
        const validPassword = await helpers.matchPassword(password, user.password);
        if (validPassword) {
            done(null, user, req.flash('success', 'Bienvenido ' + user.nombre));
        } else {
            done(null, false, req.flash('message', 'Contraseña incorrecta'));
        }
    } else {
        return done(null, false, req.flash('message', 'El correo no existe.'));
    }
}));

passport.use('local.register', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const { nombre, apellido, edad, fec_nac, genero, curp } = req.body;
    const newUser ={
        nombre,
        apellido,
        curp,
        edad,
        genero,
        email,
        fec_nac,
        password
    };
    console.log(newUser.password);
    newUser.password = await helpers.encryptPassword(password);
    console.log(newUser.password);
    const result = await pool.query('INSERT INTO Usuarios SET ?', [newUser]);
    newUser.curp = result.insertId;
    return done(null, newUser);
}));


passport.serializeUser((user,done) =>{
    done(null, user.curp);
});

passport.deserializeUser(async (curp, done) => {
    const rows = await pool.query('SELECT * FROM Usuarios WHERE curp = ? ', [curp]);
    done(null, rows[0]);
});