var express = require('express');
var router = express.Router();
var ctrlHome = require('../controllers/homePage');
var ctrlEmail = require('../controllers/handleEmailForm');

/* GET home page. */
router.get('/', ctrlHome.home);

/* Handles POST request for contact form */
router.post('/contact', ctrlEmail.email);

module.exports = router;
