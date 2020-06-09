const express = require('express');
const router = express.Router();

const passport = require("passport");
const { isLoggedIn , isNotLoggedIn } = require('../lib/auth');
var pool = require('../database'); //Importamos el modulo para poder usar la base de datos

router.get('/login', (req, res) =>{
    if(req.isAuthenticated()){
        res.redirect('/home');
    }
    else{
        res.render('auth/login');
    }
});

router.post('/login', async (req, res, next) => {
    //req.check('username', 'Username is Required').notEmpty();
    //req.check('password', 'Password is Required').notEmpty();
    //const errors = req.validationErrors();
    //if (errors.length > 0) {
    //    req.flash('message', errors[0].msg);
    //    res.redirect('/login');
    //}
    await isLoggedIn;
    passport.authenticate('local.login', {
        successRedirect: '/home',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
});

router.get('/register', (req, res) =>{
    if(req.isAuthenticated()){
        res.redirect('/home');
    }
    else {
        res.render('auth/register');
    }
});

router.post('/register', passport.authenticate('local.register', {
    successRedirect: '/home',
    failedRedirect: '/register',
    failureFlash: true
}));

router.get('/profile',isLoggedIn, (req,res) =>{
    res.render('users/profile');
});

router.post('/profile',isLoggedIn, (req,res) =>{
    res.render('users/edit');
});

router.post('/profile/edit/:curp',isLoggedIn, async (req,res) =>{
    const {curp} = req.params;
    //console.log(curp +"  ===  "+ req.user.curp);
    if( curp === req.user.curp) {
        const {nombre, apellido, edad, fec_nac, genero} = req.body;
        const newUser = {
            nombre,
            apellido,
            edad,
            fec_nac,
            genero
        };
        await pool.query('UPDATE Usuarios set ? WHERE curp = ?', [newUser, curp]);
        req.flash('success', 'Perfil actualizado correctamente');
        res.redirect('/profile');
    }
    else{
        //console.log("Intentan editar el curp del metodo post");
        req.flash('failure', 'Error al actualizar el usuario. Intento de hackeo');
        res.redirect('/profile');
    }
});

router.get('/home',isLoggedIn, (req, res) =>{
    res.render('users/home');
});

router.get('/stats',isLoggedIn, (req, res) =>{
    res.render('users/stats');
});

router.get('/logout', isLoggedIn, (req, res) =>{
    req.logOut();
    res.redirect('/');
});

module.exports = router;