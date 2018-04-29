const express = require('express');
var router = express.Router();

// main page router
router.get('/', (req, res) => {
    res.send("It works!");
});

module.exports = router;
