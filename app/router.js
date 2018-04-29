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
    searcher(query, offset).then(results => {
        res.json(results);
    }).catch(err => {
        console.error(err);
        let reason = err.error.error.errors[0].reason;
        res.json({ "error": reason });
    })
})

module.exports = router;
