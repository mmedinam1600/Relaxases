var express = require('express');
var router = express.Router();

const { isLoggedIn , isNotLoggedIn, isLoggedInIndex } = require('../lib/auth');

/* GET home page. */

router.get('/', isLoggedInIndex ,function(req, res, next) {
  res.render('index');
});

module.exports = router;
