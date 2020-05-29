var express = require('express');
var router = express.Router();

var pool = require('../database'); //Importamos el modulo para poder usar la base de datos
const { isLoggedIn } = require('../lib/auth');

router.get('/add', isLoggedIn , (req, res) =>{
    res.render('links/add');
});

router.post('/add', isLoggedIn , async (req, res) =>{
    const { title, url, description } = req.body; //Solamente obtenemos el titulo, url y la descripcion del form
    const newLink = {
        title,
        url,
        description,
        user_id: req.user.curp
    };
    await pool.query('INSERT INTO links set ?', [newLink] ); // await hace que se espere a que haga el query y despues continua
    req.flash('success', 'Link guardado satisfactoriamente');
    res.redirect('/links');
});

router.get('/', isLoggedIn , async (req, res) =>{
        const links = await pool.query('SELECT * FROM links');
        //console.log(links);
        res.render('links/list', {links}); //Renderizamos la pagina links y le mandamos el objeto links que es un array
});

router.get('/delete/:id', isLoggedIn , async (req, res) =>{
    const { id } = req.params;
    await pool.query('DELETE FROM links WHERE ID = ?', [id] );
    req.flash('success', 'Link removido satisfactoriamente');
    res.redirect('/links');
});


router.get('/edit/:id', isLoggedIn , async (req,res)=>{
    const { id } = req.params;
    const links = await pool.query('SELECT * FROM links WhERE id = ?', [id]);
    res.render('links/edit', {link: links[0]});
});

router.post('/edit/:id', isLoggedIn , async (req,res)=>{
    const { id } = req.params;
    const { title, description, url} = req.body;
    const newLink = {
        title,
        description,
        url
    };
    await pool.query('UPDATE links set ? WHERE id = ?', [newLink,id])
    req.flash('success', 'Link actualizado satisfactoriamente');
    res.redirect('/links');
});


module.exports = router;