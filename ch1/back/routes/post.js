const express = require('express');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

router.post('/images', isLoggedIn, (req ,res) => {
    
})

router.post('/', isLoggedIn, (rea, res) => {
    
})

module.exports = router;