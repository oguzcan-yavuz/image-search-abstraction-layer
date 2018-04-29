const express = require('express');
const searcher = require('./searcher.js');
var router = express.Router();

// main page router
router.get('/', (req, res) => {
    res.send("It works!");
});

// searcher router
router.get('/search/:query', (req, res) => {
    let query = decodeURIComponent(req.params.query);
    let offset = parseInt(req.query.offset);
    // let results = searcher(query, offset);
    res.json({query: query, offset: offset});
})

module.exports = router;
