var express = require('express');
var router = express.Router();
var ctrlHome = require('../controllers/homePage');

/* GET home page. */
router.get('/', ctrlHome.home);

module.exports = router;
