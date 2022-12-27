const express = require('express')
const router = express.Router()
const time = require('../Controllers/time.js');
const cook_book = require('../Controllers/cook-book.js')

router.get('/api/time', time.time);

module.exports = router
